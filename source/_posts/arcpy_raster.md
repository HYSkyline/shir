---
title: arcpy栅格结构测试记录
date: 2018-08-22 14:35:08
tags:
- GIS
- Python
---
<span class="pageTitle">0.</span>

栅格的读取、数据更新、自定义像元值的栅格创建、栅格保存与删除。

<div class="blogPic">
	![测试栅格数据](https://squanblog.oss-cn-hongkong.aliyuncs.com/arcpy_raster/00.jpg?x-oss-process=image/resize,h_480)
</div>

<span class="pageTitle">1.</span>

测试Raster对象的数据组成。测试过程如下：

{% codeblock Raster对象构成 lang:python %}
>>> r = arcpy.Raster('tt')
>>> print r
tt
>>> print r.noDataValue
None
>>> arr = arcpy.RasterToNumPyArray(r)
>>> print arr
[[ -3.40282306e+38  -3.40282306e+38  -3.40282306e+38 ...,  -3.40282306e+38
   -3.40282306e+38  -3.40282306e+38]
 [ -3.40282306e+38  -3.40282306e+38  -3.40282306e+38 ...,   0.00000000e+00
    0.00000000e+00   0.00000000e+00]
 [ -3.40282306e+38  -3.40282306e+38  -3.40282306e+38 ...,   0.00000000e+00
    0.00000000e+00  -3.40282306e+38]
 ..., 
 [ -3.40282306e+38  -3.40282306e+38  -3.40282306e+38 ...,  -3.40282306e+38
   -3.40282306e+38  -3.40282306e+38]
 [ -3.40282306e+38  -3.40282306e+38  -3.40282306e+38 ...,  -3.40282306e+38
   -3.40282306e+38  -3.40282306e+38]
 [ -3.40282306e+38  -3.40282306e+38  -3.40282306e+38 ...,  -3.40282306e+38
   -3.40282306e+38  -3.40282306e+38]]
>>> 
{% endcodeblock %}

可以看到内部是以二元数组存放像元值的矩阵形式。

这个矩阵是按照栅格的外接矩形补完的，外接矩形与栅格之间为Nodata，实际以一个极大负值代替。因为测试栅格文件是32位浮点型数组，所以这里的极大负值是-(2<sup>128</sup>)≈-3.4e+38。

这个栅格一共有52行，88列。在非单波段栅格文件(例如卫星影像等)的前提下shape是三个数字，分别代表栅格文件的波段、行数、列数，这里不再测试。

{% codeblock Raster的shape属性(波段、行列计数) lang:python %}
>>> arr.shape
(52, 88)
>>> for each in arr:
...     print len(each),
...     
88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88 88
>>> print len(arr)
52
{% endcodeblock %}

测试栅格矩阵的实际值。

{% codeblock Raster的具体像元值读取 lang:python %}
>>> for each in arr[30]:
...     if each > 1:
...         print each
...         

...,
11.5315
12.0315
12.4738
12.8547
13.1711
13.4205
...
{% endcodeblock %}

通过对于栅格对象的矩阵解读，即可实现Raster对象的像元值提取。

此外，其空间位置可以通过外接矩形的四个顶点确定。可以直接读取四个顶点的坐标值与像元的分辨率，定位整个栅格文件的空间位置。

{% codeblock Raster的空间位置 lang:python %}
>>> print (r.extent.XMin, r.extent.YMin)
(12843008.483052276, 4655868.808828016)
>>> print (r.extent.XMax, r.extent.YMax)
(12869408.483052276, 4671468.808828016)
>>> print r.meanCellWidth
300.0
>>> print r.meanCellHeight
300.0
>>> 
{% endcodeblock %}

<span class="pageTitle">2.</span>

通过修改栅格文件的数据矩阵，实现对像元值的更新。

要注意的是NumPyArrayToRaster方法中value_to_nodata参数的默认值为None，而原栅格文件读取时Nodata被设定为-3.4e+38，因此需要手动设置此参数为对应值，否则无法如原栅格文件一样保持裁剪形状。

以左下顶点(必须转化为Point对象，而非x、y坐标值组成的列表或元组)为基准，将更新后的数组转化为新的栅格。

{% codeblock Raster的数据矩阵更新 lang:python %}
>>> arr = arcpy.RasterToNumPyArray(r)
>>> arr_new = arcpy.RasterToNumPyArray(r)
>>> for i in range(0, rownum):
...     for j in range(0, colnum):
...         if arr_new[i][j] > 6:
...             arr_new[i][j] = 6
...         elif arr_new[i][j] < 0:
...             arr_new[i][j] = r.noDataValue
...             
>>> new_raster = arcpy.NumPyArrayToRaster(arr_new, arcpy.Point(r.extent.XMin, r.extent.YMin),300,300)
>>> 
{% endcodeblock %}

新的文件默认不含有空间参考，可以手动定义一个与原栅格相同的参考系

{% codeblock 定义Raster的空间参考 lang:python %}
>>> arcpy.DefineProjection_management('new_raster', arcpy.SpatialReference('WGS 1984 World Mercator'))
>>> 
{% endcodeblock %}

由此完成栅格文件的数据更新。

<div class="blogPic">
	![更新后的栅格文件](https://squanblog.oss-cn-hongkong.aliyuncs.com/arcpy_raster/01.jpg?x-oss-process=image/resize,h_480)
</div>

<span class="pageTitle">3.</span>

如果按照这样的思路，新建栅格不必新构建一个空白Raster对象，而只需要构造一个符合要求的数组，通过NumPyArrayToRaster()函数将新建数组转化为栅格就可以了。

按上文的空间位置，测试新建栅格的实际流程

{% codeblock 新建Raster对象过程 lang:python %}
>>> import numpy
>>> arr_new = []
>>> for i in range(0,8):
...     for j in range(0,8):
...         if i + j < 3 or i + j > 11:
...             arr_row.append(float('nan'))
...         else:
...             arr_row.append(12)
...     arr_new.append(arr_row)
...     arr_row = []
...     
>>> arr_news = numpy.asarray(arr_new,dtype=numpy.float32)
>>> print arr_news
[[ nan  nan  nan  12.  12.  12.  12.  12.]
 [ nan  nan  12.  12.  12.  12.  12.  12.]
 [ nan  12.  12.  12.  12.  12.  12.  12.]
 [ 12.  12.  12.  12.  12.  12.  12.  12.]
 [ 12.  12.  12.  12.  12.  12.  12.  12.]
 [ 12.  12.  12.  12.  12.  12.  12.  nan]
 [ 12.  12.  12.  12.  12.  12.  nan  nan]
 [ 12.  12.  12.  12.  12.  nan  nan  nan]]
>>> new_raster = arcpy.NumPyArrayToRaster(arr_news,arcpy.Point(r.extent.XMin, r.extent.YMin), 300,300)
>>> 
{% endcodeblock %}

猜测这里的数据构建和标准方法不太一样，NumPyArrayToRaster()只接收ndarray形式的数组，应当是通过numpy直接构造ndarray数组，这里却是首先构造二维list再转化为ndarray类型，实际上多了一步。

另外，构造栅格文件与其外接矩形之间的裁剪空白时，需要构造nan类，而不是None类。使用None将导致无法创建。

完成后可以显示新建的栅格文件。

<div class="blogPic">
	![新建栅格文件](https://squanblog.oss-cn-hongkong.aliyuncs.com/arcpy_raster/03.jpg?x-oss-process=image/resize,h_480)
</div>

<span class="pageTitle">4.</span>

保存很简单，给出存储位置的路径，可以直接调用Raster对象的save方法进行。

{% codeblock 新建Raster文件的保存 lang:python %}
>>> new_raster.save('L:\\DB\\test.gdb\\ttnew00')
>>> 
{% endcodeblock %}

删除不是Raster对象的独有方法，是更基础的函数，具体以Delete_management()函数进行。

{% codeblock Raster文件删除 lang:python %}
>>> arcpy.Delete_management('L:\\DB\\test.gdb\\ttnew01')
<Result 'true'>
>>> 
{% endcodeblock %}
