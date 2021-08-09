// figure out which page and which data to create
function getLocation() {
	var page = window.location.pathname.substring(1);
	var hash = window.location.hash.substring(1);
	updateHtml(page, hash);
}

// add the appropriate data to the page
function updateHtml(page, hash) {
	// get the appropriate object
	var obj = window[hash];
	// get the keys from that object
	var keys = Object.keys(obj);
	// for each key
	for (const element of keys) {
		// check if an element with that id exists
		if ( document.getElementById(`${element}`) ) {
			// if it does, update its HTML with data from the object
			$(`#${element}`).html(obj[element]);
		}
	}
	// add the buttons which are page dependent
	if (page === 'newcomer_homepage') {
		$('a').attr("href", `/suggested_edits.html#${hash}`);
	} else if (page === 'suggested_edits') {
		$('a#edit').attr("href", `/edit.html#${hash}`);
	} else if (page === 'edit.html') {
		$('a#next').attr("href", `/preview.html#${hash}`);
		$('a#no').attr("href", `/reject.html#${hash}`);
		$('a#close').attr("href", `/suggested_edits#${hash}`);
	} else if (page === 'reject.html') {
		$('a#back').attr("href", `/edit.html#${hash}`);
		$('a#done').attr("href", `/submitted.html#${hash}`);
		$('#imgCaption').html(`${localStorage.getItem(hash)}`);
	} else if (page === 'preview.html') {
		$('a').attr("href", `/submitted.html#${hash}`);
		$('#imgCaption').html(`${localStorage.getItem(hash)}`);
	} else if (page === 'submitted.html') {
		$('a').attr("href", `/suggested_edits#${obj.nextTitle}`);
		$('#imgCaption').html(`${localStorage.getItem(hash)}`);
	}
}

// move image and add input
function handleImageSelection() {
	$('#article-container').prepend(
		$('#imgFile img').addClass('placedImage'),
		'<div class="overImage"><img src="img/icon/robot.svg" width="16px" height="16px" class="margin8left" /><p id="caption">Add caption below</p><img src="img/icon/info-inverse.svg" /><textarea id="caption-input" placeholder="Write a short caption here to help explain why the image is relevant to the article..." oninput="checkInput()"></textarea></div>'
	);
	$('#caption-input').focus();
	$('#bottom-sheet').hide();
	$('#next').removeClass('hide');
}

// add comment to local storage
function handleAddComment() {
	var hash = window.location.hash.substring(1);
	var val = $('#caption-input').val();
	localStorage.setItem(hash, val);
}

// prev/next buttons on homepage
function handleTraverseSuggestions(str) {
	var hash = window.location.hash.substring(1);
	var title = window[hash][str];
	window.location.replace(`suggested_edits#${title}`);
	updateHtml('suggested_edits', title);
}

function handleToggleInspector() {
	$('#bottom-sheet').toggleClass('minimise');
}

// check if there is any text in the textarea
function checkInput() {
	target = $(event.target);
	// if there is text
	if ( $(target).val() ) {
		// remove the disabled class on the next button
		$('#next button').removeClass('disabled');
	} else {
		$('#next button').addClass('disabled');
	}
}

$(document).ready(function() {

	getLocation();

});


// Pop-up info
// Get the modal
var modal = document.getElementById("PopUp_TaskInfo");

// Get the button that opens the modal
var btn = document.getElementById("openPopUp");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closeModal")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/*/◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊//
//••••••••••••••••••••••••••  B I G  H E A D E R  ••••••••••••••••••••••••••//
//◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊/*/


/**** S M A L L  H E A D E R ****/
