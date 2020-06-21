import { Component, OnInit } from '@angular/core';
import { Patient } from './../../_interfaces/patient.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../../shared/services/repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import * as moment from 'moment';


@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  public patient: Patient;
  public errorMessage = '';
  public age = 0;

  constructor(private repository: RepositoryService, private router: Router,
              private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

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
