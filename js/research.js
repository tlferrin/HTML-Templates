"use strict";


//———————————————————————————————————————
//
//	MAKES TITLES SELECTABLE
//
//———————————————————————————————————————

var selectable = function(){
	var fli = document.getElementById("fli");
	var faculty = document.getElementById("faculty");
	var fliTitle = fli.getElementsByTagName("article");
	var facultyTitle = faculty.getElementsByTagName("article");
	for (var i = 0; i<fliTitle.length; i++) {
		fliTitle[i].onclick = function() {switchfaculty(this, 'fli');};
	}
	for (var j = 0; j<facultyTitle.length; j++) {
		facultyTitle[j].onclick = function() {switchfaculty(this, 'faculty');};
	}
};

// Do this on window load
window.onload = function() {
	selectable();
}



//———————————————————————————————————————
//
//	SWITCHES THE ARROW WHEN YOU CLICK
// 	ON A TITLE
//
//———————————————————————————————————————

var switchfaculty = function(index, page) {
	var fli = document.getElementById("fli");
	var faculty = document.getElementById("faculty");
	var fliTitle = fli.getElementsByTagName("article");
	var facultyTitle = faculty.getElementsByTagName("article");
	var rDetails = fli.getElementsByClassName("detailBox")[0].getElementsByClassName("details");
	var pDetails = faculty.getElementsByClassName("detailBox")[0].getElementsByClassName("details");

	// Count which child the selected list item is.
	var parent = index.parentNode;
	var numChild = Array.prototype.indexOf.call(parent.children, index);

	if (page === "fli") {
		for (var i = 0; i < fliTitle.length; i++) {
			fliTitle[i].classList.remove("selected");
		}
		index.classList.add("selected");

		for (var j = 0; j < rDetails.length; j++) {
			rDetails[j].classList.add("hidden");
		}
		rDetails[numChild + 1].classList.remove("hidden");

	}
	else {
		for (var i = 0; i < facultyTitle.length; i++) {
			facultyTitle[i].classList.remove("selected");
		}
		index.classList.add("selected");
		for (var j = 0; j < pDetails.length; j++) {
			pDetails[j].classList.add("hidden");
		}
		pDetails[numChild + 1].classList.remove("hidden");

	}
};

