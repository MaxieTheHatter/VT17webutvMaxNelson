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
	$(".voteIndicator span").hover(function(){
		$(this),prevAll().css("color", "black");
		$(this).css("color", "grey");
		$(this).css("cursor", "pointer");
	});
	
	$(".voteIndicator span").click(
		function() {
			$(this).prevAll().text("\u2605");
            $(this).text("\u2605");
            $(this).nextAll().text("\u2606");
			
			$(this).animate("\u2605");
			$(this).text("\u2605");
            
            var rating = $(this).index() + 1;
            putVoteInDB(rating);
	});
	//get DB info upon loading the document
	updateVotingResult();
});

$(document).ajaxStart(function(){
     $("#loading").html("<img src='../image/loading.gif'>");
});

function updateVotingResult () {
    $.ajax({
        method: "GET",
        url: "https://edu.oscarb.se/sjk15/api/recipe/?api_key=ff5ec25ea3f6b140&recipe=pannkakor",
        success: function(data) {
            //return data;
            var rating = data.rating.toFixed(1);
			$("#loading").html("");
            $(".voteResult strong").text(rating);
            $(".voteResult em").text(data.votes);
        },
    });
}
