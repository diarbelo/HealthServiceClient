import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientForCreation } from './../../_interfaces/patientForCreation.model';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css']
})
export class PatientCreateComponent implements OnInit {
  public errorMessage = '';
  public patientForm: FormGroup;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService,
              private router: Router, private datePipe: DatePipe) { }

  ngOnInit() {
    this.patientForm = new FormGroup({
      identification: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(25)])
    });
  }

  public validateControl = (controlName: string) => {
    if (this.patientForm.controls[controlName].invalid && this.patientForm.controls[controlName].touched) {
      return true;
    } else {
      return false;
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    if (this.patientForm.controls[controlName].hasError(errorName)) {
      return true;
    } else {
      return false;
    }
  }

  public executeDatePicker = (event) => {
    // tslint:disable-next-line: object-literal-key-quotes
    this.patientForm.patchValue({ 'dateOfBirth': event });
  }

  public createPatient = (patientFormValue) => {
    if (this.patientForm.valid) {
      this.executePatientCreation(patientFormValue);
    }
  }

  private executePatientCreation = (patientFormValue) => {
    const patient: PatientForCreation = {
      id: patientFormValue.identification,
      name: patientFormValue.name,
      lastName: patientFormValue.lastName,
      dateOfBirth: this.datePipe.transform(patientFormValue.dateOfBirth, 'yyyy-MM-dd'),
      address: patientFormValue.address,
      phoneNumber: patientFormValue.phoneNumber
    };

    const apiUrl = 'api/patient';
    this.repository.create(apiUrl, patient)
      .subscribe(res => {
        $('#successModal').modal();
      },
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
    );
  }

  public redirectToPatientList() {
    this.router.navigate(['/patient/list']);
  }

}
