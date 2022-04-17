import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorsPageRoutingModule } from './doctors-routing.module';

import { DoctorsPage } from './doctors.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DoctorsPageRoutingModule,
  ],
  declarations: [DoctorsPage],
})
export class DoctorsPageModule {}
