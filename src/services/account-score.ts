import { TwitterApiService } from './twitter-api-service'
import { UserAccount } from './user-account'
import { UserTimeLine } from './user-time-line'
import { TweetScoreService } from './tweet-score'

export class Score {
  private twitterApiService: TwitterApiService
  private userAccount: UserAccount
  private userTimeLine: UserTimeLine
  private tweetScoreService: TweetScoreService
  constructor (twitterApiService: TwitterApiService, userAccount: UserAccount, keyWord: string[] = []) {
    this.userAccount = userAccount
    this.twitterApiService = twitterApiService
    this.userTimeLine = new UserTimeLine(this.twitterApiService, this.userAccount)
    this.tweetScoreService = new TweetScoreService(keyWord)
  }

  private async userPublicMetric () {
    const userPublicMetric = await this.userAccount.getPublicMetrics()
    return (
      ((userPublicMetric.followersCount) / userPublicMetric.followingCount) +
            (0.1 * userPublicMetric.tweetCount) +
            (500 * (userPublicMetric.verified ? 1 : 0))
    )
  }

  private async userTimeLineAnalysis (numberOfTweet: number) {
    const tl = await (await this.userTimeLine.getUserTimeLine()).fetchLast(numberOfTweet)
    const score = await Promise.all(tl.data.data.map((tweet) => this.tweetScoreService.getTweetScore(tweet)))
    if (score.length) {
      return {score: score.reduce((pv, cv) => (pv += cv.score), 1) / score.length, keyWordRepetition: score.reduce((pv, cv) => pv += cv.keyWordRepetition, 0)}
    }
    return { score: 0, keyWordRepetition: 0};
  }

  public async getScore (numberOfTweet: number = 200) {
    const timeLineScoreAndKw = await this.userTimeLineAnalysis(numberOfTweet);
    return { score: (await this.userPublicMetric()) + timeLineScoreAndKw.score, keyWordRepetition: timeLineScoreAndKw.keyWordRepetition };
  }
}
