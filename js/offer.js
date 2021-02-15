
fetch('../php/singleOffer.php?id='+findGetParameter('id'))
    .then(response => response.json())
    .then(offer => {
		let result = offer.result;
		let user = offer.user;
		let sessionUser = offer.userID;
		
		if(sessionUser != -1)
		{
			document.getElementById('account-link').href = 'userpage.html?id='+sessionUser;
			document.getElementById('register-li').remove();
		}
		else
		{
			document.getElementById('account-li').remove();
			document.getElementById('post-li').remove();
		}
		if(!offer.result || sessionUser != offer.result.userid )
		{
			console.log("Here");
			document.getElementById('delete-offer').remove();
		}
		else
		{
			document.getElementById('delete-offer').addEventListener('click', async (e) => 
			{
				e.preventDefault();
				var result = confirm("Are you sure you want to delete your offer?");
				if (result) {
					console.log("Here");
				
					fetch('../php/deleteOffer.php?id='+offer.result.id)
					.then( response => response.json())
					.then( (response) =>
					{
						if(response.success)
						{
							window.location.href = '../index.html';
						}
						else
						{
							console.log("Offer failed to delete");
						}
					});
				}
			});
		}
		if(offer.result){
			console.log(result);
			let title = document.getElementById('title');
			let titleP = document.createElement('h1');
			titleP.innerHTML = result.title;
			title.appendChild(titleP);
			
			let qualityEl = document.createElement('p');
			let quality = document.getElementById('quality');
			quality.innerHTML = getQualityString(result.quality);
			quality.appendChild(qualityEl);
			
			if(result.offertype != 'trade'){
				let priceEl = document.createElement('p');
				let price = document.getElementById('price');
				priceEl.innerHTML = result.price;
				price.appendChild(priceEl);
			}
			else{
				let price = document.getElementById('price');
				if(price)
				{
					price.remove();
				}
			}
			let typeEl = document.getElementById('type');
			let type = document.createElement('div');
			type.innerHTML = getOfferTypeString(result.offertype);
			typeEl.appendChild(type);
			
			
			let linkEl = document.getElementById('link');
			let links = document.createElement('a');
			links.innerHTML = result.link;
			if(result.link.indexOf("https://")!= 0){
				links.href = 'https://' + result.link;
			}
			else
			{
				links.href = result.link;
			}
			linkEl.appendChild(links);
			
			let commentEl = document.getElementById('comment');
			if(result.comment)
			{
				let comment = document.createElement('div');
				comment.innerHTML = result.comment;
				commentEl.appendChild(comment);
			}
			else
			{
				commentEl.remove();
			}
			let userEl = document.getElementById('user');
			let userhref = document.createElement('div');
			userhref.innerHTML = user.username;
			userhref.addEventListener('click', () => {
					window.location.href = 'userpage.html?id='+user.id;
			});
			userEl.appendChild(userhref);
		}
		else
		{
			document.body.innerHTML = 'Offer not found!';
		}
	});