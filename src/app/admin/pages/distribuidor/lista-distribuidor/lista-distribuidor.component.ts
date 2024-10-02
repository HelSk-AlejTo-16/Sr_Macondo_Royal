import { Component, OnInit } from '@angular/core';
import { distribuidors } from '../../../../interfaces/distribuidors';
import { distribuidorsService } from '../../../../services/distribuidors.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-lista-distribuidor',
  templateUrl: './lista-distribuidor.component.html'
})
export class ListaDistribuidorComponent implements OnInit {
  listDistribuidor: distribuidors[] = []

  constructor(private _distribuidorsService: distribuidorsService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getListDistribuidor();
  }

  getListDistribuidor () {
    this._distribuidorsService.getdistribuidors().subscribe((data: distribuidors[]) => {
      this.listDistribuidor = data;
    })
  }

  deleteDistribuidorS (id: number) {
    this._distribuidorsService.deletedistribuidor(id).subscribe(() => {
      this.toastr.warning('El distribuidor ha sido eliminado con exito','Advertencia')
      this.getListDistribuidor();
    })
  }


}
