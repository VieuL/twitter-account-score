import { TwitterApiService } from '../services/twitter-api-service';
export interface AccountMetrics {
    followersCount: number;
    followingCount: number;
    tweetCount: number;
    listedCount: number;
    verified: boolean;
}
export interface Credentials {
    appKey: string;
    appSecret: string;
    accessToken: string;
    accessSecret: string;
}
export interface GetScoreOption {
    numberOfTweet?: number;
    keyWord?: string[];
    credentials?: Credentials;
    twitterApiService?: TwitterApiService;
}
export interface GetPositionOption {
    numberOfTweet?: number;
    credentials?: Credentials;
    twitterApiService?: TwitterApiService;
}
export interface GetFollowersOrFollowingAccountOption {
    numberOfAccount?: number;
    credentials?: Credentials;
    twitterApiService?: TwitterApiService;
}
export interface GetFollowersOrFollowingScoreOption extends GetFollowersOrFollowingAccountOption {
    numberOfTweet?: number;
    keyWords?: string[];
}
