function checkCoordType() {
	var coordRadio = document.getElementsByName('coordType');
	for (var i = 0; i < coordRadio.length; i++) {
		if (coordRadio[i].checked) {
			return coordRadio[i].value;
		}
	}
}
function coordtrans(lng, lat, coordtype) {
	if (coordtype === 'wgs84') {
		wgs84lng = lng;
		wgs84lat = lat;
		var wgs84togcj02 = coordtransform.wgs84togcj02(lng, lat);
		gcj02lng = wgs84togcj02[0];
		gcj02lat = wgs84togcj02[1];
		var gcj02tobd09 = coordtransform.gcj02tobd09(gcj02lng, gcj02lat);
		bd09lng = gcj02tobd09[0];
		bd09lat = gcj02tobd09[1];
	} else if (coordtype === 'gcj02') {
		gcj02lng = lng;
		gcj02lat = lat;
		var gcj02towgs84 = coordtransform.gcj02towgs84(lng, lat);
		wgs84lng = gcj02towgs84[0];
		wgs84lat = gcj02towgs84[1];
		var gcj02tobd09 = coordtransform.gcj02tobd09(lng, lat);
		bd09lng = gcj02tobd09[0];
		bd09lat = gcj02tobd09[1];
	} else {
		bd09lng = lng;
		bd09lat = lat;
		var bd09togcj02 = coordtransform.bd09togcj02(lng, lat);
		gcj02lng = bd09togcj02[0];
		gcj02lat = bd09togcj02[1];
		var gcj02towgs84 = coordtransform.gcj02towgs84(gcj02lng, gcj02lat);
		wgs84lng = gcj02towgs84[0];
		wgs84lat = gcj02towgs84[1];
	}
	// console.log('经纬坐标:' + wgs84lng + ',' + wgs84lat);
	// console.log('国测坐标:' + gcj02lng + ',' + gcj02lat);
	// console.log('百度坐标:' + bd09lng + ',' + bd09lat);
}