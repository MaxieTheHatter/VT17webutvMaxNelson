//send rating to API
function putVoteInDB (rating) {
    $.ajax({
        url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=ff5ec25ea3f6b140&recipe=pannkakor&rating=" + rating,
		type: "GET",
        success: function(data) {  
            updateVotingResult();
        }, 
    });
}

//get rating from API
function updateVotingResult () {
    $.ajax({
        url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=ff5ec25ea3f6b140&recipe=pannkakor",
		type: "GET",
        success: function(data) {
            var rating = data.rating.toFixed(1); //round rating to 1 decimal
			var votes = data.votes;
			$("#loading").html("");
            $(".voteResult #rating").html("<b>"+rating+"</b>");
            $(".voteResult #total").html("<b>"+votes+"</b>");
        },
    });
}

//add click and hover eventhandlers
$(document).ready(function(){	
	$(".voteIndicator span").click(function() {
			$(this).prevAll().text("\u2605"); //change previous stars to black
            $(this).nextAll().text("\u2606"); //change remaining stars to white
			$(this).text("\u2605"); //set chosen star to black            
            var rating = $(this).index();
            putVoteInDB(rating);
			$(".vote").html("Du röstade " + "<b>" + rating + "</b>" + ", tack för din röst!");
	});
	
	$(".voteIndicator span").hover(function(){ //sets hovered star to grey together with previous ones
			$(this).css({
				cursor: "pointer"
			}); //change cursor to pointer on mouseover
			$(this).prevAll().css({
				color: "grey"
			});
			$(this).css({
				color: "grey"
			});
			$(this).animate({
				fontSize: "2.5em"
			}, 200);
		}, function(){ //change back to default value whem mouse is removed
			$(this).prevAll().css({
				color: "black"
			});
			$(this).css({
				color: "black"
			});
			$(this).animate({fontSize: "2em"}, 200);
	});
		
	//get DB info upon loading the document
	updateVotingResult();
});

$(document).ajaxStart(function(){
     $("#loading").html("<img src='../image/loading.gif'>");
});