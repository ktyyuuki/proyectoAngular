import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Inscription } from '../../models';

@Component({
  selector: 'app-inscriptions-table',
  standalone: false,

  templateUrl: './inscriptions-table.component.html',
  styleUrl: './inscriptions-table.component.scss'
})
export class InscriptionsTableComponent {
  displayedColumns: string[] = ['id', 'studentIns', 'courseIns', 'edit', 'delete'];

  @Input()
  dataSource: Inscription[] = [];

  @Output()
  edit = new EventEmitter<Inscription>();

  @Output()
  delete = new EventEmitter<Inscription['id']>();
}
