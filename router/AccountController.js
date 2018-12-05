//this page manages all user account methods
import Account from '../models/accountModel.js';
var jwt = require('jsonwebtoken');

var config = require('../config.json');

const secret = config.secret;

class AccountController {
    /*this is the authentication method and first route */
    //create Account method
    createAccount(req, res){
        if(req.body.username && req.body.password){
            var User = new Account();
            User.username = req.body.username;
            User.password = req.body.password;
            User.save(function(err){
                if(err){

                    if(err.code == 11000){
                        return res.json({
                            success: false,
                            message: "A User with this name already exists."
                        });
                    }
                    else{
                        return res.json({
                            success: true,
                            message: "User created! Welcome!"
                        });
                    }
                }
                else{
                    return res.json({
                        success: false,
                        message: "you got missing elements"
                    });
                }
            });
        }
    }

    //login method
    login(req, res){
        if(req.body.username && req.body.password){
            Account.findOne({username: req.body.username}).select('username password').exec(function(err, user){
                if(err){
                    throw err;
                }
                if(!User){
                    res.json({
                        success: false,
                        message: "Authentication failed."
                    });
                }
                else if(User){
                    var validPassword = User.comparePassword(req.body.password);
                    if(!validPassword){
                        res.json({
                            success: false,
                            message: "Authentication failed. Wrong username or password."
                        });
                    }
                    else{
                        var token = jwt. sign({
                            name: User.name,
                            username: User.username,
                            role: User.role_status
                        }, secret, {
                            expiresIn: 60*60*24
                        });
                        res.json({
                            success: true,
                            message: 'Token.',
                            token: token
                        })
                    }
                }
                else{
                    res.json({
                        success: false,
                        message: 'No username or password provided'
                    });
                }   
            });
        }
    }
    //here is some middleware that looks to see if the user has a token.
    //if no token, access denied to other methods.
    fetchToken(req, res, next){
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if(token){
            jwt.verify(token, secret, function(err, decoded){
                if(err){
                    res.status(403).send({
                        success: false,
                        messsage: "Invalid token."
                    });
                }
                else{
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else{
            res.status(403).send({
                success: false,
                message: "No token provided."
            });
        }
    }

}//end of class function 

const accountController = new AccountController();
export default accountController; 