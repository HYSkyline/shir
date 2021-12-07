function EnterPress(e) {
	changeBackgroundImage();
    var currKey = e.which || e.keyCode;
    currKey=e.keyCode||e.which||e.charCode;
    // console.log('输入框键入搜索内容后gmap加载状态确认为' + gmapLoaded);
    if(currKey == 13) {
    	query(); 
    }
}
function EnterSize(e) {
	changeBackgroundImage();
    var currKey = e.which || e.keyCode;
    currKey=e.keyCode||e.which||e.charCode;
    if(currKey == 13) {
    	// console.log('按下回车,准备缩放到第' + document.getElementById('mapSize').value + '级.')
    	bmap.setZoom(parseInt(document.getElementById('mapSize').value) + 1);
    	amap.setZoom(parseInt(document.getElementById('mapSize').value));
    	tmap.setZoom(parseInt(document.getElementById('mapSize').value));
    	if (gmapLoaded) {
    		gmap.setZoom(parseInt(document.getElementById('mapSize').value));
    	}
    }
}

function query() {
	var target = document.getElementById('inputBox').value;

	if (target.indexOf("，") > 0) {
		target = target.replace(/，/,",");
	}

	// console.log('执行查询前gmap加载状态确认为' + gmapLoaded);
	if (target.indexOf(",") > 0) {
		// console.log('开始查询经纬度');
		lnglatQuery(target);
	} else {
		addressQuery(target);
	}
	// $(function () {$("[data-toggle='tooltip']").tooltip();});
}

function lnglatQuery(lnglat) {
	// console.log('接收到经纬度' + lnglat);

	var lng = lnglat.split(',')[0];
	var lat = lnglat.split(',')[1];
	// console.log('输入经度:' + lng + '\t输入纬度:' + lat);
	var coordtype = checkCoordType();
	// console.log('确认经纬度为' + coordtype + '类型');

	clickPan(lng, lat, coordtype);
}
function addressQuery(address) {
	var results = document.getElementsByClassName('mapResults');
	for (var i = 0; i < results.length; i++) {
		results[i].innerHTML = '网络连接异常(如果只有谷歌地图失联就凑合用用吧)';
	}

	// console.log('开始查询地址' + address);
	if (gmapLoaded) {
		gmapAddressQuery(address);
	}
	amapAddressQuery(address);
	tmapAddressQuery(address);
	bmapAddressQuery(address);
	clipboardInit('p');
}

function lnglatQueryOutput(panelName) {
	var results = document.getElementById(panelName);
	results.innerHTML = '';
	var resultsDiv = document.createElement("ul");

	var resultWGSdiv = createResultDiv("li", "wgs84", wgs84lng, wgs84lat);
	var resultGCJdiv = createResultDiv("li", "gcj02", gcj02lng, gcj02lat);
	var resultBDdiv = createResultDiv("li", "bd09", bd09lng, bd09lat);

	resultsDiv.appendChild(resultWGSdiv);
	resultsDiv.appendChild(resultGCJdiv);
	resultsDiv.appendChild(resultBDdiv);
	results.appendChild(resultsDiv);
}
function addressQueryOutput(i, name, address, lng, lat, coordtype, resultsDiv) {
	console.log('aqo:' + lng + ',' + lat);
	resultsDiv.innerHTML += '<span><strong>' + (i + 1).toString() + '. ' + name + '<br />' + address + '</strong></span>';
	coordtrans(lng, lat, coordtype);

	var resultWGSdiv = createResultDiv("p", 'wgs84', wgs84lng, wgs84lat);
	var resultGCJdiv = createResultDiv("p", 'gcj02', gcj02lng, gcj02lat);
	var resultBDdiv = createResultDiv("p", 'bd09', bd09lng, bd09lat);

	resultsDiv.appendChild(resultWGSdiv);
	resultsDiv.appendChild(resultGCJdiv);
	resultsDiv.appendChild(resultBDdiv);
}
function createResultDiv(panelClassName, coordtype, lng, lat) {
	// console.log('crd:' + lng + lat);
	var resultOutputDiv = document.createElement(panelClassName);
	resultOutputDiv.setAttribute("data-clipboard-text", lng + ',' + lat);
	resultOutputDiv.setAttribute("data-toggle", "tooltip");
	resultOutputDiv.setAttribute("data-placement", "bottom");
	resultOutputDiv.setAttribute("title", "单击以复制坐标");
	if (coordtype == "wgs84") {
		resultOutputDiv.innerHTML = '<strong>经纬坐标:</strong><br />' + lng + ', ' + lat;
	} else if (coordtype == "gcj02") {
		resultOutputDiv.innerHTML = '<strong>国测坐标:</strong><br />' + lng + ', ' + lat;
	} else {
		resultOutputDiv.innerHTML = '<strong>百度坐标:</strong><br />' + lng + ', ' + lat;
	}
	return resultOutputDiv;
}