import { Component } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { DashboardService } from 'src/app/services/dashboard.service';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {  Moment } from 'moment';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: {
    class: 'page-component',
  },
})
export class DashboardComponent {

  isLoading = false;
  totalAvailable = 0;
  totalOccupied = 0;
  totalUnavailable = 0;

  totalRecords = 0;
  totalPending = 0;
  totalForLeased = 0;

  totalClient = 0;
  totalAdmin = 0;
  totalStaff = 0;
  error;

  constructor(private snackBar: MatSnackBar, private dashboardService: DashboardService) {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.initDashboardUsers();
    this.initChart();
  }

  initDashboardUsers() {
    try {
      forkJoin([this.dashboardService
        .getLot(),this.dashboardService
        .getBurialAndReservationRecords(),this.dashboardService
        .getUsers()]).subscribe(res=> {

          const [lot, records, users] = res;

          console.log("lot ", lot);
          console.log("records ", records);
          console.log("users ", users);
          this.isLoading = false;

          this.totalAvailable = lot.data.totalAvailable;
          this.totalOccupied = lot.data.totalOccupied;
          this.totalUnavailable = lot.data.totalUnavailable;

          this.totalRecords = records.data.totalRecords;
          this.totalPending = records.data.totalPending;
          this.totalForLeased = records.data.totalForLeased;

          this.totalClient = users.data.totalClient;
          this.totalAdmin = users.data.totalAdmin;
          this.totalStaff = users.data.totalStaff;
        }, (error)=> {
          this.isLoading = false;
          this.error = Array.isArray(error?.error?.message) ? error?.error?.message[0] : error?.error?.message;
          this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
        });
    } catch(ex) {
      this.isLoading = false;
      this.error = Array.isArray(ex?.message) ? ex?.message[0] : ex?.message;
      this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
    }
  }

  initChart() {
    try {
      this.dashboardService
      .getLotTrackerByBlock().subscribe(res=> {


        var options = {
          series: [res.data.a, res.data.b, res.data.c, res.data.d, res.data.e],
          chart: {
            width: 380,
            type: 'polarArea',
          },
          labels: ['Block A', 'Block B', 'Block C', 'Block D', 'Block E'],
          fill: {
            opacity: 1,
          },
          stroke: {
            width: 1,
            colors: undefined,
          },
          yaxis: {
            show: false,
          },
          legend: {
            position: 'bottom',
          },
          plotOptions: {
            polarArea: {
              rings: {
                strokeWidth: 0,
              },
              spokes: {
                strokeWidth: 0,
              },
            },
          },
          theme: {
          },
        };

        var chart = new ApexCharts(document.querySelector("#chart-records"), options);
        chart.render();


      });
    }catch(ex) {

    }
  }
}
