import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem("tipo") === undefined || localStorage.getItem("tipo") === null){

    }
    else if(localStorage.getItem("tipo") === '2'){
      alert('Bienvenido');
    }
  }

}
