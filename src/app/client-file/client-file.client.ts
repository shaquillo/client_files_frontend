// export enum Status {
//     "Going_on", "pending", "treated"
// }

// export class Account {
//     constructor(
//         public score: number,
//         public ratio: number,
//         public risk: number,
//         public status: Status,
//         public investment_plan: string
//     ){}
// }

// export class Note {
//     constructor(
//         public id: string,
//         public date: String,
//         public note: string,
//         public status: string,
//         public doc_status: string,
//         public offer: string,
//         public offer_date: String
//     ){}
// }

// export class Client {
//     constructor(
//         public id: string,
//         public name: string,
//         public profession: string,
//         public category: string, 
//         public tel: string,
//         public email: string, 
//         public address: string,
//         public town: string,
//         public linkedIn: string,
//         public cp: string,
//         public notation: number,
//         public notes: Note[],
//         public account: Account

//     ){}
// }

export enum Status {
    INPROGRESS, PENDING, TREATED
}

export interface Account {
    score: number,
    ratio: number,
    risk: number,
    status: Status,
    investment_plan: string
}

export interface Note {
    creation_date: string,
    note: string,
    status: string,
    document_status: string,
    filename: string,
    offer: string,
    offer_date: string
}

export interface Client {
    id: string,
    name: string,
    profession: string,
    category: string, 
    tel: string,
    email: string, 
    address: string,
    town: string,
    linkedIn_link: string,
    cp: string,
    notation: number,
    notes: Note[],
    account: Account

}


// export class AccountC implements Account{
//     constructor(
//         public score: number,
//         public ratio: number,
//         public risk: number,
//         public status: Status,
//         public investment_plan: string
//     ){}
// }

// export class Notec implements Note{
//     constructor(
//         public creation_date: string,
//         public note: string,
//         public status: Status,
//         public document_status: Status,
//         public document_link: string,
//         public offer: string,
//         public offer_date: string
//     ){}
// }

// export class ClientC implements Client {
//     constructor(
//         public id: string,
//         public name: string,
//         public profession: string,
//         public category: string, 
//         public tel: string,
//         public email: string, 
//         public address: string,
//         public town: string,
//         public linkedIn_link: string,
//         public cp: string,
//         public notation: number,
//         public notes: Note[],
//         public account: Account

//     ){}
// }
