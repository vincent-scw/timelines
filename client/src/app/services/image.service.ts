import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from "../../environments/environment";

@Injectable()
export class ImageService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiServerUrl;
  }

  getImageUrls(timeline?: string): Observable<string[]> {
    const options = timeline ?
      { params: new HttpParams().set('timeline', timeline) } : {};  
    return this.http.get<string[]>(`${this.baseUrl}/api/images`, options);
  }
}