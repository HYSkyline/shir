---
title: arcpy数据结构测试记录
date: 2018-05-30 22:22:22
tags:
- GIS
- Python
---
<span class="pageTitle">0.</span>

用arcpy读取点线面的转折点坐标。这是批量化处理数据的根本。

基本思路：通过游标来定位文件，进而读取数据。

游标可以做到：读取、新增/删除、编辑。

需要结合row子对象共同完成（cursor对象包含对row的操作函数——而不对表格直接处理，故先将记录转化为row对象用于操作）

操作思路：读取要素文件 --> 布置游标 --> row对象实例化 --> (通过令牌等)输出row内数据

<div class="blogPic">
	![基本几何类型——点、线、面](https://squanblog.oss-cn-hongkong.aliyuncs.com/arcpy_init/all.png?x-oss-process=image/resize,h_480)
</div>

<span class="pageTitle">1.</span>

首先要明白点的数据结构，明白它是按照怎样的逻辑进行组织的。(当要用到投影坐标系的时候可以用WGS 1984 World Mercator，如果要使用其他空间参考，可以用arcpy.ListSpatialReference函数进行搜索)

{% codeblock 输出name字段属性值 lang:python %}
import arcpy
cur = arcpy.da.SearchCursor('gdb/pt', ['NAME'], spatial_reference=arcpy.SpatialReference('WGS 1984'))
for row in cur:
    print 'name: ' + row[0]

# 以下为输出结果
name: test-c
name: test-d
name: test-e
name: test-f
{% endcodeblock %}

通过cur游标定位到文件，之后就可以用row的实例化对象来操作记录。

但是可以看到，这里是没有几何信息的。想要读取坐标位置，还需要另外的方法。

从ArcGIS文档里可以看到我们需要的是SHAPE令牌。把SHAPE令牌加到布置的游标当中，生成的row实例就会包含几何信息。

{% codeblock 输出几何形状对象 lang:python %}
cur = arcpy.da.SearchCursor('gdb/pt', ['NAME', 'SHAPE@'], spatial_reference=arcpy.SpatialReference('WGS 1984'))
for row in cur:
    print row[1]

# 以下为输出结果
<geoprocessing describe geometry object object at 0x0000000>
<geoprocessing describe geometry object object at 0x0000000>
<geoprocessing describe geometry object object at 0x0000000>
<geoprocessing describe geometry object object at 0x0000000>
{% endcodeblock %}

理所当然地返回了几何对象类(其实是属性表里的 SHAPE* 列，返回值的情况与令牌类型有关)。之后通过对几何对象的属性读取，就可以输出坐标位置了。

{% codeblock 解析几何点的坐标 lang:python %}
cur = arcpy.da.SearchCursor('gdb/pt', ['NAME', 'SHAPE@'], spatial_reference=arcpy.SpatialReference('WGS 1984'))
for row in cur:
    print 'name: ' + row[0] + '\tlng: ' + str(row[1][0].X) + ',\tlat: ' + str(row[1][0].Y)

# 以下为输出结果
name: t-c   	lng:121.23,  lat:31.02
name: t-d   	lng:121.24,  lat:31.03
name: t-e   	lng:121.25,  lat:31.04
name: t-f   	lng:121.26,  lat:31.05
{% endcodeblock %}

读取坐标只是第一步，修改乃至增减记录才是最后的目标。这个时候需要用到不一样的工具，但是思路还是相同。

{% codeblock 更新name字段属性 lang:python %}
cur = arcpy.da.SearchCursor('gdb/pt', ['NAME', 'SHAPE@'], spatial_reference=arcpy.SpatialReference('WGS 1984'))
for row in cur:
    row[0] = 'update' + row[0]
    cur.updateRow(row)
{% endcodeblock %}

通过以上内容，即可在每个点的名称前加上update前缀。	这是对普通记录的修改，对于坐标位置的修改需要构造相应的几何要素类(与令牌的类型有关，当使用SHAPE@XY时就不需要构造要素类)。

{% codeblock 更新点的位置 lang:python %}
import arcpy
import random

inputFeature = 'gdb/pt'
cursor = arcpy.da.UpdateCursor(inputFeature, ['NAME', 'SHAPE@'], spatial_reference=arcpy.SpatialReference('WGS 1984'))

for row in cursor:
	for pnt in row[1]:
		point = arcpy.Point(pnt.X + random.random() - 0.5, pnt.Y + random.random() - 0.5)
	row[1] = point
	cursor.updateRow(row)
{% endcodeblock %}

由此可以看到点要素明显的发生变化。具体的变化算法当然是随机应变。

<div class="blogPic">
	![点要素的几何修改变动对比](https://squanblog.oss-cn-hongkong.aliyuncs.com/arcpy_init/point.png?x-oss-process=image/resize,h_480)
</div>

<span class="pageTitle">2.</span>

线和点的区别仅仅在于数据结构有所不同，放到抽象思路的层面，其实逻辑是相同的。

对于线而言，一条线段由两个或以上的端点组成，因此会多出一层描述不同线段的结构层，否则是无法区分哪个端点对应哪条线，也无法确定线段的几何形状的。

<div class="blogPic">
	![线要素的数据结构示意](https://squanblog.oss-cn-hongkong.aliyuncs.com/arcpy_init/pl.jpg?x-oss-process=image/resize,h_200)
</div>

{% codeblock 解析线要素的转折点坐标 lang:python %}
import arcpy

inputFeature = 'gdb/pl'
cursor = arcpy.da.SearchCursor(inputFeature, ['NAME', 'SHAPE@'], spatial_reference=arcpy.SpatialReference('WGS 1984'))

i1 = 0
i2 = 0
for row in cursor:
	i1 += 1
	# 会存在多部件的线要素——线要素中的每一条记录不一定只对应一条线
	print 'current record index: ' + str(i1)
	for part in row[1]:
		i2 += 1
		# 对大部分(非绝对)线要素而言, len(part) = 1, 代表此行记录仅一条线, 在人工录入时尤其如此
		print '-> current part index: ' + str(i2)
		for pnt in part:
			print '---> lng: ' + str(pnt.X) + '\tlat: ' + str(pnt.Y)
	i2 = 0

# 以下为输出结果
current record index: 1
-> current part index: 1
---> lng: 121.20684280	lat: 30.78693110
---> lng: 121.24784608	lat: 30.88117028
---> lng: 121.35174316	lat: 30.95681913
---> lng: 121.44733933	lat: 31.07342026
---> lng: 121.52978113	lat: 31.11172273
current record index: 2
-> current part index: 1
---> lng: 120.98127867	lat: 30.92632927
---> lng: 121.13517934	lat: 30.97933501
---> lng: 121.24920089	lat: 31.10466894
---> lng: 121.31543033	lat: 31.23671254
---> lng: 121.40825932	lat: 31.36832345
{% endcodeblock %}

但是要构造线段对象，就要麻烦得多。它不能通过简单的列表直接创建，而要先构造所有的转折点组合成数组，再通过点的数组构造成线。

{% codeblock 更新线要素的转折点坐标 lang:python %}
import arcpy
from random import *

inputFeature = 'gdb/pl'
cursor = arcpy.da.UpdateCursor(inputFeature, ['NAME', 'SHAPE@'], spatial_reference=arcpy.SpatialReference('WGS 1984'))

pt_list = arcpy.Array()
part_list = arcpy.Array()
for row in cursor:
	# 会存在多部件的线要素——线要素中的每一条记录不一定只对应一条线
	for part in row[1]:
		# 对大部分(非绝对)线要素而言, len(part) = 1, 代表此行记录仅一条线, 在人工录入时尤其如此
		for pnt in part:
			pt_list.append(arcpy.Point(pnt.X + random() * 0.1 - 0.05), pnt.Y + random() * 0.1 - 0.05)
			# 这里的pt_list实际上就是新构建的part, 是Array对象
		part_list.append(pt_list)
		# part_list是一条记录中不同线组成的Array
	row[1] = arcpy.Polyline(part_list)
	pt_list.removeAll()
	part_list.removeAll()
	cursor.updateRow(row)
{% endcodeblock %}

对一条记录包含多条线的要素，仍然能维持以上的数据结构。

<div class="blogPic">
	![线要素的几何修改变动对比](https://squanblog.oss-cn-hongkong.aliyuncs.com/arcpy_init/line.png?x-oss-process=image/resize,h_440)
</div>

<span class="pageTitle">3.</span>

面是最复杂的要素，不仅仅是因为单条记录中经常出现多个面，也包括孔洞、自交叉等非常的几何关系。其数据结构也有相似的特点。

<div class="blogPic">
	![面要素的数据结构示意](https://squanblog.oss-cn-hongkong.aliyuncs.com/arcpy_init/pg.jpg?x-oss-process=image/resize,h_480)
</div>

第一层，是Array对象，这里是单条记录的不同面部件。

{% codeblock 面要素单条记录中的不同部件 lang:python %}
cur = arcpy.da.SearchCursor(r'gdb\pg', ['NAME', 'SHAPE@'], spatial_reference=arcpy.SpatialReference('WGS 1984'))
for row in cur:
    for part in row[1]:
        print part

# 以下为输出结果
<geoprecessing array object object at 0x000000>
<geoprecessing array object object at 0x000000>
<geoprecessing array object object at 0x000000>
{% endcodeblock %}

第二层已经变成了Point对象，但是从这里要怎么看出部件关系？

{% codeblock 解析面要素单条记录中不同面部件的转折点坐标 lang:python %}
cur = arcpy.da.SearchCursor(r'gdb\pg', ['NAME', 'SHAPE@'], spatial_reference=arcpy.SpatialReference('WGS 1984'))
for row in cur:
    for part in row[1]:
        for section in part:
            print section

# 以下为输出结果
121.418027  30.853068  NaN  NaN
121.424352  30.964025  NaN  NaN
121.523280  30.974093  NaN  NaN
121.540041  30.853069  NaN  NaN
121.418027  30.853068  NaN  NaN
121.422618  31.155731  NaN  NaN
121.424244  31.071996  NaN  NaN
121.361561  31.019401  NaN  NaN
121.270707  31.032140  NaN  NaN
121.264076  31.108932  NaN  NaN
121.323599  31.179931  NaN  NaN
121.422618  31.155731  NaN  NaN
None
121.368132  31.071985  NaN  NaN
121.373089  31.127372  NaN  NaN
(...)
{% endcodeblock %}

仔细看了一下坐标关系，似乎是用了<b>None记录行</b>和坐标记录的<b>顺逆时针顺序</b>来判断孔洞的（顺时针是正常面，逆时针是孔洞），如果是这样的结构，想要做出更新无疑是非常麻烦的事情。

但是不改变转折点数量，单单是改变面要素位置的话，其实问题也不大。只有一层part(之前以为因为孔洞的存在会有两层)的话，其实结构是和线要素一致的。如果想要新增孔洞的话，涉及到位置判断，那个时候就会变得很麻烦。

{% codeblock 更新面要素各部件的转折点坐标 lang:python %}
import arcpy

inputFeature = 'gdb/pg'
cursor = arcpy.da.UpdateCursor(inputFeature, ['NAME', 'SHAPE@'], spatial_reference=arcpy.SpatialReference('WGS 1984'))

hole_list = arcpy.Array()
pt_list = arcpy.Array()
for row in cursor:
    print 'Name: ' + row[0]
    # 会存在多部件的面要素——面要素中的每一条记录不一定只对应一个面
    for part in row[1]:
    	if pnt:
    		hole_list.append(arcpy.Point(pnt.X + random() * 0.1 - 0.05, pnt.Y + random() * 0.1 - 0.05))
    	else:
    	    # 出现None记录, 则为孔洞标志
    	    # 需要合并之前的转折点记录, 同时开始记录孔洞
    	    print '#### hole signature.'
    	    hole_list.replace(len(hole_list) - 1, hole_list[0])
    	    pt_list.append(hole_list)
    	    hole_list.removeAll()
    	    pt_list.append(pnt)

        if pnt == part[-1]:
        	hole_list.replace(len(hole_list) - 1, hole_list[0])
        	pt_list.append(hole_list)
    hole_list.removeAll()
    # 这里的pt_list实际上就是新构建的part, 同时也是Array对象
    # 面要素要求首尾坐标一致(例如四边形会形成5个坐标点)
    # part_list是一条记录中不同面的Array
row[1] = arcpy.Polygon(pt_list)
pt_list.removeAll()
cursor.updateRow(row)
{% endcodeblock %}

孔洞的出现大大增加了算法的复杂程度，也没有专门对应的类，其实是很烦的事情。

另外对面要素的修改很高概率会倒是几何错误，那是另外一个大坑了。几何错误的出现说明在算法上就存在漏洞，不是通过简单的代码层能够解决的事情，更多的需要在算法架构上多做工作。

<div class="blogPic">
	![面要素的几何修改变动对比](https://squanblog.oss-cn-hongkong.aliyuncs.com/arcpy_init/polygon.png?x-oss-process=image/resize,h_440)
</div>

<hr>

写在后面的话。

<span class="pageTitle">a.</span>

为什么要用arcpy？

因为有些目标很难甚至根本无法通过工具的组合去达成。

简单的例子，要把一个小区边界向东整体平移300m。如果用空间校正，需要计算面节点的坐标，要生成新的配准点文件，要按照新坐标导入位置，不复杂，但是非常麻烦；如果用编辑平移，不可能做到完全精准，再强大的目力，也无法分辨无限细分。

如果能直接把节点坐标加上300m，则问题解决。

所以，arcpy不是作为新的分析方法出现，也不是作为深度的分析工具，它只是辅助工具的辅助工具。像是马克沁的准星，或是手风琴的键帽，并非不可或缺，但确实能解放落后的生产力。

<span class="pageTitle">b.</span>

arcpy能做些什么？

标准化。

标准化的工作流、标准化的制图规范、标准化的工具模组……把一天甚至一周的工作压缩到一分钟，剩下的都是你的自由时间。一旦尝试过真正的自由，想要再放手就是一件非常艰难的事情了。

自定义。

再也没有许可的束缚、再也没有工具的制约，你面对的不再是重重包裹的要素文件，你看到触摸到的感受到的只有具体数据，不会再有门扉阻隔，整个世界都已经为你开启。心之所向再无战不胜之物。

简洁。

从现在起，丢掉所有的工具，丢掉所有的模型，需要的只有算法和思想。当算法提出之后，只需要一小段文本就能实现。抛开ArcMap吧，它只是一个笨拙的UI界面，你不再需要它了。