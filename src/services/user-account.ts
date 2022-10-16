import { TwitterApiv2, UserV2Result, UserV2TimelineResult } from 'twitter-api-v2'
import { AccountMetrics } from '../models/account'
import { TwitterApiService } from './twitter-api-service'

export class UserAccount {
  public userName: string
  private twitterApi: TwitterApiv2
  private user: Promise<UserV2Result>
  constructor (twitterApi: TwitterApiService, userName: string) {
    this.userName = userName
    this.twitterApi = twitterApi.twitter.v2
    this.user = this.searchAccount()
  }

  /**
   *  Search tweeter user acount
   * @return {Promise<UserV2Result>}
   */
  async searchAccount (): Promise<UserV2Result> {
    return this.twitterApi.userByUsername(this.userName, { 'user.fields': ['public_metrics', 'verified', 'description', 'location'] })
  }

  /**
   * Get user id of the account
   * @return {Promise<String>} Tweeter user ID
   */
  async getUserId (): Promise<string> {
    return (await this.searchAccount()).data.id
  }

  /**
     * Get metrics of the account
     * @return {Promise<AccountMetrics>}
     */
  async getPublicMetrics (): Promise<AccountMetrics> {
    const user = (await this.user).data
    return {
      followersCount: user.public_metrics?.followers_count ?? 1,
      followingCount: user.public_metrics?.following_count ?? 1,
      tweetCount: user.public_metrics?.tweet_count ?? 1,
      listedCount: user.public_metrics?.listed_count ?? 1,
      verified: user.verified ?? false
    }
  }

  /**
     *
     * @return {Promise<string>} return the description of the account
     */
  async getDescription (): Promise<string> {
    return (await this.user).data.description || ''
  }

  /**
     *
     * @return {Promise<string>} return the creation date of the account
     */
  async getCreationDate (): Promise<string> {
    const createdAt = (await this.user).data.created_at
    if (createdAt) {
      return createdAt
    }
    throw new Error('User do not have creation date')
  }

  async getLocation (): Promise<string | false> {
    const location = (await this.user).data.location
    if (location) {
      return location
    }
    return false
  }

  async getFollowers (numberOfPage: number = 50): Promise<UserV2TimelineResult> {
    const userId = await this.getUserId()
    return this.twitterApi.followers(userId, { 'user.fields': ['username'], max_results: numberOfPage })
  }

  async getFollowing (numberOfPage: number = 50): Promise<UserV2TimelineResult> {
    const userId = await this.getUserId()
    return this.twitterApi.following(userId, { 'user.fields': ['username'], max_results: numberOfPage })
  }
}
