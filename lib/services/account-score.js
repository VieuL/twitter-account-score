"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Score = void 0;
const user_time_line_1 = require("./user-time-line");
const tweet_score_1 = require("./tweet-score");
class Score {
    constructor(twitterApiService, userAccount, keyWord = []) {
        this.userAccount = userAccount;
        this.twitterApiService = twitterApiService;
        this.userTimeLine = new user_time_line_1.UserTimeLine(this.twitterApiService, this.userAccount);
        this.tweetScoreService = new tweet_score_1.TweetScoreService(keyWord);
    }
    async userPublicMetric() {
        const userPublicMetric = await this.userAccount.getPublicMetrics();
        return (((userPublicMetric.followersCount) / userPublicMetric.followingCount) +
            (0.1 * userPublicMetric.tweetCount) +
            (500 * (userPublicMetric.verified ? 1 : 0)));
    }
    async userTimeLineAnalysis(numberOfTweet) {
        const tl = await (await this.userTimeLine.getUserTimeLine()).fetchLast(numberOfTweet);
        const score = await Promise.all(tl.data.data.map((tweet) => this.tweetScoreService.getTweetScore(tweet)));
        if (score.length) {
            return { score: score.reduce((pv, cv) => (pv += cv.score), 1) / score.length, keyWordRepetition: score.reduce((pv, cv) => pv += cv.keyWordRepetition, 0) };
        }
        return { score: 0, keyWordRepetition: 0 };
    }
    async getScore(numberOfTweet = 200) {
        const timeLineScoreAndKw = await this.userTimeLineAnalysis(numberOfTweet);
        return { score: (await this.userPublicMetric()) + timeLineScoreAndKw.score, keyWordRepetition: timeLineScoreAndKw.keyWordRepetition };
    }
}
exports.Score = Score;
