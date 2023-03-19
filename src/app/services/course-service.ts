import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICoursesRequest } from '../models/course';
import { from, Observable, switchMap } from 'rxjs';
import { ICourseDetails, ICourseDetails2 } from '../models/course-details';

@Injectable({ providedIn: 'root' })
export class CourseService {
  constructor(private http: HttpClient) {}

  getCourses(): Observable<ICoursesRequest> {
    return from(
      this.http.get<{ token: string }>(
        'https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions'
      )
    ).pipe(
      switchMap((tokenResponse) =>
        this.http.get<ICoursesRequest>(
          'https://api.wisey.app/api/v1/core/preview-courses',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.token}`,
            },
          }
        )
      )
    );
  }

  getCourse(courseId: string): Observable<ICourseDetails | ICourseDetails2> {
    return from(
      this.http.get<{ token: string }>(
        'https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions'
      )
    ).pipe(
      switchMap((tokenResponse) =>
        this.http.get<ICourseDetails | ICourseDetails2>(
          `https://api.wisey.app/api/v1/core/preview-courses/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.token}`,
            },
          }
        )
      )
    );
  }

  // isResourceAvailable(link: string): Promise<boolean> {
  //   return this.http
  //     .get(link)
  //     .toPromise()
  //     .then(() => true)
  //     .catch(() => false);
  // }
}
