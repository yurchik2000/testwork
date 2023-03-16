import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../courses.service';
import { ICourse, ILesson } from '../courses.interface';
import HLS from 'hls.js';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {

  public course!: ICourse;

  private config = {
    startPosition: 0 // can be any number you want    
  }
  private hls = new HLS(this.config);

  @ViewChild('video', { static: true }) 
  private video!: ElementRef<HTMLVideoElement>;  

  constructor(
    private courseService: CoursesService,
    private activatedRote: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {            
    this.getOneCourse();
  }

  getOneCourse(): void {    
    const data: string = localStorage.getItem("token") || "";     
    this.courseService.activeToken = JSON.parse(data).token;
    const param = this.activatedRote.snapshot.paramMap.get('id');
    if (param) this.courseService.getCourse(param).subscribe(data => {
      this.course = data;      
      // console.log(this.course.lessons)
    });
  }

  playVideo(name:string, startTime: number): void {    
      // const video = document.querySelector('#video');      
      // console.log(this.video)
      const config = {
        startPosition: startTime // can be any number you want
      }
      // this.hls.loadSource(name+'/lesson-1.m3u8');
      this.hls.loadSource('https://wisey.app/videos/lack-of-motivation-how-to-overcome-it/preview/AppleHLS1/preview.m3u8');
      const activeVideoId = '1234-5678';
      this.hls.attachMedia(this.video.nativeElement);
      // console.log(this.video.nativeElement);
      this.video.nativeElement.play();
      }
    
  checkStatus(status: string): void {
    if (status=== 'locked') {    
      this.toastr.success('This lesson is locked, try another one');
    }
  }
}
