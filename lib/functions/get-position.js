"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosition = void 0;
const user_account_1 = require("../services/user-account");
const user_time_line_1 = require("../services/user-time-line");
const twitter_api_service_1 = require("../services/twitter-api-service");
async function getPosition(userName, getScoreParameters = {}) {
    let { numberOfTweet, credentials, twitterApiService } = getScoreParameters;
    if (!twitterApiService) {
        twitterApiService = twitter_api_service_1.TwitterApiService.getApi(credentials);
    }
    const userAccount = new user_account_1.UserAccount(twitterApiService, userName);
    const tl = new user_time_line_1.UserTimeLine(twitterApiService, userAccount);
    const position = await Promise.all([tl.getPositionIfExist(numberOfTweet), userAccount.getLocation()]);
    return { TLPosition: position[0], UserPosition: position[1] };
}
exports.getPosition = getPosition;
