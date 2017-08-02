import { Component, OnInit } from '@angular/core';
import { UtilizationService } from './utilization.service';
import { Router } from '@angular/router';
import { Language } from 'angular-l10n';

@Component({
  selector: 'utilization',
  templateUrl: './utilization.component.html',
  styleUrls: ['utilization.component.css']
})

export class UtilizationComponent implements OnInit {
  @Language() lang: string;
  public mfsName: any;

  constructor(
    private router: Router,
    private utilizationService: UtilizationService) { }
  ngOnInit(): void {
  }
  getTypesPage(mfs_id: any, nameId: any) {
    if (nameId === 1) {
      this.mfsName = 'Boston';
    }else if (nameId === 2) {
      this.mfsName = 'Atlanta';
    }else if (nameId === 3) {
      this.mfsName = 'Boulder';
    }else if (nameId === 4) {
      this.mfsName = 'Denver';
    }
    this.router.navigate(['/home/resourcestracker/utilization/instrument-types/', mfs_id, this.mfsName]);
  }
}
