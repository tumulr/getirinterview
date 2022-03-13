import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { connect } from 'mongoose';
import * as config from '../config/config.json';

class ExampleServer extends Server {

    private readonly SERVER_STARTED = 'Example server started on port: ';
    private readonly ROUTE_NOT_EXISTS = 'The route provided does not exists.';

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.setupControllers();
    }

    private setupControllers(): void {
        const ctlrInstances = [];
        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = (controllers as any)[name];
                ctlrInstances.push(new controller());
            }
        }
        super.addControllers(ctlrInstances);
    }

    public connect_to_DB() {
        return connect(config.db)
            .catch(() => {
                Logger.Info('Mongo Service is down.');
                process.exit();
            });
    }

    public start(port: number): void {
        this.app.get('*', (req, res) => {
            res.send(this.ROUTE_NOT_EXISTS);
        });
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}

export default ExampleServer;
