import { NgForm } from '@angular/forms';
import { Component, Input, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { TextFieldTypes } from '@ionic/core';

interface JsonFormValidators {
  min?: number | string;
  max?: number | string;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minlength?: number;
  maxlength?: number;
  pattern?: string;
  nullValidator?: boolean;
}
interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
  multiple?: boolean;
  dataProvider?: {
    data: any[];
    labelField: string;
    idField: string;
  };
}
interface JsonFormControls {
  name: string;
  label: string;
  placeholder?: string;
  value: string | number;
  type: TextFieldTypes | 'textarea' | 'select' | 'range' | 'toggle' | 'camera';
  position: 'floating' | 'fixed' | 'stacked';
  options?: JsonFormControlOptions;
  required?: boolean;
  validators: JsonFormValidators;
}
export interface JsonFormData {
  controls: JsonFormControls[];
}

@Component({
  selector: 'tat-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.scss'],
})
export class JsonFormComponent {
  @Input() jsonFormData: JsonFormData;
  @Input() defaultValues: any = {};
  @ViewChild('jsonForm') jsonForm: NgForm;

  get FORM(): NgForm {
    return this.jsonForm;
  }

  constructor() {
    /* const x: IonInput;
    x.accept */
  }

  onSubmit() {
    console.log(this.jsonForm.valid);
    console.log(this.jsonForm.value);
  }
}
