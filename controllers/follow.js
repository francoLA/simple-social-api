import Articles from "../models/Articles.js";
import Follow from "../models/Follow.js";
import { followInfo } from "../services/followService.js";

export const save = (req, res) => {
    const params = req.body;

    const userLoged = req.user;

    let newFollow = new Follow({
        user: userLoged.id,
        followed: params.followedID
    });

    newFollow.save().then((result) => {
        return res.status(200).json({
            status: "Success",
            message: "Follow created succesfully",
            followStored: result
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            status: "Error",
            message: "Error while following"
        });
    })

}

export const unfollow = (req, res) => {
    const params = req.body;

    const userLoged = req.user;

    Follow.findOneAndDelete({
        "user": userLoged.id,
        "followed": params.followedID
    }).then((result) => {
        return res.status(200).json({
            status: "Success",
            message: "Unfollow succesfully",
            followDeleted: result
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            status: "Error",
            message: "Error while unfollowing"
        });
    })
}

export const following = (req, res) => {
    const userLoged = req.user;

    let page = 1;

    if (req.params.page) page = req.params.page

    const itemsPerPage = 5;

    Follow.find({
        "user": userLoged.id
    }).populate("user followed", "-password")
    .then((result, total) => {
        return res.status(200).json({
            status: "Success",
            message: "List of following users",
            following: result,
            total
        });
    })


}

export const feed = async (req, res) => {

    let followData = await followInfo(req.user);

    Articles.find({user: followData.following}).populate("user", "-password -_id -__v").sort("-created_at")
    .then((result) => {
        console.log("feed result", followData.following);
        
        return res.status(200).json({
            status: "Success",
            message: "Feed",
            feed: result
        });
    }).catch((err) => {
        console.log("Feed error", err);
    })
}