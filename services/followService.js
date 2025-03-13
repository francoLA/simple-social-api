import Follow from "../models/Follow.js";

export const followInfo = async (user) => {
    try {
        let following = await Follow.find({ "user": user.id }).select({"followed": 1, "_id": 0})
        let followers = await Follow.find({ "followed": user.id }).select({"user": 1, "_id": 0})

        let followingIds = following.map((follow) => {
            return follow.followed;
        })

        let followersIds = followers.map((follow) => {
            return follow.user;
        })

        return {
            following: followingIds,
            followers: followersIds
        }

    } catch (error) {
        console.log("error follow service", error);
    }
}   