const { upload, destroy, destroyDirectory, deleteTmp } = require("../utils");
const User = require("../models/User");
const { use } = require("../utils/transporter");
var success = false;

const UserController = {
    search: async (req, res) => {
        const name = req.params.name;
        try {
            var searchUser = await User.find({ name: { $regex: name } })
                .limit(10)
                .select("name avatar followers");
            success = true;
            res.json({
                success,
                message: "This is list of searching _id",
                searchUser,
            });
        } catch (error) {
            console.log(error);
            res.json({ success, message: "There are something wrong!", error });
        }
    },

    follow: async (req, res) => {
        const { userID, friendID } = req.body;

        if (userID !== friendID) {
            try {
                var myself = await User.findOne({ _id: userID }).select(
                    "following"
                );
                var friend = await User.findOne({ _id: friendID }).select(
                    "followers"
                );
                const notFollow =
                    !friend.followers.includes(userID) &&
                    !myself.following.includes(friendID);
                var state = 0;

                if (notFollow) {
                    //Follow
                    await User.findOneAndUpdate(
                        { _id: userID },
                        { $push: { following: friendID } }
                    );

                    friend = await User.findOneAndUpdate(
                        { _id: friendID },
                        { $push: { followers: userID } },
                        { new: true }
                    ).select("name avatar followers");

                    state = 1;
                } else {
                    //Unfollow
                    await User.findOneAndUpdate(
                        { _id: userID },
                        { $pull: { following: friendID } }
                    );

                    friend = await User.findOneAndUpdate(
                        { _id: friendID },
                        { $pull: { followers: userID } },
                        { new: true }
                    ).select("name avatar followers");
                    state = -1;
                }
                success = true;
            } catch (error) {
                console.log(error);
            }
        }

        if (req.files) await deleteTmp(req.files);
        if (success) {
            res.json({ success, message: "Successful action", friend, state });
        } else {
            res.json({ success, message: "May be something wrong" });
        }
    },

    getUserInformationByID: async (req, res) => {
        try {
            const profileID = req.params.id;
            var user = await User.findOne({ _id: profileID }).select(
                "-password"
            );
            success = true;
        } catch (e) {
            console.log(e);
        }

        if (success) {
            res.json({
                success,
                message: "This is a user information",
                user,
            });
        } else {
            res.json({
                success,
                message: "Get user fail",
            });
        }
    },
};

module.exports = UserController;
