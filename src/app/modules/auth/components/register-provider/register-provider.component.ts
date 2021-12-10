import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from 'src/app/core/provider/services/provider.service';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';

@Component({
  selector: 'app-register-provider',
  templateUrl: './register-provider.component.html',
  styleUrls: ['./register-provider.component.scss'],
})
export class RegisterProviderComponent implements OnInit {
  private email?: string;
  formProvider?: FormGroup;
  specialty?: string = 'Não encontrado';
  constructor(
    private readonly route: ActivatedRoute,
    private readonly providerService: ProviderService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly toast: ToastService
  ) {}

  ngOnInit(): void {
    this.getParams();

    this.createForm();
    this.getProvider();
  }

  updateProvider() {
    const bio = this.formProvider?.get('bio')?.value;

    if (bio && this.email) {
      this.providerService.updateProvider(this.email, bio).subscribe({
        next: () => this.goToRegisteSuccess(),
        error: () => {
          this.toast.show('Erro ao atualizar os dados');
        },
      });
    }
  }

  private getParams() {
    this.email = this.route.snapshot.paramMap.get('email') || '';

    if (!this.email) {
      this.goToLoginPage();
    }
  }

  private goToLoginPage() {
    this.router.navigate(['/auth/login']);
  }

  private goToRegisteSuccess() {
    this.router.navigate(['/home']);
  }

  private createForm() {
    this.formProvider = this.formBuilder.group({
      bio: this.formBuilder.control('', {
        validators: [Validators.required],
      }),
    });
  }

  private getProvider() {
    if (this.email) {
      this.providerService.findProvider(this.email).subscribe({
        next: (result) => (this.specialty = result.specialty),
        error: () => this.toast.show('Não foi possível pegar a especialidade'),
      });
    }
  }
}
