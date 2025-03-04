import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from './models/user';
import { UsersService } from '../../../../core/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogFormComponent } from './components/user-dialog-form/user-dialog-form.component';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
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
  private subscription = new Subscription();

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
    this.subscription.unsubscribe();
    this.store.dispatch(UserActions.resetState());
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());

    this.users$.pipe(
      tap((user) => {
        this.dataSource = [...user];
        console.log(this.dataSource);
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
            this.addNewUser();
          }
        }
      }
    })
  }

  addNewUser() : void {
    // this.isLoading = true;
    this.usersService.addUser();

  }
  // addNewUser(data: {name: User['name'], email: User['id'], password: User['password'], profile: User['profile']}) : void {
  //   this.isLoading = true;
  //   this.usersService.addUser(data).subscribe({
  //     next: (newuser) => {
  //       this.dataSource = [...newuser];
  //     },
  //     error: () => (this.isLoading = false),
  //     complete: () => (this.isLoading = false)
  //   })

  // }

  updateUser(userId: User['id'], data: Partial<User> ) : void {
    // this.isLoading = true;
    this.usersService.updateUserById(userId, data);

    // this.usersService.updateUserById(userId, data).subscribe({
    //   next: (updatedUser) => {
    //     this.dataSource = [...updatedUser];
    //   },
    //   error: () => this.isLoading = false,
    //   complete: () => this.isLoading = false
    // })
  }

  deleteUserById(id: User['id']) : void {
    this.usersService.deleteUserById(id);
  }


}
