import { Body, Controller, Delete, Get, Param, Post, Put, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDTO } from './dto/flight.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightMSG } from '../common/constants';

@Controller()
export class FlightController {
    constructor(
        private readonly flightService: FlightService){}

    @MessagePattern(FlightMSG.CREATE)
    create(@Payload()fligtDto:FlightDTO){
        return this.flightService.create(fligtDto);
    }

    @MessagePattern(FlightMSG.FIND_ALL)
    getAll(){
        return this.flightService.getAll();
    }

    @MessagePattern(FlightMSG.FIND_ONE)
    getOne(@Payload() id: string){
        return this.flightService.getOne(id);
    }

    @MessagePattern(FlightMSG.UPDATE)
    update(@Payload("id") payload:any){
        return this.flightService.update(payload.id, payload.flightDto);
    }

    @MessagePattern(FlightMSG.DELETE)
    delete(@Payload() id:string){
        return this.flightService.delete(id);
    }


    @MessagePattern(FlightMSG.ADD_PASSENGER)
    addPassanger(@Payload() payload:any){
        return this.flightService.addPassenger(payload.flightId, payload.passengerId);
    }
}
