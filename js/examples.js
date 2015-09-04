//———————————————————————————————————————
//
//	YOUTUBE FIXR: MAKE YOUTUBE VIDEOS NOT LOAD UNTIL CLICKED
//
//———————————————————————————————————————



var youtubeFixer = function() {
    var videos = document.getElementsByClassName("youtube-player");
    for (var i = 0; i < videos.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = labnolThumb(videos[i].dataset.id);
        div.onclick = labnolIframe;
        videos[i].appendChild(div);
    }
};
 
function labnolThumb(id) {
    return '<div class="youtube-thumb" style="background: url(' + '//i.ytimg.com/vi/' + id + '/hqdefault.jpg) center center; background-size: cover;"></div><div class="play-button"></div>';
}
 
function labnolIframe() {
    var iframe = document.createElement("iframe");
    //showinfo=0 gets rid of Watch Later and Share buttons.
    iframe.setAttribute("src", "//www.youtube.com/embed/" + this.parentNode.dataset.id + "?autoplay=1&autohide=1&border=0&showinfo=0&wmode=opaque&controls=1&width=640&height=360&rel=0");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("id", "youtube-iframe");
    iframe.setAttribute("allowfullscreen", "1");
    this.parentNode.replaceChild(iframe, this);
}


// This is a function to be used later. It replaces previously loaded iframes
// with the youtube thumb divs created by youtubeFixer()

var vidToThumb = function() {
		if(document.getElementsByTagName("iframe")[0]) {
		//get the only iframe
		var iframe = document.getElementsByTagName("iframe")[0];
		//replace the iframe with a placeholder
		var div = document.createElement("div");
		//get the iframe's parent and use that data-id for the placeholder
        div.innerHTML = labnolThumb(iframe.parentNode.dataset.id);
        div.onclick = labnolIframe;
        iframe.parentNode.replaceChild(div, iframe);
    }
};





//———————————————————————————————————————
//
//		WHEN THE WINDOW LOADS, DO THIS:
//
//		1. MAKE CARDS SELECTABLE
//		2. HIDE ALL PREVIEWBOX CONTENT
//		3. Add a close button to previews
//		4. USE THE YOUTUBE FIXR
//
//———————————————————————————————————————

var setBgSelect = function() {
	var items = document.getElementsByClassName("item");
	for (var k=0; k<items.length; k++) {
		items[k].onclick = function () {
			bgSelect(this, "item");
			showPreview(this, "item");
		};
	}
};


// The next two functions use this variable
var previews = document.getElementsByClassName("previewBox");


// Hide all of the previewboxes
var hidePreviews = function() {
    //Turn iframe into a thumb
    vidToThumb();

    for(var i=0; i<previews.length; i++) {
		previews[i].style.display = "none";
	}
};


// Add a close button to all of the previewboxes
var closeButton = function(){	
	for(var i=0; i<previews.length; i++) {
		var closer = document.createElement("a");
		var c = document.createTextNode("Close");
		closer.appendChild(c);
		closer.classList.add("closer");
		closer.onclick = function() {
			hidePreviews();
		};
		previews[i].appendChild(closer);
	}
};



// Do all of these on window load.
var loader = function() {
	hidePreviews();
	closeButton();
	youtubeFixer();
	setBgSelect();

	//If the window loads with a # in the URL, make the right card selected, and make the right previewBox show up.
	if(window.location.hash) {
		// Make card selected
		var card = document.getElementsByClassName(window.location.hash.substr(1));
		card[0].classList.add("selected");

		//Make previewbox show up
		var preview = document.getElementById(window.location.hash.substr(1));
		preview.style.display = "block";
	}
};

window.onload = loader;




//———————————————————————————————————————
//
//		EXPANDS OR COLLAPSES
// 		SELECTED SECTION
//
//———————————————————————————————————————


