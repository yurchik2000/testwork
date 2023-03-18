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
  public isLoading = true;
  public showCoursePreviewImage = true;  
  public showLesson = false;
  public activeVideoId:string = '';  

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
      console.log(data)
    });
    
  }

  playVideo(name:string, id:string): void {            
    console.log('hover')
    let startTime!: number;
    if (localStorage.getItem(id)) {
      startTime = JSON.parse(localStorage.getItem(id)||'');
    } else startTime= 0;    
    const config = {
      startPosition: startTime // can be any number you want    
    }
    let hls = new HLS(config);
      this.showCoursePreviewImage = false;              
      const video:HTMLMediaElement = document.querySelector('#video')!;
      video.classList.remove('hidden');            
      hls.loadSource(name);
      hls.attachMedia(video);
      hls.on(HLS.Events.MEDIA_ATTACHED, function () {
              video.muted = true;
              video.play();
      });
      video.ontimeupdate = (event) => {        
        localStorage.setItem(id, JSON.stringify(video.currentTime))
      };      
    }          

  playLesson(name:string, id:string, status: string): void {
    if (status=== 'locked') {    
      this.toastr.success('This lesson is locked, try another one');      
    }  else {
      this.activeVideoId = id;    
    this.showLesson = true;
    let startTime!: number;
    if (localStorage.getItem(id)) {
      startTime = JSON.parse(localStorage.getItem(id)||'');
    } else startTime= 0;    
    const config = {
      startPosition: startTime // can be any number you want    
    }
    let hls = new HLS(config);                                    
      const video:HTMLMediaElement = document.querySelector(`#id-${id}`)!;      
      video.classList.remove('hidden');            
      hls.loadSource(name);
      hls.attachMedia(video);
      hls.on(HLS.Events.MEDIA_ATTACHED, function () {              
              video.play();
      });
      video.ontimeupdate = (event) => {        
        localStorage.setItem(id, JSON.stringify(video.currentTime))
      };   
    }
         
    }    
  }



