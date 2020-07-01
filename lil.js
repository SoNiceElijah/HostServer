//Hi! I'm simple deploy bot

const express = require('express');
const router = express.Router();
const cmd = require('node-cmd');

router.post('/git', (req,res) => {
    
    let info = JSON.parse(req.body.payload);
    if(info.ref === 'refs/heads/master')
    {
        cmd.get(`
            git fetch --all
            git reset --hard origin/master
            npm i
            pm2 reload host.js
        `,(err,data) => {
            if(!err)
            {
                res.send("Updated:\n" + data);
            }
            else
            {
                res.sendStatus(500);
            }

        })
    }
    else
    {
        res.send("Update isn't necessary");
    }

})

//develop push test
module.exports = router;