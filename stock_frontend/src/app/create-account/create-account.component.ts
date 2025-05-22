import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  createAccountForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.createAccountForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['user']
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.createAccountForm.valid) {
      // In a real app, you would call your authentication service here
      const formData = this.createAccountForm.value;
      console.log('Account created:', formData);
      
      // Show success message and redirect
      alert(`Account created successfully!\nUsername: ${formData.username}\nRole: ${formData.role}`);
      this.router.navigate(['/appreciate']);
    } else {
      // Mark all fields as touched to show validation errors
      this.createAccountForm.markAllAsTouched();
    }
  }
}