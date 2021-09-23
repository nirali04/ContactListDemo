import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/shared/shared.service';


@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrls: ['./add-edit-contact.component.scss']
})

export class AddEditContactComponent implements OnInit {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEditContactComponent>,
    private apiService: SharedService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      'name': [null, Validators.required],
      'job': [null, Validators.required],
    });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.form.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.touched || control.untouched);
    return result;
  }

  submitForm() {
    if (!this.form.valid) return;
    this.apiService.CreateUsers(this.form.value).subscribe((res: any) => {
      this.snackBar.open("User Added Successfully", 'Success', {
        duration: 2000,
      });
    });
    this.dialogRef.close();
  }

}
