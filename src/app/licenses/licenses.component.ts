import { Component, OnInit } from '@angular/core';
import { LicensesService } from './licenses.service';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.css']
})
export class LicensesComponent implements OnInit {

  licenses: string;

  constructor(
    private readonly licensesService: LicensesService
  ) { }

  ngOnInit(): void {
    this.licensesService.getLicenses().subscribe(next => this.licenses = next)
  }

}
