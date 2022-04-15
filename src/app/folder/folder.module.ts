import { FirestoreListModule } from './../../../projects/firestore-list/src/lib/firestore-list.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    FirestoreListModule,
  ],
  declarations: [FolderPage],
})
export class FolderPageModule {}
