function changeText(){
	if(document.getElementById("clickit").innerHTML == "Button status: Clicked")
		document.getElementById("clickit").innerHTML = "Button status: Unclicked";
	else
		document.getElementById("clickit").innerHTML = "Button status: Clicked";
}