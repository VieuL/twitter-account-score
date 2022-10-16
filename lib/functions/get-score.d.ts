import { GetScoreOption } from '../models/account';
export declare function getScore(userName: string, getScoreParameters?: GetScoreOption): Promise<{
    score: number;
    keyWordRepetition: number;
}>;
