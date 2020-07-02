const express = require('express');
const app = express();
const https = require('https');

const bp = require('body-parser');

const yaml = require('js-yaml');
const fs = require('fs');

const mail = require('./vkmailer');

const updater = require('./lil');

app.set('view engine','pug');
app.set('views','pages');

app.use(express.static(__dirname + '/public'));

app.use(bp.urlencoded());

app.use('/', async (req,res,next) => {
    
    req.model = parse('egor').model;    
    next();
});

app.post('/egor', async(req,res) => {
    let { name,email,phone,whatuneed} = req.body;
    mail(`
        Новый заказ!!!
        + Имя: ${name}
        + Почта: ${email}
        + Телефон ${phone}
        + Описание ${whatuneed}
    `);
    res.send(200);
});

app.get('/', async (req,res) => {

    res.render('egor',req.model);
})

app.use(updater);
app.listen(4080, () => { console.log('up') });

try {
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/kalmykov.site/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/kalmykov.site/cert.pem', 'utf8');
    const ca = fs.readFileSync('/etc/letsencrypt/live/kalmykov.site/chain.pem', 'utf8');

    const httpsServer = https.createServer({
        key : privateKey,
        cert : certificate,
        ca : ca
    },app);
    httpsServer.listen(4443,() => {
        console.log('s up');
    });
}
catch(ex) {
    console.log(ex);
}

function parse(name)
{
    return yaml.safeLoad(fs.readFileSync(__dirname + '/resources/'+name+'.yml','utf-8'))[0];
}