import { JsonFormData } from './../../../projects/firestore-list/src/lib/json-form/json-form.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  useForm: JsonFormData = {
    controls: [
      {
        name: 'name',
        label: 'User Name',
        value: '',
        placeholder: 'Enter User Name',
        position: 'floating',
        type: 'text',
        validators: { required: true, minlength: 10 },
      },
      {
        name: 'price',
        label: 'Provide Price',
        value: '',
        placeholder: 'Provide Price',
        position: 'floating',
        type: 'number',
        validators: { required: true },
      },
    ],
  };

  jsonFormData: JsonFormData = {
    controls: [
      {
        name: 'countries',
        label: 'Select Countries',
        value: '',
        placeholder: 'Select Countries',
        position: 'floating',
        type: 'select',
        validators: {
          required: true,
          minlength: 2,
          maxlength: 3,
        },
        options: {
          multiple: true,
          dataProvider: {
            data: [
              { label: 'India', id: '01' },
              { label: 'Chaina', id: '02' },
              { label: 'Russia', id: '03' },
              { label: 'USA', id: '04' },
            ],
            labelField: 'label',
            idField: 'id',
          },
        },
      },
      {
        name: 'range',
        label: 'Range Input',
        value: 15,
        placeholder: 'Select Range',
        position: 'stacked',
        type: 'range',
        validators: {
          required: true,
          min: 10,
          max: 20,
        },
        options: {
          icon: 'sunny',
          min: '10',
          max: '20',
        },
      },
      {
        name: 'date',
        label: 'date Input',
        value: '',
        placeholder: 'Provide date',
        position: 'floating',
        type: 'date',
        validators: {
          required: true,
          min: '2022-04-10',
          max: '2022-04-20',
        },
      },
      {
        name: 'toggle',
        label: 'Toggle Input',
        value: '',
        placeholder: '',
        position: 'fixed',
        type: 'toggle',
        validators: {
          required: true,
          min: '2022-04-10',
          max: '2022-04-20',
        },
      },
      {
        name: 'datetime-local',
        label: 'datetime-local Input',
        value: '',
        placeholder: 'Provide datetime-local',
        position: 'floating',
        type: 'datetime-local',
        validators: { required: true, minlength: 10 },
      },
      {
        name: 'email',
        label: 'email Input',
        value: '',
        placeholder: 'Provide email',
        position: 'floating',
        type: 'email',
        validators: { required: true, email: true },
      },
      {
        name: 'month',
        label: 'month Input',
        value: '',
        placeholder: 'Provide month',
        position: 'floating',
        type: 'month',
        validators: { required: true, minlength: 10 },
      },
      {
        name: 'number',
        label: 'number Input',
        value: '',
        placeholder: 'Provide number',
        position: 'floating',
        type: 'number',
        validators: { required: true, minlength: 10 },
      },
      {
        name: 'password',
        label: 'password Input',
        value: '',
        placeholder: 'Provide password',
        position: 'floating',
        type: 'password',
        validators: { required: true, minlength: 10 },
      },
      {
        name: 'search',
        label: 'search Input',
        value: '',
        placeholder: 'Provide search',
        position: 'floating',
        type: 'search',
        validators: { required: true, minlength: 10 },
      },
      {
        name: 'tel',
        label: 'tel Input',
        value: '',
        placeholder: 'Provide tel',
        position: 'floating',
        type: 'tel',
        validators: { required: true, minlength: 10 },
      },
      {
        name: 'text',
        label: 'text Input',
        value: '',
        placeholder: 'Provide text',
        position: 'floating',
        type: 'text',
        validators: { required: true, minlength: 10 },
      },
      {
        name: 'time',
        label: 'time Input',
        value: '',
        placeholder: 'Provide time',
        position: 'floating',
        type: 'time',
        validators: { required: true, minlength: 10 },
      },
      {
        name: 'url',
        label: 'url Input',
        value: '',
        placeholder: 'Provide url',
        position: 'floating',
        type: 'url',
        validators: { required: true, minlength: 10 },
      },
      {
        name: 'week',
        label: 'week Input',
        value: '',
        placeholder: 'Provide week',
        position: 'floating',
        type: 'week',
        validators: { required: true, minlength: 10 },
      },
    ],
  };

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
}
