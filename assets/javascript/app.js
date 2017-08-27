$(document).ready(function(){


// 	console.log(Page Loaded);


var searchArray = ['Anemone','Aster', 'Irises', 'Amaryllis', 'Hyacinth', 'Carnation', 'Peony', 'Tulip'];

populatebuttons();

function populatebuttons() {
	$('#buttonsArea').empty();
	for(var i = 0; i < searchArray.length; i++) {
		var a = $('<button>');
		a.addClass('searchButton');
		a.attr('data-type', searchArray[i]);
		a.text(searchArray[i]);
		$('#buttonsArea').append(a);
	}
}

	$(document).on('click','.searchButton',function() {
		var type = $(this).attr('data-type');
		var queryUrl = "http://api.giphy.com/v1/gifs/search?q="+ type +"+flower&api_key=51f33bae6aca4a5ca3f71e74dd73e554&limit=10";
		$.ajax({url:queryUrl, method: 'GET'})
			.done(function(response){
				for(var i = 0; i<response.data.length; i++){
					var searchDiv = $('<div class="search-item">');
					var rating = response.data[i].rating;
					var p = $('<p>').text('Rating: '+rating);
					var animated = response.data[i].images.fixed_height.url;
					var still = response.data[i].images.fixed_height_still.url;
					var image = $('<img>');
					image.attr('src', still);
					image.attr('data-still', still);
					image.attr('data-animated', animated);
					image.attr('data-state', 'still');
					image.addClass('searchImage');
					searchDiv.append(p);
					searchDiv.append(image);
					$('#searches').prepend(searchDiv);
				}
			})
	})

	$(document).on('click','.searchImage', function() {
		var state = $(this).attr('data-state');
		if(state == 'still'){
			$(this).attr('src',$(this).data('animated'));
			$(this).attr('data-state','animated');
		} else {
			$(this).attr('src',$(this).data('still'));
			$(this).attr('data-state','still');
		}
	})

	$('#addSearch').on('click', function() {
		event.preventDefault();
		var newSearch = $('#search-input').val();
		searchArray.push(newSearch);
		populatebuttons();
		console.log(searchArray);
		$("#search-input").val("");	
	})
});


// $('button').on('click', function(e) {
//     flower = $(this).attr('data-flower');
   
  
//     // ajax call to giphy
//     var xhr = $.get(url);
// xhr.done(function(data) {
// 	console.log("success got data", data); 
// 	// code to inser images here
// 	// loop through the data array
// 	 });
// });

