import { Component, OnInit } from '@angular/core';
import { ExportPdfService } from '../services/export-pdf.service';

@Component({
  selector: 'app-export-pdf',
  templateUrl: './export-pdf.component.html',
  styleUrls: ['./export-pdf.component.css']
})
export class ExportPdfComponent implements OnInit {

  constructor(
    private _exportPdfService: ExportPdfService
  ) { }

  ngOnInit() {
  }

  generatePDF() {
    this._exportPdfService.generatePDFSave();
  }

}
