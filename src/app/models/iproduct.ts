export interface IProduct {
    id: number | string;
    name: string;
    quantity: number;
    price: number;
    img: string;
    categoryID: number
    purshasedDate? : number
}
