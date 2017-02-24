window.onload = function() {
	var testNumLength = function(number) {
		if(number.length > 9) {
			result.innerHTML = (number.substr(number.length-9,9));
			if(number.length > 15) {
				number = "";
				result.innerHTML = "Err";
			}
		}
	}


	var number = "";
	var newnumber = "";
	var operator = "";
	var result = document.getElementById("result");
	var resultList = document.getElementById("results");
	var calcNum = document.querySelectorAll(".calc__number");
	var calcSign = document.querySelectorAll(".calc__sign");
	var preventOperator;
		
	result.innerHTML = "0";
	
	//got some help from a good friend of mine
	function delegateFunction(element) {
		return function(){
		  mainFunction(element)
		}
	}
  
	function mainFunction(element){
        number += element;
        result.innerHTML = number;
        testNumLength(number);
        console.log("pressed " + element);
        console.log("number is now " + number);
    }
	
	for(var i = 0; i < calcNum.length; i++)
	{
       calcNum[i].addEventListener("click", delegateFunction(calcNum[i].innerText), false);
	}
	
	function anotherDelegate(element){
		return function(){
			secondaryFunction(element)
		}
	}
	
	function secondaryFunction(element) {
		operator = element;
		newnumber = number;
		number = "";
		result.innerHTML = "0";
		console.log("pressed " + element);
		console.log("Operator is now " + operator);
	}

	for(var i = 0; i < calcSign.length-1; i++) {
		calcSign[i].addEventListener("click", anotherDelegate(calcSign[i].innerText), false);
	}
	
	calcSign[4].addEventListener("click", function(){
		console.log("pressed " + calcSign[2].innerHTML);
		if(number != "" && newnumber != ""){
			newnumber = parseInt(newnumber, 10);
			number = parseInt(number, 10);
			var node = document.createElement("LI");
			var text;
			
			if (operator === "+"){
				var answer = newnumber + number; 
				text = (newnumber.toString() + " + " + number.toString())
			}else if(operator === "-"){
				var answer = newnumber - number;
				text = (newnumber.toString() + " - " + number.toString())			
			}else if(operator === "/") {
				var answer = newnumber / number;
				text = (newnumber.toString() + " / " + number.toString())	
			}else if(operator === "*"){
				var answer = newnumber * number;
				text = (newnumber.toString() + " * " + number.toString())	
			}
			var endResult = document.createTextNode(text);
			node.appendChild(endResult);
			resultList.appendChild(node);
			
			answerStr = answer.toString(); 
			result.text = answerStr;
			resultList.insertAdjacentHTML("beforeend", answerStr + "<br>"); 		
			testNumLength(answerStr);
			number = "";
			newnumber = "";
			console.log("cleared field");
		}
	});
}
