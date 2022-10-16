import { UserAccount } from '../services/user-account'
import { GetScoreOption } from '../models/account'
import { Score } from '../services/account-score'
import { TwitterApiService } from '../services/twitter-api-service'

export async function getScore (userName: string, getScoreParameters: GetScoreOption = {}) {
  let { numberOfTweet, keyWord, credentials, twitterApiService } = getScoreParameters
  if (!twitterApiService) {
    twitterApiService = TwitterApiService.getApi(credentials)
  }
  const userAccount = new UserAccount(twitterApiService, userName)
  const score = new Score(twitterApiService, userAccount, keyWord)
  return score.getScore(numberOfTweet)
}
