import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AppointmentForCreation } from './../../_interfaces/appointmentForCreation.model';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.css']
})
export class AppointmentCreateComponent implements OnInit {
  public errorMessage = '';
  public addAppointmentForm: FormGroup;
  types = ['', 'General medicine', 'Odontology', 'Pediatrics', 'Neurology'];
  hours = ['', '09', '10', '11', '12', '13', '14', '15', '16'];
  minutes = ['', '00', '15', '30', '45'];

  constructor(private repository: RepositoryService, private location: Location, private errorHandler: ErrorHandlerService,
              private router: Router, private datePipe: DatePipe, private formBuilder: FormBuilder, private activeRoute: ActivatedRoute) {

              }

  ngOnInit() {
    this.addAppointmentForm = new FormGroup({
      appointmentType: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      hour: new FormControl('', [Validators.required]),
      minute: new FormControl('', [Validators.required])
    });
  }

  public validateControl = (controlName: string) => {
    if (this.addAppointmentForm.controls[controlName].invalid && this.addAppointmentForm.controls[controlName].touched) {
      return true;
    } else {
      return false;
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    if (this.addAppointmentForm.controls[controlName].hasError(errorName)) {
      return true;
    } else {
      return false;
    }
  }

  public executeDatePicker = (event) => {
    // tslint:disable-next-line: object-literal-key-quotes
    this.addAppointmentForm.patchValue({ 'date': event });
  }

  changeType(e) {
    this.appointmentType.setValue(e.target.value, {
      onlySelf: true
    });
  }
  get appointmentType() {
    return this.addAppointmentForm.get('appointmentType');
  }

  changeHour(e) {
    this.hour.setValue(e.target.value, {
      onlySelf: true
    });
  }
  get hour() {
    return this.addAppointmentForm.get('hour');
  }

  changeMinute(e) {
    this.minute.setValue(e.target.value, {
      onlySelf: true
    });
  }
  get minute() {
    return this.addAppointmentForm.get('minute');
  }

  public addAppointment = (addAppointmentForm) => {
    if (this.addAppointmentForm.valid) {
      this.addAppointmentCreation(addAppointmentForm);
    }
  }

  public addAppointmentCreation = (addAppointmentForm) => {
    // tslint:disable-next-line: max-line-length
    const dateSend = `${this.datePipe.transform(addAppointmentForm.date, 'yyyy-MM-dd')}T${this.hour.value.substring(3)}:${this.minute.value.substring(3)}:00`;

    const addAppointment: AppointmentForCreation = {
      date: dateSend,
      appointmentType: this.appointmentType.value.substring(3),
      patientId: Number(this.activeRoute.snapshot.params.id)
    };

    console.log(addAppointment);

    const apiUrl = 'api/appointment';
    this.repository.create(apiUrl, addAppointment)
      .subscribe(res => {
        $('#successModal').modal();
      },
      (error => {
        console.log(error);
        this.errorMessage = this.errorHandler.errorMessage;
        this.errorHandler.handleError(error);
      })
    );
  }

  public redirectToPatientDetails() {
    this.location.back();
  }
}
