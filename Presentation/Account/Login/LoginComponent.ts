import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Login } from '../../../Application/Auth/Login';
import { AuthService } from '../../../Core/Services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './Login.html',
  styleUrl: './Login.css'
})
export class LoginClass {
  private fb = inject(FormBuilder);
  private loginusecase = inject(Login);
  private authservice = inject(AuthService);
  private router = inject(Router);

  errormessage = '';

  loginForm = this.fb.nonNullable.group({
    username: ["", Validators.required],
    password: ['', Validators.required]
  });

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const request = this.loginForm.getRawValue();

    this.loginusecase.execute(request).subscribe({
      next: (response) => {
        console.log('login successfully', response);

        this.authservice.saveLoginData(
          response.accessToken,
          response.refereshToken
        );

        // sidebar me dikhane ke liye username save kar rahe hain
        localStorage.setItem('username', request.username);

        this.router.navigate(['/main/dashboard']);
      },
      error: (error) => {
        console.error('Login error:', error);

        this.errormessage = error?.error?.message || 'Invalid Employee Or Password';
      }
    });
  }
}
