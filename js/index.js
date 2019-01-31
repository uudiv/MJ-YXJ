$(function() {
	//音乐
	/*function audioAutoPlay(id) {
		var audio = document.getElementById(id);
		audio.play();
		document.addEventListener("WeixinJSBridgeReady", function() {
			audio.play();
		}, false);
	}
	audioAutoPlay('musicStar');*/

	//swiper-container
	var mySwiper = new Swiper('.swiper-container', {
		autoplay: false,
		direction: 'horizontal',
		loop: false,
		noSwiping: true,
		initialSlide: 0,
		// 如果需要前进后退按钮
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		on: {
			init: function() {
				swiperAnimateCache(this); //隐藏动画元素 
				swiperAnimate(this); //初始化完成开始动画
			},
			slideChangeTransitionEnd: function() {
				swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
				//this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); //动画只展现一次，去除ani类名
			}
		}
	});

	//scroll
	mui('.mui-scroll-wrapper').scroll({
		scrollY: true, //是否竖向滚动
		scrollX: false, //是否横向滚动
		startX: 0, //初始化时滚动至x
		startY: 0, //初始化时滚动至y
		indicators: false, //是否显示滚动条
		deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
		bounce: true //是否启用回弹
	})

})