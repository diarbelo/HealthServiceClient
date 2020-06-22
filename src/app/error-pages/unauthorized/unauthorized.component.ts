import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {
  public errorMessage = '401 Whoa! who are you?';

  constructor() { }

  ngOnInit() {
  }

}
