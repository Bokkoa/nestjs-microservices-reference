import { IPassenger } from './passenger.interface';
export interface IFlight{
    pilot:string;
    airplane: string;
    detinationCity: string;
    flightDate: Date;
    passengers: IPassenger[]
}