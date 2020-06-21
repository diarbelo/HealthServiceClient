import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-internal-server',
  templateUrl: './internal-server.component.html',
  styleUrls: ['./internal-server.component.css']
})
export class InternalServerComponent implements OnInit {

  public errorMessage = `500 oops! we've a technician solving it ...`;

  constructor() { }

  ngOnInit() {
  }

}
