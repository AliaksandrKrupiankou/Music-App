import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  Renderer2,
  signal,
} from '@angular/core';

@Directive({
  selector: '[appTwitterHover]',
  standalone: true,
})
export class TwitterHoverDirective {
  elRef = inject(ElementRef);
  render2 = inject(Renderer2);

  url = input<string | null>();

  icon: HTMLElement | null = null;
  hover = signal<boolean>(false);


  showIcon() {
    const link = this.url();
    if (!link) return;

    const a = this.render2.createElement('a');

    this.render2.setAttribute(a, 'href', link);
    this.render2.setAttribute(a, 'target', '_blank');
    this.render2.addClass(a, 'twitter-icon');

    this.render2.setProperty(
      a,
      'innerHTML',
      `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter-icon lucide-twitter">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
      </svg>`
    );

    this.render2.appendChild(this.elRef.nativeElement, a);

    this.icon = a;
  }

  hideIcon() {
    if (this.icon) {
      this.render2.removeChild(this.elRef.nativeElement, this.icon);
      this.icon = null; 
    }
  }

  @HostListener('mouseenter')
  onEnter() {
    if(this.icon) return;
    this.hover.set(true);
    this.showIcon();
  }

  @HostListener('mouseleave')
  onLeave() {
    this.hideIcon();
    this.hover.set(false);
  }
}
