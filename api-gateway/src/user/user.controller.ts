import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxySuperFlights } from '../common/proxy/client-proxy';
import { UserDto } from './dto/user.dto';
import { Observable } from 'rxjs';
import { IUser } from '../common/interfaces/user.interface';
import { UserMSG } from 'src/common/constants';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/user')
export class UserController {

    constructor(private readonly clientProxy: ClientProxySuperFlights){}

    private _clietnProxyUser = this.clientProxy.clientProxyUsers();

    @Post()
    create(@Body() userDto:UserDto):Observable<IUser>{
        return this._clietnProxyUser.send(UserMSG.CREATE, userDto);
    }


    @Get()
    findAll():Observable<IUser[]>{
        return this._clietnProxyUser.send(UserMSG.FIND_ALL,'');
    }

    @Get(':id')
    findOne(@Param('id') id:string):Observable<IUser>{
        return this._clietnProxyUser.send(UserMSG.FIND_ONE, id)
    }

    @Put(':id')
    update(@Param('id') id:string, @Body() userDto:UserDto):Observable<IUser>{
        return this._clietnProxyUser.send(UserMSG.UPDATE, {id, userDto});
    }

    @Delete(':id')
    delete(@Param('id') id:string):Observable<any>{
        return this._clietnProxyUser.send(UserMSG.DELETE, id)
    }

}
