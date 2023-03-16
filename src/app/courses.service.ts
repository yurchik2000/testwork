import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

import { IToken } from '../app/courses.interface'
import { ICourses } from '../app/courses.interface';
import { ICourse } from '../app/courses.interface';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  // url = 'http://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions'

  private url = environment.BACKEND_URL;
  private api = {
    token: 'auth/anonymous?platform=subscriptions',
    courses: 'core/preview-courses',    
  }

  public CoursesArray: Array<ICourses> = [];
  public activeToken: IToken = { token: '' }

  constructor(
    private http: HttpClient
  ) {}

  getToken(): Observable<IToken> {            
    return this.http.get<IToken>(this.url + this.api.token)
  }
  
  getCourses(): Observable<any> {                
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${this.activeToken.token}`        
      })
    };
    return this.http.get<any>(this.url + this.api.courses, httpOptions)
  }
    
  getCourse(courseId:string): Observable<ICourse> {                        
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${this.activeToken}`
      })
    };
    return this.http.get<ICourse>(this.url + this.api.courses + "/"+ courseId, httpOptions)
  }  
}
