import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  public notFoundText = `404 we've a technician looking for ...`;

  constructor() { }

  ngOnInit() {
  }

}
