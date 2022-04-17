import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { JsonFormData } from 'projects/firestore-list/src/lib/json-form/json-form.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.page.html',
  styleUrls: ['./departments.page.scss'],
})
export class DepartmentsPage implements OnInit {
  departmentForm: JsonFormData = {
    controls: [
      {
        name: 'name',
        label: 'Department Name',
        value: '',
        placeholder: 'Enter Department Name',
        position: 'floating',
        type: 'text',
        validators: { required: true, minlength: 2 },
      },
      {
        name: 'description',
        label: 'Department Description',
        value: '',
        placeholder: 'Enter Department Description',
        position: 'floating',
        type: 'textarea',
        validators: { required: true },
      },
    ],
  };

  constructor() {}
  async deleteCallback(data: any, firestore: Firestore): Promise<boolean> {
    return new Promise<boolean>((resolve) => setTimeout(resolve, 1000, false));
  }

  ngOnInit() {}
}
