import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  constructor(
    private router: Router,
    private authservice: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    localStorage.clear();
    this.initLoginForm();
  }

  initLoginForm() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.form.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  submit() {
    if (this.form.invalid) { return }
    this.authservice.signinUser(this.form.value).subscribe(response => {
      if (!!response['token']) {
        localStorage.setItem('token', response['token']);
        this.router.navigate(['contact']);
      }
    }, (e) => {
      this.snackBar.open(e.error.error, 'Error', {
        duration: 2000,
      });
    });
  }

}
