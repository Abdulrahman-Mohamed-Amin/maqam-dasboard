import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Req } from '../../interfaces/req';

@Injectable({
  providedIn: 'root'
})
export class RequstService {
  url = environment.apiUrl + '/' + 'Request'

  constructor(private http: HttpClient) { }

  getRequest(){
    return this.http.get<Req[]>(this.url)
  }

}
