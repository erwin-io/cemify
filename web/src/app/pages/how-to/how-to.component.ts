import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.scss'],
})
export class HowToComponent {
  title;
  @ViewChild('map') map: ElementRef<HTMLDivElement>;
  @ViewChild('burial') burial: ElementRef<HTMLDivElement>;
  @ViewChild('reservation') reservation: ElementRef<HTMLDivElement>;
  @ViewChild('workOrder') workOrder: ElementRef<HTMLDivElement>;
  @ViewChild('users') users: ElementRef<HTMLDivElement>;

  currentFocus: "map" | "burial" | "reservation" | "workOrder" | "users";
  constructor(
    public titleService:Title,
    public _location: Location,
    public appConfig: AppConfigService,
    private route: ActivatedRoute) {
    this.title = appConfig.config.appName;
    const {focus} = this.route.snapshot.queryParams;
    console.log(focus);
    this.currentFocus = focus;
  }

  ngAfterViewInit(): void {
    if(this.currentFocus === "map") {
      this.map.nativeElement.scrollIntoView({behavior: 'smooth'});
      this.titleService.setTitle("Map | How to");
    } else if(this.currentFocus === "burial") {
      this.burial.nativeElement.scrollIntoView({behavior: 'smooth'});
      this.titleService.setTitle("Burial | How to");
    } else if(this.currentFocus === "reservation") {
      this.reservation.nativeElement.scrollIntoView({behavior: 'smooth'});
      this.titleService.setTitle("Reservation | How to");
    } else if(this.currentFocus === "workOrder") {
      this.workOrder.nativeElement.scrollIntoView({behavior: 'smooth'});
      this.titleService.setTitle("Work Order | How to");
    } else if(this.currentFocus === "users") {
      this.users.nativeElement.scrollIntoView({behavior: 'smooth'});
      this.titleService.setTitle("Users | How to");
    } else {
      this.titleService.setTitle("How to");
    }
  }

  scrollTo(focus) {
    if(focus === "map") {
      this.map.nativeElement.scrollIntoView({behavior: 'smooth'});
      this.titleService.setTitle("Map | How to");
    } else if(focus === "burial") {
      this.burial.nativeElement.scrollIntoView({behavior: 'smooth'});
      this.titleService.setTitle("Burial | How to");
    } else if(focus === "reservation") {
      this.reservation.nativeElement.scrollIntoView({behavior: 'smooth'});
      this.titleService.setTitle("Reservation | How to");
    } else if(focus === "workOrder") {
      this.workOrder.nativeElement.scrollIntoView({behavior: 'smooth'});
      this.titleService.setTitle("Work Order | How to");
    } else if(focus === "users") {
      this.users.nativeElement.scrollIntoView({behavior: 'smooth'});
      this.titleService.setTitle("Users | How to");
    }
    this._location.go('/how-to?focus=' + focus);
  }
}
