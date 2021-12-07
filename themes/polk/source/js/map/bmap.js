function bmapLngLatQuery() {
	var bpoint = new BMap.Point(bd09lng, bd09lat);
	bmap.panTo(bpoint, mapSize);
	var bmapMarker = new BMap.Marker(bpoint);
	bmap.clearOverlays();
	bmap.addOverlay(bmapMarker);
	lnglatQueryOutput('bmapResults');
}
function bmapAddressQuery(address) {
	var bmapResultsList = document.getElementById('bmapResults');
	bmapResultsList.innerHTML = '';
	
	var bmapSearchOptions = {
		onSearchComplete: function(results){
			if (bmapLocal.getStatus() == BMAP_STATUS_SUCCESS){
				bmap.clearOverlays();
				bmap.panTo(results.getPoi(0).point);
				var maxLength = 10;
				if (results.getCurrentNumPois() < maxLength) {
					maxLength = results.length;
				}

				var resultsParentDiv = document.createElement("div");
				resultsParentDiv.setAttribute("class", "list-group");
				bmapResultsList.appendChild(resultsParentDiv);

				for (var i = 0; i < maxLength; i++){
					var bplace = results.getPoi(i);
					var bmapMarker = new BMap.Marker(bplace.point);
					bmap.addOverlay(bmapMarker);

					var resultsDiv = document.createElement("a");
					(function (location) {
						resultsDiv.addEventListener('click', function () {
							// bmap.panTo(new BMap.Point(location.lng, location.lat));
							bmap.panTo(location);
						}, false);
					})(bplace.point);
					resultsDiv.setAttribute("class", "list-group-item"); 
					addressQueryOutput(i, bplace.title, bplace.address, bplace.point.lng, bplace.point.lat, 'bd09', resultsDiv);
					resultsParentDiv.appendChild(resultsDiv);
				}
			}
		}
	};
	var bmapLocal = new BMap.LocalSearch(bmap, bmapSearchOptions);
	bmapLocal.search(address);
}