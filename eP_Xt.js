$(window).ready(ts);
function ts() {
    var contenu = document.querySelectorAll('#contenu>div')
    var event_li = document.querySelectorAll('#ptab>li')
    var currentindex = 0
    for (var i = 0; i < event_li.length; i++) {
        event_li[i].num = i
        event_li[i].onclick = function () {
            contenu[currentindex].style.display = 'none'
            var index_other = this.num
            contenu[index_other].style.display = 'block'
            currentindex = index_other
        }
    }
    $(".flex div").hover(function () {
        $(this).find(".tit").stop().animate({
            "bottom": "0px"
        }, 500);
    }, function () {
        $(this).find(".tit").stop().animate({
            "bottom": "-50px"
        }, 500);
    });

    var modal = document.getElementById('modal');
    var bgImg = document.getElementById('bgImg');
    var thums = document.querySelectorAll('.thum-img');
    Array.from(thums).forEach(thum => {
        thum.addEventListener("click", function () {
            modal.style.display = 'block';
            bgImg.src = thum.src;
        }
        )
    });

    bgImg.onclick = function () {
        modal.style.display = 'none';
    }
}
