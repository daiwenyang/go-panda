import { Injectable } from '@angular/core';
import { I18NService, HttpService, ParamStorService } from '../../shared/api';
import { Observable } from 'rxjs';

@Injectable()
export class  AvailabilityZonesService{
  constructor(
    private http: HttpService,
    private paramStor: ParamStorService
  ) { }

  url = 'v1beta/{project_id}/availabilityZones';
  backendUrl = "v1beta/{project_id}/backend";

  //get az
  getAZ(param?): Observable<any>{
    return this.http.get(this.url, param);
  };

  // get backend
  getBackend(param) {
    return this.http.get(this.backendUrl, param);
  }

  // get backend count
  getBackendCount(param) {
    return this.http.get(this.backendUrl + "/count", param);
  }  
}
