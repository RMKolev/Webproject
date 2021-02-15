fetch('../php/getSessionUser.php')
	.then(response => response.json())
	.then( result => 
	{
		accountEl = document.getElementById('account-link');
		if(accountEl)
		{
			accountEl.href = 'userpage.html?id='+result.userID;
		}
	});
	
document.getElementById('offer-form').addEventListener('submit', async (event) => 
{
	event.preventDefault();
	offerTemplate = 
	{
		title: document.getElementById('title').value,
		price: document.getElementById('price').value,
		offertype: document.getElementById('offertype').value,
		quality: document.getElementById('quality').value,
		bgglink: document.getElementById('bgglink').value,
		comments: document.getElementById('comments').value,
	}
	
	if(offerTemplate.bgglink.indexOf("boardgamegeek.com/boardgame/")!=-1)
	{
		result = await sendPostRequest(offerTemplate,'../php/registerOffer.php');
	
		if(result.success == true)
		{
			window.location.href = "../index.html";
		}
	}
	else
	{
		document.getElementById('bgg-error').innerHTML = "Invalid boardgamegeek link. It should start with boardgamegeek.com/boardgame/";
	}

});