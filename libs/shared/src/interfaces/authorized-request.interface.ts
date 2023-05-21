import { AuthorizedUser } from '@acua/common/m-user';
import { Request } from 'express';

export interface AuthorizedRequest extends Request {
    user: AuthorizedUser;
}
