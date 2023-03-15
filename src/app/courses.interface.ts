export interface ICourses {    
    id: string;
    title: string;
    tags: Array<string>;
    launchDate: Date,
    status: string;
    description: string;
    duration: number;
    lessonsCount: number;
    containsLockedLessons: boolean;
    previewImageLink: string;        
    rating: number;
    meta: {
        slug: string,
        skills: Array<string>,
        courseVideoPreview: {
            link: string,
            duration: number,
            previewImageLink: string
        }
    }
}

export interface IToken {    
    token: string;
}

export interface ICourse {
    containsLockedLessons: boolean;
    description: string;
    duration: number;
    id: string;
    launchDate: Date;
    lessons: Array<ILesson>;
    meta: {
        courseVideoPreview: {
            duration: number,
            link: string,
            previewImageLink: string
        },
        skills: Array<string>,
        slug: string
    };
    previewImageLink: string;
    rating: number;
    status: string;
    tags: Array<string>;
    title: string;
}

export interface ILesson {
    duration: number;
    id: string;
    link: string;
    meta: null;
    order: number;  
    previewImageLink: string;    
    status: string;
    title: string;
    type: string;

}
