import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TwitterService } from '../../services/twitter.service';

@Component({
  selector: 'app-twitter-feed',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './twitter-feed.component.html',
  styleUrls: ['./twitter-feed.component.css']
})
export class TwitterFeedComponent implements OnInit {
  tweets: any[] = [];
  newTweetText: string = '';
  error: string = '';
  loading: boolean = false;

  constructor(private twitterService: TwitterService) {}

  ngOnInit() {
    this.loadTweets();
  }

  loadTweets() {
    this.loading = true;
    this.twitterService.getTweets().subscribe({
      next: (data) => {
        this.tweets = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar tweets: ' + error.message;
        this.loading = false;
      }
    });
  }

  postTweet() {
    if (!this.newTweetText.trim()) return;

    this.loading = true;
    this.twitterService.postTweet(this.newTweetText).subscribe({
      next: () => {
        this.newTweetText = '';
        this.loadTweets();
      },
      error: (error) => {
        this.error = 'Error al publicar tweet: ' + error.message;
        this.loading = false;
      }
    });
  }
}