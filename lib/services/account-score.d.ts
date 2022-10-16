import { TwitterApiService } from './twitter-api-service';
import { UserAccount } from './user-account';
export declare class Score {
    private twitterApiService;
    private userAccount;
    private userTimeLine;
    private tweetScoreService;
    constructor(twitterApiService: TwitterApiService, userAccount: UserAccount, keyWord?: string[]);
    private userPublicMetric;
    private userTimeLineAnalysis;
    getScore(numberOfTweet?: number): Promise<{
        score: number;
        keyWordRepetition: number;
    }>;
}
