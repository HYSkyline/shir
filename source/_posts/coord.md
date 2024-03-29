---
title: GIS中的空间参考概念
date: 2018-04-20 23:02:16
tags:
- 空间参考
- GIS
---
<span class="pageTitle">0.</span>

略。

<span class="pageTitle">1.</span>

如果你想要告诉别人你在什么位置，就一定需要一个参照体系。“正在转进4号线”是以轨道站为中心，“现在车上”是以火车为中心，“我在距离你两千六百公里以外的敦煌”是以你为中心。

无论是飞天的壁画还是你，从更长远的时间上来讲都是善变的。想要确立一个稳定的位置表达方法，需要依托的是更为恒久的事物。五千年以来不断有人思考这个问题。有人选择了星夜，有人选择了日月，而更多的人选择脚下的大地。

<span class="pageTitle">2.</span>

地球本身是一个不规则的接近于椭球体的体块。地球表面并不平整，难以被简洁的曲面方程完全表达，为测量与定位带来困难。

在这里避开不可知论的牢骚，人们创造了各式各样的方法规避了对细节的关注，而以严苛琐碎的约束保证了提出模型的准确。

简单来讲，所有的模型可以分为平面、球体、椭球体三类。在小尺度(10km半径以内)上以平面直接拟合，在中等尺度(1:100000或更大比例尺)上采用球体以图快捷，在大尺度上(1:250000)使用椭球体保证准确。在特定的情况下，确实卓有成效。

