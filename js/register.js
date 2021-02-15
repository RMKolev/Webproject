let validatePassword = (password, error) =>
{
	let format = new RegExp("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}");
	if (!format.test(password))
	{
		error.msg = "Invalid password. Password must be between 6-12 characters long and contain at least one uppercase and lowercase letter, as well as a number.";
		return false;
	}
	return true;
}

let validateWebsite = (weblink, stringToLookAt,error) =>
{
	if(weblink.indexOf(stringToLookAt) == -1)
	{
		error.msg = "Website address should contain :\"" + stringToLookAt + "\"."; 
		return false;
	}
	return true;
}
errorFields = 
{
	username: document.getElementById('username-error'),
	password: document.getElementById('password-error'),
	facebook: document.getElementById('facebook-error'),
	bgg: document.getElementById('bgg-error')
	
}
document.getElementById('register-form').addEventListener('submit',async (event) =>
{
	
	event.preventDefault();
	//console.log("Register event started");
	
	let personalInfo = {
	username: document.getElementById('username').value,
	password:document.getElementById('password').value,
	facebook: document.getElementById('facebook').value,
	boardgamegeek: document.getElementById('boardgamegeek').value,
	};
	let valid = true;
	var msg = {};
	if(!validatePassword(personalInfo.password,msg))
	{
		if(errorFields.password)
		{
			errorFields.password.innerHTML = msg.msg;
		}
		valid = false;
	}
	
	if(!validateWebsite(personalInfo.facebook,"facebook.com",msg))
	{
		if(errorFields.facebook)
		{
			errorFields.facebook.innerHTML = msg.msg;
		}
		valid = false;
	}
	
	if(!validateWebsite(personalInfo.boardgamegeek,"boardgamegeek.com",msg))
	{
		if(errorFields.bgg)
			{
				errorFields.bgg.innerHTML = msg.msg;
			}
		valid = false;
	}
	
	if(valid)
	{
		let result = await sendPostRequest(personalInfo, '../php/registerUser.php');
		console.log(result);
		
		if(result.success)
		{
			window.location.href = '../index.html';
		}
		else if(errorFields.username)
		{
			errorFields.username.innerHTML = "Username already taken."
		}
	}
	

});
