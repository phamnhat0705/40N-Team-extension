$(document).ready(function() {


});


$('#submit').click(function() {
	$('#result').html();
	$('#comment').html();
	$('#error').html();

	if ($('#weight').val() != "" && $('#height').val() != "") {
		var gender = $('#gender').val();
		var age = $('#age').val();
		var weight = $('#weight').val();
		var height = $('#height').val() / 100;
		var bmi = weight / (height * height);
	    var bmiStatus = "";
	    var valueBmi = 0;

	    if (bmi < 18.5) { bmiStatus = "Under Weight"; valueBmi = 100;}
	    if (bmi >= 18.5 && bmi < 25) { bmiStatus = "Normal"; }
	    if (bmi >= 25 && bmi < 30) { bmiStatus = "Over Weight"; valueBmi = -100;}
	    if (bmi >= 30 && bmi < 40) { bmiStatus = "Obese"; valueBmi = -200;}
	    if (bmi > 40) { bmiStatus = "Morbidly Obese"; valueBmi = -300;}

	    var genderValue = 5;
	    if (gender == "Female") { genderValue = -161; }
	    var bmr = 10 * weight + 6.25 * height - 5 * age + genderValue;
	    var calorie = bmr + valueBmi;

	    $('#comment').html(bmiStatus);
	    $('#result').html("Gender: " + gender + " - Age: " + age + " - Weight: " + weight + " - " + bmr + "<br>");

	    // get json

	    $.getJSON("menu.json", function(menu){
	    	
		    var listMenuResult = [];
		    var c = 0;
	    	for(let data of menu){
	    		if ((c + parseInt(data.indicator)) < calorie + 50){
		    		listMenuResult.push(data);
		   			c += parseInt(data.indicator);
	    		}
	    		if (c > calorie - 50) break;
	    	}


		    for (let data of listMenuResult){
		    	var img = "<img src = ' " + data.image +"' />";
		    	$('#result').append(img + "<br>");
		    }

	    });


	    $('#div-input').fadeOut();
	    $('#div-result').fadeIn();
	}

	var errorWeight = "";
	var errorHeight = "";
	if ($('#weight').val() == ""){
		errorWeight = "<p class = 'text-danger'> Weight is not empty! </p>";
	}

	if ($('#height').val() == ""){
		errorHeight = "<p class = 'text-danger'> Height is not empty! </p>";
	}

	$('#error').html(errorWeight + errorHeight);

	// delete old content
	$('#gender').val("");
	$('#age').val("");
	$('#weight').val("");
	$('#height').val("");
	$('#goalWeight').val("");

    return false;
});


$('#return').click(function(){
	$('#div-input').fadeIn();
	$('#div-result').fadeOut();
});