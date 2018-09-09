---
title: CADToGIS
date: 2018-09-08 16:32:40
tags:
- GIS
---
<span class="pageTitle">0.</span>

经常性地遇到这样的CAD现状图/规划图，需要生成GIS的矢量文件用以用地统计或地理分析。但在CAD导入GIS的过程中，流程复杂，错误颇多。特此整理记录。

技术路线示意如下：

<div class="blogPic">
	![技术路线图](http://squanblog.oss-cn-hongkong.aliyuncs.com/cadtogis/%E6%8A%80%E6%9C%AF%E6%A1%86%E6%9E%B6.jpg?x-oss-process=image/resize,h_200)
</div>

<span class="pageTitle">1.</span>

用地CAD如下，这是一张现状用地。

<div class="blogPic">
	![现状用地概览](http://squanblog.oss-cn-hongkong.aliyuncs.com/cadtogis/%E7%8E%B0%E7%8A%B6%E7%94%A8%E5%9C%B0%E6%A6%82%E8%A7%88.jpg?x-oss-process=image/resize,h_500)
</div>

第一步要做的是检查用地与道路的基本数据情况，这是为了明确之后可能会发生的问题。下面列举了一些常见的问题（包括但不限于）并给出应对建议：

<div class="blogPic">
	![常见CAD错误](http://squanblog.oss-cn-hongkong.aliyuncs.com/cadtogis/%E5%B8%B8%E8%A7%81CAD%E9%94%99%E8%AF%AF.jpg?x-oss-process=image/resize,h_300)
</div>

这些问题是在之后的操作中逐步解决的，现在只是确定问题。

<span class="pageTitle">2.</span>

第二步是为了解决CAD地块无边界问题，这是为了避免在导入GIS过程中遗漏图层，这个问题无法通过GIS解决。

在这里需要用到湘源的地块边界生成功能。注意生成边界的设置中边界线需要和图案填充同一图层，以便在GIS中识别不同用地图层（生成新边界后，不同用地类型的边线都在同一图层了）。

生成边界后，为了提高导入GIS的速度建议把多余的东西（图块、空图层、图案填充等）删除掉，但不删除问题也不大。

<div class="blogPic">
	![用地边界生成](http://squanblog.oss-cn-hongkong.aliyuncs.com/cadtogis/%E7%94%A8%E5%9C%B0%E8%BE%B9%E7%95%8C.jpg?x-oss-process=image/resize,h_300)
</div>

<span class="pageTitle">3.</span>
第三步是把CAD文件先转化为GIS格式（其实在CAD中还能继续解决大部分的数据问题，这里不展开了，只给出GIS的解决方法）。

<div class="blogPic">
	![CAD文件内容](http://squanblog.oss-cn-hongkong.aliyuncs.com/cadtogis/CAD%E6%96%87%E4%BB%B6%E5%86%85%E5%AE%B9.jpg?x-oss-process=image/resize,h_240)
</div>

在这里把Polygon和Polyline导入到GIS里，其他的内容这里用不上。

在导入过程中为了避免测绘质量影响，需要在环境中删除Z值。

<div class="blogPic">
	![导出为GIS文件](http://squanblog.oss-cn-hongkong.aliyuncs.com/cadtogis/%E5%AF%BC%E5%87%BA%E4%B8%BAGIS00.jpg?x-oss-process=image/resize,h_300)
</div>

<span class="pageTitle">4.</span>

第四步是对照CAD文件对GIS文件进行修整，包括空间参考设置、用地面要素、道路线要素等。

首先进行空间参考设置。但空间参考与本文关系不大，且是否进行校正不影响用地类型判断，这里不展开（这里有{% link 其他文章 http://hyskyline.studio/2018/04/20/coord/ GIS中的空间参考概念 %}介绍空间参考）。还是建议校核空间参考，可以结合影像图判断一些重叠用地的实际用地类型。

<br>

其次是用地面要素的修整，这里针对面要素重叠、特殊用地等问题进行修整。

面要素重叠的解决思路是通过OID判断重叠关系，进而提取各地块的最顶层用地类型，以完成与CAD相同的用地图。

实现这个目标需要一个无重叠面的GIS地块文件。通过面要素重新转面即可得到。

<div class="blogPic">
	![要素转面工具介绍](http://squanblog.oss-cn-hongkong.aliyuncs.com/cadtogis/%E8%A6%81%E7%B4%A0%E8%BD%AC%E9%9D%A2%E5%B7%A5%E5%85%B7%E4%BB%8B%E7%BB%8D.jpg?x-oss-process=image/resize,h_500)
</div>

此外还需要确定最顶层用地类型。由于GIS的数据结构设定，可以看到绘制次序是按照OID降序排列的。

<div class="blogPic">
	![GIS层叠次序](http://squanblog.oss-cn-hongkong.aliyuncs.com/cadtogis/GIS%E9%87%8D%E5%8F%A0%E5%85%B3%E7%B3%BB.jpg?x-oss-process=image/resize,h_240)
</div>

通过标识，即可将最顶层用地类型记录在无重叠面GIS文件上。针对原用地面要素中的重叠面，只需提取OID最大的要素用地类型，最后经由连接回调用地类型信息至面要素。

<div class="blogPic">
	![OID标识透视表](http://squanblog.oss-cn-hongkong.aliyuncs.com/cadtogis/%E8%A6%81%E7%B4%A0%E9%80%8F%E8%A7%86%E8%A1%A8.jpg?x-oss-process=image/resize,h_450)
</div>

完成以上步骤后，面要素重叠问题即告解决。接下来是E2水域等特殊用地的处理。由于CAD文件中的Polygon导入GIS过程本质上是由边界线生成面的过程，因此在CAD文件未能绘制全域所有用地时会出现多余面的情况（江南地区由于多河流水系尤其明显）。此类问题暂无程序化解决方法，只能手动筛选。

<div class="blogPic">
	![水系河网多余面情况](http://squanblog.oss-cn-hongkong.aliyuncs.com/cadtogis/%E6%B0%B4%E7%B3%BB%E6%B2%B3%E7%BD%91.jpg?x-oss-process=image/resize,h_500)
</div>

（看到河流之间大面积的面要素吗？那并不是水域用地，而是农林用地。但周围的水系边界形成闭环，农林用地又未在CAD中画出，因此GIS将其也生成为E2水域用地面要素。）

<br>

再次是道路线要素。由于大多数CAD文件中道路以单折线配合线宽的形式进行绘制，或是画了双线但缺口较多难以补全，因此采用与用地不同的处理方法。

<div class="blogPic">
	![道路线要素查询](http://squanblog.oss-cn-hongkong.aliyuncs.com/cadtogis/%E9%81%93%E8%B7%AF%E5%9B%BE%E5%B1%82%E5%AE%9A%E4%B9%89%E6%9F%A5%E8%AF%A2.jpg?x-oss-process=image/resize,h_260)
</div>

采用之前导入的polyline文件，提取道路相关的线要素（去除用地边界线）。再以此文件为基础进行拓扑检查，排除所有的悬挂点，确保能够生成完整的道路面要素。如果是单线则生成相应路宽的缓冲区，是双线则做好道路边界的封口。

由于错误类型不同，因此这里也需要手工进行筛选。

<div class="blogPic">
	![道路拓扑检查](http://squanblog.oss-cn-hongkong.aliyuncs.com/cadtogis/%E9%81%93%E8%B7%AF%E6%8B%93%E6%89%91%E6%A3%80%E6%9F%A5.jpg?x-oss-process=image/resize,h_520)
</div>

完成后通过线转面，即可得到道路面要素（根据线要素所在图层的不同，需要手动调整面要素中的H21/H22/S1用地类型信息）。

<div class="blogPic">
	![道路拓扑检查结果](http://squanblog.oss-cn-hongkong.aliyuncs.com/cadtogis/%E9%81%93%E8%B7%AF%E6%8B%93%E6%89%91%E6%A3%80%E6%9F%A5%E5%AE%8C%E6%88%90.jpg?x-oss-process=image/resize,h_520)
</div>

<span class="pageTitle">5.</span>

之前的用地面要素需要叠上道路面要素才能形成完整的用地图。可通过更新工具完成。

<div class="blogPic">
	![更新工具介绍](http://squanblog.oss-cn-hongkong.aliyuncs.com/cadtogis/%E6%9B%B4%E6%96%B0%E5%B7%A5%E5%85%B7%E4%BB%8B%E7%BB%8D.jpg?x-oss-process=image/resize,h_300)
</div>
