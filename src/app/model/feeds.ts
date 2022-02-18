


export type postFeeds={
    message:string,
    imageUrl:string
}

export type login={
    nickname:string,
    password:string
}
export type signup={
    nickname:string,
    phone:string,
    password:string
}


    export interface Creator {
        id: string;
        nickname: string;
        iat: number;
    }

    export interface User {
        id: string;
        nickname: string;
        iat: number;
    }

    export interface Comment {
        message: string;
        date: Date;
        user: User;
    }

    export interface Like {
        id: string;
        nickname: string;
        iat: number;
    }

    export interface userResponce {
        id: string;
        creator: Creator;
        date: Date;
        imageUrl: string;
        message: string;
        comments: Comment[];
        likes: Like[];
    }

