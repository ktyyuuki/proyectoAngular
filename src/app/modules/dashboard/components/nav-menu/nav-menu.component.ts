import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  standalone: false,

  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {
  linkItems: {label:string, icon:string, routerLink: string}[] = [
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
    {
      label: 'Usuarios',
      icon: 'manage_accounts',
      routerLink: 'users'
    }
  ];
}
