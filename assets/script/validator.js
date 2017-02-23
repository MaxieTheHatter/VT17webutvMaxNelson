function validateID() {
	var id = document.getElementById("idNumber").value;
	if(id.length < 1) {
		document.getElementById("idNumberResult").innerHTML = "&#10068";
	}else if(idChk(id)) {
		document.getElementById("idNumberResult").innerHTML = "&#10003";
	}else{
		document.getElementById("idNumberResult").innerHTML = "&#10007";
	}
}

function idChk(id){
	//ignore dashes and pluses
	id = id.replace(/\D/g, "");
	
	//shorten 1990 to 90
	if(id.length === 12) {
		id = id.substring(2);
	}
	
	var sum = 0;
	var digits = id.length;
	var parity = digits % 2;
	
	//check if valid month
	for(var i = 3; i <= 4; i++) {
		var num = parseInt(id.charAt(i))
		if(num < 1 || num > 12){
			return false;
		}
	}
	//check if valid day
	for(var i = 5; i <= 6; i++) {
		var num = parseInt(id.charAt(i))
		if(num < 1 || num > 31){
			return false;
		}
	}
	
	//run luhns
	for(var i = 0; i < digits-1; i++) {
		var num = parseInt(id.charAt(i))
		if(i % 2 == parity) num *= 2;
		if(num > 9) num -= 9;
		sum += num;
	}
	return (sum % 10) == 0;
}

function validateLeapYear() {
	var year = document.getElementById("leapYear").value;
	if(year.length < 1) {
		document.getElementById("leapYearResult").innerHTML = "&#10068";
	}else if(leapChk(year)) {
		document.getElementById("leapYearResult").innerHTML = "&#10003";
	}else{
		document.getElementById("leapYearResult").innerHTML = "&#10007";
	}
}

function leapChk(year) {
	if(year % 4 == 0 && year % 100 != 0 || year % 400 == 0){
		return true;
	}else{
		return false;
	}
}

function validateNumberSum() {
	var numSum = document.getElementById("numberSum").value;
	var sum = numChk(numSum);
	document.getElementById("numberSumResult").innerHTML = sum;
	
}
  
function numChk(numSum) {
	var str = numSum.toString();
	var sum = 0;
	
	for(var i = 0; i < str.length; i++) {
		sum += parseInt(str.charAt(i), 10);
	}
	return sum;
}