import { Body, Controller, Delete, Get, Param, Post, Put, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ClientProxySuperFlights } from '../common/proxy/client-proxy';
import { FlightDTO } from './dto/flight.dto';
import { Observable, lastValueFrom } from 'rxjs';
import { IFlight } from '../common/interfaces/flight.interface';
import { FlightMSG, PassengerMSG } from '../common/constants';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('flights')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/flight')
export class FlightController {

    constructor(private readonly clientProxy:ClientProxySuperFlights){}



    private _clientProxyFlight = this.clientProxy.clientProxyFlights();
    private _clientProxyPassenger = this.clientProxy.clientProxyPassengers();


    @Post()
    create(@Body() flightDto: FlightDTO ):Observable<IFlight>{
        return this._clientProxyFlight.send(FlightMSG.CREATE, flightDto);
    }


    @Get()
    findAll():Observable<IFlight[]>{
        return this._clientProxyFlight.send(FlightMSG.FIND_ALL,'');
    }

    @Get(':id')
    findOne(@Param('id') id:string):Observable<IFlight>{
        return this._clientProxyFlight.send(FlightMSG.FIND_ONE, id)
    }

    @Put(':id')
    update(@Param('id') id:string, @Body() flightDto:FlightDTO):Observable<IFlight>{
        return this._clientProxyFlight.send(FlightMSG.UPDATE, {id, flightDto});
    }

    @Delete(':id')
    delete(@Param('id') id:string):Observable<any>{
        return this._clientProxyFlight.send(FlightMSG.DELETE, id)
    }

    @Post(':flightId/passenger/:passengerId')
    async addPassenger( @Param('flightId') flightId:string, 
                        @Param('passengerId') passengerId: string,
                        @Body() flightDto: FlightDTO){

        const passenger = await lastValueFrom(this._clientProxyPassenger.send(PassengerMSG.FIND_ONE, passengerId));
        
        if( !passenger ) throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);

        return this._clientProxyFlight.send(FlightMSG.ADD_PASSENGER, { flightId, passengerId })
    }

}
