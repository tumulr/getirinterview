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

    @Get('test')
    private testCheck(req: Request, res: Response) {
        res.status(200).json({
            message: 'SUCCESS'
        })
    }

    @Post('count/list')
    private async listCount(req: Request, res: Response) {
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
                'code': 0,
                'message': err.message
            })
        }
    }
}
