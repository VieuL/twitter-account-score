import { PlaceV1, TweetGeoV2, TweetUserTimelineV2Paginator, TwitterApiv2 } from 'twitter-api-v2'
import { processingSentiment } from './sentiment-analysis'
import { TwitterApiService } from './twitter-api-service'
import { UserAccount } from './user-account'

export interface UserTimeLinePosition { geo: TweetGeoV2; date: string | undefined; id: string; v1Geo?: PlaceV1 }
export class UserTimeLine {
  private userAccount: UserAccount
  private twitterApi: TwitterApiv2
  private twitterApiV1
  constructor (twitterApi: TwitterApiService, userAccount: UserAccount) {
    this.userAccount = userAccount
    this.twitterApi = twitterApi.twitter.v2
    this.twitterApiV1 = twitterApi.twitter.v1
  }

  public async getUserTimeLine (): Promise<TweetUserTimelineV2Paginator> {
    return this.twitterApi.userTimeline(await this.userAccount.getUserId(), { exclude: ['replies', 'retweets'], 'tweet.fields': 'public_metrics' })
  }

  public async getMinimalTimeLine (numberOfTweet: number): Promise<TweetUserTimelineV2Paginator> {
    return (await this.twitterApi.userTimeline(await this.userAccount.getUserId())).fetchLast(numberOfTweet)
  }

  public async getTopWords (numberOfTweet: number = 100, maxWords: number = 10) {
    const timeLine = await this.getMinimalTimeLine(numberOfTweet)
    const countWords: {[word: string]: number} = Object.create(null)
    timeLine.data.data.forEach((data) => {
      const text = this.removeStopWords(data.text.toLocaleLowerCase())
      text.replace(/[^\w\s]/g, '').split(/\s+/).forEach((word) => {
        countWords[word] = (countWords[word] || 0) + 1
      })
    })
    return Object.entries(countWords)
      .sort(([, a], [, b]) => a - b).slice(-maxWords)
  }

  private removeStopWords (str: string): string {
    const stopWords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'im', 'its', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now']
    const res = []
    const words = str.split(' ')
    for (let i = 0; i < words.length; i++) {
      const wordClean = words[i].split('.').join('')
      if (!stopWords.includes(wordClean)) {
        res.push(wordClean)
      }
    }
    return (res.join(' '))
  }

  async timeLineAnalysis (numberOfTweet: number, tweetUserTimelineV2Paginator?: TweetUserTimelineV2Paginator) {
    if (!tweetUserTimelineV2Paginator) {
      tweetUserTimelineV2Paginator = await this.getMinimalTimeLine(numberOfTweet)
    }
    const userTimeLineSentimentAnalysis = Promise.all(tweetUserTimelineV2Paginator.data.data.map((tweet) => processingSentiment(tweet.text)))
    return ((await userTimeLineSentimentAnalysis).reduce((pv, vp) => pv + vp.score, 0)) / (await userTimeLineSentimentAnalysis).length
  }

  async getPositionIfExist (numberOfTweet: number = 1000): Promise<UserTimeLinePosition[]> {
    const geoReturn: UserTimeLinePosition[] = []
    const tl = await (await this.twitterApi
      .userTimeline(await this.userAccount.getUserId(), { exclude: ['replies', 'retweets'], 'tweet.fields': ['geo', 'id', 'created_at'] }))
      .fetchLast(numberOfTweet)
    tl.data.data.forEach((tweet) => {
      if (tweet.geo) {
        geoReturn.push({
          geo: tweet.geo,
          date: tweet.created_at,
          id: tweet.id
        })
      }
    })

    const listOfPlace = await Promise.all([...new Set(geoReturn.map((geo) => geo.geo.place_id))]
      .map((placeId) => this.twitterApiV1.geoPlace(placeId)))
    geoReturn.forEach((geo) => {
      geo.v1Geo = listOfPlace.find((place) => place.id === geo.geo.place_id)
    })
    return geoReturn
  }
}
