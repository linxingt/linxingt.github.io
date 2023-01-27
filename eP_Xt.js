$(window).ready(ts);
function ts() {
    // partie nav
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links li");
    hamburger.addEventListener('click', () => {
        //Animate Links
        navLinks.classList.toggle("open");
        links.forEach(link => {
            link.classList.toggle("fade");
        });

        //Hamburger Animation
        hamburger.classList.toggle("toggle");
    });

    // partie fleche top
    var oDiv = document.getElementById('ftop');
    window.onscroll = function () {
        oDiv.style.display = 'block';
        var height = document.documentElement.scrollTop || document.body.scrollTop;
        console.log(height);
        if (height == 0) {
            oDiv.style.display = 'none';
        }
    }

    // partie portfolio tab
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

    // partie projet et loisir sous-titre
    $(".flex div").hover(function () {
        $(this).find(".tit").stop().animate({
            "bottom": "0px"
        }, 500);
    }, function () {
        $(this).find(".tit").stop().animate({
            "bottom": "-60px"
        }, 500);
    });

    // partie loisir grand img
    var modal = document.getElementById('modal');
    var bgImg = document.getElementById('bgImg');
    var thums = document.querySelectorAll('.thum-img');
    Array.from(thums).forEach(thum => {
        thum.addEventListener("click", function () {
            modal.style.display = 'block';
            bgImg.src = thum.src;
            bgImg.style.cursor = 'zoom-out';
        }
        )
    });
    bgImg.onclick = function () {
        modal.style.display = 'none';
    }

    //animation 
    aleft = {
        reset: true,
        origin: 'left',
        easing: 'ease-in-out',
        distance: '60px',
        duration: 1000,
        opcity: 0.5,
        rotate: { x: 0, y: 0, z: 180 },
        scale: 0.1
    }
    ScrollReveal().reveal('.skills-diagram', aleft);
    aleft2 = {
        reset: true,
        origin: 'left',
        easing: 'ease-in-out',
        distance: '60px',
        duration: 600
    }
    ScrollReveal().reveal('#mtxt', aleft2);
    aright = {
        reset: true,
        origin: 'right',
        easing: 'ease-in-out',
        distance: '60px',
        duration: 600
    }
    ScrollReveal().reveal('#mphoto', aright);
    atop = {
        reset: true,
        origin: 'top',
        easing: 'ease-in-out',
        distance: '60px',
        duration: 1000,
        opcity: 0.5,
        scale: 0.2
    }
    ScrollReveal().reveal('.desc', atop);

    
    //meteor
    const body = document.body
    const meteorCreate = () => {
        let meteor = document.createElement('div')
        meteor.classList.add('meteor')
        let size = Math.random() * 10 + 100
        meteor.style.width = size + 'px'
        meteor.style.left = Math.random() * innerWidth + 'px'
        meteor.style.top = Math.random() * innerHeight + 'px'
        body.append(meteor)

        setTimeout(() => {
            meteor.remove()
        }, 900)
    }

    setInterval(() => {
        meteorCreate()
    }, 200)
}
