import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  htmlEditApi = 'https://csr.chipbond.com.tw/csr-api/htmlEdit';
  constructor(private http: HttpClient) { }

  query(fo): Observable<any> {
    return this.http.post<any>(this.htmlEditApi + '/queryHtmlEditLanguageMultiple', fo);
  }
}
