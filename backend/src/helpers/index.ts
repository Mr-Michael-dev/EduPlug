import crypto from 'crypto';

const SECRET = 'CLETA-REST-API';

export const random = () => crypto.randomBytes(128).toString('base64');

export const authentication = (salt: string, str: string, password: string) => {
    // return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');

  };
  