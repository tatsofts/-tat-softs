import { Firestore } from '@angular/fire/firestore';
import { JsonFormData } from 'projects/firestore-list/src/lib/json-form/json-form.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.page.html',
  styleUrls: ['./doctors.page.scss'],
})
export class DoctorsPage implements OnInit {
  profileImage = '';
  doctorsForm: JsonFormData = {
    controls: [
      {
        name: 'name',
        label: 'Doctor Name',
        value: '',
        placeholder: 'Enter Doctor Name',
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
        label: 'Doctor Email',
        value: '',
        placeholder: 'Enter Doctor Email',
        position: 'floating',
        type: 'email',
        validators: { required: true, email: true },
      },
      {
        name: 'phone',
        label: 'Doctor Phone Number',
        value: '',
        placeholder: 'Enter Doctor Phone Number',
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
          dataProvider: {
            data: [
              { id: 'vizag', label: 'Vizag' },
              { id: 'vijayawada', label: 'Vijayawada' },
              { id: 'tirupati', label: 'Tirupati' },
            ],
            labelField: 'label',
            idField: 'id',
          },
        },
        validators: { required: true },
      },
      {
        name: 'photo',
        label: 'Capture or Upload Doctor Photo',
        value: '',
        placeholder: 'Capture or Upload Doctor Photo',
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
}
