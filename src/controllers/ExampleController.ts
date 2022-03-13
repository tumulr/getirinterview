import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';

import { CountService } from '../services/count';

@Controller('api')
export class ExampleController {
    countService: CountService;

    constructor() {
        this.countService = new CountService();
    }

    @Post('count')
    private async setCount(req: Request, res: Response) {
        Logger.Info('came here')
        await this.countService.create(req.body.totalCount);

        res.status(200).json({
            message: 'SUCCESS'
        });
    }

    @Post('count/list')
    private async listCount(req: Request, res: Response) {
        Logger.Info('came here')
        try {
            let result = await this.countService.query(
                req.body.startDate,
                req.body.endDate,
                req.body.minCount,
                req.body.maxCount
            );
            console.log(result);

            res.status(200).json({
                'code': 1,
                'message': 'Success',
                'records': result
            });
        } catch(err: any) {
            res.status(400).json({
                'code': err.code,
                'message': err.message
            })
        }
    }

    // @Get(':msg')
    // private getMessage(req: Request, res: Response) {
    //     // Logger.Info(req.params.msg);
    //     res.status(200).json({
    //         message: req.params.msg,
    //     });
    // }
}
