import { Logger } from '@overnightjs/logger';
import countModel from '../models/count';
import CountModel from '../models/count';

import { Keygen } from './keygen';
import { DateValidator } from '../validators/date';

class DateError extends Error {
  message: string;

  constructor(message: string = 'Date Error') {
    super();
    this.message = message;
  }
}

class ValueError extends Error {
  message: string;

  constructor(message: string = 'Value Error') {
    super();
    this.message = message;
  }
}

export class CountService {
  keygen: Keygen;

  constructor() {
    this.keygen = new Keygen();
  }

  async create(totalCount: number) {
    let countObj = new CountModel({
      key: this.keygen.genId(),
      totalCount: totalCount,
      createdAt: new Date()
    });

    return await countObj.save();
  }

  async query(startDate: string,
              endDate: string,
              minCount: number,
              maxCount: number) {
    try {

        if (minCount < 0 || maxCount < 0) {
            throw new ValueError('minCount or maxCount is less than 0.');
        }

        if (
            DateValidator.validate(startDate) === false ||
            DateValidator.validate(endDate) === false
        ) {
            throw new DateError('startDate or endDate is in wrong format.');
        }

        return await countModel.aggregate([
            {
                '$match': {
                    'counts': {
                        '$gte': minCount,
                        '$lte': maxCount
                    },
                    'createdAt': {
                        '$gte': new Date(startDate),
                        '$lte': new Date(endDate)
                    }
                }
            },
            {
                '$project': {
                    '_id': 0,
                    'key': 1,
                    'createdAt': 1,
                    'totalCount': {'$sum': '$counts'}
                }
            },
            {
                '$limit': 5
            }
        ]).exec();
    } catch(err: unknown) {
        Logger.Info('Error occured');
        if (err instanceof DateError || err instanceof ValueError) {
            throw new Error(err.message);
        } else {
            throw new Error('Error occured');
        }
    }
  }
}
