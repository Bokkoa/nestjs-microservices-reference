import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxySuperFlights } from '../common/proxy/client-proxy';
import { Observable } from 'rxjs';
import { IPassenger } from '../common/interfaces/passenger.interface';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerMSG } from '../common/constants';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('passengers')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/passenger')
export class PassengerController {

    constructor( private readonly clientProxy: ClientProxySuperFlights ){}

    private _clientProxyPassenger = this.clientProxy.clientProxyPassengers();

    @Post()
    create(@Body() passengerDto: PassengerDTO ):Observable<IPassenger>{
        return this._clientProxyPassenger.send(PassengerMSG.CREATE, passengerDto);
    }


    @Get()
    findAll():Observable<IPassenger[]>{
        return this._clientProxyPassenger.send(PassengerMSG.FIND_ALL,'');
    }

    @Get(':id')
    findOne(@Param('id') id:string):Observable<IPassenger>{
        return this._clientProxyPassenger.send(PassengerMSG.FIND_ONE, id)
    }

    @Put(':id')
    update(@Param('id') id:string, @Body() passengerDto:PassengerDTO):Observable<IPassenger>{
        return this._clientProxyPassenger.send(PassengerMSG.UPDATE, {id, passengerDto});
    }

    @Delete(':id')
    delete(@Param('id') id:string):Observable<any>{
        return this._clientProxyPassenger.send(PassengerMSG.DELETE, id)
    }
}
