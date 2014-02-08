(function(w) {
	var sw = document.body.clientWidth,
		sh = document.body.clientHeight,
		breakpoint = 650,
		speed = 800,
		mobile = true;
											
	$(document).ready(function() {
		checkMobile();
		setNav();		
		setImg();		
	});

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
//Toggle navigation for small screens
function setNav() {
	var $anchorLinks = $('#nav-anchors').find('a');
	$anchorLinks.click(function(e){
		e.preventDefault();
		var $this = $(this),
				thisHref = $this.attr('href');
		$('.reveal').hide();			
		if($this.hasClass('active')) {				
			$this.removeClass('active');	
			$(thisHref).hide();								
		} else {		
			$anchorLinks.removeClass('active');		
			$this.addClass('active');
			$(thisHref).show();
		}
	});

}

function setImg() {
	var container = $('#img-container'),
		nav = $('#product-img').find('nav'),
		imgList = Object,
		current = 0,
		swipeEnabled = false;

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
	loadImg(0); //Load initial image
}
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

function updateNav(pos) {
	nav.find('li').removeClass('active');
	nav.find('li:eq('+pos+')').addClass('active');
}

build Gallery();

}

//Set up Auxiliary content
$('.aux header a').addClass('disabled');

function loadAux() {
	var $aux = $('.aux');
	$aux.each(function(index) {
		var $this = $(this),
			auxLink = $this.find('a'), 
			auxFragment = auxLink.attr('href'),			
			auxContent = $this.find('[role=tabpanel]');
		if(auxContent.size()===0 && $this.hasClass('loaded')===false){
			loadContent(auxFragment,$this);
		}
	});
}
function loadContent(src,container) { //Load Tab Content
	container.addClass('loaded');
	$('<div role="tabpanel" />').load(src +' #content > div',function() {
		$(this).appendTo(container);
	});
}

$('.aux header a').click(function() {
	var $this = $(this),
		thisHref = $this.attr('href'),
		tabParent = $(this).parents('section'),
		tabPanel = tabParent.find('[role=tabpanel]');
	if(mobile) { //if Mobile
		if(tabPanel.size()===0) { //Load content if not present
			loadContent(thisHref,tabParent);
			$this.addClass('open');
		} else { //Toggle 
			tabPanel.toggle();					
			$this.toggleClass('open');
		}
	} 
	return false;
});



})(this);
