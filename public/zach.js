function checkOrder() {
	if (orderValidate()){
		alert("Please double check your order and click 'Place Order' to confirm.");
		conf = document.getElementById('confirm');
		conf.style.visibility = "visible";
		return false;
	}
	else {
		alert("Please make sure every field is filled before submitting!");
		return false;
	}
}

function loginValidate(){
	var user = document.getElementById('username').value;
	var pass = document.getElementById('password').value;
	
	if (user == "" || pass == ""){
		alert("Please fill in a user name and a password!");
		return false;
	}
	else {
		return true;
	}
}


function createAndEditValidate(){
	var user = document.getElementById('username').value;
	var pass = document.getElementById('password').value;
	var name = document.getElementById('name').value;
	var address = document.getElementById('address').value;
	var city = document.getElementById('city').value;
	var state = document.getElementById('state').value;
	var zip = document.getElementById('zip').value;
	var phone = document.getElementById('phone').value;
	var email = document.getElementById('email').value;
	
	if (user == "" || pass == "" || name == "" || address == "" || city == "" || state == "" || zip == "" || phone == "" || email == ""){
		alert("Please make sure every field is filled before submitting!");
		return false;
	}
	else {
		return true;
	}
}


function orderValidate(){
	var num = document.getElementById('numTies').value;
	var date = document.getElementById('dateNeeded').value;
	var col = document.getElementById('color').value;
	var pat = document.getElementById('pattern').value;
	var fab = document.getElementById('fabric').value;
	
	if (num == "" || date == "" || col == "" || pat == "" ||  fab == ""){
		return false;
	}
	else {
		return true;
	}
	
}



