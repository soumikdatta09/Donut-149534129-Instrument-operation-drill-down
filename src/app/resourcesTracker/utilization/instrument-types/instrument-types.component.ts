import { Component, OnInit } from '@angular/core';
import { Language } from 'angular-l10n';
import { InstrumentTypesService } from './instrument-types.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Color } from 'ng2-charts';

@Component({
    selector: 'instrument-types',
    templateUrl: 'instrument-types.component.html',
    styleUrls: ['instrument-types.component.css']
})

export class InstrumentTypesComponent implements OnInit {
    @Language() lang: string;
    public busy: Subscription;
    public instruments: any[] = [];
    public people: any[] = [];
    public devices: any[] = [];
    public errorResourceCategory: any;
    public flagInstruments: any;
    public flagPeople: any;
    public flagDevices: any;
    public errorInstruments: any;
    public errorPeople: any;
    public errorDevices: any;
    public mfs_id: any;
    public mfs_name: any;
    public selectedTab = 0;

    public amberValue: any;
    public yellowValue: any;
    public greenValue: any;
    public donutResult: any;
    public labels: string[];
    data: any[] = ['35', '45', '20'];
    type: string = 'doughnut';

    colorsEmpty: Array<Color> = [];
    colorsOverride: Array<Color> = [{

    }];
    colorsEmptyObject: Array<Color> = ['#f4ed11', '#fab600', '#7ed321'];

    public donutDatasets: any[];

    constructor(public instrumentTypesService: InstrumentTypesService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.mfs_id = params.mfsId;
            this.mfs_name = params.mfsName;
        });
        this.instrumentTypesDetails(this.mfs_id);
        this.getDonutChart();
    }
    instrumentTypesDetails(mfs_id: any) {
        this.busy = this.instrumentTypesService.getJSON()
            .subscribe((result: any) => {
                for (let i = 0; i < result.length; i++) {
                    let resultId = result[i].id + '';
                    if (resultId === mfs_id) {
                        for (let j = 0; j < result[i].resource_category.length; j++) {
                            if (result[i].resource_category[j].name === 'Instruments') {
                                for (let k = 0; k < result[i].resource_category[j].types.length; k++) {
                                    this.flagInstruments = true;
                                    this.instruments.push(result[i].resource_category[j].types[k]);
                                }
                            } else if (result[i].resource_category[j].name === 'People') {
                                for (let m = 0; m < result[i].resource_category[j].types.length; m++) {
                                    this.flagPeople = true;
                                    this.people.push(result[i].resource_category[j].types[m]);
                                }
                            } else if (result[i].resource_category[j].name === 'Devices') {
                                for (let n = 0; n < result[i].resource_category[j].types.length; n++) {
                                    this.flagDevices = true;
                                    this.flagDevices.push(result[i].resource_category[j].types[n]);
                                }
                            }
                        }
                        if (this.flagInstruments === false) {
                            this.errorInstruments = 'instrumentTypesComponent.errorResourceCategory';
                        }
                        if (this.flagPeople === false) {
                            this.errorPeople = 'instrumentTypesComponent.errorResourceCategory';
                        }
                        if (this.flagDevices === false) {
                            this.errorDevices = 'instrumentTypesComponent.errorResourceCategory';
                        }
                    }

                }
            }, (err: any) => {
                if (err === 422) {
                    this.errorResourceCategory = 'instrumentTypesComponent.errorResourceCategory';
                }
            });
    }
    getmfsPageForResourceUtilization() {
        this.router.navigate(['/home/resourcestracker/utilization']);
    }

    getDonutChart(id?: any) {
        // console.log(id);
        if (id === undefined || id === null) {
            // console.log('inside if');
            this.donutDatasets = [{
                data: [0, 0, 100],
                backgroundColor: ['#fab600', '#f4ed11', '#7ed321']
            }];
            this.labels = ['Off', 'Idle', 'Operating'];
        } else {
            this.instrumentTypesService.getDonutJSON()
                .subscribe((result: any) => {
                    this.donutResult = result.donutChart[id];
                    // console.log(result.donutChart[id]);
                    // for (let i = 0; i <= this.donutResult.length; i++) {
                    this.amberValue = this.donutResult.amberValue.replace('%', '');
                    this.yellowValue = this.donutResult.yellowValue.replace('%', '');
                    this.greenValue = this.donutResult.greenValue.replace('%', '');
                    // console.log(this.amberValue);
                    // }
                    this.donutDatasets = [{
                        data: [this.amberValue, this.yellowValue, this.greenValue],
                        backgroundColor: ['#fab600', '#f4ed11', '#7ed321']
                    }];
                    this.labels = ['Off', 'Idle', 'Operating'];
                });
        }
    }
}
