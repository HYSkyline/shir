---
title: 从网用户活跃程度调查
date: 2018-06-02 23:03:05
tags:
- Python
---
<br>

<blockquote cite="Graham Greene 《The End of the Affair》" class="quote">
	We are in the same desert, looking for perhaps the same spring,
	but lose sight of each other, one is always lonely.
</blockquote>

<span class="pageTitle">0.</span>

本篇成文于2016.2.14。首发别处。归档。

<span class="pageTitle">1.</span>

最近重新连上了从网，不过这里冷冷清清，少有新的资讯。几乎每一次登录都会被吾黄刷屏，即使那已经是两三天之前的状态。和以前的从网比较起来，简直是两个不同的网站。

没有人再连从网，当然就不会有新的状态，满屏吾黄也就可以解释了。即使偶尔有人来到这里，看到的也只是一片空白。

但是，这里真的没有人嚒？

没有人只是没有资讯的充分不必要条件。真正离开这里，再也没有回来过的人也许并不多，多的是像我一样的潜水党，上线只是为了看猫而已。

“我们在同一片沙漠里，在寻找的也许是同一眼泉水，但却相互看不见，总是孤零零的一个人。”

Wanna see u.

<span class="pageTitle">2.</span>

提取所有从网好友的最后登录时间是从15年的9月下旬开始的。希望借助时间信息来判断他们是否已经离开——最后登录时间在几个月前甚至更久远的人，大概可以当作不会再连入从网了。具体时间大概是在9月22日早上1点20分。

此后，分别在15年12月30日晚10点半、16年2月5日早上12点半、16年2月8日下午4点重新提取时间信息。到现在为止，一共产生了四个时刻的登录时间信息。四个时刻分别对应学期内日常、考试周即将来临之际、假期日常和节日四个不同状态。

从四个不同时间点的时间信息中，看到一些趋势。

