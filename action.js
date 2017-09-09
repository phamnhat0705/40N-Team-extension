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

	    if (bmi < 18.5) { bmiStatus = "Under Weight"; }
	    if (bmi >= 18.5 && bmi < 25) { bmiStatus = "Normal"; }
	    if (bmi >= 25 && bmi < 30) { bmiStatus = "Over Weight"; }
	    if (bmi >= 30 && bmi < 40) { bmiStatus = "Obese"; }
	    if (bmi > 40) { bmiStatus = "Morbidly Obese"; }

	    var genderValue = 5;
	    if (gender == "Female") { genderValue = -161; }
	    var bmr = 10 * weight + 6.25 * height - 5 * age + genderValue;

	    $('#comment').html(bmiStatus);
	    $('#result').html("Gender: " + gender + " - Age: " + age + " - Weight: " + weight + " - " + bmr + "<br>");

	    // get json
	    var listMenuResult = [];
	    $.getJSON("menu.json", function(menu){
	    	for(let data of menu){
				var img = "<img src = ' " + data.image +"' />";
				var title = "<h3>" + data.title +"</h3>";
				var content = "<p>" + data.content +"</p>";
				$('#result').append("<div class='content'>" + img + "<div class='contentText'>" + title + content 
				+"</div>"+"</div>");
	    		listMenuResult.push(data);
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