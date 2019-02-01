$(function () {
	//音乐
	function audioAutoPlay(id) {
		var audio = document.getElementById(id);
		audio.play();
		document.addEventListener("WeixinJSBridgeReady", function () {
			audio.play();
		}, false);
	}
	audioAutoPlay('musicStar');

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
			init: function () {
				swiperAnimateCache(this); //隐藏动画元素 
				swiperAnimate(this); //初始化完成开始动画
			},
			slideChangeTransitionEnd: function () {
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

	var result_arr = []

	$('.start').on('click', function () {
		mySwiper.slideNext();
	})

	$('.next').on('click', function () {
		if (!$(this).siblings('.riddle').find('ul').attr('data-result')) {
			mui.alert('请选择答案')
			return false
		}
		mySwiper.slideNext();
	})

	$('.next_end').on('click', function () {
		if (!$(this).siblings('.riddle').find('ul').attr('data-result')) {
			return false
		}
		$('.wz_content ul').each((index, item) => {
			result_arr.push($(item).attr('data-result'))
		});
		console.log(result_arr)
		var result_arr_yes = ['A', 'C', 'B', 'A', 'B', 'C', 'A', 'C']
		if (JSON.stringify(result_arr) === JSON.stringify(result_arr_yes)) {
			$('.screen10 .success').show()
		} else {
			$('.screen10 .error').show()
		}
	})

	$('.riddle_content .wz_content ul li').on('click', function () {
		$(this).css('color', '#f00').siblings().css('color', '#000')
		$(this).parent().attr('data-result', $(this).attr('data-id'))
	})


	$('.error .again').on('click', function () {
		mySwiper.slideTo(0)
	})

	$('.screen10 .success .submit span').on('click', function () {
		var username = $('.username').val()
		var userphone = $('.userphone').val()
		var useraddress = $('.useraddress').val()
		var useridentity = $('.useridentity').val()

		if (!username || !userphone || !useraddress || !useridentity) {
			mui.alert('请填写完整信息')
		}
	})

})