$(document).ready(function(){
	$.ajaxSetup({cache: false});
	var speakers;

	$.getJSON( "../assets/json/data.json", function(data) {
		console.dir(data);
		speakers = data.speakers;
		initSecond();
	});
	//var speakers = [];
	var mobileQuery = window.matchMedia('(max-width : 767px)');
	var modalShown = false;

	$( document ).ajaxError(function() {
		$('.top-buffer').prepend("Need to be on server to access external speakers file. Here is some test content.");
		console.log("Need to be on server to access external speakers file. Here is some test content.");
		offline();
	});

	//console.log(info);
		//sortData(data);
		//initSecond();
	

	function offline(){
		var info = "Bushra\|\|Senior Director\|Nicholas Cage\'presentations\'stuff\|aldksflkj description\|Adding Cage\-ism\|Friday October 21, 7:00\-8:00PM\|loremipsum.com\|http://loremipsum.com\|link.com\|socialMedia.com\\Person\|\|Junior Something\|eqwr\'sdf\'jobs\'stuffs\|dfjljjjf desc\|Bloops\|Sunday, 5\-2AM\|bleepbloop.com\|http://website.com\|otherlink.com\|http://url.com\\Kiddo\|\|Manager of Someplace\|laskdfj\'ekcv\'lafkj\|bnc,mznvew descr\|Meeps\|Monday, 4\-0PM\|meepmeep.com\|http://website.com\|otherotherlink.com\|http://url.com\\Fourtho\|\|Manager of Someotherplace\|cxzxcv\'qweg\'lfdhshh\|erasdgardff descr\|Mops\|Monday, 4\-6PM\|meepmop.com\|http://website.com\|otherslink.com\|http://url.com";
		//sortData(info);
		initSecond();
	}

	/*function sortData(data){
		info = data.replace(/\n/g, '').split('\\');
		for(var i = 0; i < info.length; i++){
			info[i] = info[i].split('\|');
			var speaker = {
				name: info[i][0],
				image: info[i][1],
				position: info[i][2],
				fields: info[i][3].split('\''),
				description: info[i][4],
				presentations: info[i][5].split('_'),
				website: info[i][6],
				websiteURL: info[i][7],
				socialMedia: info[i][8],
				socialMediaURL: info[i][9]
			};
			speakers.push(speaker);
		}
	}*/

	function initSecond(){

		/*for(var i = 0; i < speakers.length; i++){
			var fields = "";
			for(var j = 0; j < speakers[i].fields.length; j++){
				fields += (speakers[i].fields[j].toString());
				if(j < speakers[i].fields.length-1)
					fields += ", ";
			}
			$('.container-speakers').append(
				'<div class="speaker">\n<img src=\"' + speakers[i].image + '\" class=\"speaker-image\">\n' + 
				'<div class="speaker-content"><h2 class="speaker-name">' + speakers[i].name + '</h2>\n' +
				'<p class="speaker-fields">' + fields + '</p>\n<button type=\"button\" class=\"speaker-expand btn contact-btn btn-effect\" onclick=\"return false;\">View More</button>\n</div>\n</div>'
			);
		}*/
		$('.speaker-image').each(function(){
			$(this).after('<div class=\"speaker-image-hover\"></div>');
		});

		$('.modal-closer').click(function(){
			closeModal();
		});
		
		$('.modal__x').click(function(){
			closeModal();
			console.log('closing');
		});

		//change clicking on speaker to clicking on view more depending on size
		if($('.speaker-expand').css('display') == 'none')
			var mobile = false;
		else
			var mobile = true;

		/*if(mobile){
			$('.speaker-expand').click(function(){
				showModal($(this).parents('.speaker'));
			});
			$('.speaker-image').click(function(){
				showModal($(this).parent());
			});
		}*/
		//else{
			$('.speaker').click(function(){
				showModal(this);
			});
		//}
	}

	$(window).resize(function(){ // also changes clicking on speaker to clicking on view more
		$('.speaker').off();
		$('.speaker-expand').off();
		$('.speaker-image').off();
		if($('.speaker-expand').css('display') == 'none'){
			//mobile = false;
			$('.speaker').click(function(){
				showModal(this);
			});
		}
		else{
			//mobile = true;
			$('.speaker-expand').click(function(){
				showModal($(this).parents('.speaker'));
			});
			$('.speaker-image').click(function(){
				showModal($(this).parent());
			});
		}
		if(mobileQuery.matches)
			$('.container-fluid').removeClass('blur');
		if(!mobileQuery.matches && modalShown)
			$('.container-fluid').addClass('blur');
	});

	function showModal(speaker){
		modalShown = true;
		//$('.modal__content').detach();
		fillModal($(speaker).index());
		$('.speakers-modal').toggleClass('modal--hidden');
		$('.modal-closer').toggleClass('modal--hidden');

		/*if(!mobileQuery.matches)
			$('.container-fluid').addClass('blur');
		$('.speakers-splash-words').attr('id', 'changeBG');*/
	}

	function closeModal(){
		modalShown = false;
		$('.speakers-modal').toggleClass('modal--hidden');
		$('.modal-closer').toggleClass('modal--hidden');

		/*if(!mobileQuery.matches)
			$('.container-fluid').removeClass('blur');
		$('.speakers-splash-words').removeAttr('id');*/
	}

	function fillModal(i){
		/*var presentations = "";
		for(var k = 0; k < speakers[i].presentations.length; k++){
			if((k%2) == 0)
				presentations += '<p class=\"speakers-modal-presentation\">' + speakers[i].presentations[k] + '<\/p>';
			else
				presentations += '<p class=\"speakers-modal-dateTime\">' + speakers[i].presentations[k] + '<\/p>';
		}*/

		$('.speakers-modal__name').html(speakers[i].firstName + " " + speakers[i].lastName);
		$('.speakers-modal__position').html(speakers[i].position + " at " + speakers[i].company);
		$('.speakers-modal__headshot').attr('src', speakers[i].headshot);

		$('.modal__accord').html("");
		speakers[i].presentations.forEach(function(pres){
			$('.modal__accord').append('<p class="modal__accord-title speakers-modal__event"><span>+</span> '+pres.title+'</p><div class="modal__accord-item"><p>'+pres.description+'</p></div>');
		});

		$('.modal__accord-title').click(function(){
			if($(this).children('span').html() == '–')
				$(this).children('span').html('+');
			else
				$(this).children('span').html('&ndash;');
			
			$(this).next().toggleClass('open');
		});
		//$('.speakers-modal__desc').html(speakers[i].description);
		/*$('.speakers-modal').append(
			'<div class=\"modal__content\">\n<img src=\"' + speakers[i].image + '\" class=\"speakers-modal__headshot\">\n' + 
			'<div class=\"speakers-modal-info\">\n' + 
			'<h2 class=\"speakers-modal-name\">' + speakers[i].name + '<\/h2>\n' +
			'<p class="speakers-modal-position">' + speakers[i].position + '<\/p>\n' +
			'<div class=\"modal-space-holder\"></div>' + 
			'<p class="speakers-modal-description">' + speakers[i].description + '<\/p>\n' +
			'<div class=\"speakers-modal-links\"><a href=\"' + speakers[i].websiteURL + '\" class=\"speakers-modal-website link-effect\" target=\"_blank\">' + speakers[i].website + '<\/a>\n<br>' +
			'<a href=\"' + speakers[i].socialMediaURL + '\" class="speakers-modal-socialMedia link-effect" target=\"_blank\">' + speakers[i].socialMedia + '<\/a><\/div>' + 
			'<h3 class="speakers-modal-label">Presentations<\/h3>\n' +
			presentations + '\n' +
			'<a href=\"..\/schedule.html\" class="link-effect">View Schedule<\/a><br>\n' +
			'<\/div><\/div>'
		);*/
		if($('.speakers-modal__headshot').attr('src') == 'https://taw.imgix.net/speakers/jeff_smith.jpg?w=.779&h=1&crop=focalpoint&fit=crop&fp-x=0.2&fp-y=0.3')
			$('.speakers-modal__headshot').attr('title', 'Jeff didn\'t give us a good picture.');
		else
			$('.speakers-modal__headshot').removeAttr('title');
	}
});
