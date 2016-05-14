// Code, for JavaScript and JQuery, goes in this file.

var currNumStr = "";
var opSign = "";

/* The first var above (currNumStr) gets filled in, one character at a time
(digit or dec. pt).  It is used for both operands.
		.

		When an operator ('+', '-', '*', or '/') is clicked upon (meaning the first
		operand is complete), currNumStr gets assigned to the first operand number,
		which is stored in "#operand1"'s 'num-value' data element.  currNumStr is then
		cleared, and is ready to be reused (for the second operand).
		When the "=" button is clicked upon (meaning the second
		operand is complete), currNumStr gets assigned to the second operand number,
		which is stored in "#operand2"'s 'num-value' data element.
		*/

var currOperandBox = "#operand1"; /* Should only be "operand1" or "operand2".
				It's the HTML id for the operand-display div -- the one where
				the next-entered element is to be ~added.*/

var decPtAlreadyEntered = false; /*  */

$(document).ready(function(){

	/* Structure of event-handling function:
		$(XXXXXElement).XXXXXEvent(function(){
		[code]
		});
	*/
	$('#operand1').parent().addClass('.active-operand');

	/* Event Handler #1: For each time the user clicks on a color-coded digit key
  (for either operand) */

	$(".digit-key-panel input").click(function(){
		ProcessDigitKey($(this).data("digitval"));
		});



		/* Event Handler #2: For when the user selects one of the 4 operators */
 	$(".op-key-panel input").click(function() {
		/* It's assumed that, when an operator ('+','-','*', or '/') is clicked upon, The first operand is done,
		and the focus (determined by the 'currOperandBox' variable) is shifted to the second operand. */

		currOperandBox = "#operand2"; /* So that following input  will go into the second operand. */

		/* Right-justifying */
		$("#operand1").addClass('justified-to-right');
		/*above code line  Doesn't work properly -- the items are reversed upon floating to right.*/

		/*The former global variabe, num1 (the first operand) has been eliminated; Now
						#operand1's num-value' (data attribute of #operand1) is used instead.*/
		$("#operand1").data('num-value', Number(currNumStr));
		currNumStr = "";  /* Clearing it, because it will then be used for the second operand. */

		decPtAlreadyEntered = false; /* Since the focus is now for a new number, this var is reset to orig. value. */
		opSign = $(this).val();
		$('#operand1').parent().removeClass('.active-operand');
		$('#operand2').parent().addClass('.active-operand');

		$(".sel-op p").text(opSign);
	  });


		/* Event Handler #3: For when the user clicks on the '=' button (to get the result). */
	$('#get-result').click(function() {
		/* When the "=" button is clicked upon, The second operand is considered done (as well as the first),
		and it's time to perform the calculation. */

		if ($('#result-display li').length) { /* If there's already something in #result-display (if length is not 0),
					them the user probably clicked on the '=' button again (after the calculation is done).
					In such a case, nothing should be done, because the answer is already in the
					output box, and should not be duplicated (appended to itself).*/
			return;
		  }

		$('#operand2').parent().removeClass('.active-operand');
		$('#operand2').data('num-value', Number(currNumStr));

		var num1 = $('#operand1').data('num-value');
		var num2 = Number(currNumStr);
		$('#operand2').data('num-value', num2);

		/*The former global variabe, num2 (the second operand) has been eliminated;
		Now, #operand2's num-value' (data attribute of #operand2) is used instead.*/

		var result;
		var nodeStr;
		$("#operand2").addClass('justified-to-right');

		switch(opSign){
			case '+':
				result = num1 + num2;
				break;

			case '-':
				result = num1 - num2;
				break;

			case '*':
				result = num1 * num2;
				break;

			case '/':
				result = num1 / num2;
				break;
			}

		$("#result-display").data('num-value', result);
		var resultStr = result.toString();

		for(i = 0; i < resultStr.length; i++) {
			var currChar = resultStr.charAt(i);
			if(currChar == '.') { /* There's a decimal point in the result */
				nodeStr = '<li><img src="images/DecimalPoint_VertRect.png" alt=currChar/></li>';
			  }
			else if (currChar == '-') { /*The result is a negative number */
				nodeStr = '<li><img src="images/NegativeSign_VertRect.png" alt=currChar/></li>';
			  }
			else { /* The current character (currChar) is a digit */
				nodeStr = '<li><img src="images/ColorCode' + currChar + '_VertRect.png" alt=currChar/></li>';
			  }

			var newNode = $(nodeStr);
			$('#result-display').append(newNode);
			}

		$("#result-display").addClass('justified-to-right');
		/* $("result-display img").addClass('floated-to-right'); */
	});


	/* Event Handler #4: For when the user clicks on the "-->M" button, to copy
	  the result to memory */
		$("#result-to-m").click(function() {
			$("#memory-num-display").addClass('justified-to-right');

			$("#memory-num-display").empty();  /*Clearing out the old "memory" data,
							in case there was any */
			/* copying the visual part: */
			$("#memory-num-display").append($("#result-display li").clone());

			/* copying the numeric part: */
			$("#memory-num-display").data('num-value', $("#result-display").data('num-value'));
			});


		/* Event Handler #5:  For when the user clicks on the first "<--M" button,
			   which is for copying memory to the first operand ('#operand1') */
		$("#m-to-operand1").click(function() {
				var memNum = $("#memory-num-display").data('num-value');

				$("#operand1").empty();  /*Clearing out old data, first*/
				$("#operand1").append($("#memory-num-display li").clone());
				$("#operand1").data('num-value', memNum);

				currOperandBox = "#operand1";
				currNumStr = memNum.toString();
				});


		/* Event Handler #6: For when the user clicks on the second "<--M" button,
				which is for copying memory to the second operand ('#operand2') */
		$("#m-to-operand2").click(function() {
			  var memNum = $("#memory-num-display").data('num-value');

				$("#operand2").empty(); /*Clearing out old data, first*/
				$("#operand2").append($("#memory-num-display li").clone());
				$("#operand2").data('num-value', memNum);

				currOperandBox = "#operand2";
				currNumStr = memNum.toString();
				});

		/* Event Handler #7: For when the user clicks on the "clear" button*/
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
			$("#operand1").data('num-value', 0);
			$("#operand2").data('num-value', 0);
		});

  /*End of the event-handling function definitions.*/

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
