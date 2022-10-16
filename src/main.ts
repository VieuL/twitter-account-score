import { UserAccount } from './services/user-account'
import { UserTimeLine } from './services/user-time-line'
import { TwitterApiService } from './services/twitter-api-service'
import { config } from 'dotenv'
import { getFollowersAccount, getScoreOfFollowers } from './functions/get-followers-account'
import { Score } from './services/account-score'

config()
const api = TwitterApiService.getApi()
const user = new UserAccount(api, 'lemondefr')
const score = new Score(api, user)
score.getScore().then(score => console.log(score))
// const tl = new UserTimeLine(api, user)
// user.getPublicMetrics().then(m => console.log(m))
// user.getFollowers(10).then(data => console.log(data))
// getScoreOfFollowers('JCavirot', { numberOfAccount: 10 }).then(data => console.log(data))
// tl.getTopWords().then(data => console.log(data))
// const score = new UserScore(api, user)
// score.computeScore(100, ["bitcoin"]).then(data => console.log(data))
// score.timeLineAnalysis(10).then(data => console.log(data))m
