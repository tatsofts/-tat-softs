import { Firestore } from '@angular/fire/firestore';
import { JsonFormData } from 'projects/firestore-list/src/lib/json-form/json-form.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {
  profileImage = '';
  cities = [
    { id: 'vizag', label: 'Vizag' },
    { id: 'vijayawada', label: 'Vijayawada' },
    { id: 'tirupati', label: 'Tirupati' },
  ];
  patientsForm: JsonFormData = {
    controls: [
      {
        name: 'name',
        label: 'Patient Name',
        value: '',
        placeholder: 'Enter Patient Name',
        position: 'floating',
        type: 'text',
        validators: { required: true, minlength: 2 },
      },
      {
        name: 'gender',
        label: 'Gender',
        value: '',
        placeholder: 'Select Gender',
        position: 'floating',
        type: 'select',
        options: {
          dataProvider: {
            data: [
              { id: 'male', label: 'Male' },
              { id: 'female', label: 'Female' },
              { id: 'other', label: 'Other' },
            ],
            labelField: 'label',
            idField: 'id',
          },
        },
        validators: { required: true },
      },
      {
        name: 'email',
        label: 'Patient Email',
        value: '',
        placeholder: 'Enter Patient Email',
        position: 'floating',
        type: 'email',
        validators: { required: true, email: true },
      },
      {
        name: 'phone',
        label: 'Patient Phone Number',
        value: '',
        placeholder: 'Enter Patient Phone Number',
        position: 'floating',
        type: 'tel',
        validators: {
          required: true,
          pattern: '[6-9]{1}[0-9]{9}',
          minlength: 10,
          maxlength: 10,
        },
      },
      {
        name: 'address',
        label: 'Address Line',
        value: '',
        placeholder: 'H.No, Building, Street, Landmark...',
        position: 'floating',
        type: 'text',
        validators: { required: true, minlength: 2 },
      },
      {
        name: 'country',
        label: 'Country',
        value: 'india',
        placeholder: 'Select Country',
        position: 'floating',
        type: 'select',
        options: {
          dataProvider: {
            data: [
              { id: 'india', label: 'India' },
              { id: 'usa', label: 'USA' },
              { id: 'chaina', label: 'Chaina' },
            ],
            labelField: 'label',
            idField: 'id',
          },
        },
        validators: { required: true },
      },
      {
        name: 'state',
        label: 'State',
        value: 'ap',
        placeholder: 'Select State',
        position: 'floating',
        type: 'select',
        options: {
          dataProvider: {
            data: [
              { id: 'ap', label: 'Andhra Pradesh' },
              { id: 'tn', label: 'Tamil Nadu' },
              { id: 'mp', label: 'Madhya Pradesh' },
            ],
            labelField: 'label',
            idField: 'id',
          },
        },
        validators: { required: true },
      },
      {
        name: 'city',
        label: 'City',
        value: 'vizag',
        placeholder: 'Select City',
        position: 'floating',
        type: 'select',
        options: {
          selectFilter: true,
          tatIonSelectFilter: this.tatIonSelectFilter.bind(this),
          dataProvider: {
            data: this.cities,
            labelField: 'label',
            idField: 'id',
          },
        },
        validators: { required: true },
      },
      {
        name: 'photo',
        label: 'Capture or Upload Patient Photo',
        value: '',
        placeholder: 'Patient Photo',
        position: 'floating',
        type: 'camera',
        validators: { required: true },
      },
    ],
  };

  constructor() {}
  async deleteCallback(data: any, firestore: Firestore): Promise<boolean> {
    return new Promise<boolean>((resolve) => setTimeout(resolve, 1000, true));
  }

  ngOnInit() {}

  tatIonSelectFilter(searchText: string): void {
    this.patientsForm.controls[7].options.dataProvider.data =
      this.cities.filter((d) => {
        if (
          d.label
            .trim()
            .toLowerCase()
            .indexOf(searchText.trim().toLowerCase()) >= 0
        ) {
          return true;
        } else {
          return false;
        }
      });
  }
}
