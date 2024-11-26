import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyMemoryTranslateService {
  private apiUrl = '/translate/get';

  constructor(private http: HttpClient) {}

  translateText(text: string, sourceLang: string = 'en', targetLang: string = 'es'): Observable<any> {
    const params = new HttpParams()
      .set('q', text)
      .set('langpair', `${sourceLang}|${targetLang}`);

    return this.http.get(this.apiUrl, { params });
  }
}
