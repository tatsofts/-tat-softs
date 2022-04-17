import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  modulesList = [
    {
      name: 'DOCTORS',
      icon: './assets/icon/doctor.png',
      route: '../doctors',
    },
    {
      name: 'PATIENTS',
      icon: './assets/icon/patient.png',
      route: '../patients',
    },
    {
      name: 'APOINTMENTS',
      icon: './assets/icon/calender.png',
      route: '../appointments',
    },
    {
      name: 'DEPARTMENTS',
      icon: './assets/icon/departments.png',
      route: '../departments',
    },
  ];

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    console.log('-------------------Dashbaord');
    window.history.pushState(null, 'Dashboard');
  }
}
