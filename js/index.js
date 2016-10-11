/**
 * Created by Administrator on 2016/10/3.
 */
window.onload=function(){
    banner();
}
function banner(){
    var bannerbox=document.querySelector('.banner');
    var w=bannerbox.offsetWidth;
    var bdbox=document.querySelector('.bd');
    var ulbox1=bdbox.querySelector('ul');
    var hdbox=document.querySelector('.hd');
    var ulbox2=hdbox.querySelector('ul');
    var lis=ulbox2.children;
    var index=1;
    var timer=null;
    var setTranslateX=function(currX){
        ulbox1.style.transform='translateX('+currX+'px)';
        ulbox1.style.webkitTransform='translateX('+currX+'px)';//¼æÈÝ
    }
    //¹ý¶ÉÐ§¹û
    var addTransition=function(){
        ulbox1.style.transition='all 0.4s';
        ulbox1.style.webkitTransition='all 0.4s';//¼æÈÝ
    }

    timer=setInterval(function () {
        index++;
        if(index===4){
            index=1;
        }
        var currX=-index*w;
        setPoints(index);
        addTransition();
        setTranslateX(currX);
    },3000);
    var setPoints= function (index) {
        for(var i=0;i<lis.length;i++){
            lis[i].classList.remove('active');
        }
        lis[index-1].classList.add('active');
    }
    var startX=0;
    var moveX=0;
    var distanceX=0;
    var isMove=false;
    bannerbox.addEventListener('touchstart', function (e) {
        clearInterval(timer);
        startX= e.changedTouches[0].clientX;
    });
    bannerbox.addEventListener('touchmove', function (e) {
        isMove=true;
        moveX= e.changedTouches[0].clientX;
        distanceX=moveX-startX;
        currX=-index*w+distanceX;
        setTranslateX(currX);
    });
    bannerbox.addEventListener('touchend', function (e) {
       if(isMove&&Math.abs(distanceX)>1/3*w){
           if(distanceX>0){
               index--;
           }
           if(distanceX<0){
               index++;
           }
           currX=-index*w;
           addTransition();
           setPoints(index);
           setTranslateX(currX);
       }else{
           currX=-index*w;
           setPoints(index);
           setTranslateX(currX);
       }
        timer=setInterval(function () {
            index++;
            if(index===4){
                index=1;
            }
            var currX=-index*w;
            setPoints(index);
            addTransition();
            setTranslateX(currX);
        },3000);
    });
    window.onresize= function () {
        w=bannerbox.offsetWidth;//¸¸ºÐ×Ó¿í¶È
        var currX=-index*w;
        addTransition();
        setTranslateX(currX);
    }
}
