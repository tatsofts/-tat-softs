import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[tatIonSelectFilter]',
})
export class IonSelectFilterDirective {
  searchInput: HTMLElement;
  @Input() selectFilter = false;
  @Output() tatIonSelectFilter: EventEmitter<string> = new EventEmitter();

  constructor(public el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.addEventListener('ionChange', (event: any) => {
      //@ts-ignore
      this.searchInput.value = '';
      this.tatIonSelectFilter.emit('');
    });
    this.el.nativeElement.addEventListener('ionCancel', (event: any) => {
      //@ts-ignore
      this.searchInput.value = '';
      this.tatIonSelectFilter.emit('');
    });
    if (this.selectFilter) {
      this.searchInput = document.createElement('ion-searchbar');
      this.searchInput.addEventListener('ionChange', (event: any) => {
        this.tatIonSelectFilter.emit(event.detail.value);
      });
    }
  }

  @HostListener('click') onMouseEnter() {
    if (this.selectFilter) {
      setTimeout(() => {
        const alertHeadeDiv: HTMLDivElement =
          document.querySelector('.alert-head');
        alertHeadeDiv.style.paddingLeft = '10px';
        alertHeadeDiv.style.paddingRight = '10px';
        alertHeadeDiv.appendChild(this.searchInput);
        setTimeout(() => {
          const alertWrapperDiv: HTMLDivElement =
            document.querySelector('.alert-wrapper');
          alertWrapperDiv.style.minHeight = `${alertWrapperDiv.clientHeight}px`;
        }, 50);
      }, 50);
    }
  }
}
