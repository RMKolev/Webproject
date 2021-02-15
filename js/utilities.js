var drawOfferCanvas = (offers, prefix) => {
		
		let offerDiv = document.getElementById("offers")
		offers.forEach( el => 
		{
			let resultDiv = document.createElement('div');
			let nameEl = document.createElement('p');
			nameEl.innerHTML = el.title;
			resultDiv.appendChild(nameEl);
			let qualityEl = document.createElement('p');
			qualityEl.innerHTML = getQualityString(el.quality);
			resultDiv.appendChild(qualityEl);
			let typeEl = document.createElement('p');
			typeEl.innerHTML = getOfferTypeString(el.offertype);
			resultDiv.appendChild(typeEl);
			if(el.offertype != 'trade'){
				let priceEl = document.createElement('p');
				priceEl.innerHTML = el.price;
				resultDiv.appendChild(priceEl);
			}
			offerDiv.appendChild(resultDiv);
			resultDiv.classList.add('offerNode');
			resultDiv.addEventListener('click', () => {
				window.location.href = (prefix?prefix:'')+'offer.html?id='+el.id;
			});
		})
};
var drawOfferNavigation = (length, offerSlice, prefix) => 
{
	let oldpages = document.getElementById('navpages');
	if(oldpages){
		oldpages.remove();
	}
	let pages = document.createElement('div');
	pages.classList.add('text-center')
	for (i=0; i< (length/offerSlice); ++i){
			node = document.createElement('button');
			node.innerHTML = (i+1);
			node.pageMarkup = i;
			node.addEventListener('click', (e) => 
			{
				clearOfferCanvas();
				drawOfferNavigation(length,offerSlice, prefix);
				drawOfferCanvas(getOffersFromSlice(e.srcElement.pageMarkup), prefix);
			})
			pages.appendChild(node);
		}
	let offerDiv = document.getElementById("nav");
	pages.id='navpages';
	offerDiv.appendChild(pages);
	
}
var getOffersFromSlice = (num) =>
{
	return allOffers? allOffers.slice(num*(offerSlice),(num+1)*offerSlice) : [];
}
var clearOfferCanvas = () => 
{
	let offerDiv = document.getElementById("offers");
	offerDiv.innerHTML = '';
}
var getQualityString = (string) =>
{
	switch(string)
	{
		case 'sealed':
		return 'Sealed/Unopened';
		
		case 'new':
		return 'Like New';
		
		case 'used':
		return 'Used';
		
		case 'damaged':
		return "Damaged/Missing pieces";
	}
}
var getOfferTypeString = (string) =>
{
	switch(string)
	{
		case 'trade':
		return 'For Trade';
		
		case 'sale':
		return 'For Sale';
		
		case 'saleandtrade':
		return 'For Sale & Trade';
		
		case 'lookingbuy':
		return "Looking for";
	}
}
var sendPostRequest =  async (personalInfo, url) => {
    let requestBody = new FormData();
    for(var key in personalInfo) {
        requestBody.append(key, personalInfo[key]);
    }

    let response = await fetch(url, {
            method: 'POST',
            body: requestBody
        }).then(response => response.json());
    
    return response;
}

var findGetParameter = parameterName => {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}