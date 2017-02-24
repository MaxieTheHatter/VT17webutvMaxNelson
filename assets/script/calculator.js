window.onload = function() {
	//print error if there's too many numbers
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
	
	//add listeners to clear and all clear
	document.getElementById("clear").addEventListener("click", function(){
		number = "";
		result.innerHTML = "0";
	}, false);
	
	document.getElementById("clearAll").addEventListener("click", function(){
		number = "";
		result.innerHTML = "0";
		newnumber = "";
	}, false)
	
	//delegate numbers
	function delegateNumbers(element) {
		return function(){
		  addNums(element)
		}
	}
	
	//press numbers
	function addNums(element){
        number += element;
        result.innerHTML = number;
        testNumLength(number);
        console.log("pressed " + element);
        console.log("number is now " + number);
		preventOperator = false;
    }
	
	//add click listener to number buttons
	for(var i = 0; i < calcNum.length; i++)
	{
       calcNum[i].addEventListener("click", delegateNumbers(calcNum[i].innerText), false);
	}
	
	//delegate operators
	function delegateSigns(element){
		return function(){
			addSigns(element)
		}
	}
	
	//press operator
	function addSigns(element) {
		if(preventOperator != true){
			operator = element;
			newnumber = number;
			number = "";
			result.innerHTML = "0";
			console.log("pressed " + element);
			console.log("Operator is now " + operator);
			preventOperator = true;
		}else{
			console.log("can't press multiple times");
		}
	}

	//add listener for operators
	for(var i = 0; i < calcSign.length-1; i++) {
		calcSign[i].addEventListener("click", delegateSigns(calcSign[i].innerText), false);
	}
	
	//calculate function
	calcSign[4].addEventListener("click", function(){
		console.log("pressed " + calcSign[4].innerHTML);
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
			preventOperator = false;
		}
	});
}
