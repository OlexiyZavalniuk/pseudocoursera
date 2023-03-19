import { Component, Input } from '@angular/core';
import { ICourse } from 'src/app/models/course';
//import { CourseService } from 'src/app/services/course-service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  constructor(/*private service: CourseService*/) {}

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

  cursorOnCard: boolean = false;

  // метод для перевірки доступності прев'ю-відео, щоб не змінювати при ховері
  // картинку курсу на відео, яке не прогружається. Але не працює, хз чого =(

  // isAvailable() {
  //   this.service
  //     .isResourceAvailable(this.course.meta.courseVideoPreview.link)
  //     .then((result) => (this.cursorOnCard = result));
  // }
}
