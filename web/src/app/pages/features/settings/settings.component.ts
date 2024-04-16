import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Settings } from 'src/app/model/settings.model';
import { AppConfigService } from 'src/app/services/app-config.service';
import { PusherService } from 'src/app/services/pusher.service';
import { SettingsService } from 'src/app/services/settings.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  host: {
    class: "page-component"
  }
})
export class SettingsComponent {
  settings: {
    index: number;
    key: string;
    value: string;
  }[] = [];
  isLoading = false;
  error;
  delimitersMask = ['starting delimiter character here:', /\d/, '<this is your keyword>','starting delimiter character here:', /\d/, ];
  constructor(private settingsService: SettingsService,
    private spinner: SpinnerVisibilityService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public appConfig: AppConfigService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private titleService: Title,
    public router: Router,
    private pusherService: PusherService) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadSettings();
  }

  loadSettings() {
    try {
      this.settingsService.getAll().subscribe(res=> {
        if(res.success) {
          this.settings = res.data.map((x, i)=> { return { ...x, index: i }}).sort((a, b) => {
            return Number(a.index) - Number(b.index);
          });
          this.isLoading = false;
        } else {
          this.error = Array.isArray(res.message) ? res.message[0] : res?.message;
          this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
          this.isLoading = false;
          this.spinner.hide();
        }
      }, (err)=> {
        this.error = Array.isArray(err.message) ? err.message[0] : err?.message ? err?.message : err;
        this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
        this.isLoading = false;
        this.spinner.hide();
      })
    } catch(ex) {
      this.error = Array.isArray(ex.message) ? ex.message[0] : ex?.message ? ex?.message : ex;
      this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
      this.isLoading = false;
      this.spinner.hide();
    }
  }

  onSaveSettings(setting: Settings) {
    if (!setting) {
      return;
    }
    try {

      this.settingsService.update(setting).subscribe(res=> {
        if(res.success) {
          this.isLoading = false;
          this.loadSettings();
          this.snackBar.open('Settings saved!', 'close', {
            panelClass: ['style-success'],
          });
        } else {
          this.error = Array.isArray(res.message) ? res.message[0] : res?.message;
          this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
          this.isLoading = false;
          this.spinner.hide();
        }
      }, (err)=> {
        this.error = Array.isArray(err.message) ? err.message[0] : err?.message ? err?.message : err;
        this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
        this.isLoading = false;
        this.spinner.hide();
      })
    } catch(ex) {
      this.error = Array.isArray(ex.message) ? ex.message[0] : ex?.message ? ex?.message : ex;
      this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
      this.isLoading = false;
      this.spinner.hide();
    }
  }

  onSaveTemplate(file:File, setting: Settings) {
    if (!file) {
      return;
    }
    try {
      setting.value = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const result = reader?.result as string;
        const base64 = result.split(',')[1];

        this.settingsService.uploadCertificateTemplate({fileName: file.name, base64}).subscribe(res=> {
          if(res.success) {
            // this.settings = res.data;
            this.isLoading = false;
            this.snackBar.open('Settings saved!', 'close', {
              panelClass: ['style-success'],
            });

            this.loadSettings();
          } else {
            this.error = Array.isArray(res.message) ? res.message[0] : res?.message;
            this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
            this.isLoading = false;
            this.spinner.hide();
          }
        }, (err)=> {
          this.error = Array.isArray(err.message) ? err.message[0] : err?.message ? err?.message : err;
          this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
          this.isLoading = false;
          this.spinner.hide();
        })
      };
    } catch(ex) {
      this.error = Array.isArray(ex.message) ? ex.message[0] : ex?.message ? ex?.message : ex;
      this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
      this.isLoading = false;
      this.spinner.hide();
    }
  }
}
