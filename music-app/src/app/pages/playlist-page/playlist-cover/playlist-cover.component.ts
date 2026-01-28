import { ChangeDetectionStrategy, Component, computed, forwardRef, output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-playlist-cover',
  imports: [],
  templateUrl: './playlist-cover.component.html',
  styleUrl: './playlist-cover.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PlaylistCoverComponent),
      multi: true,
    },
  ],
})
export class PlaylistCoverComponent implements ControlValueAccessor {
  value = signal<File | null | string>(null);
  disabled = signal(false);
  onChanged = output<void>();

  private onChange = (file: File | null) => {};
  private onTouched = () => {};

  imageUrl = computed(() => {
    const val = this.value();
    if (!val) return;
    if (val instanceof File) {
      return URL.createObjectURL(val);
    }
    return val;
  });

  writeValue(val: File | null | string): void {
    this.value.set(val);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;

    if (file) {
      this.value.set(file);
      this.onChange(file);
    }

    this.onTouched();
    this.onChanged.emit();
  }

  triggerFileInput(input: HTMLInputElement) {
    if (!this.disabled()) input.click();
  }
}
