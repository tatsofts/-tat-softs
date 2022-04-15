import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import {
  addDoc,
  collectionData,
  docData,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { collection, deleteDoc, doc } from '@firebase/firestore';
import {
  AlertController,
  IonRouterOutlet,
  LoadingController,
} from '@ionic/angular';
import { Observable } from 'rxjs';

export interface IFormInputs {
  disabled?: boolean;
  enterkeyhint?:
    | 'done'
    | 'enter'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send'
    | undefined;
  max?: any | undefined;
  min?: any | undefined;
  name: string | undefined;
  pattern?: string | undefined;
  placeholder: string | undefined;
  required?: boolean;
  type:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
  value?: any;
}

@Component({
  selector: 'tat-firestore-list',
  templateUrl: './firestore-list.component.html',
  styleUrls: ['./firestore-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirestoreListComponent implements OnInit {
  @Input() listItemTemplate: TemplateRef<any>;
  @Input() tableName = 'notes';
  @Input() title = 'Note';
  @Input() titlePlural = 'Notes';
  @Output() itemClick: EventEmitter<any> = new EventEmitter();
  addNewModal = false;
  editModal = false;
  editData: any;
  collectionRef;
  inputs: IFormInputs[] = [
    {
      name: 'name',
      value: 'test',
      type: 'text',
      required: true,
      placeholder: 'Product Name',
    },
    {
      name: 'price',
      value: 1000,
      type: 'number',
      required: true,
      placeholder: 'Product Price',
    },
  ];
  listData$: Observable<any>;
  constructor(
    public routerOutlet: IonRouterOutlet,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public firestore: Firestore
  ) {
    this.collectionRef = collection(this.firestore, this.tableName);
    this.listData$ = collectionData(this.collectionRef, { idField: 'id' });
  }

  ngOnInit() {}

  getKeys(item: any): string[] {
    return Object.keys(item).sort();
  }

  async presentDeleteConfirm(item: any) {
    const alert = await this.alertController.create({
      header: 'Delete Confirm',
      message: `Are you sure! Do you want to delete ${this.title}?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          id: 'confirm-button',
          handler: async () => {
            const noteDocRef = doc(
              this.firestore,
              `${this.tableName}/${item.id}`
            );
            const loading = await this.loadingController.create({
              message: 'Please wait...',
            });
            try {
              await deleteDoc(noteDocRef);
              loading.dismiss();
            } catch (error) {
              console.log(error);
              loading.dismiss();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async addItem(form: NgForm) {
    const notesRef = collection(this.firestore, this.tableName);
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    try {
      await addDoc(notesRef, form.value);
      form.resetForm({});
      this.addNewModal = false;
      loading.dismiss();
    } catch (error) {
      console.log(error);
      loading.dismiss();
    }
  }

  async updateItem(form: NgForm) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    const noteDocRef = doc(
      this.firestore,
      `${this.tableName}/${this.editData.id}`
    );
    try {
      await updateDoc(noteDocRef, { ...form.value });
      form.resetForm({});
      this.editModal = false;
      loading.dismiss();
    } catch (error) {
      console.log(error);
      loading.dismiss();
    }
  }
}
