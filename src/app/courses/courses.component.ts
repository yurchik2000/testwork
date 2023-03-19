import { Component } from '@angular/core';
import { ICourses } from '../courses.interface';
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

  public coursesList: Array<ICourses> = this.courseService.CoursesArray;
  public isLoading = false;
  public p:number = 1;


  ngOnInit() {
    this.getAllCourses();    
  }

  getAllCourses(): void {
    this.courseService.getToken().subscribe(data => {      
      this.courseService.activeToken = data;
      localStorage.setItem('token', JSON.stringify(data));
      this.courseService.getCourses().subscribe(data => {        
        this.courseService.CoursesArray = data.courses;               
        this.coursesList =  this.courseService.CoursesArray;        
        this.isLoading = true;
      })      
    })    
  }

}

