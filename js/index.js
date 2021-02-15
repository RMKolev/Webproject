var allOffers;
var offerSlice = 3;
var userID = -1;

fetch('./php/getAllOffers.php')
    .then(response => response.json())
    .then(offers => {
		allOffers = offers.rows; // Get these for later use;
		userID = offers.userID;
		console.log(userID);
		clearOfferCanvas();
		drawOfferNavigation(allOffers.length,offerSlice,'./pages/');
		drawOfferCanvas(getOffersFromSlice(0),'./pages/');
		
		//User not logged in
		if(offers.userID == -1)
		{
			document.getElementById('logout').remove();
			document.getElementById('account-link').remove();
			document.getElementById('new-offer').remove();
		}
		else
		{
			document.getElementById('login-div').remove();
			document.getElementById('register').remove();
			document.getElementById('account-link').href = './pages/userpage.html?id='+offers.userID;
			
			document.getElementById('logout').addEventListener('click', e => {
				e.preventDefault();
				
				fetch('./php/logout.php')
				.then( () =>
				{
					userID = 
					window.location.href = 'index.html';
				})
			});
		}
    });
	
	
document.getElementById("login-form").addEventListener('submit', async (event) =>
{
	event.preventDefault();
	let loginForm = {
		username: document.getElementById("username").value,
		password: document.getElementById("password").value
	}
	
	let response = await sendPostRequest(loginForm,"./php/login.php");
	
	if(response.success === true)
	{
		console.log("Success");
		window.location.href = 'index.html';
	}
	else
	{
		let err = document.getElementById('login-error');
		if(err)
		{
			err.innerHTML = "Invalid username or password."
		}
	}
});