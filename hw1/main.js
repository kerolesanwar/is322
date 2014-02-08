$(w).resize(function(){ //Update dimensions on resize
	sw = document.body.clientWidth;
	sh = document.body.clientHeight;
	checkMobile();
});

//Check if Mobile
function checkMobile() {
  mobile = (sw > breakpoint) ? false : true;

    if (!mobile) { //If Not Mobile
        loadAux(); 
	$('.aux header a').addClass('disabled').addClass('open');
	$('[role="tabpanel"],#nav,#search').show(); //Show full navigation and search
     } else { //Hide 
              if(!$('#nav-anchors a').hasClass('active')) {
                    $('#nav,#search').hide(); //Hide full navigation and search
               }
     }
}

function buildGallery() {
	container.html('<div id="img-list"><ul /></div>');
	imgList = $('#img-list');
	nav.find('a:first').addClass('active');

	//For Each Navigation Link
	nav.find('a').each(function() {
		 var $this = $(this);
	         var href = $this.attr('href');

		  //Prepare list item with image source in data attribute
		  arr += '<li data-imgsrc="'+href+'"></li>';
	 });

	 //Append to #img-list
	 imgList.find('ul').append(arr);

	 //Nav Thumbnail Click
	 nav.on('click, 'a', function(e) {
		var pos = $(this).parent().index();
		e.preventDefault();
		loadImg(pos);
		if(swipeEnabled) {
			mySwipe.slide(index, 300);
		}
		updateNav(pos);
	});
}

Modernizr.load({
	test:Modernizr.touch && Modernizr.csstransitions,
	yep:'js/swipe.js',
	complete: function() {
		if(Modernizr.touch && Modernizr.csstransitions){
			swipeEnabled = true;
			buildSwipe();
		}
	}
});

function buildSwipe() {
	//Initialize Swipe.js
	w.mySwipe = new Swipe (document.getElementbyId('img-list'), {
		callback: function(event, index, elem) {
			updateNav(index);
			loadImg(index+1);
		}
	});
	imgList.addEventListener('touchstart', function(event) {
	    			loadImg(w.mySwipe.getPos()+1);
							}, false);
}

//Dynamically Load Images
function loadImg(index) {
	var lis = imgList.find('li'),
		li = lis.eq(index),
		imgSrc = li.attr('data-imgsrc');
	if(!swipeEnabled) {					
		lis.hide();		
		li.show();
	}
	if(li.html() === "") { //If li is empty
		var img = new Image();
		imgList.addClass('loading');
		$(img).load(function () { //Load image						
			$(this).hide();
			li.removeClass('loading');
			$(this).fadeIn();
		}).error(function () {
			//notify the user that the image could not be loaded
		}).attr('src', imgSrc);
		$('<img />'>.attr('src', imgSrc).appendTo(li);
	}
}


}
