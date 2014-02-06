(function(w) {

	//Check if Mobile
	function checkMobile() {
		mobile = (sw>breakpoint) ? false : true;
		if (!mobile) { //If not Mobile
			loadAux();
			$('aux header a').addClass('disabled').addClass('open');
			$('[role="tabpanel"],#nav,#search').show(); //Show full navigation and search
		} else { //Hide
			if(!$('#nav-anchors a').hasClass('active')) {
				$('#nav,#search').hide();
			}
		}
	}

}) (this);
