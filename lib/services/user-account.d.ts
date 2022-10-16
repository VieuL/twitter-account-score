import { UserV2Result, UserV2TimelineResult } from 'twitter-api-v2';
import { AccountMetrics } from '../models/account';
import { TwitterApiService } from './twitter-api-service';
export declare class UserAccount {
    userName: string;
    private twitterApi;
    private user;
    constructor(twitterApi: TwitterApiService, userName: string);
    /**
     *  Search tweeter user acount
     * @return {Promise<UserV2Result>}
     */
    searchAccount(): Promise<UserV2Result>;
    /**
     * Get user id of the account
     * @return {Promise<String>} Tweeter user ID
     */
    getUserId(): Promise<string>;
    /**
       * Get metrics of the account
       * @return {Promise<AccountMetrics>}
       */
    getPublicMetrics(): Promise<AccountMetrics>;
    /**
       *
       * @return {Promise<string>} return the description of the account
       */
    getDescription(): Promise<string>;
    /**
       *
       * @return {Promise<string>} return the creation date of the account
       */
    getCreationDate(): Promise<string>;
    getLocation(): Promise<string | false>;
    getFollowers(numberOfPage?: number): Promise<UserV2TimelineResult>;
    getFollowing(numberOfPage?: number): Promise<UserV2TimelineResult>;
}
