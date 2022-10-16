import { UserAccount } from '../services/user-account';
import { GetFollowersOrFollowingAccountOption, GetFollowersOrFollowingScoreOption } from '../models/account';
export declare function getFollowersAccount(userName: string, getFollowersAccountOption?: GetFollowersOrFollowingAccountOption): Promise<UserAccount[]>;
export declare function getScoreOfFollowers(userName: string, getFollowersOrFollowingScoreOption?: GetFollowersOrFollowingScoreOption): Promise<{
    userName: string;
    score: number;
    keyWordRepetition: number;
}[]>;
