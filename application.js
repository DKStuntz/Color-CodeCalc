// Code, for JavaScript and JQuery, goes in this file.

var currNumStr = "";
var num1 ="";
var num2 ="";
var opSign = "";

/* The first var above (currNumStr) gets filled in, one character (digit or dec. pt)
		at a time.

		When an operator ('+', '-', '*', or '/') is clicked upon (meaning the first
		operand is complete), currNumStr gets assigned to num1;
		When the "=" button is clicked upon (meaning the second
		operand is complete), currNumStr gets assigned to num2.

		The vars, num1 and num2, are then casted to numbers to be used for the calculations.

		*/

var currOperandBox = "#operand1"; /* Should only be "operand1" or "operand2".
				It's the HTML id for the operand-display div -- the one where
				the next-entered element is to be ~added.*/

var decPtAlreadyEntered = false; /*  */

$(document).ready(function(){

	$(".digit-key-panel input").click(function(){
		ProcessDigitKey($(this).data("digitval"));
		});

	$(".op-key-panel input").click(function() {
		/* It's assumed that, when an operator ('+','-','*', or '/') is clicked upon, The first operand is done,
		and the focus (determined by the 'currOperandBox' variable) is shifted to the second operand. */

		currOperandBox = "#operand2"; /* So that following input  will go into the second operand. */

		/* Right-justifying */
		$("#operand1").addClass('floated-to-right');
		/*above code line  Doesn't work properly -- the items are reversed upon floating to right.*/

		num1 = currNumStr;
		currNumStr = "";  /* Clearing it, because it will then be used for the second operand. */

		decPtAlreadyEntered = false; /* Since the focus is now for a new number, this var is reset to orig. value. */
		opSign = $(this).val();
		$('#operand1').removeClass('.active-operand');
		$('#operand2').addClass('.active-operand');

		$(".sel-op p").text(opSign);
	});

	$('#get-result').click(function() {
		/* When the "=" button is clicked upon, The second operand is considered done (as well as the first). */
		$('#operand2').removeClass('.active-operand');

		/* Right-justifying
		("#operand2 img").addClass('floated-to-right');*/
		num2 = currNumStr;

		var result;
		var nodeStr;

		switch(opSign){
			case '+':
				result = Number(num1) + Number(num2);
				break;

			case '-':
				result = Number(num1) - Number(num2);
				break;

			case '*':
				result = Number(num1) * Number(num2);
				break;

			case '/':
				result = Number(num1) / Number(num2);
				break;
			}

		var resultStr = result.toString();

		/* The following statement was used for testing purposes, but is now disabled:
			alert("Result: " + result); */

		for(i = 0; i < resultStr.length; i++) {
			var currChar = resultStr.charAt(i);

			nodeStr = '<li><img src="images/ColorCode' + currChar + '_VertRect.png" alt=currChar/></li>';
			var newNode = newNode = $(nodeStr);
			$('#result-display').append(newNode);
		}
		/* $("result-display img").addClass('floated-to-right'); */

	});

	$("#clear-calc").click(function() {
		/*  XXXXX may be changed ~soon*/
		$("#operand1").empty();
		$("#operand2").empty();
		$("#result-display").empty();
		currOperandBox = "#operand1";
		$("#operand1").addClass('active-operand');
		$(".sel-op p").text("");

		$("#operand1 img").removeClass('floated-to-right');
		$("#operand2 img").removeClass('floated-to-right');
		$("#result-display img").removeClass('floated-to-right');

		currNumStr = "";
		num1 ="";
		num2 ="";
		});


	function ProcessDigitKey (dv) { /*Actually, the key can also be a dec. point.*/
			var nodeStr = "";
			var newNode = undefined; /*until it is set to something*/
			if (currNumStr.length >= 12) {
				alert("Operand has a 12-character limit" );
				return; // Otherwise, the flow will continue through this function.
			}
		if (dv==".") {
			if (decPtAlreadyEntered == false){
				nodeStr = '<li><img src="images/DecimalPoint_VertRect.png" alt = "."/></li>';
				currNumStr += ".";
				decPtAlreadyEntered = true;
				}
			else{
				alert("Can't have more than one decimal point in a number.");
				return;
				}
			}
		else {  /* A digit key (color-coded vertical rect) was pressed. */
			nodeStr = '<li><img src="images/ColorCode' + dv + '_VertRect.png" alt="'+dv+'"/></li>';
			currNumStr += dv;
			}

		newNode = $(nodeStr);
		$(currOperandBox).append(newNode);

		console.log("dv = " + dv);
		console.log("nodeStr = " + nodeStr);
		console.log("currOperandBox = " + currOperandBox);
	}

});


/*
function TempFnIsJQ-Loaded() {

		if (window.jQuery) {
			alert("JQuery is loaded.");
			}
		else {
			alert("JQuery is NOT loaded.");
			}

}
*/
/*
function TellNumberEight(){
		alert("8's are Brown. function inside JS file");
		}
*/
