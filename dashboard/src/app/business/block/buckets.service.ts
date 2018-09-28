import { Injectable } from '@angular/core';
import { I18NService, HttpService, ParamStorService } from '../../shared/api';
import { Observable } from 'rxjs';

@Injectable()
export class BucketService {
  constructor(
    private http: HttpService,
    private paramStor: ParamStorService
  ) { }

  url = 'v1beta/{project_id}/bucket';

  //Create bucket
  createBucket(param) {
    return this.http.post(this.url, param);
  }

  //Update Bucket
  modifyBucket(id,param) {
    let modifyUrl = this.url + '/' + id
    return this.http.put(modifyUrl, param);
  }

  //Delete Bucket
  deleteBucket(id): Observable<any> {
    let deleteUrl = this.url + '/' + id
    return this.http.delete(deleteUrl);
  }

  //Search all Buckets
  getBuckets(): Observable<any> {
    return this.http.get(this.url);
  }

  //Search Bucket
  getBucketById(id): Observable<any> {
    let url = this.url + '/' + id;
    return this.http.get(url);
  }

  getBckends(): Observable<any> {
    return this.http.get('v1beta/{project_id}/backend');
  }
}