<div class="blogPic">
	![地球表面的不同拟合模型](https://squanblog.oss-cn-hongkong.aliyuncs.com/coord/%E4%B8%89%E7%A7%8D%E6%A8%A1%E5%9E%8B.jpg?x-oss-process=image/resize,h_180)
</div>

平面和球体姑且不论——小范围的定位，再复杂也不至于翻车——所有繁琐的定义和概念都是围绕椭球体展开的。这里汇聚的是一代代人的智慧，也潜伏着一个又一个的深坑。

<span class="pageTitle">3.</span>

提前总结下整个框架——

<div class="blogPic">
	![空间参考概念结构](https://squanblog.oss-cn-hongkong.aliyuncs.com/coord/%E6%A1%86%E6%9E%B6.jpg?x-oss-process=image/resize,h_240)
</div>

以及对于空间参考转换的完整流程示意。

<div class="blogPic">
	![空间参考转换方法示意](https://squanblog.oss-cn-hongkong.aliyuncs.com/coord/%E6%8A%95%E5%BD%B1%E8%BD%AC%E6%8D%A2.jpg?x-oss-process=image/resize,h_280)
</div>

<span class="pageTitle">4.</span>

通过构造椭球体，使之最大程度拟合整个地球的大地水准面，则为地球椭球体。而根据具体需要(多为拟合范围需求)的不同，存在不同地球椭球体。

至于大地水准面，指的是拟合范围内的静止水平面，形状上近似椭球面，但仍略有起伏。

<div class="blogPic">
	![大地水准面概念](https://squanblog.oss-cn-hongkong.aliyuncs.com/coord/%E5%A4%A7%E5%9C%B0%E6%B0%B4%E5%87%86%E9%9D%A2.jpg?x-oss-process=image/resize,h_240)
</div>

由地球椭球体与大地水准面进行最大程度拟合，得到的包含方向与位置的椭球体，称为参考椭球体。根据大地水准面的全球/区域性，参考椭球体可分为 地球参考椭球体(同地球椭球体) 与 区域参考椭球体。

<div class="blogPic">
	![参考椭球体—地球/区域](https://squanblog.oss-cn-hongkong.aliyuncs.com/coord/%E5%8F%82%E8%80%83%E6%A4%AD%E7%90%83%E4%BD%93.jpg?x-oss-process=image/resize,h_270)
</div>

中国自民国以来也采用过不同的参考椭球体，另外香港、台湾等地也曾有过自己的参考椭球体。(香港现已与大陆统一，台湾现采用GRS80椭球体)

<div class="blogPic">
	![中国历版坐标系椭球体](https://squanblog.oss-cn-hongkong.aliyuncs.com/coord/%E5%9B%BD%E5%86%85%E6%A4%AD%E7%90%83%E4%BD%93.jpg?x-oss-process=image/resize,h_250)
</div>

高程基准则相对简明。中国仅提出两份高程基准，分别为1956年黄海高程系统(以青岛观象山为准)、1985年国家高程基准(以青岛验潮站1952-1979年潮汐资料均值为准，低于前版标准)。

<span class="pageTitle">5.</span>

光有一个椭球体仍然不够，一个椭球体只有球心的位置是绝对的，要定义其表面的点的位置，还需要明确的方向。椭球体本身、椭球体的自定义原点(只有地心基准面的原点为球心，区域基准面通常选取椭球体表面点作为原点，如泾阳县永乐镇北流村、南投县埔里镇虎子山等。基准面原点不一定为坐标系原点，北京54坐标系的基准面原点位于列宁格勒，但坐标系原点仍在北京)、基准面的决定方向，共同构成了大地基准面。至此，通过大地基准面，即可实现对空间位置的最基础定位。

<div class="blogPic">
	![大地基准面原点概念](https://squanblog.oss-cn-hongkong.aliyuncs.com/coord/%E5%9F%BA%E5%87%86%E9%9D%A2%E5%8E%9F%E7%82%B9.jpg?x-oss-process=image/resize,h_270)
</div>

在众多基准面中，WGS84作为最常用的地心基准面存在。其拟合精度由常年卫星监测保证，因而成为其他基准面的设计蓝本。通过平移参数ΔX、ΔY、ΔZ表示与WGS84坐标原点(即地心)的平移值；旋转参数εx、εy、εz表示当地坐标系旋转至与WGS84坐标系平行时，分别绕Xt、Yt、Zt的旋转角；比例校正因子，用于调整椭球体大小，以上7参数即基于WGS84的大地基准面的全部内容，也是地理坐标系转换的全部参数。

<div class="blogPic">
	![不同地理坐标系的椭球体差异—7参数修正背景](https://squanblog.oss-cn-hongkong.aliyuncs.com/coord/%E5%9C%B0%E7%90%86%E5%9D%90%E6%A0%87%E7%B3%BB%E5%8F%98%E6%8D%A2.jpg?x-oss-process=image/resize,h_340)
</div>

在地理坐标系之间进行坐标系的转换，也将参照此7参数进行计算——在区域范围较小或精度要求不高时也会简化为3参数(平移距离、旋转角度、缩放比例)。需要注意的是不同的转换方式有不同的精度误差(在误差最大情况下)：7参数法误差约1-2m，3参数法误差可达4-5m。另外针对北美地区，还有NADCON(用于NAD27/NAD83之间的转换)、HPGN/HARN、CNT等方法，可以将误差控制在15cm以内。

在确立基准面之后，空间位置的描述将通过地理坐标、高程值进行描述，通过测角、量距、测高程实现。其中地理坐标采用大地基准面定义的椭球体坐标系(原点、方向皆已定义)，通常通过天文测量方法测定。高程则通过到大地水准面的绝对距离进行计算。

<span class="pageTitle">6.</span>

在实现定位后，面临新的问题:把地球滴水不漏地画在图纸上。

这不仅仅是将经纬度转化为x、y值这么简单。可以想见，照着直接看到的地球来描绘，起码缺失一个半球。而且当一个曲面要展开成为平面时，一定会发生属性上的变化，或者是形状、面积(由此产生等积投影，用于大地测量)、或者是角度(由此产生等角投影，用于导航)、或是距离。在这个问题面前，不同的人按照各自不同的考量，又一次提出了不同的方法。在这里只展开三种主流方法:Cylinder(圆柱投影)、Conic(圆锥投影)、Planes(平面投影)。

<div class="blogPic">
	![三类主要投影](https://squanblog.oss-cn-hongkong.aliyuncs.com/coord/%E6%8A%95%E5%BD%B1%E6%96%B9%E5%BC%8F00.jpg?x-oss-process=image/resize,h_360)
</div>

首先明确，任何投影，其平面与参照椭球体都会有切割发生，且在切线/割线上形变最小。选择哪一种投影，首要考虑的是目标地区在投影中的形变，即与切线/割线的相对关系。由此推论，圆柱投影适合低纬度地区，圆锥投影最适合中纬度地区，平面投影适合高纬度地区。其中，圆柱、圆锥投影的不同算法均可做到等积/等距/等角，而平面投影在三个属性上都会产生形变。

<div class="blogPic">
	![不同投影方式的变形性](https://squanblog.oss-cn-hongkong.aliyuncs.com/coord/%E5%8F%98%E5%BD%A2%E6%80%A7.jpg?x-oss-process=image/resize,h_160)
</div>

各投影方式示意图如下：

<div class="blogPic">
	![主要投影方式图示](https://squanblog.oss-cn-hongkong.aliyuncs.com/coord/%E6%8A%95%E5%BD%B1%E6%96%B9%E5%BC%8F.jpg?x-oss-process=image/resize,h_600)
</div>

更多的投影方式，可以参照{% link 这里 https://en.wikipedia.org/wiki/List_of_map_projections 地图投影列表 %}

此外还有投影的一些参数需要解释，在这里展开中央经线(Central meridian)、东偏/北偏(False easting / False northing)、中央经线缩放比例(Scale factor)。

中央经线规定该投影的坐标原点所在经度，一般也能据此推断坐标系原点(标准纬度通常为0，但亦存在圆锥投影等特殊案例)。这是投影方法的基准所在，一般不作修改。

东偏/北偏是为了保证坐标值为正而存在，正坐标值对后续计算更为有利。一些简单的城市坐标系，就是通过调整东偏/北偏来实现所谓的城市空间参考的，实际上并没有提升城市内空间参考的精度(提高精度需要从大地基准面开始)。

中央经线缩放比例是圆柱投影的特征值，用以调整区域整体的测量精度。例如Gauss投影(缩放比例为1.0，即不缩放)与UTM投影(缩放比例约0.9996)即存在差别，导致Gauss投影在经线位置最精确，UTM投影在经线两侧位置最精确(经线位置反而相对不精确)的情形。

<span class="pageTitle">7.</span>

在正统的空间参考之外，还存在国测局坐标的说法。

准确来讲，国测局并没有定义任何坐标系，他们做的唯一一件事，是对在WGS84环境下的经纬度进行纯数学加密，从而得到新的虚假坐标。此算法以经纬度为自变量，因此在不同地区其变化幅度也不甚相同。

<div class="blogPic">
	![GCJ02与WGS84误差对比](https://squanblog.oss-cn-hongkong.aliyuncs.com/coord/GCJ02%E8%AF%AF%E5%B7%AE.jpg?x-oss-process=image/resize,h_180)
</div>

测绘部门想要进行制图测量？为了国家安全必须转国测局坐标，不仅必须转，还必须交手续费。职能部门想要真实地理数据开展工作？打报告写申请层层审批，还必须交手续费。此山是我开，你能奈我何？

在经过足够多采样点进行拟合的准备后，已经出现一些将国测局坐标转回真实经纬度的算法，其精度大多与运算时间成正比，但都能保证在2m以内。至于更高精度的算法，甚至原始算法的破解，大概可以期待一场革命。

<span class="pageTitle">7.</span>

在经历过各式各样的空间参考，领略过各类模型后，我却始终觉得，执着于一个星球，几个投影算法，甚至执着于保密一些经纬度，总归是小场面，格局真的还是太小太小。

人类的征途，应该是星辰大海，应该是十亿光年，应该是横贯无垠虚空。在无限恒星之中徜徉，夏夜的星图会指引我们。
