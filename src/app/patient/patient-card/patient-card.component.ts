import { Component, OnInit } from '@angular/core';
import { Patient } from './../../_interfaces/patient.model';
import { RepositoryService } from './../../shared/services/repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.css']
})
export class PatientCardComponent implements OnInit {
  public errorMessage = '';
  public patient: Patient;
  public age = 0;

  constructor(private repository: RepositoryService, private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getPatientDetails();
  }

  getPatientDetails = () => {
    const id = this.activeRoute.snapshot.params.id;
    const apiUrl = `api/patient/${id}/appointment`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.patient = res as Patient;
        this.age = this.ageFromDateOfBirthday(this.patient.dateOfBirth);
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        });
  }

  public ageFromDateOfBirthday(dateOfBirth: any): number {
    return moment().diff(dateOfBirth, 'years');
  }

}
