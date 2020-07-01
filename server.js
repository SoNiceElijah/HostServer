const express = require('express');
const app = express();

const bp = require('body-parser');

const yaml = require('js-yaml');
const fs = require('fs');

const mail = require('./vkmailer');

const updater = require('./lil');

app.set('view engine','pug');
app.set('views','pages');

app.use(express.static(__dirname + '/public'));

app.use(bp.urlencoded());

app.use('/egor', async (req,res,next) => {
    
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

app.get('/m1', (req,res) => {
    res.send('lol');
})

app.get('/egor', async (req,res) => {

    res.render('egor',req.model);
})

app.use(updater);
app.listen(4000, () => { console.log('up') });

function parse(name)
{
    return yaml.safeLoad(fs.readFileSync(__dirname + '/resources/'+name+'.yml','utf-8'))[0];
}