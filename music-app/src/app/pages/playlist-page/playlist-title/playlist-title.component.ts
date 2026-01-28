import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-playlist-title',
  imports: [LucideAngularModule],
  templateUrl: './playlist-title.component.html',
  styleUrl: './playlist-title.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PlaylistTitleComponent),
      multi: true,
    },
  ],
})
export class PlaylistTitleComponent implements ControlValueAccessor {
  value = signal('');
  editing = signal(false);
  disabled = signal(false);
  el = inject(ElementRef);

  private onChange = (val: string) => {};
  private onTouched = () => {};

  inputRef = viewChild<ElementRef>('titleInput');

  writeValue(obj: any): void {
    this.value.set(obj || '');
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  enableEditing() {
    this.editing.set(true);

    setTimeout(() => {
      this.inputRef()?.nativeElement.focus(); /// УБРАТЬ ТАЙМАУТ
    });
  }

  onInput(event: Event) {
    const newVal = (event.target as HTMLInputElement).value;
    this.value.set(newVal);
    this.onChange(newVal);
  }

  finishEditing() {
    this.editing.set(false);
    this.onTouched();
    this.el.nativeElement.dispatchEvent(new FocusEvent('blur'));
  }
}
