"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitterApiService = void 0;
const twitter_api_v2_1 = require("twitter-api-v2");
/**
 * Twitter API service
 */
class TwitterApiService {
    /**
     * Private constructor of singleton TwitterApiService.
     * Crete the connection to Twitter API
     */
    constructor(credentials) {
        this.twitter = new twitter_api_v2_1.TwitterApi(credentials);
    }
    /**
     * Create or get TwitterApiService instance, if any parameters was given the function search into environnement variable
     * @return {TwitterApiService} TwitterApiService
     */
    static getApi(credentials = {
        appKey: process.env.APP_KEY || this._throw(),
        appSecret: process.env.APP_SECRET || this._throw(),
        accessToken: process.env.ACCESS_TOKEN || this._throw(),
        accessSecret: process.env.ACCESS_SECRET || this._throw()
    }) {
        if (!TwitterApiService.instance) {
            TwitterApiService.instance = new TwitterApiService(credentials);
        }
        return TwitterApiService.instance;
    }
    /**
     * Throw error
     */
    static _throw() {
        throw new Error('Twitter KEY not fond check environnement variable');
    }
}
exports.TwitterApiService = TwitterApiService;
