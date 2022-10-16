import { UserAccount } from '../services/user-account';
import { GetFollowersOrFollowingAccountOption, GetFollowersOrFollowingScoreOption } from '../models/account';
export declare function getFollowingAccount(userName: string, getFollowersAccountOption?: GetFollowersOrFollowingAccountOption): Promise<UserAccount[]>;
export declare function getScoreOfFollowing(userName: string, getFollowersOrFollowingScoreOption?: GetFollowersOrFollowingScoreOption): Promise<{
    userName: string;
    score: number;
    keyWordRepetition: number;
}[]>;
