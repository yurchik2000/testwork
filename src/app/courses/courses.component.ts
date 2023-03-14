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

  testCourseId = '3b77ceb6-fb43-4cf5-a25b-8fe9222a0714';

  ngOnInit() {
    this.courseService.getCoursesNew();
  }

  getCourses(): void {
      console.log(this.courseService.CoursesArray)
    }    
  getCourse(): void {
    this.courseService.getCourse(this.testCourseId);
  }

}

