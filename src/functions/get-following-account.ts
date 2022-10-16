import { UserAccount } from '../services/user-account'
import { GetFollowersOrFollowingAccountOption, GetFollowersOrFollowingScoreOption } from '../models/account'
import { Score } from '../services/account-score'
import { TwitterApiService } from '../services/twitter-api-service'

export async function getFollowingAccount (userName: string, getFollowersAccountOption: GetFollowersOrFollowingAccountOption = {}) {
  let { numberOfAccount: numberOfFriends, credentials, twitterApiService } = getFollowersAccountOption
  if (!twitterApiService) {
    twitterApiService = TwitterApiService.getApi(credentials)
  }
  const userAccount = new UserAccount(twitterApiService, userName)
  return (await userAccount.getFollowing(numberOfFriends)).data.map(friend => new UserAccount(twitterApiService!, friend.username))
}

export async function getScoreOfFollowing (userName: string, getFollowersOrFollowingScoreOption: GetFollowersOrFollowingScoreOption = {}) {
  let { numberOfAccount: numberOfFriends, credentials, twitterApiService, keyWords, numberOfTweet } = getFollowersOrFollowingScoreOption
  if (!twitterApiService) {
    twitterApiService = TwitterApiService.getApi(credentials)
  }
  const userAccount = new UserAccount(twitterApiService, userName)
  return Promise.all((await userAccount.getFollowing(numberOfFriends)).data.map(async friend => {
    const friendsAccount = new UserAccount(twitterApiService!, friend.username)
    const score = await new Score(twitterApiService!, friendsAccount, keyWords).getScore(numberOfTweet) 
    return {
        userName: friendsAccount.userName,
        score: score.score,
        keyWordRepetition: score.keyWordRepetition,
    };
  }))
}
