
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactsService } from '../../services/contatti.service';

@Component({
  selector: 'app-contatti',
  templateUrl: './contatti.component.html',
  styleUrls: ['./contatti.component.scss']
})
export class ContattiComponent {

  form: FormGroup;
  loading = false;
  success = false;
  error = '';

  // 🔹 Testi runtime i18n
  submitLabel = $localize`:@@contactSubmit:Invia messaggio`;
  loadingLabel = $localize`:@@contactSending:Invio...`;
  genericError = $localize`:@@contactError:Errore durante l’invio del messaggio`;

  constructor(
    private fb: FormBuilder,
    private contactsService: ContactsService
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      cellulare: ['', [Validators.required]],
      messaggio: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = false;

    this.contactsService.sendMessage(this.form.value).subscribe({
      next: () => {
        this.success = true;
        this.form.reset();
        this.loading = false;
      },
      error: () => {
        this.error = this.genericError;
        this.loading = false;
      }
    });
  }
}

