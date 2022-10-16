import { TwitterApi } from 'twitter-api-v2'
import { Credentials } from '../models/account'

/**
 * Twitter API service
 */
export class TwitterApiService {
  private static instance: TwitterApiService
  public twitter: TwitterApi
  /**
   * Private constructor of singleton TwitterApiService.
   * Crete the connection to Twitter API
   */
  private constructor (credentials: Credentials) {
    this.twitter = new TwitterApi(credentials)
  }

  /**
   * Create or get TwitterApiService instance, if any parameters was given the function search into environnement variable
   * @return {TwitterApiService} TwitterApiService
   */
  public static getApi (
    credentials: Credentials = {
      appKey: process.env.APP_KEY || this._throw(),
      appSecret: process.env.APP_SECRET || this._throw(),
      accessToken: process.env.ACCESS_TOKEN || this._throw(),
      accessSecret: process.env.ACCESS_SECRET || this._throw()
    }
  ): TwitterApiService {
    if (!TwitterApiService.instance) {
      TwitterApiService.instance = new TwitterApiService(credentials)
    }
    return TwitterApiService.instance
  }

  /**
   * Throw error
   */
  private static _throw (): string {
    throw new Error('Twitter KEY not fond check environnement variable')
  }
}
