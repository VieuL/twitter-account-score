import { UserAccount } from '../services/user-account'
import { UserTimeLine } from '../services/user-time-line'
import { GetScoreOption } from '../models/account'
import { TwitterApiService } from '../services/twitter-api-service'

export async function getPosition (userName: string, getScoreParameters: GetScoreOption = {}) {
  let { numberOfTweet, credentials, twitterApiService } = getScoreParameters
  if (!twitterApiService) {
    twitterApiService = TwitterApiService.getApi(credentials)
  }
  const userAccount = new UserAccount(twitterApiService, userName)
  const tl = new UserTimeLine(twitterApiService, userAccount)
  const position = await Promise.all([tl.getPositionIfExist(numberOfTweet), userAccount.getLocation()])
  return { TLPosition: position[0], UserPosition: position[1] }
}
