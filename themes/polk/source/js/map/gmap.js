function gmapLngLatQuery () {
	var gpoint = new google.maps.LatLng(gcj02lat, gcj02lng);
	gmap.panTo(gpoint);

	if (gmapMarkerArr) {
		for (i in gmapMarkerArr) {
			gmapMarkerArr[i].setMap(null);
		}
		gmapMarkerArr.length = 0;
	}
	var gmapMarker = new google.maps.Marker({position: gpoint});
	gmapMarkerArr.push(gmapMarker);
	gmapMarker.setMap(gmap);
	lnglatQueryOutput('gmapResults');
}

function gmapAddressQuery(address) {
	// console.log('执行gmap的addressQuery函数');
	var gmapLocal = new google.maps.places.PlacesService(gmap);
	var gmapLocalReq = {
		query: address
	}
	
	var gmapResultsList = document.getElementById('gmapResults');
	gmapResultsList.innerHTML = '';

	gmapLocal.textSearch(gmapLocalReq, callback);
	function callback(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			if (gmapMarkerArr) {
				for (i in gmapMarkerArr) {
					gmapMarkerArr[i].setMap(null);
				}
				gmapMarkerArr.length = 0;
			}
			gmap.panTo(results[0].geometry.location);
			var maxLength = 10;
			if (results.length < maxLength) {
				maxLength = results.length;
			}

			var resultsParentDiv = document.createElement("div");
			resultsParentDiv.setAttribute("class", "list-group");
			gmapResultsList.appendChild(resultsParentDiv);

			for (var i = 0; i < maxLength; i++) {
				var gplace = results[i];
				var gmapMarker = new google.maps.Marker({
					title: gplace.name,
					position: gplace.geometry.location
				});
				gmapMarkerArr.push(gmapMarker);
				gmapMarker.setMap(gmap);

				var resultsDiv = document.createElement("a");
				(function (location) {
					resultsDiv.addEventListener('click', function () {
						gmap.panTo(location);
					}, false);
				})(gplace.geometry.location);
				resultsDiv.setAttribute("class", "list-group-item"); 
				addressQueryOutput(i, gplace.name, gplace.formatted_address, gplace.geometry.location.lng(), gplace.geometry.location.lat(), 'gcj02', resultsDiv);
				resultsParentDiv.appendChild(resultsDiv);
			}
		}
	}
}
