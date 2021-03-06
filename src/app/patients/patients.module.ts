import { FirestoreListModule } from 'projects/firestore-list/src/public-api';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientsPageRoutingModule } from './patients-routing.module';

import { PatientsPage } from './patients.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FirestoreListModule,
    PatientsPageRoutingModule,
  ],
  declarations: [PatientsPage],
})
export class PatientsPageModule {}
