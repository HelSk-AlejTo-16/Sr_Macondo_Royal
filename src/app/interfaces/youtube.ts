export interface VideoSnippet {
    title: string;
    description: string;
    thumbnails: {
      default: ThumbnailInfo;
      medium: ThumbnailInfo;
      high: ThumbnailInfo;
    };
    channelTitle: string;
    publishedAt: string;
  }
  
  export interface ThumbnailInfo {
    url: string;
    width: number;
    height: number;
  }
  
  export interface VideoItem {
    id: {
      kind: string;
      videoId: string;
    };
    snippet: VideoSnippet;
  }