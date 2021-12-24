import { PersonalStock } from "../stock/personalStock.model";

export interface Account{
    name: string,
    value: number,
    cashAvailable: number,
    stocks: PersonalStock[],
    stockValue: number,
    id: number,
    imageUrl: string
}