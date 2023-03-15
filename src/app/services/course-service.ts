import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICoursesRequest } from '../models/course';
import { from, Observable, switchMap } from 'rxjs';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CourseService {
  // constructor(private http: HttpClient) {}

  // getCourses(): Observable<ICoursesRequest> {
  //   let token = 'my_token';
  //   this.http
  //     .get<any>(
  //       'https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions'
  //     )
  //     .subscribe((request) => (token = request.token));

  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   return this.http.get<ICoursesRequest>(
  //     'https://api.wisey.app/api/v1/core/preview-courses',
  //     { headers }
  //   );
  // }

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
}
