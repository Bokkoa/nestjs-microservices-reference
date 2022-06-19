import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";


@Catch()
export class AllExceptionFIlter implements ExceptionFilter{
    
    private readonly logger = new Logger(AllExceptionFIlter.name);
    
    catch(exception: any, host: ArgumentsHost){

        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req =  ctx.getRequest();

        const status = exception instanceof HttpException 
                        ? exception.getStatus()
                        : HttpStatus.INTERNAL_SERVER_ERROR

        const message = exception instanceof HttpException ? exception.getResponse() : exception;

        this.logger.error(`Status ${status} error: ${JSON.stringify(message)}`)

        res.status(status).json({
            timestamps: new Date().toISOString(),
            path: req.url,
            error: message
        });

    }
}