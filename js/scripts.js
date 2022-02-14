var div = $('#header');
var p = $(window).scrollTop();
var start = $(div).offset().top;
var sa = $('#intro').height();

var scrollDir='', lastScrollPos=0, offset=30, baseOffset=60;
var heights=new Array();

function headerDown(){
	$(div).addClass('fixed').css('position','fixed');
	$(div).stop().css('top', '0px');
}

function headerUp(){
	$(div).removeClass('fixed').css('position','static');
}
function onscroll() {
	var t = $(window).scrollTop();
	var idx=-1;
	for(var i=0;i<heights.length;i++){
		if(heights[i]>=t){
			idx=i-1;
			break;
		}
	}
	if(idx==-1) idx=heights.length-1;
	//$('#header nav a').removeClass('active');
	//$('#header nav a[data-index="' + idx + '"]').addClass('active');
}
function scaling(){
	//for fixed headers:
	var headerOffset = $('.header-container').height(); //set to 0 for no fixed header
	offset = headerOffset + baseOffset;
	heights=new Array();
	$('#sections .section').each(function() {
		heights.push(parseInt($(this).offset().top, 10) - offset);
	});
	if(($(window).height() - headerOffset) > ($(document).height() - heights[heights.length-1])) { //viewport is taller than the last section
		heights.pop();
		heights.push($(document).height() - ($(window).height() - headerOffset) + offset);
	}

}

$(function(){
	$('#intro').parallax('50%','0.1');
	// fixed header 
	if(p >= sa && !$(div).hasClass('fixed')){
        headerDown();
    }
    $.event.add(window, "scroll", 
    	function() {
	    	p = $(window).scrollTop();
	    	if(p >= sa && !$(div).hasClass('fixed')){
	       		headerDown();
		    } else if (p <= sa && p > div.height() && $(div).hasClass('fixed')){
		    	headerUp();
		    }
    	});
    // end fixed header
    var offset = 40;
    $('#intro div.span12').fadeIn(1500);
    $('#header nav a').add('.scroll').click(function(e){
		$.scrollTo($(this).attr('href'), 1200, {
			easing: 'easeOutQuint',
			offset: -offset,
			axis:'y'
		});
	});
	$(window).resize(scaling).scroll(onscroll);
	$(window).resize(function(){
		div = $('#header');
		p = $(window).scrollTop();
		start = $(div).offset().top;
		sa = $('#intro').height();
	});
	$('#header nav a').each(function(idx) {
		$(this).attr('data-index', idx);
	});
	$('#sections > div').each(function(idx) {
		$(this).attr('data-index', idx);
	});
	scaling();
	onscroll();

	$('#mobilenav').change(function(){
		if($('#mobilenav option:selected').val() != ''){
			offset = 100;
			if($('#mobilenav option:selected').val() != 'home'){
				$.scrollTo($('#mobilenav option:selected').val(), 1200, {
					easing: 'easeOutQuint',
					offset: -offset,
					axis:'y'
				});
			} else {
				$('body,html').animate({scrollTop:0},400);
			}
		} 
	});


	$('.home').click(function(){
		$('body,html').animate({scrollTop:0},400);
	});

	var form = $(this);
	var post_url = form.attr('action');
	var post_data = form.serialize();
	$('#contact-form').submit(function(e){
		e.preventDefault();
		$('#feedback p').html('Submitting...');
		var form = $(this);
		var post_url = form.attr('action');
		var post_data = form.serialize();
		var valid  = true;
		var firstInput = null;
		$('.required').each(function(){
			var value = $(this).val();
			if (value == ''){
				$(this).addClass('error');
				valid=false;
				if(firstInput == null){
					firstInput = $(this);
					$('#feedback p').html('');
					$('#feedback p').html('Please fill in the required fields.');
				}
			} else {
				valid=true;
			}
		});
		$.ajax({
			type: 'POST',
			url: post_url,
			data: post_data,
			success: function(msg){
				$(this).removeClass('error');
				$('#feedback p').html('');
				$('#feedback p').html(msg);
				if(msg == 'Please enter a valid email address.'){
					$('#email1').addClass('error');
				} else if (msg == 'Thanks. Your email was sent successfully.'){
					$('form input').add('form textarea').each(function(){
						$(this).val(' ');
					});
					$('.required').removeClass('error');
				}
			},
			error: function(msg){
				$('#feedback p').html('');
				$('#feedback p').html(msg);
			}
		});
	});
});