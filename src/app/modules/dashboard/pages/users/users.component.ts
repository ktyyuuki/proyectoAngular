import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, USER_PROFILE } from './models/user';
import { UsersService } from '../../../../core/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogFormComponent } from './components/user-dialog-form/user-dialog-form.component';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { selectIsLoadingtUsers, selectUsers, selectUsersError } from './store/user.selectors';
import { UserActions } from './store/user.actions';

@Component({
  selector: 'app-users',
  standalone: false,

  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy{
  users$: Observable<User[]>;
  isLoading$ : Observable<boolean>;

  dataSource : User[] = [];
  error$: Observable<unknown>;

  constructor(
    private usersService: UsersService,
    private matDialog: MatDialog,
    private store: Store,
  ){
    this.users$ = this.store.select(selectUsers);
    this.isLoading$ = this.store.select(selectIsLoadingtUsers);
    this.error$ = this.store.select(selectUsersError);
  }

  ngOnDestroy(): void {
    this.store.dispatch(UserActions.resetState());
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());

    this.users$.pipe(
      tap((user) => {
        this.dataSource = [...user];
        // console.log(this.dataSource);
      })
    ).subscribe();

    // this.usersService.getUsers().subscribe({
    //   next: (data) => {
    //     this.dataSource = [...data];
    //   },
    //   error: () => {},
    //   complete: () => {}
    // })
  }

  openDialogForm(editingUser?: User) : void {
    // if(editingUser){
    //   console.log('Se va a editar: ', editingUser)
    // }
    this.matDialog
    .open(UserDialogFormComponent, {data: {editingUser}})
    .afterClosed().subscribe({
      next: (data) => {
        if(!!data) {
          if(!!editingUser){
            // editar
            this.updateUser(editingUser.id, data);
          } else {
            // crear
            this.addNewUser(data);
          }
        }
      }
    })
  }

  addNewUser(user: Omit<User, 'id'>) : void {
    this.store.dispatch(UserActions.addUser({user}));
  }

  updateUser(id: User['id'], data: Partial<User>) : void {
    this.store.dispatch(UserActions.updateUserById({id, data}));
  }

  deleteUserById(id: User['id']) : void {
    if(confirm("¿Estás seguro que deseas eliminar este usuario?")){
      this.store.dispatch(UserActions.deleteUserById({id}));
    }
  }


}
