import bcrypt from "bcrypt";

import validateUser from "../helpers/validators/users.js";
import User from "../models/Users.js";

import createToken from "../services/jwt.js";

export const createUser = (req, res) => {
    const params = req.body;

    // validate
    try {
        validateUser(params);
    } catch (error) {
        return res.status(400).json({
            status: "Error",
            message: "Data is missing"
        });
    }

    const user = new User(params);

    User.find({
        $or: [
            {email: user.email.toLowerCase()},
            {nick: user.nick}
        ]
    }).then((usersResult) =>{
        
        if (usersResult && usersResult.length >= 1) {
            return res.status(400).json({
                status: "Error",
                message: "User already exists"
            });
        }

        bcrypt.hash(user.password, 10).then((pass) => {
            user.password = pass;

            user.save().then((saveResult) => {
                return res.status(200).json({
                    status: "Success",
                    message: "User created succesfully",
                    user: saveResult
                });
            }).catch((err) => {
                console.log(err);
                return res.status(400).json({
                    status: "Error",
                    message: "Error while saving new user"
                });
            })  
        })

    }).catch((err) => {
        console.log("createUser err", err);
    });
}

export const login = (req, res) => {
    const params = req.body;

    if (!params.email || !params.password) return res.status(404).json({status: "Error", message: "Data is missing"})

    User.find({email: params.email}).then((findRes) => {
        if (!findRes || findRes.length == 0) return res.status(404).json({status: "Error", message: "User dont exist"})

        const passCompare = bcrypt.compareSync(params.password, findRes[0].password);

        if (!passCompare) return res.status(404).json({status: "Error", message: "Password incorrect"})

        const token = createToken(findRes[0]);

        return res.status(200).json({
            status: "Success",
            message: "Login successfull",
            user: {
                name: findRes[0].name,
                lastname: findRes[0].lastname,
                nick: findRes[0].nick,
            },
            token
        })
    })
}

export const getUsers = (req, res) => {
    User.find({}).then((result) => {
        if(!result){
            return res.status(400).json({
                status: "Error",
                message: "No users found"
            });
        }
        return res.status(200).json({
            status: "Success",
            message: "Users found",
            users: result,
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            status: "Error",
            message: "No users found"
        });
    })
}

export const getUser = (req, res) => {

    const userId = req.params.id;

    User.findById(userId).select({password: 0}).then((result) => {
        if(!result){
            return res.status(400).json({
                status: "Error",
                message: "No User found"
            });
        }
        return res.status(200).json({
            status: "Success",
            message: "User found",
            user: result
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            status: "Error",
            message: "No User found"
        });
    })

}

export const update = (req, res) => {

    const params = req.body;

    User.find({
        $or: [
            {email: params.email.toLowerCase()},
            {nick: params.nick}
        ]
    }).then((result) => {
        if (result && result.length >= 1) {
            return res.status(400).json({
                status: "Error",
                message: "User already exists"
            });
        }
    })

    User.findOneAndUpdate({_id: req.user.id}, params, {new: true}).then((result) => {
        return res.status(200).json({
            status: "Success",
            message: "User updated",
            userUpdated: result
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            status: "Error",
            message: "Error when attempting to update user"
        });
    })

}