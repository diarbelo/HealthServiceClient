import { Component, OnInit } from '@angular/core';
import { RepositoryService } from './../../shared/services/repository.service';
import { Patient } from './../../_interfaces/patient.model';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  public patients: Patient[];
  public errorMessage = '';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllPatients();
  }

  public getAllPatients = () => {
    const apiAddress = 'api/patient';
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.patients = res as Patient[];
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    });
  }

  public getPatientDetails = (id) => {
    const detailsUrl = `/patient/details/${id}`;
    this.router.navigate([detailsUrl]);
  }
}
