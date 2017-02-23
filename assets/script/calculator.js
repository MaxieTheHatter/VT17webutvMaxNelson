$(document).ready(function(){
	var testNumLength = function(number) {
        if (number.length > 9) {
            result.text(number.substr(number.length-9,9));
            if (number.length > 15) {
                number = "";
                result.text("Err");
            }
        } 
    };
	var clickCount = 0;
	var number = "";
    var newnumber = "";
    var operator = "";
    var result = $("#result");
	var resultList = $("#results:first");
	
    result.text("0");
	
    $("#calculator .calc__number").not("#clear,#clearall").click(function(){
		number += $(this).text();
		result.text(number);
		testNumLength(number);
    });
    $("#calculator .calc__sign").not("#equals").click(function(){
		operator = $(this).text();
		newnumber = number;
		number = "";
		result.text("0");
		clickCount = 0;

    });
    $("#clear,#clearall").click(function(){
		number = "";
		result.text("0");
		if ($(this).attr("id") === "clearall") {
			newnumber = "";
		}
    });
    $("#equals").click(function(){
		newnumber = parseInt(newnumber, 10);
        number = parseInt(number, 10);
		
		if (operator === "+"){
            var answer = newnumber + number; 
			resultList.append(newnumber.toString() + " + " + number.toString() + "<br>")
		} else if (operator === "-"){
            var answer = newnumber - number;
			resultList.append(newnumber.toString() + " - " + number.toString() + "<br>")			
		} else if (operator === "/"){
            var answer = newnumber / number;
			resultList.append(newnumber.toString() + " / " + number.toString() + "<br>")			
		} else if (operator === "*"){
            var answer = newnumber * number;
			resultList.append(newnumber.toString() + " * " + number.toString() + "<br>")			
		}
		
		answerStr = answer.toString(); 
		result.text(answerStr);
		resultList.append(answerStr + "<br>"); 		
		testNumLength(answerStr);
		number = "";
		newnumber = "";
    });
});