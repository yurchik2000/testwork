import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IToken } from '../app/courses.interface'

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  url = 'http://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions'

  constructor(
    private http: HttpClient
  ) { }

  getCourses(): Observable<IToken> {        
    return this.http.get<IToken>(this.url)
  }
  
}
