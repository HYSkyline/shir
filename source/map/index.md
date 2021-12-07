---
title: MapCollection
date: 2018-03-04 09:35:26
---
<link rel="stylesheet" type="text/css" href="../css/MCStyle.css">
<div class="container-fluid">
	<div class="row" id="inputRow">
		<div class="col-md-2" id="title">
			<div id="titleImage" class="titleImageL"></div>
		</div>
		<div class="col-md-10" id="inputCol">
			<form class="form" id="inputForm">
				<div class="form-group" id="inputBoxGroup">
					<input type="text" class="form-control" name="target" id="inputBox" onkeypress="EnterPress(event)" placeholder="输入经纬度(例如120,30)或地址(例如 南京市淳化医院). 回车查询." />
				</div>
				<input type='text' style='display:none'/>
			</form>
			<form class="form-inline" id="sizeForm">
				<div class="form-group" id="mapSizeGroup">
					<label for="mapSize">地图缩放等级(3-18. 数字越大,尺度越小)</label>
					<input type="text" class="form-control" name="mapSize" id="mapSize" onkeypress="EnterSize(event)" value='14' pattern="[0-9]{1,2}" onkeyup="this.value=this.value.replace(/[A-z]/g,'');if(this.value>18){this.value='';}" />
				</div>
				<div class="form-group" id="radioSelect">
					坐标系统: 
					<label class="radio-inline">
						<input type="radio" name="coordType" value="wgs84" checked />WGS84
					</label>
					<label class="radio-inline">
						<input type="radio" name="coordType" value="gcj02" />GCJ02
					</label>
					<label class="radio-inline">
						<input type="radio" name="coordType" value="bd09" />BD09
					</label>
				</div>
				<input type='text' style='display:none'/>
			</form>
		</div>
	</div>
	<div class="row" id="outputRow">
		<hr />
		<div class="col-md-3">
			<div id="gmapContainer" class="mapContainer">Google map?ありません.</div>
			<div id="gmapResults" class="well well-sm"></div>
		</div>
		<div class="col-md-3">
			<div id="amapContainer" class="mapContainer">高德地图加载约需5s左右</div>
			<div id="amapResults" class="well well-sm"></div>
		</div>
		<div class="col-md-3">
			<div id="tmapContainer" class="mapContainer">腾讯地图加载约需3s左右</div>
			<div id="tmapResults" class="well well-sm"></div>
		</div>
		<div class="col-md-3">
			<div id="bmapContainer" class="mapContainer">百度地图加载约需2s左右</div>
			<div id="bmapResults" class="well well-sm"></div>
		</div>
	</div>
</div>

<script type="text/javascript" src="../js/map/clipboard.min.js"></script>
<script type="text/javascript" src="../js/map/coord.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/getscript?v=2.0&ak=ucVe8XDeVOb9vV1PH8VAAETaxRC3Brtl&services=&t=20170912191900"></script>
<script type="text/javascript" src="http://webapi.amap.com/maps?v=1.4.0&key=022aad37b3ec25df2e88764089c4d4d2"></script> 
<script charset="utf-8" src="https://map.qq.com/api/js?v=2.exp&key=ZJWBZ-5ZUKP-TLFDF-LCXOR-GYZOJ-XZF2O"></script>
<script type="text/javascript" src="../js/map/coordtrans.js"></script>
<script type="text/javascript" src="../js/map/gmap.js"></script>
<script type="text/javascript" src="../js/map/amap.js"></script>
<script type="text/javascript" src="../js/map/tmap.js"></script>
<script type="text/javascript" src="../js/map/bmap.js"></script>
<script type="text/javascript" src="../js/map/placeQuery.js"></script>
<script type="text/javascript" src="../js/map/jquery-3.2.1.slim.min.js"></script>
<script type="text/javascript" src="../js/map/bootstrap.js"></script>
<script type="text/javascript" src="../js/map/mapInit.js"></script>
