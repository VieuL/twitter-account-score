"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScore = void 0;
const user_account_1 = require("../services/user-account");
const account_score_1 = require("../services/account-score");
const twitter_api_service_1 = require("../services/twitter-api-service");
async function getScore(userName, getScoreParameters = {}) {
    let { numberOfTweet, keyWord, credentials, twitterApiService } = getScoreParameters;
    if (!twitterApiService) {
        twitterApiService = twitter_api_service_1.TwitterApiService.getApi(credentials);
    }
    const userAccount = new user_account_1.UserAccount(twitterApiService, userName);
    const score = new account_score_1.Score(twitterApiService, userAccount, keyWord);
    return score.getScore(numberOfTweet);
}
exports.getScore = getScore;
