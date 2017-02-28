//send rating to API
function putVoteInDB (rating) {
    $.ajax({
        method: "GET",
        url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=ff5ec25ea3f6b140&recipe=pannkakor&rating=" + rating,
        success: function(data) {  
            updateVotingResult();
        }, 
    });
}

$(document).ready(function(){	
	$(".voteIndicator span").click(function() {
			$(this).prevAll().text("\u2605"); //change previous stars to black
            $(this).nextAll().text("\u2606"); //change remaining stars to white
			$(this).text("\u2605"); //set chosen star to black            
            var rating = $(this).index() + 1;
            putVoteInDB(rating);
	});
	
	$(".voteIndicator span").hover(function(){ //sets hovered star to grey together with previous ones
			$(this).prevAll().css("color", "grey");
			$(this).css("color", "grey");
			$(this).css("cursor", "pointer"); //change cursor to pointer on mouseover
		}, function(){ //set selected star and previous to full black
			$(this).prevAll().css("color", "black");
			$(this).css("color", "black");
	});
		
	//get DB info upon loading the document
	updateVotingResult();
});

$(document).ajaxStart(function(){
     $("#loading").html("<img src='../image/loading.gif'>");
});

//get rating from API
function updateVotingResult () {
    $.ajax({
        method: "GET",
        url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=ff5ec25ea3f6b140&recipe=pannkakor",
        success: function(data) {
            var rating = data.rating.toFixed(1); //round rating to 1 decimal
			$("#loading").html("");
            $(".voteResult strong").text(rating);
            $(".voteResult em").text(data.votes);
        },
    });
}
