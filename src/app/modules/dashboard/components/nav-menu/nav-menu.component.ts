import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUserAdmin } from '../../../../store/auth/auth.selectors';

@Component({
  selector: 'app-nav-menu',
  standalone: false,

  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent implements OnInit{
  isAdmin$: Observable<boolean>;
  linkItems: {label:string, icon:string, routerLink: string}[] = [];

  constructor(
    private store:Store
  ){
    this.isAdmin$ = this.store.select(selectAuthUserAdmin);
  }

  ngOnInit(): void {
    this.isAdmin$.subscribe(isAdmin => {
      this.linkItems = [
        {
          label: 'Inicio',
          icon: 'home',
          routerLink: 'home'
        },
        {
          label: 'Estudiantes',
          icon: 'groups',
          routerLink: 'students'
        },
        {
          label: 'Cursos',
          icon: 'book',
          routerLink: 'courses'
        },
        {
          label: 'Inscripciones',
          icon: 'school',
          routerLink: 'inscriptions'
        },
      ];
      if(isAdmin){
        this.linkItems.push({
          label: 'Usuarios',
          icon: 'manage_accounts',
          routerLink: 'users'
        });
      }
    })
  }
}
