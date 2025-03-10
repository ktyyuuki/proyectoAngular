import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../../../../shared/shared.module';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserDialogFormComponent } from './components/user-dialog-form/user-dialog-form.component';
import { StoreModule } from '@ngrx/store';
import { userFeature } from './store/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';


@NgModule({
  declarations: [
    UsersComponent,
    UsersTableComponent,
    UserDialogFormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    StoreModule.forFeature(userFeature),
    EffectsModule.forFeature([UserEffects]),
  ]
})
export class UsersModule { }
