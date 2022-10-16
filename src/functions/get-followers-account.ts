import { UserAccount } from '../services/user-account'
import { GetFollowersOrFollowingAccountOption, GetFollowersOrFollowingScoreOption } from '../models/account'
import { Score } from '../services/account-score'
import { TwitterApiService } from '../services/twitter-api-service'

export async function getFollowersAccount (userName: string, getFollowersAccountOption: GetFollowersOrFollowingAccountOption = {}) {
  let { numberOfAccount: numberOfFriends, credentials, twitterApiService } = getFollowersAccountOption
  if (!twitterApiService) {
    twitterApiService = TwitterApiService.getApi(credentials)
  }
  const userAccount = new UserAccount(twitterApiService, userName)
  return (await userAccount.getFollowers(numberOfFriends)).data.map(friend => new UserAccount(twitterApiService!, friend.username))
}

export async function getScoreOfFollowers (userName: string, getFollowersOrFollowingScoreOption: GetFollowersOrFollowingScoreOption = {}) {
  let { numberOfAccount: numberOfFriends, credentials, twitterApiService, keyWords, numberOfTweet } = getFollowersOrFollowingScoreOption
  if (!twitterApiService) {
    twitterApiService = TwitterApiService.getApi(credentials)
  }
  const userAccount = new UserAccount(twitterApiService, userName)
  return await Promise.all((await userAccount.getFollowers(numberOfFriends)).data.map(async friend => {
    const friendsAccount = new UserAccount(twitterApiService!, friend.username)
    const score = await new Score(twitterApiService!, friendsAccount, keyWords).getScore(numberOfTweet);
    return {
        userName: friendsAccount.userName,
        score: score.score,
        keyWordRepetition: score.keyWordRepetition,
    };
  }))
}
