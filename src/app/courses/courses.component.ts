import { Component } from '@angular/core';
import { IToken } from '../courses.interface';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  constructor(
    private courseService: CoursesService
  ) {}

  getToken(): void {
    this.courseService.getCourses().subscribe(data => 
      console.log(data));  
  }  
  

}

