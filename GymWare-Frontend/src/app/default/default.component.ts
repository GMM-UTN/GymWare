import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  constructor(
    private _router: Router,) { }

  ngOnInit() {
    if(localStorage.getItem("currentUser") === undefined || localStorage.getItem("currentUser") === null){
      this._router.navigate(['/']);
    }
  }
}
