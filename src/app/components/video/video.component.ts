import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import Hls from 'hls.js';
import { LocalStorageService } from 'src/app/services/local-storage-service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent {
  constructor(private localStorageService: LocalStorageService) {}

  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef;

  private hls!: Hls;
  @Input() posterUrl: string = '';
  @Input() videoUrl: string = '';
  @Input() isAutoplay: boolean = false;
  currentTime: number = 0;

  ngAfterViewInit() {
    const savedTime = this.localStorageService.getItem(this.videoUrl);
    if (savedTime) {
      this.currentTime = savedTime;
      this.videoPlayer.nativeElement.currentTime = this.currentTime;
    }

    this.hls = new Hls();
    this.hls.loadSource(this.videoUrl);
    this.hls.attachMedia(this.videoPlayer.nativeElement);
  }

  ngOnChanges() {
    const savedTime = this.localStorageService.getItem(this.videoUrl);
    if (savedTime) {
      this.currentTime = savedTime;
      this.videoPlayer.nativeElement.currentTime = this.currentTime;
    }

    this.hls = new Hls();
    this.hls.loadSource(this.videoUrl);
    this.hls.attachMedia(this.videoPlayer.nativeElement);
  }

  saveCurrentTime() {
    const currentTime = this.videoPlayer.nativeElement.currentTime;
    this.localStorageService.setItem(this.videoUrl, Number(currentTime));
  }
}
