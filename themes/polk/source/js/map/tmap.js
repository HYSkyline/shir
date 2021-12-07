function tmapLngLatQuery() {
	var tpoint = new qq.maps.LatLng(gcj02lat, gcj02lng);
	tmap.panTo(tpoint);
	if (tmapMarkerArr) {
		for (i in tmapMarkerArr) {
			tmapMarkerArr[i].setMap(null);
		}
		tmapMarkerArr.length = 0;
	}
	var tmapMarker = new qq.maps.Marker({position: tpoint});
	tmapMarkerArr.push(tmapMarker);
	tmapMarker.setMap(tmap);
	lnglatQueryOutput('tmapResults');
}
function tmapAddressQuery(address) {
	// console.log('开始执行tmap的addressQuery函数');
	var tmapResultsList = document.getElementById('tmapResults');
	tmapResultsList.innerHTML = '';
	
	var tmapLocal = new qq.maps.SearchService({
		complete: function (results) {
			if (tmapMarkerArr) {
				for (i in tmapMarkerArr) {
					tmapMarkerArr[i].setMap(null);
				}
				tmapMarkerArr.length = 0;
			}
			tmap.panTo(results.detail.pois[0].latLng);
			var tpois = results.detail.pois;
			var maxLength = 10;
			if (tpois.length < maxLength) {
				maxLength = tpois.length;
			}

			var resultsParentDiv = document.createElement("div");
			resultsParentDiv.setAttribute("class", "list-group");
			tmapResultsList.appendChild(resultsParentDiv);

			for (var i = 0; i < maxLength; i++) {
				var tplace = tpois[i];
				var tmapMarker = new qq.maps.Marker({
					position: tplace.latLng
				});
				tmapMarkerArr.push(tmapMarker);
				tmapMarker.setTitle(i + 1);
				tmapMarker.setMap(tmap);

				var resultsDiv = document.createElement("a");
				(function (location) {
					resultsDiv.addEventListener('click', function () {
						tmap.panTo(location);
					}, false);
				})(tplace.latLng);
				resultsDiv.setAttribute("class", "list-group-item");
				addressQueryOutput(i, tplace.name, tplace.address, tplace.latLng.getLng(), tplace.latLng.getLat(), 'gcj02', resultsDiv);
				resultsParentDiv.appendChild(resultsDiv);
			}
		}
	});
	tmapLocal.search(address);
}