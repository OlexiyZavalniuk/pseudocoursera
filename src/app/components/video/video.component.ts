import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import Hls from 'hls.js';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent {
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef;

  private hls!: Hls;
  @Input() posterUrl: string = '';
  @Input() videoUrl: string = '';

  ngAfterViewInit() {
    this.hls = new Hls();
    this.hls.loadSource(this.videoUrl);
    this.hls.attachMedia(this.videoPlayer.nativeElement);
  }

  ngOnChanges() {
    this.hls = new Hls();
    this.hls.loadSource(this.videoUrl);
    this.hls.attachMedia(this.videoPlayer.nativeElement);
  }
}
