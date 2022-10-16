"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccount = void 0;
class UserAccount {
    constructor(twitterApi, userName) {
        this.userName = userName;
        this.twitterApi = twitterApi.twitter.v2;
        this.user = this.searchAccount();
    }
    /**
     *  Search tweeter user acount
     * @return {Promise<UserV2Result>}
     */
    async searchAccount() {
        return this.twitterApi.userByUsername(this.userName, { 'user.fields': ['public_metrics', 'verified', 'description', 'location'] });
    }
    /**
     * Get user id of the account
     * @return {Promise<String>} Tweeter user ID
     */
    async getUserId() {
        return (await this.searchAccount()).data.id;
    }
    /**
       * Get metrics of the account
       * @return {Promise<AccountMetrics>}
       */
    async getPublicMetrics() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const user = (await this.user).data;
        return {
            followersCount: (_b = (_a = user.public_metrics) === null || _a === void 0 ? void 0 : _a.followers_count) !== null && _b !== void 0 ? _b : 1,
            followingCount: (_d = (_c = user.public_metrics) === null || _c === void 0 ? void 0 : _c.following_count) !== null && _d !== void 0 ? _d : 1,
            tweetCount: (_f = (_e = user.public_metrics) === null || _e === void 0 ? void 0 : _e.tweet_count) !== null && _f !== void 0 ? _f : 1,
            listedCount: (_h = (_g = user.public_metrics) === null || _g === void 0 ? void 0 : _g.listed_count) !== null && _h !== void 0 ? _h : 1,
            verified: (_j = user.verified) !== null && _j !== void 0 ? _j : false
        };
    }
    /**
       *
       * @return {Promise<string>} return the description of the account
       */
    async getDescription() {
        return (await this.user).data.description || '';
    }
    /**
       *
       * @return {Promise<string>} return the creation date of the account
       */
    async getCreationDate() {
        const createdAt = (await this.user).data.created_at;
        if (createdAt) {
            return createdAt;
        }
        throw new Error('User do not have creation date');
    }
    async getLocation() {
        const location = (await this.user).data.location;
        if (location) {
            return location;
        }
        return false;
    }
    async getFollowers(numberOfPage = 50) {
        const userId = await this.getUserId();
        return this.twitterApi.followers(userId, { 'user.fields': ['username'], max_results: numberOfPage });
    }
    async getFollowing(numberOfPage = 50) {
        const userId = await this.getUserId();
        return this.twitterApi.following(userId, { 'user.fields': ['username'], max_results: numberOfPage });
    }
}
exports.UserAccount = UserAccount;
