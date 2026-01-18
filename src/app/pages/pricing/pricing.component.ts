
// pricing.component.ts

import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import {
  PricingService,
  PricingRequest,
  PricingResponse,
  PricingKey
} from '../../services/pricing.service';
import { PRICING_INFO } from '../../models/pricing-options.model';


@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnDestroy {

  form!: FormGroup;
  loading = false;

  result: PricingResponse | null = null;
  previewTotal: number | null = null;

  countdownText = '';
  private countdownInterval?: number;

  pricingInfo = PRICING_INFO;
  
  openedInfo: string | null = null;


  optionKeys: PricingKey[] = [
    'pages',
    'design',
    'seo',
    'ecommerce',
    'languages',
    'cms',
    'maintenance',
    'hosting',
    'performance',
    'security',
    'gdpr',
    'marketing',
    'content',
    'media',
    'automations'
  ];

  // Opzioni per select
  selectOptions: Record<string, { value: string; label: string }[]> = {
    design: [
      { value: 'base', label: 'Base' },
      { value: 'custom', label: 'Personalizzato' },
      { value: 'advanced', label: 'Avanzato' }
    ],
    seo: [
      { value: 'none', label: 'Nessuna' },
      { value: 'basic', label: 'Base' },
      { value: 'advanced', label: 'Avanzata' }
    ],
    ecommerce: [
      { value: 'none', label: 'Nessuno' },
      { value: 'small', label: 'Piccolo' },
      { value: 'medium', label: 'Medio' },
      { value: 'advanced', label: 'Avanzato' }
    ],
    cms: [
      { value: 'none', label: 'Nessuno' },
      { value: 'basic', label: 'Base' },
      { value: 'advanced', label: 'Avanzato' }
    ],
    maintenance: [
      { value: 'none', label: 'Nessuna' },
      { value: 'monthly', label: 'Mensile' },
      { value: 'yearly', label: 'Annuale' }
    ],
    hosting: [
      { value: 'client', label: 'Cliente' },
      { value: 'basic', label: 'Base' },
      { value: 'full', label: 'Completo' }
    ],
    performance: [
      { value: 'standard', label: 'Standard' },
      { value: 'optimized', label: 'Ottimizzata' },
      { value: 'advanced', label: 'Avanzata' }
    ],
    security: [
      { value: 'base', label: 'Base' },
      { value: 'advanced', label: 'Avanzata' }
    ],
    gdpr: [
      { value: 'client', label: 'Gestione cliente' },
      { value: 'basic', label: 'Base' },
      { value: 'complete', label: 'Completa' }
    ],
    marketing: [
      { value: 'none', label: 'Nessuno' },
      { value: 'basic', label: 'Base' },
      { value: 'advanced', label: 'Avanzato' }
    ],
    content: [
      { value: 'client', label: 'Forniti dal cliente' },
      { value: 'basic', label: 'Base' },
      { value: 'seo', label: 'Ottimizzati SEO' }
    ],
    media: [
      { value: 'client', label: 'Forniti dal cliente' },
      { value: 'stock', label: 'Stock' },
      { value: 'shooting', label: 'Shooting fotografico' }
    ],
    automations: [
      { value: 'none', label: 'Nessuna' },
      { value: 'forms', label: 'Form avanzati' },
      { value: 'advanced', label: 'Automazioni avanzate' }
    ]
  };

  constructor(
    private fb: FormBuilder,
    private pricingService: PricingService
  ) {
    this.buildForm();

    // 🔥 PREVIEW PREZZO LIVE
    this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        if (this.form.valid) {
          this.pricingService
            .calculate(value as PricingRequest)
            .subscribe(res => {
              this.previewTotal = res.discountedTotal;
            });
        }
      });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      pages: [3, [Validators.required, Validators.min(1)]],
      designLevel: ['base', Validators.required],
      seo: ['none', Validators.required],
      ecommerce: ['none', Validators.required],
      languages: [1, [Validators.required, Validators.min(1)]],
      cms: ['none', Validators.required],
      maintenance: ['none', Validators.required],
      hosting: ['client', Validators.required],
      performance: ['standard', Validators.required],
      security: ['base', Validators.required],
      gdpr: ['client', Validators.required],
      marketing: ['none', Validators.required],
      content: ['client', Validators.required],
      media: ['client', Validators.required],
      automations: ['none', Validators.required]
    });
  }

  toggleInfo(key: string): void {
    this.openedInfo = this.openedInfo === key ? null : key;
  }

  calculate(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.result = null;

    const payload = this.form.value as PricingRequest;

    this.pricingService.calculate(payload).subscribe({
      next: (res: PricingResponse) => {
        this.result = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  openWhatsapp(): void {
    if (this.result) {
      window.open(this.result.whatsappLink, '_blank');
    }
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}

