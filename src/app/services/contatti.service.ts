
// src/app/services/contatti.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactPayload {
  nome: string;
  email: string;
  messaggio: string;
  cellulare?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private apiUrl = `${environment.apiUrl}/contacts`;

  constructor(private http: HttpClient) {}

  sendMessage(payload: ContactPayload): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }
}

