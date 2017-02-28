var baseIngr = [];

function setLocalCakeCount() {
    "use strict";
	//check if browser supports localStorage
    if (typeof (Storage) !== "undefined") {
        //check if number of pancakes is stored, if not set to default
        if (window.localStorage.getItem("panCount")) {
            var localCakeCount;
            localCakeCount = document.getElementById("pancakes").value;
            window.localStorage.setItem("panCount", localCakeCount);
        } else {
            window.localStorage.setItem("panCount", 1);
        }
    }
}


function updateRecipe() {
    "use strict";
    var pancakes = document.getElementById("pancakes").value;
    if (pancakes < 1) {
        pancakes = 1;
    }
    var asideElement = document.getElementsByTagName("aside")[0];
    var ingrList = asideElement.getElementsByTagName("li");
    for (var i = 0; i < ingrList.length; i++) {
        var tempStr = ingrList[i].textContent;
        var tempNumber = parseFloat(tempStr.match(/[0-9 | ^.]+/));
        if (typeof (baseIngr[i]) === "undefined") {
            baseIngr[i] = tempNumber;
        }
        tempNumber = (baseIngr[i] * pancakes);
		tempNumber = Math.round(tempNumber * 100) / 100; //round to 2 decimals
        tempStr = tempStr.replace(/[0-9 | ^.]+/, tempNumber + " "); //replace ingredients, add space at end
        ingrList[i].textContent = tempStr; //update ingredient list
    }
    setLocalCakeCount(); //save selected number to localStorage
}

//update ingredients upon number input
window.oninput = function () {
    "use strict";
    updateRecipe();
};

window.onload = function () {
    "use strict";
    if (typeof (Storage) !== "undefined") {
        // Store
        if (window.localStorage.getItem("panCount")) {
            document.getElementById("pancakes").value = parseInt(window.localStorage.getItem("panCount"));
            updateRecipe();
        }
    }
};