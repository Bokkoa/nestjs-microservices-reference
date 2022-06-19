import { Injectable, HttpStatus } from '@nestjs/common';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from '../common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

    constructor(@InjectModel(USER.name) private readonly model:Model<IUser>){}

    async checkPassword(password:string, passwordDb:string):Promise<boolean>{
        return await bcrypt.compate(password, passwordDb);
    }
    
    async findByUsername( username: string){
        return await this.model.findOne({username});
    }

    async hashPassword(password:string):Promise<string>{
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
    async create(userDTO: UserDto ):Promise<IUser>{
        const hash = await this.hashPassword(userDTO.password);
        const newUser = new this.model({...userDTO, password:hash});
        return await newUser.save();
    }

    async findAll():Promise<IUser[]>{
        return await this.model.find();
    }

    async finOne(id: string):Promise<IUser>{
        return await this.model.findById(id);
    }

    async update(id: string, userDTO: UserDto):Promise<IUser>{

        const hash = await this.hashPassword(userDTO.password);
        const user = {...userDTO, password: hash}
        return await this.model.findByIdAndUpdate(id, user, {new: true});
    }

    async delete(id: string){
        await this.model.findByIdAndDelete(id);
        return { status: HttpStatus.OK, msg: 'Deleted'}
    }



}
