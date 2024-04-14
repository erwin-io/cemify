import { daysDiff } from './../utility/date';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import * as moment from 'moment';
import { AppConfigService } from 'src/app/services/app-config.service';
import { BurialService } from 'src/app/services/burial.service';
import html2pdf from 'html2pdf.js';
import { Observable, Subject, catchError, of, takeUntil, map } from 'rxjs';
import { Burial } from 'src/app/model/burial.model';


@Component({
  selector: 'app-burial-reports',
  templateUrl: './burial-reports.component.html',
  styleUrls: ['./burial-reports.component.scss'],
})
export class BurialReportsComponent {
  isLoading = false;
  displayedColumns: string[] = [
    'burialCode',
    'lotCode',
    'block',
    'fullName',
    'dateOfDeath',
    'dateOfBurial',
    'familyContactPerson',
    'familyContactNumber',
  ];
  dataSource = new MatTableDataSource([]);
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  @ViewChild('reportSettingsTemplate', { static: true }) reportSettingsTemplate: TemplateRef<any>;

  get today() {
    return new Date();
  }

  constructor(
    private burialService: BurialService,
    private appconfig: AppConfigService
  ) {


    this.isLoading = true;
    this.burialService.generateReport().pipe(
      takeUntil(this.ngUnsubscribe),
      catchError(this.handleError('burial', []))
    ).subscribe(async res=> {
      this.dataSource = new MatTableDataSource(res.data.map((x: Burial)=> {
        return {
          ...x,
          ...x.lot
        }
      }));
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  async ngAfterViewInit(): Promise<void> {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  async onPrint() {
    const element: HTMLDivElement = document.querySelector("div.printable");

    html2canvas((element as any)).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      // console.log(contentDataURL);
      let pdfWindow = window.self.open()
      pdfWindow.document.write(
        `
        <div style="display:flex;width:100%;flex-direction:column;align-items: center;">
        <img style="width: 100%;object-position: top;object-fit: scale-down;" src=${contentDataURL}></div>
        `
      );
      pdfWindow.document.title = `${moment(this.today).format("MMM DD, YYYY")}`;
      setTimeout(()=> {
        pdfWindow.print();
        window.location.reload();
      }, 1000)
    });
  }


  handleError<T>(operation = 'operation', result?: any) {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    return (error: any): Observable<any> => {
      return of(error.error as any);
    };
  }
}
