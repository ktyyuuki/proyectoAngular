import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsComponent } from './inscriptions.component';
import { SharedModule } from '../../../../shared/shared.module';
import { InscriptionsTableComponent } from './components/inscriptions-table/inscriptions-table.component';
import { StoreModule } from '@ngrx/store';
import { inscriptionFeature } from './store/inscription.reducer';


@NgModule({
  declarations: [
    InscriptionsComponent,
    InscriptionsTableComponent
  ],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    SharedModule,
    StoreModule.forFeature(inscriptionFeature),
  ]
})
export class InscriptionsModule { }
