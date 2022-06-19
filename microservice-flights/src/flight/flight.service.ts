import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FLIGHT } from '../common/models/models';
import { IFlight } from '../common/interfaces/flight.interface';
import { FlightDTO } from './dto/flight.dto';
import { Model } from 'mongoose';

@Injectable()
export class FlightService {


    constructor(@InjectModel(FLIGHT.name)
                private readonly model:Model<IFlight>){}


    async create(flightDto:FlightDTO):Promise<IFlight>{
        const newFlight = new this.model(flightDto);
        return await newFlight.save();
    }


    async getAll(){
        return await this.model.find().populate("passengers");
    }


    async getOne(id:string){
        return await this.model.findById(id).populate("passengers");
    }

    async update(id:string, flightDto:FlightDTO): Promise<IFlight>{
        return await this.model.findByIdAndUpdate(id, flightDto, {new: true});
    }

    async delete( id:string){
        await this.model.findByIdAndDelete(id);
        return {
            status: HttpStatus.OK,
            msg: 'Deleted'
        }
    }

    async addPassenger(flightId:string, passengerId:string ):Promise<IFlight>{
        return await this.model.findByIdAndUpdate(flightId, { 
            $addToSet: { 
                passengers: passengerId } 
            },{new: true}).populate("passengers");  // appending the new passenger
    }
}
