import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf'
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ExportPdfService {

  constructor() { }

  generatePDFSave() {
    var doc = new jsPDF();

    doc.fromHTML($('.center').children().get(0), 15, 15, {
      'width': 170, 
    });
    doc.save('Reporte.pdf')
  }

}
