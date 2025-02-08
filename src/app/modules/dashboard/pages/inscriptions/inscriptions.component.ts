import { Component, OnInit } from '@angular/core';
import { Inscription } from './models';
import { InscriptionsService } from '../../../../core/services/inscriptions.service';

@Component({
  selector: 'app-inscriptions',
  standalone: false,

  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})
export class InscriptionsComponent implements OnInit {
  isLoading = false;
  dataSource : Inscription[] = [];

  constructor(
    private inscriptionService: InscriptionsService
  ){ }


  ngOnInit(): void {
    this.isLoading = true;
    this.inscriptionService.getInscriptions().subscribe({
      next: (data) => { this.dataSource = [...data] },
      error: () => { this.isLoading = false },
      complete: () => { this.isLoading = false }
    })
  }


}
