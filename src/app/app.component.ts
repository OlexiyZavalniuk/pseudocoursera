import { Component } from '@angular/core';
import { ICourse } from './models/course';
import { CourseService } from './services/course-service';
import { ceil } from 'mathjs';
import { ICourseDetails, ICourseDetails2 } from './models/course-details';
import { ILesson } from './models/lesson';
import { LocalStorageService } from './services/local-storage-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private service: CourseService,
    private localStorageService: LocalStorageService
  ) {
    this.service.getCourses().subscribe((request) => {
      this.courses = request.courses.sort((a, b) =>
        Date.parse(a.launchDate) < Date.parse(b.launchDate) ? 1 : -1
      );
      this.pageCount = ceil(this.courses.length / 10);
      this.courseId = this.getPage()[0].id;
      this.getCourse();
    });
  }

  title = 'pseudocoursera';
  uncovered: boolean = false;
  courses: ICourse[] = [];
  courseId: string = '';
  page: number = 1;
  pageCount: number = 1;
  courseDetails: ICourseDetails | ICourseDetails2 = {
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

  getPage(): ICourse[] {
    return this.courses.slice(
      0 + 10 * (this.page - 1),
      10 + 10 * (this.page - 1)
    );
  }

  getCourse() {
    this.service.getCourse(this.courseId).subscribe((request) => {
      this.courseDetails = request;
    });
  }

  changeCourse(id: string) {
    this.courseId = id;
    this.getCourse();
  }

  getLastLesson(): ILesson {
    let lastLesson: ILesson = {
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

    const lesson = this.localStorageService.getItem(this.courseDetails.id);
    if (lesson) {
      lastLesson = lesson;
    }

    return lastLesson;
  }
}
