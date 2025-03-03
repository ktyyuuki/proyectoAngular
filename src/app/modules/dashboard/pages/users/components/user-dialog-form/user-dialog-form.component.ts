import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';

interface UserFormDialogData {
  editingUser?: User;
}

@Component({
  selector: 'app-user-dialog-form',
  standalone: false,

  templateUrl: './user-dialog-form.component.html',
  styleUrl: './user-dialog-form.component.scss'
})
export class UserDialogFormComponent{
  userForm: FormGroup;
  title: string = "Crear Nuevo Usuario";
  isEditing: boolean = false;

  constructor (
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<UserDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: UserFormDialogData
  ){
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      profile: ['', [Validators.required]]
    });

    if(!!data && !!data.editingUser){
      this.title = "Editar Usuario";
      this.userForm.patchValue({
        name: data.editingUser.name,
        email: data.editingUser.email,
        password: data.editingUser.password,
        address: data.editingUser.address,
        phone: data.editingUser.phone,
        profile: data.editingUser.profile
      });
    }
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.userForm.value);
      this.userForm.reset();
    }
  }
}
