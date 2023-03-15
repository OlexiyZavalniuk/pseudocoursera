import { Component } from '@angular/core';
import { ICourse } from './models/course';
import { CourseService } from './services/course-service';
import { ceil } from 'mathjs';
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
    });
  }

  title = 'pseudocoursera';
  uncovered: boolean = false;
  courses: ICourse[] = [];
  page: number = 1;
  pageCount: number = 1;

  getPage(): ICourse[] {
    return this.courses.slice(
      0 + 10 * (this.page - 1),
      10 + 10 * (this.page - 1)
    );
  }
}
