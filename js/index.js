$(function () {
	//音乐
	// function audioAutoPlay(id) {
	// 	var audio = document.getElementById(id);
	// 	audio.play();
	// 	document.addEventListener("WeixinJSBridgeReady", function () {
	// 		audio.play();
	// 	}, false);
	// }
	// audioAutoPlay('musicStar');

	//音乐带动画
	var pauseMark = true;
	$(".music_btn").click(function () {
		if (pauseMark) {
			pauseMark = false;
			$(this).children('img').attr('src', 'images/music_off.png');
			$(this).removeClass('music_on');
			$("#music")[0].pause();
		} else {
			$(this).children('img').attr('src', 'images/music_on.png');
			$(this).addClass('music_on');
			$("#music")[0].play();
			pauseMark = true;
		}
	});

	function audioAutoPlay(id) {
		var audio = document.getElementById(id);
		audio.play();
		document.addEventListener("WeixinJSBridgeReady", function () {
			if (pauseMark) {
				audio.play();
			}
		}, false);
	}
	audioAutoPlay('music');

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
		// history.go(0)
		mySwiper.slideTo(0)
		result_arr = []
		$('.riddle_content .wz_content ul li').css('color', '#000')
		$('.riddle_content .wz_content ul').attr('data-result', '')
		$('.screen10 .success').hide()
		$('.screen10 .error').hide()
	})

	$('.error .invitation').on('click', function () {
		$('.fenxiang').stop().fadeIn()
	})

	$('.fenxiang').on('click', function () {
		$(this).stop().fadeOut()
	})

	$('.screen10 .success .submit span').on('click', function () {
		var username = $('.username').val()
		var userphone = $('.userphone').val()

		if (!username) {
			mui.alert('请填写姓名')
			return false
		}

		if (!userphone) {
			mui.alert('请填写电话')
			return false
		}

		if (!(/^[1][0-9]{10}$/.test(userphone))) {
			mui.alert('请输入正确的手机号码')
			return false
		}

		$.ajax({
			type: "post",
			url: "http://h.uudiv.com/api/adduser.php",
			data: {
				name: username,
				phone: userphone
			},
			dataType: 'json',
			beforeSend: function () {
				NProgress.start();
			},
			success: function (res) {
				if (res.success) {
					mui.alert('成功参与抽奖', '提示', '确定', function () {
						$('.fenxiang').stop().fadeIn()
					})
				} else {
					mui.alert(res.message, '提示', '确定')
				}
			},
			complete: function () {
				NProgress.done();
			}
		});


	})

})