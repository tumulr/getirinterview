import * as crypto from 'crypto'

export class Keygen {
  constructor() {}

  genId(idLength: number = 16) {
    return crypto.randomBytes(16).toString('hex');
  }
}
