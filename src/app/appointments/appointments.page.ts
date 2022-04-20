import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit {
  constructor() {}

  ngOnInit() {}
  tatIonSelectFilter(searchText: string): void {
    console.log('searchText', searchText);
  }
}
