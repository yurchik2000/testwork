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


  ngOnInit() {
    this.getAllCourses();    
  }

  getCourses(): void {
      console.log(this.courseService.CoursesArray);
    }    

  // getCourse(): void {
  //   this.getOneCourse(this.testCourseId);
  // }
  
  // getOneCourse(courseId:string): void {    
  //   this.courseService.getCourse(courseId).subscribe(data => {      
  //     console.log(data);
  //   })          
  // }

  getAllCourses(): void {
    this.courseService.getToken().subscribe(data => {      
      this.courseService.activeToken = data;
      localStorage.setItem('token', JSON.stringify(data));
      this.courseService.getCourses().subscribe(data => {        
        this.courseService.CoursesArray = data.courses;               
        this.coursesList =  this.courseService.CoursesArray;        
      })      
    })    
  }


}

