import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {
  private accessToken: string = 'IGQWROLVAtWWxzSGNQZA3NNNlp0LVdXc2JObDVhcEJINkpHQUxwWHNrSEs4Q0VsMWlYc2hONkhkYU41eFRQeWY4aW83NDRhQnhVTWN1TjV2VjBWS3dRdmw1Ulpzc1R4c0trbUJsaTlpLTM3WnBTekpHUHhCUmRqLVkZD';
  private apiUrl: string = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,thumbnail_url,permalink&access_token=${this.accessToken}`;

  constructor(private http: HttpClient) {}

  getInstagramMedia(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
