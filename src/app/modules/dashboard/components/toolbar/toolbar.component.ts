import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../pages/users/models/user';

@Component({
  selector: 'app-toolbar',
  standalone: false,

  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Output() drawerToggle = new EventEmitter;
  authUser?: User | null;

  constructor(private authService: AuthService){
    this.authService.authUser$.subscribe({
      next:(user) => {
        this.authUser = user;
        // console.log(user);
      }
    });
    // console.log(this.authUser);
  }

  logout() : void{
    this.authService.logout();
  }
}
