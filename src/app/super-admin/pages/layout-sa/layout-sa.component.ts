import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-sa',
  templateUrl: './layout-sa.component.html',
  styles: ``
})
export class LayoutSaComponent implements OnInit {

  constructor (private router: Router) {}

  ngOnInit(): void {
  }
  LogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('IDRol');

    this.router.navigate(['/sr-macondo/tienda'])
  }
}
