/*監聽 header 位置*/
let $nav = $('#headNav'); /* 取得 id 為 #headNav 的元素 */ 
showOrHideNavBg($(window).scrollTop());

$(window).scroll(function () { // 當畫面移動時
    let scroll = $(window).scrollTop(); // 抓滑動條離上端的距離
    showOrHideNavBg(scroll); 
});

function showOrHideNavBg(position){ //偵測 header 位子而決定背景 class
    let showPosition = 100;
    if(position < showPosition){
        $nav.addClass('nav-transparent');
    } else{
        $nav.removeClass('nav-transparent');
    }
}
