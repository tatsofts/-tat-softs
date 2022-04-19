import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'tat-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WebcamComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: WebcamComponent,
    },
  ],
})
export class WebcamComponent implements ControlValueAccessor, Validator {
  onChange: (value) => {};
  OnValidatorChange: () => void;
  onTouched: () => {};
  isOpen = false;
  isFileOpen = false;
  disabled = false;
  value = '';
  fileValue = '';
  cameraLoading = false;
  mute = false;
  shutterClick = false;
  public allowCameraSwitch = false;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    width: { min: 350, ideal: 350 },
    height: { min: 350, ideal: 350 },
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();
  @Input() required = false;
  @Input() label = '';

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public viewDidEnter(): void {
    const muteCamera = localStorage.getItem('mute-camera');
    this.mute = muteCamera === 'on';
    this.showCamera();
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );
  }

  async triggerSnapshot(clickAudio: HTMLAudioElement) {
    this.shutterClick = true;
    if (!this.mute) {
      await clickAudio.play();
    }
    this.trigger.next();
    setTimeout(() => {
      this.shutterClick = false;
    }, 900);
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.cameraLoading = true;
    this.nextWebcam.next(directionOrDeviceId);
  }

  saveImage() {
    if (this.isOpen) {
      if (this.webcamImage && this.webcamImage.imageAsDataUrl) {
        this.value = this.webcamImage.imageAsDataUrl;
      } else {
        this.value = null;
      }
    }
    if (this.isFileOpen) {
      if (this.fileValue.length > 0) {
        this.value = this.fileValue;
      } else {
        this.value = null;
      }
    }
    if (this.onChange) {
      this.onChange(this.value);
    }
    if (this.OnValidatorChange) {
      this.OnValidatorChange();
    }
    this.webcamImage = null;
    this.fileValue = '';
    this.isOpen = false;
    this.isFileOpen = false;
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
    this.cameraLoading = false;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  showCamera() {
    this.cameraLoading = true;
    this.webcamImage = null;
  }

  writeValue(val: string): void {
    if (this.value != val) {
      this.value = val;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  validate(control: AbstractControl): ValidationErrors {
    if (!control.value && this.required) {
      return {
        required: true,
      };
    }
    return null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.OnValidatorChange = fn;
  }
  toggleAudio() {
    this.mute = !this.mute;
    localStorage.setItem('mute-camera', this.mute ? 'on' : 'off');
  }

  calculateSize(img, maxWidth, maxHeight) {
    let width = img.width;
    let height = img.height;

    // calculate the width and height, constraining the proportions
    if (width > height) {
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }
    }
    return [width, height];
  }

  fileChange(event) {
    /* let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        //@ts-ignore
        img.src = e.target.result;
        img.height = 350;
        img.setAttribute('style', 'width:auto;');
      };
      reader.readAsDataURL(file);
    } */
    const MAX_WIDTH = 350;
    const MAX_HEIGHT = 350;
    const MIME_TYPE = 'image/jpeg';
    const QUALITY = 0.1;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      const blobURL = window.URL.createObjectURL(file);
      const img = new Image();
      img.src = blobURL;
      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        // Handle the failure properly
        console.log('Cannot load image');
      };
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        const [newWidth, newHeight] = this.calculateSize(
          img,
          MAX_WIDTH,
          MAX_HEIGHT
        );
        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        canvas.toBlob(
          (blob) => {
            // Handle the compressed image. es. upload or save in local state
            /* displayInfo('Original file', file);
            displayInfo('Compressed file', blob); */
          },
          MIME_TYPE,
          QUALITY
        );
        this.fileValue = canvas.toDataURL();
        this.changeDetectorRef.markForCheck();
      };
    }
  }
}
