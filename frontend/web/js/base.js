$(document).on('click', '.navbar-lang', function(e){

	e.stopPropagation();

	lang = $(this).attr('data-lang');
    $.ajax({
        url: '/site/change-language',
        method: 'get',
        data: {to: lang},
        success: function(data) {
        	// console.log(data);
            window.location.reload();
        },
        error: function(data) {
            console.log(data);  
        },
    });

});


$(document).ready(function(){
	
	$(".box-quest-vopros-label").on("click", function(){
				
		if ($(this).parent().find(".box-quest-vopros-desc").css("display") == "none") {

			$(".box-quest-vopros-desc").hide();	
			$(".box-quest-vopros").removeClass("box-quest-vopros-label-hv");
						
			$(this).parent().find(".box-quest-vopros-desc").show();		
			$(this).parent().addClass("box-quest-vopros-label-hv");
		
		} else {
			
			$(".box-quest-vopros-desc").hide();
			$(this).parent().removeClass("box-quest-vopros-label-hv");
			
		}	
		
	});
	
	
	$('.menuToggle').on('click', function(){
		$('#menu').toggleClass('menu-open');
	});
	
	$(".owl-carousel1").owlCarousel({
		items:1,
		nav:true
	});
	
	$(".owl-carousel2").owlCarousel({
		items:1,
		nav:true
	});
	
	$(".owl-prev").html('');
	$(".owl-next").html('');

	$(".box-menu").on("click", "a", function (event) {
        event.preventDefault();
		
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 800);

    });
	
	
	$(".box-menu1").on("click", "a", function (event) {
        event.preventDefault();
		
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 800);
		
		$('#menu').removeClass("menu-open");
    });	
	
	
	$('.popupbutton1').fancybox({
        'padding': 0,
        'overlayOpacity': 0.9,
        'overlayColor': '#fff',
        'transitionIn': 'none',
        'transitionOut': 'none',
        'titlePosition': 'inside',
        'centerOnScroll': true,
		afterClose: function(){
			$(".start1").css("display","block");
			$(".end1").css("display","none");
		}		
    });

	$(".poletelephon").mask("+7 (999) 999-9999");
	
	
	$(".post-consult").click(function(event){
		event.preventDefault();
		
		var parent = $(this).parent().parent();
		
		parent.find(".required").css("border", "1px solid #CCC");
		
		var name = parent.find("input[name=consult-name]").val().trim();
		var phone = parent.find("input[name=consult-phone]").val().trim();
		var body = parent.find("textarea[name=consult-body]").val().trim();
		
		
		var err = 1;
		
		parent.find(".required").each(function(){

			if ($(this).val().trim() == '') {
				err = 0;
				$(this).css("border", "1px solid red");
			}
		});
			
		if (err) {
			$.ajax({
				type: 'post',
				url: '/site/form-consult',
				// contentType: 'application/json',
				// dataType: 'json',
				data: {
					ConsultForm: {name: name, phone: phone, body: body},
					_csrf: yii.getCsrfToken()
				},
				error: function(data){
					console.log(data);
					parent.find(".msg-error").removeClass('hidden');
				},
				success: function(data){	
					console.log(333333333);
					console.log(data);
					parent.find(".end1").css("display", "block");
				}
			});

			parent.find(".start1").css("display", "none");	

			parent.find("input[name=consult-name]").val("");
			parent.find("input[name=consult-phone]").val("");
			parent.find("textarea[name=consult-body]").val("");
		}
	});
	
	
	
	$(".post-partner").click(function(event){
		event.preventDefault();
		
		var parent = $(this).parent().parent();
		
		parent.find(".required").css("border", "1px solid #CCC");
		
		var name = parent.find("input[name=partner-name]").val().trim();
		var phone = parent.find("input[name=partner-phone]").val().trim();
		
		var filled = 1;
		
		parent.find(".required").each(function(){
			if ($(this).val().trim() == '') 
			{
				filled = 0;
				$(this).css("border", "1px solid red");
			}
		});
			
		if (filled) 
		{
			$.ajax({
				type: "POST",
				url: "site/form-partner",
				data: {
					PartnerForm: { name: name, phone: phone }
				},
				error: function(data){	
					console.log(data);
					parent.find(".msg-error").removeClass('hidden');
				},
				success: function(data){	
					console.log(data);
					parent.find(".end1").css("display", "block");
				}
			});

			parent.find(".start1").css("display", "none");
		
			parent.find("input[name=partner-name]").val("");
			parent.find("input[name=partner-phone]").val("");
		}
	});	

});