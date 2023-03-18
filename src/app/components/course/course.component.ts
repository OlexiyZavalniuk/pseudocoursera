import { Component, Input } from '@angular/core';
import { ICourseDetails, ICourseDetails2 } from 'src/app/models/course-details';
import { ILesson } from 'src/app/models/lesson';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent {
  @Input() course: ICourseDetails | ICourseDetails2 = {
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
    this.course.lessons = this.course.lessons.filter(
      (lesson) => lesson.type == 'video'
    );
    this.course.lessons.sort((a, b) => (a.order > b.order ? 1 : -1));

    if (this.getIntroVideoLink() != '') {
      this.chosenLesson.link = '';
      this.chosenLesson.previewImageLink = '';
      this.chosenLesson.title = 'Course Intro';
    } else {
      this.chosenLesson.link = this.course.lessons[0].link;
      this.chosenLesson.previewImageLink =
        this.course.lessons[0].previewImageLink;
      this.chosenLesson.title = this.course.lessons[0].title;
      this.chosenLesson.id = this.course.lessons[0].id;
    }
  }

  getIntroVideoLink(): string {
    if ('skills' in this.course.meta) {
      return this.course.meta.courseVideoPreview.link;
    }
    return '';
  }
}
