let currentPage = 0;
let currentSubPage = 0;

let cardLength = 4;
let cardSubLength = [0,0,3,0];

let scrolling = false;
document.onwheel = function(e) {
    changeState(Math.sign(e.deltaY));
}

function changeState(direction)
{
    if(scrolling)
        return;


    if(currentSubPage + direction == -1 || currentSubPage + direction == cardSubLength[currentPage] || cardSubLength[currentPage] == 0 )
    {
        currentPage += direction
        currentPage = Math.max(0,Math.min(cardLength-1,currentPage))
    }
    else
    {
        currentSubPage += direction
    }

    scrollPage();

    scrolling = true;
    setTimeout(() => scrolling = false ,500)
}

function scrollPage()
{

    //main
    for(let i = 0; i < currentPage; ++i)
    {
        document.getElementById('c' + i).setAttribute('pos','up');
    }

    document.getElementById('c'+currentPage).removeAttribute('pos');

    for(let i = currentPage + 1; i < cardLength; ++i)
    {
        document.getElementById('c'+i).setAttribute('pos','down');
    }

    //subs

    if(cardSubLength[currentPage] != 0)
    {

        for(let i = 0; i < currentSubPage; ++i)
        {
            document.getElementById('l' + currentPage + 's' + i).setAttribute('pos','up');
        }
    
        document.getElementById('l' + currentPage + 's' + currentSubPage).removeAttribute('pos');

        for(let i = currentSubPage + 1; i < cardSubLength[currentPage]; ++i)
        {
            document.getElementById('l' + currentPage + 's' + i).setAttribute('pos','down');
        }
    }

    //selector
    let s = document.getElementById('selector');
    let m = document.getElementById('m'+(currentPage+currentSubPage));
    

    if(!m)
        return;

    let rect = m.getBoundingClientRect();
    s.style.top = rect.top;
    s.style.left = rect.left;

    s.style.width = rect.width;
    s.style.height = rect.height;

    document.getElementById('title').innerHTML = m.innerHTML.toUpperCase();
    //page logo

}

document.getElementById('m0').onclick = () => {
    
    rollBy(0-currentPage,0);
}

document.getElementById('m1').onclick = () => {
    
    rollBy(1-currentPage,0);
}

document.getElementById('m2').onclick = () => {
    
    rollBy(2-currentPage,0);
}

document.getElementById('m3').onclick = () => {
    
    rollBy(2-currentPage,1)
}

document.getElementById('m4').onclick = () => {

    rollBy(2-currentPage,2);
}

function rollBy(p,s)
{
    if(p == 0)
    {
        currentSubPage = s;
        scrollPage();
    }
    else
    {
        if(Math.abs(p) == 1)
        {
            currentPage += p;
            currentSubPage = s;
            scrollPage();    
        }   
        else
        {
            currentPage += Math.sign(p);
            scrollPage();

            setTimeout(() => rollBy(p - Math.sign(p),s),500);
        }
    }
}

document.getElementById('menu').style.opacity = 1.0;
document.getElementById('menu').style.transitionDelay = "0s";
document.getElementById('menu').style.transitionDuration = "0s";

setTimeout(() => document.getElementById('menu').removeAttribute('style'),200);

document.getElementById('m0').click();

document.getElementById('book').onclick = (e) => {

    let obj = {};

    let ok = true;
    obj.name = checkTextBox('name');
    if(!obj.name)
        ok = false;
    obj.phone = checkTextBox('phone');
    if(!obj.phone)
        ok = false;
    obj.email = checkTextBox('email');
    if(!obj.email)
        ok = false;
    obj.whatuneed = checkTextBox('whatuneed');
    if(!obj.whatuneed)
        ok = false;

    if(!ok)
        return;

    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('whatuneed').value = '';

    $.post('/egor',obj,(res) => {
        console.log(res);
    } );
    UpSubmition();
}

document.getElementById('name').onfocus = () => {uncolorTextBox('name');};
document.getElementById('phone').onfocus = () => {uncolorTextBox('phone');};
document.getElementById('email').onfocus = () => {uncolorTextBox('email');};
document.getElementById('whatuneed').onfocus = () => {uncolorTextBox('whatuneed');};

function checkTextBox(id)
{
    let str = document.getElementById(id).value;
    if(isEmptyOrSpaces(str))
    {
        colorTextBox(id);
        return null;
    }
    else
        return str;
    
}

function colorTextBox(id)
{
    document.getElementById(id).style.borderBottom = '2px solid #c54646';
}

function uncolorTextBox(id)
{
    document.getElementById(id).removeAttribute('style');
}

function UpSubmition()
{
    document.getElementById('submition').style.display = 'flex';
    scrolling = true;

    setTimeout(() => {
        document.getElementById('submition').style.opacity = 1.0;
    },10);

    setTimeout(() => {
        document.getElementById('submition').style.opacity = 0.0;

        setTimeout(() => {
            document.getElementById('submition').removeAttribute('style');
            scrolling = false;
        },201);
    },3000);
    
}

function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

let start = null;
window.ontouchstart = function(e){
    if(e.touches.length === 1){
        start = e.touches.item(0).clientY;
    } else {
        start = null;
    }
}

window.ontouchend = function(e){
    let  offset = 30;
    if(start){
        let end = e.changedTouches.item(0).clientY;

        if(end > start + offset){
            changeState(-1);
        }
        if(end < start - offset ){
            changeState(1);
        }
    }
}