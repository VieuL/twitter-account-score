import { TwitterApi } from 'twitter-api-v2';
import { Credentials } from '../models/account';
/**
 * Twitter API service
 */
export declare class TwitterApiService {
    private static instance;
    twitter: TwitterApi;
    /**
     * Private constructor of singleton TwitterApiService.
     * Crete the connection to Twitter API
     */
    private constructor();
    /**
     * Create or get TwitterApiService instance, if any parameters was given the function search into environnement variable
     * @return {TwitterApiService} TwitterApiService
     */
    static getApi(credentials?: Credentials): TwitterApiService;
    /**
     * Throw error
     */
    private static _throw;
}
