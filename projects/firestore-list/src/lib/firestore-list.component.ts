import { JsonFormData } from './json-form/json-form.component';
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
  ToastController,
} from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'tat-firestore-list',
  templateUrl: './firestore-list.component.html',
  styleUrls: ['./firestore-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirestoreListComponent<T> implements OnInit {
  @Input() listItemTemplate: TemplateRef<any>;
  @Input() tableName = 'notes';
  @Input() title = 'Note';
  @Input() titlePlural = 'Notes';
  @Input() jsonFormData: JsonFormData;
  @Input() deleteCallback: (item: T, firestore: Firestore) => Promise<boolean>;
  @Output() itemClick: EventEmitter<any> = new EventEmitter();
  addNewModal = false;
  editModal = false;
  editData: any;
  collectionRef;
  @Input() listData$: Observable<T[]>;
  constructor(
    public routerOutlet: IonRouterOutlet,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public firestore: Firestore
  ) {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

  ngOnInit() {
    this.collectionRef = collection(this.firestore, this.tableName);
    this.listData$ = collectionData<T>(this.collectionRef, { idField: 'id' });
  }

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
            loading.present();
            try {
              const canDelete = await this.deleteCallback(item, this.firestore);
              if (canDelete) {
                await deleteDoc(noteDocRef);
                this.presentToast(`${this.title} is deleted successfully`);
              }
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
      this.presentToast(`New ${this.title} is added successfully`);
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
      this.presentToast(`${this.title} is updated successfully`);
      loading.dismiss();
    } catch (error) {
      console.log(error);
      loading.dismiss();
    }
  }
}
