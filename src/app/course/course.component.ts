import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../courses.service';
import { ICourse } from '../courses.interface';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {

  public course!: ICourse;

  constructor(
    private courseService: CoursesService,
    private activatedRote: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getOneCourse();
    console.log(this.course)
  }

  getOneCourse(): void {
    const param = this.activatedRote.snapshot.paramMap.get('id');
    if (param) this.courseService.getCourse(param).subscribe(data => {
      this.course = data;
      // console.log(data)
    });
  }


}
