import { TweetV2 } from 'twitter-api-v2'

export class TweetScoreService {
  keyWord: string[]

  constructor (keyWord: string[]) {
    this.keyWord = keyWord
  }

  public async getTweetScore (tweet: TweetV2) {
    const numberOfKeyWordInTweet = this.keyWord.reduce((pv, cv) => {
      if (tweet.text.includes(cv)) {
        pv++
      }
      return pv
    }, 0)
    if (!tweet.public_metrics) {
      return {
          score: 0,
          keyWordRepetition: 0,
      };
    }
    return {score: (
      ((tweet.public_metrics.like_count * 0.3) +
            (tweet.public_metrics.retweet_count * 0.5) +
            (tweet.public_metrics.reply_count * 0.1) +
            (tweet.public_metrics.quote_count * 0.5)) * (numberOfKeyWordInTweet || 1)
    ), keyWordRepetition: numberOfKeyWordInTweet}
  }
}
