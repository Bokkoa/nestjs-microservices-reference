import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { UserMSG } from '../common/constants';


@Controller()
export class UserController {
    
    constructor(private readonly userService:UserService){}

    @MessagePattern(UserMSG.CREATE)
    create(@Payload() userDto: UserDto){
        return this.userService.create(userDto)
    }

    @MessagePattern(UserMSG.FIND_ALL)
    findAll(){
        return this.userService.findAll();
    }

    @MessagePattern(UserMSG.FIND_ONE)
    findOne(@Payload() id:string){
        return this.userService.finOne(id);
    }


    @MessagePattern(UserMSG.UPDATE)
    update(@Payload() payload: any){
        return this.userService.update(payload.id, payload.userDTO);
    }

    @MessagePattern(UserMSG.DELETE)
    delete(@Param() id:string ){
        return this.userService.delete(id);
    }

    @MessagePattern(UserMSG.VALID_USER)
    async validateUser(@Payload() payload:any){

        const user = await this.userService.findByUsername(payload.username);

        const isValidPassword = await this.userService.checkPassword(payload.password, user.password);
        
        if(user && isValidPassword) return user;

        return null;
    }

}
