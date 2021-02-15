var allOffers;
var offerSlice = 1;
fetch('../php/getUserpage.php?id='+findGetParameter('id'))
.then(response => response.json())
    .then(offers => {
		console.log(offers);
		allOffers = offers.rows;
		if(allOffers){
			drawOfferNavigation(allOffers.length,offerSlice);
			drawOfferCanvas(getOffersFromSlice(0));
		}
		else{
			document.getElementById('nav').innerHTML = "No offers";
		}
		if(offers.user)
		{
			usernameEl = document.createElement('h3');
			usernameEl.innerHTML = offers.user['username'];
			document.getElementById('name').appendChild(usernameEl);
			
			facebookEl = document.createElement('a');
			facebookEl.href = ((offers.user['facebook'].indexOf("https://")!=0)?"https://":"")+offers.user['facebook'];
			facebookEl.innerHTML = offers.user['facebook'];
			
			document.getElementById('facebook').appendChild(facebookEl);
			
			bggEl = document.createElement('a');
			bggEl.href = ((offers.user['boardgamegeek'].indexOf("https://")!=0)?"https://":"")+offers.user['boardgamegeek'];
			bggEl.innerHTML = offers.user['boardgamegeek'];

			document.getElementById('bgg').appendChild(bggEl);
		}
	});
	
	