import { Component, Input } from '@angular/core';
import { ICourseDetails } from 'src/app/models/course-details';
import { ILesson } from 'src/app/models/lesson';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent {
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
  chosenLesson: ILesson = {
    id: '',
    title: 'Course Intro',
    duration: 0,
    order: 0,
    type: '',
    status: '',
    link: '',
    previewImageLink: '',
    meta: '',
  };

  ngOnChanges() {
    this.chosenLesson.link = '';
    this.chosenLesson.previewImageLink = '';
    this.chosenLesson.title = 'Course Intro';
    this.course.lessons = this.course.lessons.filter(
      (lesson) => lesson.type == 'video'
    );
    this.course.lessons.sort((a, b) => (a.order > b.order ? 1 : -1));
  }
}
