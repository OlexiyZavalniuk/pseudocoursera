import { Component, Input } from '@angular/core';
import { ICourseDetails } from 'src/app/models/course-details';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class Course {
  @Input() course: ICourseDetails = {
    id: '',
    title: '',
    tags: [],
    launchDate: '',
    status: '',
    description: '',
    duration: 0,
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
    lessons: [],
    containsLockedLessons: false,
  };
  @Input() opened: boolean = false;
}
