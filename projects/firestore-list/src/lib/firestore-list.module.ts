import { WebcamComponent } from './webcam/webcam.component';
import { JsonFormComponent } from './json-form/json-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FirestoreListComponent } from './firestore-list.component';
import { NgModule } from '@angular/core';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  declarations: [FirestoreListComponent, JsonFormComponent, WebcamComponent],
  imports: [
    WebcamModule,
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [FirestoreListComponent, JsonFormComponent, WebcamComponent],
})
export class FirestoreListModule {}
