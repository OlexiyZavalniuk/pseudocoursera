import { Component } from '@angular/core';
import { ICourse } from './models/course';
import { CourseService } from './services/course-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private service: CourseService) {
    this.service.getCourses().subscribe((request) => {
      this.courses = request.courses;
    });
  }

  title = 'pseudocoursera';
  uncovered: boolean = false;
  courses: ICourse[] = [];
}
