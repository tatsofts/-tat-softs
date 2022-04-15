import { JsonFormComponent } from './json-form/json-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FirestoreListComponent } from './firestore-list.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [FirestoreListComponent, JsonFormComponent],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FirestoreListComponent, JsonFormComponent],
})
export class FirestoreListModule {}
