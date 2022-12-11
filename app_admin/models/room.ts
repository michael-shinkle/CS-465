export interface Room {
    _id: string,    // internal MongoDB primary key
    code: string,
    name: string,
    link: string
    image: string,
    description: string,
    rate: string,
}