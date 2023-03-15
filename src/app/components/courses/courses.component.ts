import { Component, Input } from '@angular/core';
import { ICourse } from 'src/app/models/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class Courses {
  @Input() course: ICourse = {
    id: '',
    title: '',
    tags: [],
    launchDate: '',
    status: '',
    description: '',
    duration: 0,
    lessonsCount: 0,
    containsLockedLessons: false,
    previewImageLink: '',
    rating: 0,
    meta: {
      slug: '',
      skills: [],
      courseVideoPreview: {
        link: '',
        duration: 0,
        previewImageLink: '',
      },
    },
  };
}
