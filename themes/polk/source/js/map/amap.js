function amapLngLatQuery() {
	var apoint = new AMap.LngLat(gcj02lng, gcj02lat);
	amap.panTo(apoint);
	var amapMarker = new AMap.Marker({position: apoint});
	amap.clearMap();
	amapMarker.setMap(amap);
	lnglatQueryOutput('amapResults');
}
function amapAddressQuery(address) {
	// console.log('执行amap的addressQuery函数.');
	var amapResultsList = document.getElementById('amapResults');
	amapResultsList.innerHTML = '';

	AMap.service(["AMap.PlaceSearch"], function() {
		var amapLocal = new AMap.PlaceSearch({
			pageSize: 10,
			pageIndex: 1,
		});
		amapLocal.search(address, function(status, result) {
			if (status == 'complete') {
				amap.panTo(result.poiList.pois[0].location);
				amap.clearMap();
				var maxLength = 10;
				if (result.poiList.pois.length < maxLength) {
					maxLength = result.poiList.pois.length;
				}

				var resultsParentDiv = document.createElement("div");
				resultsParentDiv.setAttribute("class", "list-group");
				amapResultsList.appendChild(resultsParentDiv);

				for (var i = 0; i < maxLength; i++) {
					var aplace = result.poiList.pois[i];
					var amapMarker = new AMap.Marker({position: aplace.location});
					amapMarker.setMap(amap);

					var resultsDiv = document.createElement("a");
					(function (location) {
						resultsDiv.addEventListener('click', function () {
							amap.panTo(location);
						}, false);
					})(aplace.location);
					resultsDiv.setAttribute("class", "list-group-item"); 
					addressQueryOutput(i, aplace.name, aplace.address, aplace.location.getLng(), aplace.location.getLat(), 'gcj02', resultsDiv);
					resultsParentDiv.appendChild(resultsDiv);
				}
			}
		});
	});
}