import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  private apiKey = 'bE9DFkobR2tdfn58fAqLinRXm';
  private apiKeySecret = 'va7btz5MYWdndFN1aM1GoHgInolbH3otzq3TrCV7vfmTkKUdwH';
  private accessToken = '1416554281235255301-Y8RMq3H6nQ5ACD5lHRBKX16B6ezVvh';
  private accessTokenSecret = 'HqOj9ZnsJ93GRU1QYIHuc5uSbbJzjGBtxO7pFKzo7rdl5';
  private baseUrl = 'https://api.twitter.com/1.1';

  constructor(private http: HttpClient) {}

  getTweets(count: number = 10): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.get(`${this.baseUrl}/statuses/home_timeline.json?count=${count}`, { headers });
  }

  postTweet(text: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.baseUrl}/statuses/update.json`, { status: text }, { headers });
  }
}