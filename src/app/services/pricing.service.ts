
// src/app/services/pricing.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

/* =========================
   REQUEST
========================= */
export interface PricingRequest {
  pages: number;
  designLevel: 'base' | 'custom' | 'advanced';
  seo: 'none' | 'basic' | 'advanced';
  ecommerce: 'none' | 'small' | 'medium' | 'advanced';
  languages: number;
  cms: 'none' | 'basic' | 'advanced';
  maintenance: 'none' | 'monthly' | 'yearly';
  hosting: 'client' | 'basic' | 'full';
  performance: 'standard' | 'optimized' | 'advanced';
  security: 'base' | 'advanced';
  gdpr: 'client' | 'basic' | 'complete';
  marketing: 'none' | 'basic' | 'advanced';
  content: 'client' | 'basic' | 'seo';
  media: 'client' | 'stock' | 'shooting';
  automations: 'none' | 'forms' | 'advanced';
}

/* =========================
   RESPONSE
========================= */
export interface PricingResponse {
  total: number;
  discountedTotal: number;
  discountRate: number;
  validUntil: string; // ISO string
  breakdown: PricingBreakdown;
  whatsappLink: string;
}

export type PricingBreakdown = {
  pages: number;
  design: number;
  seo: number;
  ecommerce: number;
  cms: number;
  maintenance: number;
  hosting: number;
  performance: number;
  security: number;
  gdpr: number;
  marketing: number;
  content: number;
  media: number;
  automations: number;
  languages: number;
};

export type PricingKey = keyof PricingBreakdown;

@Injectable({
  providedIn: 'root'
})
export class PricingService {
  private apiUrl = `${environment.apiUrl}/pricing`;

  constructor(private http: HttpClient) {}

  calculate(payload: PricingRequest): Observable<PricingResponse> {
    return this.http.post<PricingResponse>(this.apiUrl, payload);
  }
}

