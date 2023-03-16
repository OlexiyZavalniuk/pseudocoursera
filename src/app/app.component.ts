import { Component } from '@angular/core';
import { ICourse } from './models/course';
import { CourseService } from './services/course-service';
import { ceil } from 'mathjs';
import { ICourseDetails } from './models/course-details';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private service: CourseService) {
    this.service.getCourses().subscribe((request) => {
      this.courses = request.courses;
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
  courseDetails: ICourseDetails = {
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
}
