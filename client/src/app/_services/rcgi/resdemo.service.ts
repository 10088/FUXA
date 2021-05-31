
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProjectData, ProjectDataCmdType } from '../../_models/project';
import { ResourceStorageService } from './resource-storage.service';

@Injectable()
export class ResDemoService implements ResourceStorageService {

    private prjresource = 'prj-data';
    public AppId: string = '';

    constructor(private http: HttpClient) {
    }

    getDemoProject(): Observable<any> {
        return this.http.get<any>('./assets/project.demo.fuxap', {});
    }

    getStorageProject(): Observable<any> {
        return new Observable((observer) => {
            let prj = localStorage.getItem(this.prjresource);
            if (prj) {
                observer.next(JSON.parse(prj));
                console.log('get localStorage');
            } else {
                // try root path
                this.getDemoProject().subscribe(demo => {
                    observer.next(demo);
                }, err => {
                    observer.error(err);
                });
            }
        });
    }

    setServerProject(prj: ProjectData) {
        return new Observable((observer) => {
            localStorage.setItem(this.prjresource, JSON.stringify(prj));
            observer.next();
        });
    }

    setServerProjectData(cmd: ProjectDataCmdType, data: any) {
        return new Observable((observer) => {
            observer.next('Not supported!');
        });
    }
    
    getDeviceSecurity(name: string): Observable<any> {
        return new Observable((observer) => {
            observer.error('Not supported!');
        });
    }

    setDeviceSecurity(name: string, value: string): Observable<any> {
        return new Observable((observer) => {
            observer.next('Not supported!');
        });
    }

    getAlarmsValues(): Observable<any> {
        return new Observable((observer) => {
            observer.error('Not supported!');
        });
    }
    
    setAlarmAck(name: string): Observable<any> {
        return new Observable((observer) => {
            observer.error('Not supported!');
        });
    }

    checkServer(): Observable<any> {
        return new Observable((observer) => {
            observer.next();
        });
    }
}