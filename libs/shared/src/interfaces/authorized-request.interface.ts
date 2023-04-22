import { AuthorizedUser } from '@acua/shared/m-user';
import { Request } from 'express';

export interface AuthorizedRequest extends Request {
    user: AuthorizedUser;
}
