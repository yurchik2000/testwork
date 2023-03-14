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
