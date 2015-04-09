//———————————————————————————————————————
//
//	MAKE YOUTUBE VIDEOS NOT LOAD UNTIL CLICKED
//
//———————————————————————————————————————



var youtubeFixer = function() {
    var videos = document.getElementsByClassName("youtube-player");
    for (var i = 0; i < videos.length; i++) {
        var p = document.createElement("div");
        p.innerHTML = labnolThumb(videos[i].dataset.id);
        p.onclick = labnolIframe;
        videos[i].appendChild(p);
    }
};
 
function labnolThumb(id) {
    return '<div class="youtube-thumb" style="background: url(' + '//i.ytimg.com/vi/' + id + '/hqdefault.jpg) center center; background-size: cover;"></div><div class="play-button"></div>';
}
 
function labnolIframe() {
    var iframe = document.createElement("iframe");
    iframe.setAttribute("src", "//www.youtube.com/embed/" + this.parentNode.dataset.id + "?autoplay=1&autohide=1&border=0&wmode=opaque&controls=1&allowfullscreen=true&width=640&height=360&rel=0");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("id", "youtube-iframe");
    this.parentNode.replaceChild(iframe, this);
}









//———————————————————————————————————————
//
//		MAKE LIST ITEMS SELECTABLE 
//	& MAKE SELECTED THINGS HAVE A BLUE BACKGROUND
//	& MAKE THE APPROPRIATE MEDIA CONTENT SHOW UP
//	WHEN A LIST ITEM IS SELECTED.
//
//———————————————————————————————————————





//———————————————————————————————————————
//
//		WHEN THE WINDOW LOADS, DO THIS:
//
//		1. MAKE BUILT LIST ITEMS SELECTABLE
//		2. HIDE ALL LISTS EXCEPT HIGHLIGHTS
//			& HIDE ALL PREVIEWBOX CONTENT
//
//———————————————————————————————————————

var setBgSelect = function() {
	var items = document.getElementsByClassName("item");
	for (var k=0; k<items.length; k++) {
		items[k].onclick = function () {
			bgSelect(this, "item");
			switchMediaContent(this, "item");
		};
	}
};

var hideStuff = function() {
	var stuffToHide = ["speeches", "speech", "quotes", "quote"];
    for(var i=0; i<stuffToHide.length; i++) {
	    var thisThing = document.getElementById(stuffToHide[i]);
    	thisThing.style.display = "none";
	}
}

var loader = function() {
	hideStuff();
	youtubeFixer();
	setBgSelect();

	//If the window loads with a # in the URL, hide the introBox and make selected the appropriate list item.
	if(window.location.hash) {
		document.getElementById("introBox").style.display = "none";
		document.getElementsByClassName(window.location.hash.substr(1))[0].classList.add("selected");
	}
}

window.onload = loader;




//———————————————————————————————————————
//
//		SWITCHES BACKGROUND COLOR FOR
// 		SELECTED ITEM
//
//———————————————————————————————————————

var bgSelect = function(a, thisClass) {

	//Makes the thing the only ".item" or ".mediatype" that is also ".selected"
    var siblings = document.getElementsByClassName(thisClass);
    for (var i = 0; i < siblings.length; i++) {
        siblings[i].classList.remove("selected");
    }
    a.classList.add("selected");
};





//———————————————————————————————————————
//
//	Switches what media shows up when
// 	you click on an option on the left
//
//———————————————————————————————————————

var switchMediaType = function(a, thisClass) {

    //Changes the background color to make it look selected
    bgSelect(a, thisClass);

    //
    //	Hides all media lists and previewbox contents,
    //	hides the #introBox
    //
    var stuffToHide = ["highlights", "highlight", "speeches", "speech", "quotes", "quote", "introBox"];
    for(var i=0; i<stuffToHide.length; i++) {
	    var thisThing = document.getElementById(stuffToHide[i]);
    	thisThing.style.display = "none";
	}

    //Reveals the pertinent media list.
    if (a.getElementsByTagName("p")[0].innerHTML === "Highlight Videos") {
        document.getElementById("highlights").style.display = "block";
    } else if (a.getElementsByTagName("p")[0].innerHTML === "Speeches") {
        document.getElementById("speeches").style.display = "block";
    } else if (a.getElementsByTagName("p")[0].innerHTML === "Text &amp; Quotes") {
        document.getElementById("quotes").style.display = "block";
    }
};



//———————————————————————————————————————
//
//	Switches what media is in the previewbox
//  when you click on a list item
//
//———————————————————————————————————————

var switchMediaContent = function(a, thisClass) {

	//Changes the background color to make it look selected
    bgSelect(a, thisClass);

 //    //Makes the preview box show up
	// var pBox = document.getElementById("previewbox");
	// pBox.style.display = "block";
	
	//Hides everything in the preview box
    var stuffToHide = ["highlight", "speech", "quote", "introBox"];
    for(var i=0; i<stuffToHide.length; i++) {
	    var thisThing = document.getElementById(stuffToHide[i]);
    	thisThing.style.display = "none";
	}

	//
	// NOW, TIME TO MAKE THE RIGHT THING SHOW UP!
	//

	// First, count which child the selected element is.
	var parent = a.parentNode;
	var index = Array.prototype.indexOf.call(parent.children, a);


	//Next, make the preview box show up, hide all of the items, and make the right one show up.
	if(a.parentElement.id === "highlights") {
		var box = document.getElementById("highlight");
		box.style.display = "block";


		var vids = box.getElementsByClassName("youtube-player");
		for(var i=0; i<vids.length; i++) {
			vids[i].style.display = "none";
		}
		vids[index].style.display = "block";
	}

	else if(a.parentElement.id === "speeches") {
		var box = document.getElementById("speech");
		box.style.display = "block";


		var vids = box.getElementsByClassName("youtube-player");
		for(var i=0; i<vids.length; i++) {
			vids[i].style.display = "none";
		}
		vids[index].style.display = "block";
	}
	else if(a.parentElement.id === "quotes") {
		var box = document.getElementById("quote");
		box.style.display = "block";


		var vids = box.getElementsByClassName("quoteText");
		for(var i=0; i<vids.length; i++) {
			vids[i].style.display = "none";
		}
		vids[index].style.display = "block";
	}
};










//———————————————————————————————————————
//
//		MAKE LIST ITEMS SELECTABLE 
//	& MAKE SELECTED THINGS HAVE A BLUE BACKGROUND
//	& MAKE THE APPROPRIATE MEDIA CONTENT SHOW UP
//	WHEN A LIST ITEM IS SELECTED.
//
//———————————————————————————————————————


var filterBy = function(a) {
  var menu = document.getElementsByTagName("select")[a];
  var opt = menu.getElementsByTagName("option");
  var selectedOption = opt[menu.selectedIndex].value;
  alert(selectedOption); 
 };

