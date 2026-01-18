
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

  constructor(
    private fb: FormBuilder,
    private contactsService: ContactsService
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cellulare: [''],
      messaggio: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid) return;

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
        this.error = 'Errore durante l’invio del messaggio';
        this.loading = false;
      }
    });
  }
}

