(function($){

	$.fn.j_slider = function(data) {
		
		var _that = $(this)[0] ;
		//console.log(_that)

		var sliderApp = {
			Models: {},
			Views: {},
			Controllers: {},
			Events: {}
		}

		//Models
		sliderApp.Models = (function () {
			var Constr;
			Constr = {
				slideData : data.data,
				getSlideData : function(){
					return(this.SlideData);
				}
			}
			
			return Constr;
		})();

		sliderApp.Events = {
			CLICK:'CLICK',
		};

		
		//controller
		sliderApp.Controllers = (function () {

			var sliderPoint = {
				current : 0
			}
			var timer;
			var Constr;

		  Constr = {
		  	init: function () {

		  		this.timer( sliderPoint.current );
		  		sliderApp.Views.init();

		  	},
		  	timer: function (i) {
		  		timer = setInterval(function(){
								
						if( $(_that).children('div').length -1 > i){ 
							i++;
						}else{
							i = 0;
						}

						sliderPoint.current = i;
						sliderApp.Views.change(sliderPoint.current);

					},5000);
		  	},
		  	clearTimer: function (i) {
		  		clearInterval(timer);
		  		this.timer( i );
		  	},
		  	bindClick : function() {

		  		$('.control a').bind( sliderApp.Events.CLICK , function () {

						$(this).each(function(key,value){
							$(this).click(function(){

								sliderPoint.current = $(this).index();

								sliderApp.Controllers.clearTimer( sliderPoint.current );
								sliderApp.Views.change( sliderPoint.current );
								
							})
						});

					});

					$('.control a').trigger( sliderApp.Events.CLICK  );
					
		  	}
		  }
		  return Constr;
		})();

		//view
		sliderApp.Views = (function () {
			var Constr;
			
			Constr = {
				init : function() {

					sliderApp.Models.slideData.map(function(data){ 
	  				
	  				$(_that).append(' <div><img src="src/' + data.src + ' "><div class="inner"><h1 style="color:' + data.color + ' "> ' + data.text + '<span>' + data.text1 +'</span><div style="border: 1px solid' + data.color + ' "></div></h1><h2 style="color:' + data.color2 + ' "> ' + data.text2 + '</h2><h3 style="color:' + data.color + ' "> ' + data.text3 + '</h3</div></div>')
	  				
	  			});

	  			$(_that).each(function(){
						$(this).find('.inner').addClass('animated').addClass('animatedDelay').addClass('fadeInTopSlight').addClass('fadeInLeftSlight').addClass('fadeIn');
					});

					var str = '';
					for(var i=0;i<$(_that).children('div').length;i++){
						str += '<a href="#"></a>';
					}
					
					$(_that).append($('<p class="control">' + str + '</p>'));

					$(_that).children('div').eq(0).addClass('active');
		  		$('.control a').eq(0).addClass('active');

		  		sliderApp.Controllers.bindClick();
		  		
				},
				change : function(i) {
					$(_that).children('div').eq(i).addClass('active').siblings('div').removeClass('active');
					$('.control a').eq(i).addClass('active').siblings('a').removeClass('active');				
				}
			};

			return Constr;
		})();
		

		//init
		sliderApp.Controllers.init();
		return this;

	}
}(jQuery));


	