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

	    $('#result').html("Gender: " + gender + " - Age: " + age + " - Weight: " + weight + " - " + bmi);
	    $('#comment').html(bmiStatus);


	    
		// ajax handle
		$.ajax({
			url: "http://google.com",
			type: "post",
			data: {
				gender: gender,
				age: age,
				weight: weight,
				height: height,
			},

			success: function(data){

			}
		});
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

    return false;
});