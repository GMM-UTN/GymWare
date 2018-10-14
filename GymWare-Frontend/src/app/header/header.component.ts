import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  tipo: string
  constructor( ) { }

  ngOnInit() {
    this.tipo = localStorage.getItem("tipo");
  }

}
