"use strict";




//———————————————————————————————————————
//
//		SWITCHES BETWEEN CURRENT AND COMPLETED
//
//———————————————————————————————————————

var switchPages = function(a) {
	var research = document.getElementById("completed");
	var projects = document.getElementById("current");
	var meetings = document.getElementById("meetings");
	var pages = [research, projects, meetings]
	
	for(var i = 0; i<pages.length; i++) {
		var page = pages[i];
		if(!page.classList.contains("hidden")) {
			page.classList.add("hidden");
		}
	}
	if(a === "completed") {
		research.classList.remove("hidden");
	}
	else if(a === "current") {
		projects.classList.remove("hidden");
	}
	else if(a === "meetings") {
		meetings.classList.remove("hidden");
	}
};


//———————————————————————————————————————
//
//	MAKES PROJECTS SELECTABLE
//
//———————————————————————————————————————

var selectable = function(){
	var research = document.getElementById("completed");
	var projects = document.getElementById("current");
	var rOptions = research.getElementsByClassName("scrollcontainer")[0].getElementsByTagName("article");
	var pOptions = projects.getElementsByClassName("scrollcontainer")[0].getElementsByTagName("article");
	for (var i = 0; i<rOptions.length; i++) {
		rOptions[i].onclick = function() {switchProjects(this, 'research');};
	}
	for (var j = 0; j<pOptions.length; j++) {
		pOptions[j].onclick = function() {switchProjects(this, 'projects');};
	}
};

// Do this on window load
window.onload = function() {
	selectable();
}



//———————————————————————————————————————
//
//	SWITCHES THE ARROW WHEN YOU CLICK
// 	ON A PROJECT
//
//———————————————————————————————————————

var switchProjects = function(index, page) {
	var research = document.getElementById("completed");
	var projects = document.getElementById("current");
	var rOptions = research.getElementsByClassName("scrollcontainer")[0].getElementsByTagName("article");
	var pOptions = projects.getElementsByClassName("scrollcontainer")[0].getElementsByTagName("article");
	var rDetails = research.getElementsByClassName("detailBox")[0].getElementsByClassName("details");
	var pDetails = projects.getElementsByClassName("detailBox")[0].getElementsByClassName("details");

	// Count which child the selected list item is.
	var parent = index.parentNode;
	var numChild = Array.prototype.indexOf.call(parent.children, index);

	if (page === "research") {
		for (var i = 0; i < rOptions.length; i++) {
			rOptions[i].classList.remove("selected");
		}
		index.classList.add("selected");

		for (var j = 0; j < rDetails.length; j++) {
			rDetails[j].classList.add("hidden");
		}
		rDetails[numChild + 1].classList.remove("hidden");

	}
	else {
		for (var i = 0; i < pOptions.length; i++) {
			pOptions[i].classList.remove("selected");
		}
		index.classList.add("selected");
		for (var j = 0; j < pDetails.length; j++) {
			pDetails[j].classList.add("hidden");
		}
		pDetails[numChild + 1].classList.remove("hidden");

	}
};


//———————————————————————————————————————
//
//		MAKE DROPDOWN MENUS SHOW THE OPTION'S VALUE
//
//———————————————————————————————————————


var filterBy = function(a) {
  var menu = document.getElementsByTagName("select")[a];
  var opt = menu.getElementsByTagName("option");
  var selectedOption = opt[menu.selectedIndex].value;
  alert(selectedOption); 
 };

