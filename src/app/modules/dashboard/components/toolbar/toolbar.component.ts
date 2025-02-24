import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../pages/users/models/user';
import { Store } from '@ngrx/store';
import { selectAuthUserName, selectAuthUserProfile } from '../../../../store/auth/auth.selectors';

@Component({
  selector: 'app-toolbar',
  standalone: false,

  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Output() drawerToggle = new EventEmitter;
  authUserName$: Observable<string | undefined>;
  authUserProfile$: Observable<string | undefined>;

  constructor(
    private authService: AuthService,
    private store: Store
  ){
    this.authUserName$ = this.store.select(selectAuthUserName);
    this.authUserProfile$ = this.store.select(selectAuthUserProfile);
  }

  logout() : void{
    this.authService.logout();
  }
}
