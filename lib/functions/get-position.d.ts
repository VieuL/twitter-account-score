import { GetScoreOption } from '../models/account';
export declare function getPosition(userName: string, getScoreParameters?: GetScoreOption): Promise<{
    TLPosition: import("../services/user-time-line").UserTimeLinePosition[];
    UserPosition: string | false;
}>;
