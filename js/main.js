
$(function() {
    console.log('Скрипты работают!')
    let user_icon = document.querySelector('.user-header__icon');
    let user_menu =document.querySelector('.user-header__menu');
    
    user_icon.addEventListener("click", function (e) {
        user_menu.classList.toggle('_active');
    });
    
    document.addEventListener("click", function (e) {
        if (!e.target.closest('.user-header')){
            user_menu.classList.remove('_active');
        }
    });
    //=================
        //BodyLock
    
    
        function body_lock(delay) {
            var body = document.querySelector("body");
    
            if (body.classList.contains('_lock')) {
                body_lock_remove(delay);
            } else {
                body_lock_add(delay);
            }
        }
    
        function body_lock_remove(delay) {
            var body = document.querySelector("body");
    
            if (!body.classList.contains('_wait')) {
                var lock_padding = document.querySelectorAll("._lp");
                setTimeout(function () {
                    for (var index = 0; index < lock_padding.length; index++) {
                        var el = lock_padding[index];
                        el.style.paddingRight = '0px';
                    }
    
                    body.style.paddingRight = '0px';
                    body.classList.remove("_lock");
                }, delay);
                body.classList.add("_wait");
                setTimeout(function () {
                    body.classList.remove("_wait");
                }, delay);
            }
        }
    
        function body_lock_add(delay) {
            var body = document.querySelector("body");
    
            if (!body.classList.contains('_wait')) {
                var lock_padding = document.querySelectorAll("._lp");
    
                for (var index = 0; index < lock_padding.length; index++) {
                    var el = lock_padding[index];
                    el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
                }
    
                body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
                body.classList.add("_lock");
                body.classList.add("_wait");
                setTimeout(function () {
                    body.classList.remove("_wait");
                }, delay);
            }
        } //=================
        
        //Menu
    
        
        var iconMenu = document.querySelector(".icon-menu");
    
        if (iconMenu != null) {
            var delay = 500;
            var body = document.querySelector("body");
            var menuBody = document.querySelector(".menu__body");
            iconMenu.addEventListener("click", function (e) {
                if (!body.classList.contains('_wait')) {
                    body_lock(delay);
                    iconMenu.classList.toggle("_active");
                    menuBody.classList.toggle("_active");
                }
            });
        }
    
        ;
    
        function menu_close() {
            var iconMenu = document.querySelector(".icon-menu");
            var menuBody = document.querySelector(".menu__body");
            iconMenu.classList.remove("_active");
            menuBody.classList.remove("_active");
        } //=================
    // Dynamic Adapt v.1
    // HTML data-move="where(uniq class name),position(digi),when(breakpoint)"
    // e.x. data-move="item,2,992"
    // Andrikanych Yevhen 2020
    var move_array = [];
    var move_objects = document.querySelectorAll("[data-move]");
    
    if (move_objects.length > 0) {
    	for (var _index10 = 0; _index10 < move_objects.length; _index10++) {
    		var _el6 = move_objects[_index10];
    
    		var data_move = _el6.getAttribute("data-move");
    
    		if (data_move != "" || data_move != null) {
    			_el6.setAttribute("data-move-index", _index10);
    
    			move_array[_index10] = {
    				parent: _el6.parentNode,
    				index: index_in_parent(_el6)
    			};
    		}
    	}
    }
    
    function dynamic_adapt() {
    	var w = document.querySelector("body").offsetWidth;
    
    	if (move_objects.length > 0) {
    		for (var _index11 = 0; _index11 < move_objects.length; _index11++) {
    			var _el7 = move_objects[_index11];
    
    			var _data_move = _el7.getAttribute("data-move");
    
    			if (_data_move != "" || _data_move != null) {
    				var data_array = _data_move.split(",");
    
    				var data_parent = document.querySelector("." + data_array[0]);
    				var data_index = data_array[1];
    				var data_bp = data_array[2];
    
    				if (w < data_bp) {
    					if (!_el7.classList.contains("js-move_done_" + data_bp)) {
    						if (data_index > 0) {
    							//insertAfter
    							var actual_index = index_of_elements(data_parent)[data_index];
    							data_parent.insertBefore(_el7, data_parent.childNodes[actual_index]);
    						} else {
    							data_parent.insertBefore(_el7, data_parent.firstChild);
    						}
    
    						_el7.classList.add("js-move_done_" + data_bp);
    					}
    				} else {
    					if (_el7.classList.contains("js-move_done_" + data_bp)) {
    						dynamic_adaptive_back(_el7);
    
    						_el7.classList.remove("js-move_done_" + data_bp);
    					}
    				}
    			}
    		}
    	}
    
    	// custom_adapt(w);
    }
    
    function dynamic_adaptive_back(el) {
    	var index_original = el.getAttribute("data-move-index");
    	var move_place = move_array[index_original];
    	var parent_place = move_place["parent"];
    	var index_place = move_place["index"];
    
    	if (index_place > 0) {
    		//insertAfter
    		var actual_index = index_of_elements(parent_place)[index_place];
    		parent_place.insertBefore(el, parent_place.childNodes[actual_index]);
    	} else {
    		parent_place.insertBefore(el, parent_place.firstChild);
    	}
    }
    
    function index_in_parent(node) {
    	var children = node.parentNode.childNodes;
    	var num = 0;
    
    	for (var _i2 = 0; _i2 < children.length; _i2++) {
    		if (children[_i2] == node) return num;
    		if (children[_i2].nodeType == 1) num++;
    	}
    
    	return -1;
    }
    
    function index_of_elements(parent) {
    	var children = [];
    
    	for (var _i3 = 0; _i3 < parent.childNodes.length; _i3++) {
    		if (parent.childNodes[_i3].nodeType == 1 && parent.childNodes[_i3].getAttribute("data-move") == null) {
    			children.push(_i3);
    		}
    	}
    
    	return children;
    }
    
    window.addEventListener("resize", function (event) {
    	dynamic_adapt();
    });
    dynamic_adapt();
    function ibg() {
        var _ibg = document.querySelectorAll("._ibg");
    
        for (var i = 0; i < _ibg.length; i++) {
            if (_ibg[i].querySelector('img') && _ibg[i].querySelector('img').getAttribute('src') != null) {
                _ibg[i].style.backgroundImage = 'url(' + _ibg[i].querySelector('img').getAttribute('src') + ')';
            }
        }
    	
    }
    
    ibg();
    //SLIDERS
    if($('.main-slider__body').length>0){
    	console.log($('.main-slider__body').length);
    	$('.main-slider__body').slick({
    		//autoplay: true,
    		//infinite: false,
    		dots: false,
    		arrows: false,
    		accessibility:false,
    		slidesToShow:1,
    		autoplaySpeed: 3000,
    		adaptiveHeight:false,
    		// nextArrow:'<button type="button" class="slick-next"></button>',
    		// prevArrow:'<button type="button" class="slick-prev"></button>',
    		responsive: [{
    			breakpoint: 768,
    			settings: {
    				
    			}
    		}]
    	});
    }
    
    $('.control-main-slider__arrow_prev').click(function(event){
        $('.main-slider__body').slick('slickPrev');
    });
    
    $('.control-main-slider__arrow_next').click(function(event){
        $('.main-slider__body').slick('slickNext');
    });
    
    
    //_______________________________
    
    if($('.slider-lots__body').length>0){
    	console.log($('.slider-lots__body').length);
    	$('.slider-lots__body').slick({
    		//autoplay: true,
    		// infinite: true,
    		dots: false,
    		arrows: false,
    		accessibility:false,
    		slidesToShow:3,
    		autoplaySpeed: 3000,
    		adaptiveHeight:false,
    		// nextArrow:'<button type="button" class="slick-next"></button>',
    		// prevArrow:'<button type="button" class="slick-prev"></button>',
    		responsive: [
    			{
    			breakpoint: 768,
    			settings: {
    				slidesToShow:2,
    				}
    			},
    			{
    			breakpoint: 500,
    			settings: {
    				slidesToShow:1,
    				}
    			}
    		]
    	});
    }
    
    $('.control-slider-lots__arrow_prev').click(function(event){
        $('.slider-lots__body').slick('slickPrev');
    });
    
    $('.control-slider-lots__arrow_next').click(function(event){
        $('.slider-lots__body').slick('slickNext');
    });
    
    //_______________________________
    
    if($('.slider-quotes__body').length>0){
    	console.log($('.slider-quotes__body').length);
    	$('.slider-quotes__body').slick({
    		//autoplay: true,
    		// infinite: true,
    		dots: false,
    		arrows: false,
    		accessibility:false,
    		slidesToShow:1,
    		autoplaySpeed: 3000,
    		adaptiveHeight:false,
    		infinite: true,
    		speed: 500,
    		fade: true,
    		cssEase: 'linear'
    		// cssEase: 'linear',
    		// nextArrow:'<button type="button" class="slick-next"></button>',
    		// prevArrow:'<button type="button" class="slick-prev"></button>',
    		// responsive: [
    		// 	{
    		// 	breakpoint: 768,
    		// 	settings: {
    		// 		slidesToShow:2,
    		// 		}
    		// 	},
    		// 	{
    		// 	breakpoint: 500,
    		// 	settings: {
    		// 		slidesToShow:1,
    		// 		}
    		// 	}
    		// ]
    	});
    }
    
    // $('.control-slider-lots__arrow_prev').click(function(event){
    //     $('.slider-lots__body').slick('slickPrev');
    // });
    
    $('.control-slider-quotes__circle').click(function(event){
        $('.slider-quotes__body').slick('slickNext');
    });

    //FORMS
    function forms(){
    	//FIELDS
    	$('input,textarea').focus(function(){
    		if($(this).val() == $(this).attr('data-value')){
    				$(this).addClass('focus');
    				$(this).parent().addClass('focus');
    			if($(this).attr('data-type')=='pass'){
    				$(this).attr('type','password');
    			};
    			$(this).val('');
    		};
    		removeError($(this));
    	});
    	$('input[data-value], textarea[data-value]').each(function() {
    		if (this.value == '' || this.value == $(this).attr('data-value')) {
    			if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
    				$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
    			}else{
    				this.value = $(this).attr('data-value');
    			}
    		}
    		if(this.value!=$(this).attr('data-value') && this.value!=''){
    			$(this).addClass('focus');
    			$(this).parent().addClass('focus');
    			if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
    				$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
    			}
    		}
    
    		$(this).click(function() {
    			if (this.value == $(this).attr('data-value')) {
    				if($(this).attr('data-type')=='pass'){
    					$(this).attr('type','password');
    				};
    				this.value = '';
    			};
    		});
    		$(this).blur(function() {
    			if (this.value == '') {
    				if(!$(this).hasClass('l')){
    					this.value = $(this).attr('data-value');
    				}
    					$(this).removeClass('focus');
    					$(this).parent().removeClass('focus');
    				if($(this).attr('data-type')=='pass'){
    					$(this).attr('type','text');
    				};
    			};
    			if($(this).hasClass('vn')){
    				formValidate($(this));
    			}
    		});
    	});
    	$('.form-input__viewpass').click(function(event) {
    		if($(this).hasClass('active')){
    			$(this).parent().find('input').attr('type','password');
    		}else{
    			$(this).parent().find('input').attr('type','text');
    		}
    		$(this).toggleClass('active');
    	});
    }
    forms();
    
    //VALIDATE FORMS
    $('form button[type=submit]').click(function(){
    		var er=0;
    		var form=$(this).parents('form');
    		var ms=form.data('ms');
    	$.each(form.find('.req'), function(index, val) {
    		er+=formValidate($(this));
    	});
    	if(er==0){
    		removeFormError(form);
    		
    		if(ms!=null && ms!=''){
    			showMessageByClass(ms);
    			return false;
    		}
    	}else{
    		return false;
    	}
    });
    function formValidate(input){
    		var er=0;
    		var form=input.parents('form');
    	if(input.attr('name')=='email' || input.hasClass('email')){
    		if(input.val()!=input.attr('data-value')){
    			var em=input.val().replace(" ","");
    			input.val(em);
    		}
    		if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val())) || input.val()==input.attr('data-value')){
    				er++;
    			addError(input);
    		}else{
    			removeError(input);
    		}
    	}else{
    		if(input.val()=='' || input.val()==input.attr('data-value')){
    			er++;
    			addError(input);
    		}else{
    			removeError(input);
    		}
    	}
    	if(input.attr('type')=='checkbox'){
    		if(input.prop('checked') == true){
    			input.removeClass('err').parent().removeClass('err');
    		}else{
    			er++;
    			input.addClass('err').parent().addClass('err');
    		}
    	}
    	if(input.hasClass('name')){
    		if(!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))){
    				er++;
    			addError(input);
    		}
    	}
    	if(input.hasClass('pass-2')){
    		if(form.find('.pass-1').val()!=form.find('.pass-2').val()){
    			addError(input);
    		}else{
    			removeError(input);
    		}
    	}
    		return er;
    }
    function formLoad(){
    	$('.popup').hide();
    	$('.popup-message-body').hide();
    	$('.popup-message .popup-body').append('<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>');
    	$('.popup-message').addClass('active').fadeIn(300);
    }
    function showMessageByClass(ms){
    	$('.popup').hide();
    	popupOpen('message.'+ms,'');
    }
    function showMessage(html){
    	$('.popup-loading').remove();
    	$('.popup-message-body').show().html(html);
    }
    function clearForm(form){
    	$.each(form.find('.input'), function(index, val) {
    			$(this).removeClass('focus').val($(this).data('value'));
    			$(this).parent().removeClass('focus');
    		if($(this).hasClass('phone')){
    			maskclear($(this));
    		}
    	});
    }
    function addError(input){
    		input.addClass('err');
    		input.parent().addClass('err');
    		input.parent().find('.form__error').remove();
    	if(input.hasClass('email')){
    			var error='';
    		if(input.val()=='' || input.val()==input.attr('data-value')){
    			error=input.data('error');
    		}else{
    			error=input.data('error');
    		}
    		if(error!=null){
    			input.parent().append('<div class="form__error">'+error+'</div>');
    		}
    	}else{
    		if(input.data('error')!=null && input.parent().find('.form__error').length==0){
    			input.parent().append('<div class="form__error">'+input.data('error')+'</div>');
    		}
    	}
    	if(input.parents('.select-block').length>0){
    		input.parents('.select-block').parent().addClass('err');
    		input.parents('.select-block').find('.select').addClass('err');
    	}
    }
    function addErrorByName(form,input__name,error_text){
    		var input=form.find('[name="'+input__name+'"]');
    	input.attr('data-error',error_text);
    	addError(input);
    }
    function addFormError(form, error_text){
    	form.find('.form__generalerror').show().html(error_text);
    }
    function removeFormError(form){
    	form.find('.form__generalerror').hide().html('');
    }
    function removeError(input){
    	input.removeClass('err');
    	input.parent().removeClass('err');
    	input.parent().find('.form__error').remove();
    
    	if(input.parents('.select-block').length>0){
    		input.parents('.select-block').parent().removeClass('err');
    		input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
    		//input.parents('.select-block').find('.select-options').hide();
    	}
    }
    function removeFormErrors(form){
    	form.find('.err').removeClass('err');
    	form.find('.form__error').remove();
    }
    // add/to-block.js
    var link = document.querySelectorAll('._goto-block');
    
    if (link) {
    	var blocks = [];
    
    	var _loop7 = function _loop7(_index28) {
    		var el = link[_index28];
    		var block_name = el.getAttribute('href').replace('#', '');
    
    		if (block_name != '' && !~blocks.indexOf(block_name)) {
    			blocks.push(block_name);
    		}
    
    		el.addEventListener('click', function (e) {
    			if (document.querySelector('.menu__body._active')) {
    				menu_close();
    				body_lock_remove(500);
    			}
    
    			var target_block_class = el.getAttribute('href').replace('#', '');
    			var target_block = document.querySelector('.' + target_block_class);
    
    			_goto(target_block, 300);
    
    			e.preventDefault();
    		});
    	};
    
    	for (var _index28 = 0; _index28 < link.length; _index28++) {
    		_loop7(_index28);
    	}
    
    	window.addEventListener('scroll', function (el) {
    		var old_current_link = document.querySelectorAll('._goto-block._active');
    
    		if (old_current_link) {
    			for (var _index29 = 0; _index29 < old_current_link.length; _index29++) {
    				var _el13 = old_current_link[_index29];
    
    				_el13.classList.remove('_active');
    			}
    		}
    
    		for (var _index30 = 0; _index30 < blocks.length; _index30++) {
    			var block = blocks[_index30];
    			var block_item = document.querySelector('.' + block);
    
    			if (block_item) {
    				var block_offset = offset(block_item).top;
    				var block_height = block_item.offsetHeight;
    
    				if (pageYOffset > block_offset - window.innerHeight / 3 && pageYOffset < block_offset + block_height - window.innerHeight / 3) {
    					var current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');
    
    					for (var _index31 = 0; _index31 < current_links.length; _index31++) {
    						var current_link = current_links[_index31];
    						current_link.classList.add('_active');
    					}
    				}
    			}
    		}
    	});
    } //ScrollOnClick (Simple)
    
    
    var goto_links = document.querySelectorAll('._goto');
    
    if (goto_links) {
    	var _loop8 = function _loop8(_index32) {
    		var goto_link = goto_links[_index32];
    		goto_link.addEventListener('click', function (e) {
    			var target_block_class = goto_link.getAttribute('href').replace('#', '');
    			var target_block = document.querySelector('.' + target_block_class);
    
    			_goto(target_block, 300);
    
    			e.preventDefault();
    		});
    	};
    
    	for (var _index32 = 0; _index32 < goto_links.length; _index32++) {
    		_loop8(_index32);
    	}
    }
    
    function _goto(target_block, speed) {
    	var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    	var header = ''; //OffsetHeader
    
    	header = 'header';
    	var options = {
    		speedAsDuration: true,
    		speed: speed,
    		header: header,
    		offset: offset
    	};
    	var scr = new SmoothScroll();
    	scr.animateScroll(target_block, '', options);
    } //SameFunctions
    
    
    function offset(el) {
    	var rect = el.getBoundingClientRect(),
    		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    	return {
    		top: rect.top + scrollTop,
    		left: rect.left + scrollLeft
    	};
    }
})