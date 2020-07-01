//Hi! I'm simple deploy bot

const express = require('express');
const router = express.Router();
const cmd = require('node-cmd');

router.post('/git', (req,res) => {
    
    let info = JSON.parse(req.body.payload);
    if(info.ref === 'refs/heads/master')
    {
        cmd.get(`
            cd ${__dirname}
            git fetch --all
            git reset --hard origin/master
            npm install
            pm2 reload server --force
        `,(err,data,stderr) => {
            if(!err)
            {
                res.send("Updated:\n" + data);
            }
            else
            {
                res.status(500).send(JSON.stringify(err) + " " + JSON.stringify(stderr));
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