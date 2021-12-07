var mapSize = parseInt(document.getElementById('mapSize').value);
var bmap = new BMap.Map("bmapContainer");
bmap.centerAndZoom(new BMap.Point(120.1698749461, 30.2768591975), mapSize);
bmap.enableScrollWheelZoom();
var bMapTypeControl = new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT});
bmap.addControl(bMapTypeControl);


var amap = new AMap.Map('amapContainer', {
    resizeEnable: true,
    zoom:mapSize,
    center: [120.1632803679, 30.2710905216]
});
amap.plugin(["AMap.MapType"], function() {
	var aMapType= new AMap.MapType({
		defaultType: 0
	});
	amap.addControl(aMapType);
});

var tmapMarkerArr =[];
var tmap = new qq.maps.Map(document.getElementById("tmapContainer"), {
	center: new qq.maps.LatLng(30.2710905216, 120.1632803679),
	zoom: mapSize,
	panControl: false,
	zoomControl: false
});

var gmapMarkerArr = [];
function initMap() {
	gmap = new google.maps.Map(document.getElementById('gmapContainer'), {
		zoom: mapSize,
		center: {lat: 30.2710905216, lng: 120.1632803679}
	});
}
gmapLoaded = false;
function loadScript() {
	var gmapScript = document.createElement("script");
	gmapScript.type = "text/javascript";
	// gmapScript.src = "http://maps.google.cn/maps/api/js?key=AIzaSyC_9PBWoCkG5I9_ARuCSbXZFLM3yGf1Wko&libraries=places&callback=initMap";
	gmapScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC_9PBWoCkG5I9_ARuCSbXZFLM3yGf1Wko&libraries=places&callback=initMap";
	document.body.appendChild(gmapScript);
	gmapScript.onload = function() {
		// console.log('谷歌地图加载完成');
		gmapLoaded = true;
		google.maps.event.addListener(gmap, 'click', function (gmapClickEvent) {
            clickPan(gmapClickEvent.latLng.lng(), gmapClickEvent.latLng.lat(), 'gcj02');
        });
	}
}
window.onload = loadScript;

bmap.addEventListener("click",function(bmapClickEvent){
	clickPan(bmapClickEvent.point.lng, bmapClickEvent.point.lat, 'bd09');
});

var amapClickEventListener = amap.on('click', function(amapClickEvent) {
	clickPan(amapClickEvent.lnglat.getLng(), amapClickEvent.lnglat.getLat(), 'gcj02');
});

qq.maps.event.addListener(tmap, 'click', function(tmapClickEvent) {
	clickPan(tmapClickEvent.latLng.lng, tmapClickEvent.latLng.lat, 'gcj02');
});

document.getElementById('inputBox').focus();
// console.log('地图初始化后gmap加载状态确认为' + gmapLoaded);

function changeBackgroundImage() {
	var titleImage = document.getElementById('titleImage');
	if (titleImage.className == 'titleImageL') {
		titleImage.className = 'titleImageR';
	} else {
		titleImage.className = 'titleImageL';
	}
}
function clickPan(lng, lat, coordType) {
	coordtrans(lng, lat, coordType);
	amapLngLatQuery();
	tmapLngLatQuery();
	bmapLngLatQuery();
	if (gmapLoaded) {
		gmapLngLatQuery();
	}
	clipboardInit('li');
	// $(function () {$("[data-toggle='tooltip']").tooltip();});
}
function clipboardInit(classNameToCopy) {
	var mapClip = new Clipboard(classNameToCopy);
	mapClip.on('error', function (e) {
		alert('浏览器不支持单击复制,只能手动复制.');
	});
}