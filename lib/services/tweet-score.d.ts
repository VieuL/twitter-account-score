import { TweetV2 } from 'twitter-api-v2';
export declare class TweetScoreService {
    keyWord: string[];
    constructor(keyWord: string[]);
    getTweetScore(tweet: TweetV2): Promise<{
        score: number;
        keyWordRepetition: number;
    }>;
}
