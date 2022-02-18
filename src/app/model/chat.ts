export type User = {
    nickname: string,
     phone: string, 
     id: string,
    password?: string
};
export type Message = {
    creator: User,
    message: string,
    id: string,
    date: Date
};

export type Chat = {
    title: string,
    creator: User, 
    users: User[],
    id: string,
    imageUrl: string,
    messages: Message[]};