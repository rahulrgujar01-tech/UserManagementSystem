import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangePassword } from '../../../Application/Account/Changepassword';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ChangePassword.html'
})
export class ChangePasswordClass {
  private fb = inject(FormBuilder);
  private changePasswordUsecase = inject(ChangePassword);

  errormessage = '';
  successmessage = '';

  changeForm = this.fb.nonNullable.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  submit(): void {
    this.errormessage = '';
    this.successmessage = '';

    if (this.changeForm.invalid) {
      this.changeForm.markAllAsTouched();
      return;
    }

    const request = this.changeForm.getRawValue();

    if (request.newPassword !== request.confirmPassword) {
      this.errormessage = 'New Password aur Confirm Password match nahi kar rahe.';
      return;
    }

    this.changePasswordUsecase.execute(request).subscribe({
      next: () => {
        this.successmessage = 'Password successfully change ho gaya.';
        this.changeForm.reset();
      },
      error: (error) => {
        this.errormessage = error?.error?.message || 'Password change nahi ho paya, dobara try karein.';
      }
    });
  }
}
