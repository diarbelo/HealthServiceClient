import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';



@NgModule({
  declarations: [PatientListComponent, PatientDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'list', component: PatientListComponent },
      { path: 'details/:id', component: PatientDetailsComponent }
    ])
  ]
})
export class PatientModule { }
