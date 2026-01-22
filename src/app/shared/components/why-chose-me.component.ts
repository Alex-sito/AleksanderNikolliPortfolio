
// src/app/shared/components/why-chose-me.component.ts
import {
  Component,
  AfterViewInit,
  ElementRef,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-why-chose-me',
  templateUrl: './why-chose-me.component.html',
  styleUrls: ['./why-chose-me.component.scss']
})
export class WhyChoseMeComponent implements AfterViewInit {

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {

    // 🚫 SSR: niente animazioni lato server
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const host: HTMLElement = this.el.nativeElement;
    const card = host.querySelector('.why-choose-me-card') as HTMLElement;
    const title = host.querySelector('.typing-title') as HTMLElement;

    if (!card || !title) return;

    // stato iniziale
    title.classList.remove('start-typing', 'typing-done');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        /* 🔥 FADE-UP */
        card.classList.add('animate');

        /* 🔥 TYPING */
        setTimeout(() => {
          title.classList.add('start-typing');
        }, 150);

        title.addEventListener(
          'animationend',
          (event: AnimationEvent) => {
            if (event.animationName === 'typing') {
              title.classList.add('typing-done');
            }
          },
          { once: true }
        );

        observer.disconnect(); // 🎯 una sola volta
      },
      {
        threshold: 0.35, // 35% visibile → perfetto UX
        rootMargin: '0px 0px -80px 0px'
      }
    );

    observer.observe(card);
  }
}

