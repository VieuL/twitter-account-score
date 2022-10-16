import { PlaceV1, TweetGeoV2, TweetUserTimelineV2Paginator } from 'twitter-api-v2';
import { TwitterApiService } from './twitter-api-service';
import { UserAccount } from './user-account';
export interface UserTimeLinePosition {
    geo: TweetGeoV2;
    date: string | undefined;
    id: string;
    v1Geo?: PlaceV1;
}
export declare class UserTimeLine {
    private userAccount;
    private twitterApi;
    private twitterApiV1;
    constructor(twitterApi: TwitterApiService, userAccount: UserAccount);
    getUserTimeLine(): Promise<TweetUserTimelineV2Paginator>;
    getMinimalTimeLine(numberOfTweet: number): Promise<TweetUserTimelineV2Paginator>;
    getTopWords(numberOfTweet?: number, maxWords?: number): Promise<[string, number][]>;
    private removeStopWords;
    timeLineAnalysis(numberOfTweet: number, tweetUserTimelineV2Paginator?: TweetUserTimelineV2Paginator): Promise<number>;
    getPositionIfExist(numberOfTweet?: number): Promise<UserTimeLinePosition[]>;
}
