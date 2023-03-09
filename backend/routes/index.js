var express = require('express');
var router = express.Router();
const Password = require("../models/Password");
/* GET home page. */
router.post('/', function (req, res, next) {
    var pass = req.body.password;
    if (pass) {
        const lowerRegex = new RegExp("^(?=.*[a-z])");
        const upperRegex = new RegExp("^(?=.*[A-Z])");
        const numericRegex = new RegExp("^(?=.*[0-9])");
        const consecutiveRegex = new RegExp('^(([a-zA-Z0-9])\\2?(?!\\2))+$');
        const lengthRegex = new RegExp('^(?=.{6,20}$)');
        const specialRegex = new RegExp("^(?=.*[$&+,:;=?@#|'<>.^*()%!-])");

        var length = (lengthRegex.test(pass));
        var number = (numericRegex.test(pass));
        var upper = (upperRegex.test(pass));
        var lower = (lowerRegex.test(pass));
        var cons = (consecutiveRegex.test(pass));
        var special = (specialRegex.test(pass));

        if (!length) {
            res.json("Password Length should be minimum 6 and maximum 20");
        } else {
            if (!special) {
                var score = 5;
                if (lower && upper && number && cons) {
                    score = 0;
                } else if (lower && upper && number && !cons) {
                    score = 3;
                }
                var storePass = new Password();
                storePass.password = pass;
                storePass.score = score;
                storePass.save();
                res.json("Successfully saved");
            } else {
                res.json("Special characters not allowed");
            }
        }

    }

});

module.exports = router;