<div class="blogPic">
	![四时期最后登陆间隔天数排列](https://squanblog.oss-cn-hongkong.aliyuncs.com/rr/fourexp.jpg?x-oss-process=image/resize,h_360)
</div>

以上四图整个样本按照登录时间距离采集时间的天数进行排列。其横坐标是每个人的姓名，图表采用柱状图，只是过于密集看不到柱间距了。

从这四张图可以看到什么？连柱子都分不清的柱状图，很难得出确切的论段。

<span class="pageTitle">3.</span>

对四个样本进行统计，可以得出以下结论(表格见下):

(1). 平均数呈现上升趋势

(2). 中位数呈现上升趋势

(3). 众数始终保持0或1

(4). 方差呈现上升趋势

<div class="blogPic">
	![四样本基本统计信息](https://squanblog.oss-cn-hongkong.aliyuncs.com/rr/t01.jpg?x-oss-process=image/resize,h_160)
</div>

随着时间流过，平均数的上升也许不可避免，方差的上升也可以预见。

但中位数的上升幅度比提取时间间隔更小(从15年12月30日至16年2月5日，经过了30余天，中位数仅仅上升了2.5)。说明仍有部分人会偶尔登陆从网。此外众数集中于0-1之内，说明一部分人的日常生活中仍然有从网存在。

两两比较对样本进行F和T检验<sup><a href="#explain1" name="exp1">[1]</a></sup>(置信度均为95%)(表格见下):

<div class="blogPic">
	![四样本F检验](https://squanblog.oss-cn-hongkong.aliyuncs.com/rr/t02.jpg?x-oss-process=image/resize,h_200)
</div>

不难看出仅在15年9月22日至12月30日之间存在显著的方差差异，说明考试周与假期、节日期间，其离散程度是一样的。

<div class="blogPic">
	![四样本T检验](https://squanblog.oss-cn-hongkong.aliyuncs.com/rr/t03.png?x-oss-process=image/resize,h_220)
</div>

与F检验不同，T检验中仅在16年2月5日至8日之间存在平均差相等，也许是因为提取时间过于接近，或者是假期与节日期间的均值特征确实变化不大。其他时间点之间的均值特征均呈现显著差异。

从这六张表格可以看到什么？拗口的假设和密密麻麻的数字，很难理出清晰的结果。

<span class="pageTitle">4.</span>

按照直觉来，把所有的时间信息分为7天及以内、8天至15天内、16天至30天内、31天至60天内、61天及以外5个级别，分级统计制图。

<div class="blogPic">
	![四样本分级位序排列](https://squanblog.oss-cn-hongkong.aliyuncs.com/rr/3-1.jpg?x-oss-process=image/resize,h_270)
</div>

<div class="blogPic">
	![四样本分级位序统计表](https://squanblog.oss-cn-hongkong.aliyuncs.com/rr/t04.jpg?x-oss-process=image/resize,h_120)
</div>

现在仍然有约有20%左右的人活跃在从网中，我看不见他们的痕迹，我只能看见他们的影子。这部分人的数量的减少趋势非常明显，随着时间继续前行，其比重将进一步下降，而减少的数量经过中间状态的传递，将最终汇聚到60天以外的部分，这里最终会变成一片空白。

<span class="pageTitle">5.</span>

将四个时间点的数据汇集在同一张图上，按照位序进行排列，制图如下:

<div class="blogPic">
	![四样本位序汇总](https://squanblog.oss-cn-hongkong.aliyuncs.com/rr/p3.jpg?x-oss-process=image/resize,h_300)
</div>

不难看出越近的时间点，其对应的曲线越高，累积面积也越大，代表整体的时间信息提取时间点的天数距离在不断增加。人群的大多数，他们已经离开了这里，无论什么状态都不再回来。

<span class="pageTitle">6.</span>

我记得当我还是大一新生，第一次来到鼓楼的时候，汪真人和我谈起过这个问题。很多从仙林来的人，在住进鼓楼之后，都离开了从网转投小百合。当时我不置可否，两年的时间太长了，大学的生活才刚刚展开而已。到现在四年都快过去了。

所以，除了我的朋友之外，更多人的时间信息是怎样的呢？也许新来者们仍然在用从网，只是我看不到而已。

于是，分别在16年1月1日全天和2月8日早上0点至下午4点半(中间早上2点至中午12点网络中断)对从网的用户随机抽取，提取时间信息。第一次共提取94867条有效记录，第二次共提取1181313条有效数据。

需要说明的是，由于程序运行需要一定时间，因此同时获得样本全体在某一时刻的时间信息是不现实的，必然会存在误差。(比如提取过程从6点持续至12点，在当日8点登录的记录能否被提取完全取决于其在任务列表中的次序——而次序是随机的<sup><a href="#explain2" name="exp2">[2]</a></sup>。)

制直方图如下:

<div class="blogPic">
	![双随机样本直方图](https://squanblog.oss-cn-hongkong.aliyuncs.com/rr/p4.jpg?x-oss-process=image/resize,h_360)
</div>

<div class="blogPic">
	![双随机样本基本统计信息](https://squanblog.oss-cn-hongkong.aliyuncs.com/rr/t05.jpg?x-oss-process=image/resize,h_280)
</div>

可以看到天数距离集中于1900-2000段，占所有数据的50%以上。

这是一个很奇怪的现象。以为是程序写错了，但是访问这些人的主页，其时间信息的提取均没有错误。

在样本总量中，确实有50%的时间信息都集中于2010年9月4日及之后数日，九万条数据里有三万多条都是2010年9月4日。

同时，最后登录时间在2010年9月4日以前的记录，理论上应该存在，但是在提取到的127万余条数据中，一条都没有。

校内网转为从网是09年的事情，也找不到10年有关从网的任何重大事件。我不知道那一天到底发生了什么，所有的记录像是被投入火焰里的水滴，一瞬间都消失了。

把那些久远的数据拂去，重新制直方图。

<div class="blogPic">
	![双随机样本直方图调整](https://squanblog.oss-cn-hongkong.aliyuncs.com/rr/p5.jpg?x-oss-process=image/resize,h_360)
</div>

<div class="blogPic">
	![双随机样本基本统计信息调整](https://squanblog.oss-cn-hongkong.aliyuncs.com/rr/t06.jpg?x-oss-process=image/resize,h_280)
</div>

从均值、中位数、众数、方差等不同参数均可以得出用户逐渐趋于活跃的判断。事实上也确实如此。

<div class="blogPic">
	![双随机样本百分比累计](https://squanblog.oss-cn-hongkong.aliyuncs.com/rr/p6.jpg?x-oss-process=image/resize,h_300)
</div>

从上图可以看到代表2月8日记录的灰线明显低于代表1月1日记录的蓝线，在时间增长的同时曲线下沉，说明活跃度有所增强。

<div class="blogPic">
	![双随机样本分级统计](https://squanblog.oss-cn-hongkong.aliyuncs.com/rr/p7.jpg?x-oss-process=image/resize,h_300)
</div>

对于所有数据进行分级统计，其结果也支持这一结论，虽然一周内登录的活跃用户比重下降了，但是最后登录时间超过两个月的用户比重下降更快，而一周至两个月内登录的用户比重均呈现上升趋势。说明1月1日至2月8日这段时间，许多两个月没有连过从网的用户都回来过。

真的是这样嚒？

仔细看百分比累积图可以发现，下降最明显的是天数距离大于300天的区间。但是，没有动机。对于一个已经大半年没有连过从网的人，其重新连入从网的概率是极小的。而像我一样看猫的人也不会间隔大半年才登录一次从网，更不必说那些活跃用户。

至于趋势图，只能说明在复习的枯燥和考试的压迫下，许多人挖掘出了平常想不到的娱乐方式，其中就包括来从网看猫。等到考试结束，他们仍然会离开这里。因此，对活跃度的增强仍然持保留意见。

将朋友的时间信息合并到所有数据中去，重新制图。

<div class="blogPic">
	![双随机样本百分比累计调整](https://squanblog.oss-cn-hongkong.aliyuncs.com/rr/p8.jpg?x-oss-process=image/resize,h_400)
</div>

从上图，得到两个结论:

(1). 从网总体维持现在冷冷清清的现状，没有恶化。遇到特殊事件(在这里是期末考试和节日事件)会有所好转，随即回到原状。

(2). 确实有潜水的人，但是没有想象的那么多。这不是结束，渐行渐远的人不会停下。这里会变成一片空白。

<span class="pageTitle">7.</span>

按照基本的套路，接下来是自己定义一个乱七八糟的指标体系，通过发布的状态数量、时间以及其他的活跃度指标可以得到更能忽悠人的结论。但是本来就没有想要获得任何东西，那么就到此为止吧。

人与人的距离，有时很近有时很远。而人们之间的关系，却永远保持在微妙的状态。文字是交流的第一工具，但弦外之音往往是更强的心灵力量。想要离群索居不会很难，在自给自足的条件下尤其如此，然而想要了解别人、拥抱别人，却永远是一件非常艰难的事情。

<span>————————</span>

<a href="#exp1" name="explain1">1.</a> T检验的前提为样本呈现正态分布，但是在部分研究中看到对于非正态分布样本的T检验。样本数据并未通过正态检验，所以其T检验可信度存疑。

<a href="#exp2" name="explain2">2.</a> 样本选取基于ID号，而ID号也许与注册时间相关——提取的样本也许都是12年前后注册的用户，但不代表就是12年前后的新来者。