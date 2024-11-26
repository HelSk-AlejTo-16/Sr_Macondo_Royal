import { Component, OnInit } from '@angular/core';
import { InstagramService } from '../../services/instagram.service';
import { Router } from '@angular/router';

interface InstagramMedia {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  permalink: string;
  caption: string;
}

@Component({
  selector: 'app-instagram-feed',
  templateUrl: './instagram-feed.component.html',
  styleUrls: ['./instagram-feed.component.css']
})
export class InstagramFeedComponent implements OnInit {
  instagramMedia: InstagramMedia[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(
    private instagramService: InstagramService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadInstagramMedia();
  }

  loadInstagramMedia(): void {
    this.instagramService.getInstagramMedia().subscribe(
      (data) => {
        this.instagramMedia = data.data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'No se pudieron cargar las publicaciones de Instagram.';
        this.isLoading = false;
      }
    );
  }

  goToHome(): void {
    this.router.navigate(['/sr-macondo/tienda']);
  }
}