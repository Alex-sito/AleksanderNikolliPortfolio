
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

  // 🔹 Testi runtime i18n
  calculateLabel = $localize`:@@pricingCalculate:Calcola preventivo`;
  calculatingLabel = $localize`:@@pricingCalculating:Calcolo in corso…`;
  detailsLabel = $localize`:@@pricingDetails:Dettagli`;
  estimateLabel = $localize`:@@pricingEstimate:Stima attuale:`;
  discountedTotalLabel = $localize`:@@pricingDiscountedTotal:Totale scontato:`;
  originalPriceLabel = $localize`:@@pricingOriginalPrice:Prezzo originale:`;
  summaryLabel = $localize`:@@pricingSummary:Riepilogo del preventivo`;
  whatsappLabel = $localize`:@@pricingWhatsapp:Richiedi ora su WhatsApp`;
  validUntilLabel = $localize`:@@pricingValidUntil:Valido fino al`;

  // ✅ Opzioni select localizzate
  selectOptions: Record<string, { value: string; label: string }[]> = {
    design: [
      { value: 'base', label: $localize`:@@pricingDesignBase:Base` },
      { value: 'custom', label: $localize`:@@pricingDesignCustom:Personalizzato` },
      { value: 'advanced', label: $localize`:@@pricingDesignAdvanced:Avanzato` }
    ],
    seo: [
      { value: 'none', label: $localize`:@@pricingSeoNone:Nessuna` },
      { value: 'basic', label: $localize`:@@pricingSeoBasic:Base` },
      { value: 'advanced', label: $localize`:@@pricingSeoAdvanced:Avanzata` }
    ],
    ecommerce: [
      { value: 'none', label: $localize`:@@pricingEcoNone:Nessuno` },
      { value: 'small', label: $localize`:@@pricingEcoSmall:Piccolo` },
      { value: 'medium', label: $localize`:@@pricingEcoMedium:Medio` },
      { value: 'advanced', label: $localize`:@@pricingEcoAdvanced:Avanzato` }
    ],
    cms: [
      { value: 'none', label: $localize`:@@pricingCmsNone:Nessuno` },
      { value: 'basic', label: $localize`:@@pricingCmsBasic:Base` },
      { value: 'advanced', label: $localize`:@@pricingCmsAdvanced:Avanzato` }
    ],
    maintenance: [
      { value: 'none', label: $localize`:@@pricingMaintNone:Nessuna` },
      { value: 'monthly', label: $localize`:@@pricingMaintMonthly:Mensile` },
      { value: 'yearly', label: $localize`:@@pricingMaintYearly:Annuale` }
    ],
    hosting: [
      { value: 'client', label: $localize`:@@pricingHostingClient:Cliente` },
      { value: 'basic', label: $localize`:@@pricingHostingBasic:Base` },
      { value: 'full', label: $localize`:@@pricingHostingFull:Completo` }
    ],
    performance: [
      { value: 'standard', label: $localize`:@@pricingPerfStandard:Standard` },
      { value: 'optimized', label: $localize`:@@pricingPerfOptimized:Ottimizzata` },
      { value: 'advanced', label: $localize`:@@pricingPerfAdvanced:Avanzata` }
    ],
    security: [
      { value: 'base', label: $localize`:@@pricingSecBase:Base` },
      { value: 'advanced', label: $localize`:@@pricingSecAdvanced:Avanzata` }
    ],
    gdpr: [
      { value: 'client', label: $localize`:@@pricingGdprClient:Gestione cliente` },
      { value: 'basic', label: $localize`:@@pricingGdprBasic:Base` },
      { value: 'complete', label: $localize`:@@pricingGdprComplete:Completa` }
    ],
    marketing: [
      { value: 'none', label: $localize`:@@pricingMarketingNone:Nessuno` },
      { value: 'basic', label: $localize`:@@pricingMarketingBasic:Base` },
      { value: 'advanced', label: $localize`:@@pricingMarketingAdvanced:Avanzato` }
    ],
    content: [
      { value: 'client', label: $localize`:@@pricingContentClient:Forniti dal cliente` },
      { value: 'basic', label: $localize`:@@pricingContentBasic:Base` },
      { value: 'seo', label: $localize`:@@pricingContentSeo:Ottimizzati SEO` }
    ],
    media: [
      { value: 'client', label: $localize`:@@pricingMediaClient:Forniti dal cliente` },
      { value: 'stock', label: $localize`:@@pricingMediaStock:Stock` },
      { value: 'shooting', label: $localize`:@@pricingMediaShooting:Shooting fotografico` }
    ],
    automations: [
      { value: 'none', label: $localize`:@@pricingAutoNone:Nessuna` },
      { value: 'forms', label: $localize`:@@pricingAutoForms:Form avanzati` },
      { value: 'advanced', label: $localize`:@@pricingAutoAdvanced:Automazioni avanzate` }
    ]
  };

  constructor(
    private fb: FormBuilder,
    private pricingService: PricingService
  ) {
    this.buildForm();

    this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        if (this.form.valid) {
          this.pricingService.calculate(value as PricingRequest)
            .subscribe(res => this.previewTotal = res.discountedTotal);
        }
      });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      pages: [3, [Validators.required, Validators.min(1)]],
      design: ['base', Validators.required],
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

    this.pricingService.calculate(this.form.value as PricingRequest)
      .subscribe({
        next: res => {
          this.result = res;
          this.loading = false;
        },
        error: () => this.loading = false
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

  trackByKey(_: number, key: PricingKey): PricingKey {
    return key;
  }

}

