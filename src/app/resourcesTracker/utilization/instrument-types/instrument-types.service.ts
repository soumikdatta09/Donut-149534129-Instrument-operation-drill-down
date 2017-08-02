import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
// import { environment } from '../../../../environments/environment';

@Injectable()
export class InstrumentTypesService {
    public token: string;

    constructor(private http: Http) { }

    public getJSON(): Observable<any> {
        return this.http.get('assets/utilization.json')
            .map((res: any) => res.json());
    }

    public getDonutJSON(): Observable<any> {
        return this.http.get('assets/resources-chart.json')
            .map((res: any) => res.json());
    }
}
