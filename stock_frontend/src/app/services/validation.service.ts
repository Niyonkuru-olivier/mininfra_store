import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  // Email validation regex pattern
  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Password validation regex patterns
  private hasUpperCase = /[A-Z]/;
  private hasLowerCase = /[a-z]/;
  private hasNumber = /[0-9]/;
  private hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  validateEmail(email: string): boolean {
    return this.emailPattern.test(email);
  }

  validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!this.hasUpperCase.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!this.hasLowerCase.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!this.hasNumber.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!this.hasSpecialChar.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Validator function for email
  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      return this.validateEmail(control.value) ? null : { invalidEmail: true };
    };
  }

  // Validator function for password
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const result = this.validatePassword(control.value);
      return result.isValid ? null : { invalidPassword: result.errors };
    };
  }
} 