import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  navLinks = [
    {path: './list', label: 'List'},
  ];
  constructor() { }

  ngOnInit() {
  }

}
