export interface INewComMessage {
    name: string;
    email: string;
    phone: string;
    status: "new" | "processed" | "solved";
    info: string;
}
export interface IComMessage extends INewComMessage {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
