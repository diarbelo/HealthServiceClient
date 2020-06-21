import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientCreateComponent } from './patient-create/patient-create.component';



@NgModule({
  declarations: [PatientListComponent, PatientDetailsComponent, PatientCreateComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'list', component: PatientListComponent },
      { path: 'details/:id', component: PatientDetailsComponent },
      { path: 'create', component: PatientCreateComponent }
    ])
  ]
})
export class PatientModule { }
