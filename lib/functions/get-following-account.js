"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScoreOfFollowing = exports.getFollowingAccount = void 0;
const user_account_1 = require("../services/user-account");
const account_score_1 = require("../services/account-score");
const twitter_api_service_1 = require("../services/twitter-api-service");
async function getFollowingAccount(userName, getFollowersAccountOption = {}) {
    let { numberOfAccount: numberOfFriends, credentials, twitterApiService } = getFollowersAccountOption;
    if (!twitterApiService) {
        twitterApiService = twitter_api_service_1.TwitterApiService.getApi(credentials);
    }
    const userAccount = new user_account_1.UserAccount(twitterApiService, userName);
    return (await userAccount.getFollowing(numberOfFriends)).data.map(friend => new user_account_1.UserAccount(twitterApiService, friend.username));
}
exports.getFollowingAccount = getFollowingAccount;
async function getScoreOfFollowing(userName, getFollowersOrFollowingScoreOption = {}) {
    let { numberOfAccount: numberOfFriends, credentials, twitterApiService, keyWords, numberOfTweet } = getFollowersOrFollowingScoreOption;
    if (!twitterApiService) {
        twitterApiService = twitter_api_service_1.TwitterApiService.getApi(credentials);
    }
    const userAccount = new user_account_1.UserAccount(twitterApiService, userName);
    return Promise.all((await userAccount.getFollowing(numberOfFriends)).data.map(async (friend) => {
        const friendsAccount = new user_account_1.UserAccount(twitterApiService, friend.username);
        const score = await new account_score_1.Score(twitterApiService, friendsAccount, keyWords).getScore(numberOfTweet);
        return {
            userName: friendsAccount.userName,
            score: score.score,
            keyWordRepetition: score.keyWordRepetition,
        };
    }));
}
exports.getScoreOfFollowing = getScoreOfFollowing;
