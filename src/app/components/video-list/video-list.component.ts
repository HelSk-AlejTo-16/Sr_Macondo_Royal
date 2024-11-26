import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeService } from '../../services/youtube.service';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [CommonModule, VideoPlayerComponent, FormsModule],
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
  providers: [YoutubeService]
})
export class VideoListComponent implements OnInit {
  videos: any[] = [];
  selectedVideo: any = null;
  categories: string[] = ['postres', 'carnes', 'pescados', 'ensaladas', 'sopas', 'pasta'];
  selectedCategory: string = '';
  loading: boolean = false;
  searchQuery: string = '';

  constructor(
    private youtubeService: YoutubeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPopularRecipes();
  }

  loadPopularRecipes() {
    this.loading = true;
    this.youtubeService.getPopularRecipes().subscribe({
      next: (items) => {
        this.videos = items;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading videos:', error);
        this.loading = false;
      }
    });
  }

  selectVideo(video: any) {
    this.selectedVideo = video;
    if (window.innerWidth < 768) {
      const playerElement = document.querySelector('.video-player');
      playerElement?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onCategorySelect(category: string) {
    this.selectedCategory = category;
    this.loading = true;
    this.youtubeService.getCategoryRecipes(category).subscribe({
      next: (items) => {
        this.videos = items;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading category videos:', error);
        this.loading = false;
      }
    });
  }

  searchRecipes() {
    if (this.searchQuery.trim()) {
      this.loading = true;
      this.youtubeService.searchRecipes(this.searchQuery).subscribe({
        next: (items) => {
          this.videos = items;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error searching videos:', error);
          this.loading = false;
        }
      });
    }
  }

  goToHome() {
    this.router.navigate(['/sr-macondo/tienda']);
  }
}