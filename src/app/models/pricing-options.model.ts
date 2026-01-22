
// src/app/pages/pricing/models/pricing-options.model.ts
export interface PricingOptionInfo {
  title: string;
  description: string;
  notes?: string[];
}

export const PRICING_INFO: Record<string, PricingOptionInfo> = {

  pages: {
    title: 'Numero di pagine',
    description:
      'Definisce la dimensione e la complessità del sito.',
    notes: [
      '1-3 pagine: landing page',
      '4-6 pagine: sito aziendale',
      '7-10 pagine: struttura completa',
      'Oltre 10: costo aggiuntivo per pagina'
    ]
  },

  design: {
    title: 'Design & Personalizzazione',
    description:
      'Livello di personalizzazione grafica e di esperienza utente.',
    notes: [
      'Base: layout standard e pulito',
      'Custom: studio colori e brand',
      'Avanzato: UI/UX, animazioni e micro-interazioni'
    ]
  },

  seo: {
    title: 'SEO',
    description:
      'Ottimizzazione per i motori di ricerca (fondamentale).',
    notes: [
      'SEO base: meta tag e performance',
      'SEO avanzata: struttura e contenuti ottimizzati'
    ]
  },

  ecommerce: {
    title: 'E-commerce',
    description:
      'Vendita online con gestione prodotti, ordini e pagamenti.',
    notes: [
      'Piccolo: fino a 10 prodotti',
      'Medio: 10-50 prodotti',
      'Avanzato: cataloghi complessi'
    ]
  },

  languages: {
    title: 'Multilingua',
    description:
      'Permette di offrire il sito in più lingue.',
    notes: [
      '2 lingue: configurazione base',
      'Ogni lingua extra ha un costo aggiuntivo'
    ]
  },

  cms: {
    title: 'CMS / Area Admin',
    description:
      'Gestione autonoma di contenuti come blog o portfolio.',
    notes: [
      'CMS base: gestione contenuti',
      'CMS avanzato: strutture complesse'
    ]
  },

  maintenance: {
    title: 'Manutenzione',
    description:
      'Aggiornamenti tecnici e supporto nel tempo.',
    notes: [
      'Mensile o annuale',
      'Include sicurezza e aggiornamenti'
    ]
  },

  hosting: {
    title: 'Hosting & Dominio',
    description:
      'Gestione tecnica dell’infrastruttura.',
    notes: [
      'Base: hosting e dominio',
      'Completa: backup, SSL, DNS'
    ]
  },

  performance: {
    title: 'Performance',
    description:
      'Ottimizzazione velocità e Core Web Vitals.',
    notes: [
      'Ottimizzata: miglioramenti Lighthouse',
      'Avanzata: punteggi 90+'
    ]
  },

  security: {
    title: 'Sicurezza',
    description:
      'Protezione del sito e dei dati.',
    notes: [
      'Base: sicurezza standard',
      'Avanzata: hardening e backup'
    ]
  },

  gdpr: {
    title: 'GDPR / Privacy',
    description:
      'Adeguamento alle normative europee.',
    notes: [
      'Banner cookie e privacy policy',
      'Non è consulenza legale'
    ]
  },

  marketing: {
    title: 'Marketing & Social',
    description:
      'Integrazione e supporto marketing.',
    notes: [
      'Social base',
      'Strategia marketing avanzata'
    ]
  },

  content: {
    title: 'Contenuti',
    description:
      'Testi e contenuti del sito.',
    notes: [
      'Testi base',
      'Copywriting SEO professionale'
    ]
  },

  media: {
    title: 'Fotografia & Media',
    description:
      'Immagini professionali per il sito.',
    notes: [
      'Stock professionale',
      'Shooting fotografico'
    ]
  },

  automations: {
    title: 'Form & Automazioni',
    description:
      'Automazioni per lead e contatti.',
    notes: [
      'Form avanzati',
      'Integrazione CRM e email'
    ]
  }

};