var expandContract = function(a) {

	var section = a.parentElement;
	var title = a.innerHTML;
	var sHeight = section.style.maxHeight;

	// EXPAND
	if(sHeight === "345px" || sHeight === "") {
		title = title.replace('▸','▾');
		a.innerHTML = title;
		section.style.maxHeight = "none";
	}
	
	// COLLAPSE
	else {
		title = title.replace('▾','▸');
		a.innerHTML = title;
		section.style.maxHeight = "345px";
	}
	
}




//———————————————————————————————————————
//
//		SWITCHES BACKGROUND COLOR FOR
// 		SELECTED ITEM
//
//———————————————————————————————————————

var bgSelect = function(a, thisClass) {

	//Makes the thing the only ".item" that is also ".selected"
    var siblings = document.getElementsByClassName(thisClass);
    for (var i = 0; i < siblings.length; i++) {
        siblings[i].classList.remove("selected");
    }
    a.classList.add("selected");
};



//———————————————————————————————————————
//
//	Makes the the previewbox show up when you click on a card
//
//———————————————————————————————————————

var showPreview = function(a, thisClass) {

	//Changes the card's background color to make it look selected
    bgSelect(a, thisClass);
	
	// Replace any previously loaded iframe with a placeholder
	vidToThumb();

	//
	// NOW, TIME TO MAKE THE RIGHT THING SHOW UP!
	//

	// Count which number of child was clicked on
	var index = Array.prototype.indexOf.call(a.parentNode.children, a);

	// Convert index (an odd number) into the number of the card that was clicked on
	index = index+1;
	index = index*.5;

	// Subtract one to correct for the h4
	index = index-1;

	// Make the right previewBox show up
	var rightPreview = a.parentElement.getElementsByClassName("previewBox");
		rightPreview[index].style.display = "block";

	var rightId = rightPreview[index].id;

	// Change the URL
	parent.location.hash = rightId;
};



// Makes the previewbox disappear when they press ESCAPE

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        hidePreviews();
    }
};






//———————————————————————————————————————
//
//		FILTERING MENU
//
//———————————————————————————————————————

//function for resetting filters
var showAll = function() {
	var cards = document.getElementsByTagName("article");
	for(i=0;i<cards.length;i++){
		cards[i].style.display = "block";
	}
	document.getElementById("highlights").style.display = "block";
	document.getElementById("speeches").style.display = "block";
	document.getElementById("quotes").style.display = "block";

	var menus = document.getElementsByTagName("select");
	for (var i = 0; i < menus.length; i++) {
		menus[i].selectedIndex = 0;
	};
}

//function for hiding all cards
var hideCards = function() {
	var cards = document.getElementsByTagName("article");
	for(i=0;i<cards.length;i++){
		cards[i].style.display = "none";
	}
}


var filterBy = function(a) {
  
	//get the right menu
	var menu = document.getElementsByTagName("select")[a];

	//get the right option
	var opt = menu.getElementsByTagName("option");
	var selectedOption = opt[menu.selectedIndex].value;

	//Category menu
	if (a===0) {
		var cats = document.getElementsByClassName("category");
		

		//If it's "all", show all
		if (selectedOption==="all"){
			showAll();
		}
		else {
			//hide all categories
			for (var i=0; i<cats.length; i++) {
				cats[i].style.display = "none";
			}

			//show the right one
			document.getElementById(selectedOption).style.display = "block";
		}
	}

	//College and Person menus
	else if(a===1|a===2) {
		hideCards();
		
		//show appropriate cards
		var theseCards = document.getElementsByClassName(selectedOption);
		for (var i = 0; i < theseCards.length; i++) {
			theseCards[i].style.display = "block";
		};

		//When they choose a person or college, make the other "all colleges"
		if(a===1) {
			document.getElementsByTagName("select")[2].selectedIndex=0;
		}
		else if(a===2) {
			document.getElementsByTagName("select")[1].selectedIndex=0;
		}
	}
};

