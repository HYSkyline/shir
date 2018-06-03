---
title: Python编码环境
date: 2018-06-03 18:55:08
tags:
- Python
---
<br>

<blockquote cite="创世记11:4–9" class="quote">
	7. 让我们下去，在那里打乱他们的语言，让他们不能知晓别人的意。
</blockquote>

0.

在Python2环境中，输入的文本有两种可能形态: Unicode和string。其中Unicode是机器阅读的语言，而string是人阅读的语言。从Unicode到string是编码过程，反之是解码过程。

机器不会有心的壁垒，其所阅读的内容也就简单得多。从机器被制造到当下，只经历了从Ascii到Unicode的变更，在可预见的未来没有再次变更的可能。而人有不同的面孔，编码的类型也就不断推陈出新。从阿拉伯文到东南亚语系，不一而足。

1.

最初的编码标准在英语国家被提出，只需要涵盖26个字母(及其大写)，Ascii编码就此诞生。Ascii编码通过8位二进制数字进行映射，因此最多标识256(2<sup>8</sup>)个符号，Ascii编码也成为单字节编码的范本。

在全球化的进程中，256个字符不再能满足各种语言——尤其是东方语系——的需求。人们解决的办法很简单，1个字节不够，那就再加1个字节，于是形成Unicode编码。增加字节后编码容量从2<sup>8</sup>=256增长至2<sup>16</sup>=65536，暂时还没有任何一种自然语言能达到其上限。

<div class="blogPic">
	![Ascii/Unicode编码对比](https://squanblog.oss-cn-hongkong.aliyuncs.com/unicode/asciiunicode.jpg)
</div>

当前几乎所有机器的内置编码环境都是Unicode。当输入的中文保持Unicode编码时，机器自会知你的意。

2.

似乎问题已经解决了，只要统一采用Unicode就能避免陷入纷争之中。机器已经为人准备好了，人准备好了吗？

不可能的。

这不仅仅是人的犹豫，事实上Unicode仍然存在缺陷。对英语国家而言，以前1bit能解决的事情现在需要2bit，1GB的文件变成2GB，1块硬盘变成2块硬盘，这是无法接受的事情。对非英语国家而言，他们并不需要除了英文字母和本国语言之外的字符，那样同样会造成存储的冗余。

于是人的语言被打乱，重新陷入纷争。

经过漫漫长长的磋商，最终重新形成若干string的通用编码，其中又以UTF-8最为出名。而在没有强制性规定的情况下，各种编码仍然各不相谋。UTF8、GB2312、KOI8、JIS等等<span><a href="#ansiexp" name="ansi">[1]</a></span>混杂在一起，最终把人绊倒。

所以现在形成这样的局面: 人们各执一词，没有统一的转换对照。一个相同意义的字符，以两种不同的编码算法输入机器，至少有一种会乱码。

{% codeblock 同个字符的不同编码环境输出 lang:python %}
# unicode输入
>>> char = u'无'
>>> print char
u'\u65e0'

# 输出gb2312(由于OS原因，特别支持gb2312，但非普遍情况)
>>> print char.encode('gb2312')
无

# 输出utf-8
>>> print char.encode('utf-8')
簇
{% endcodeblock %}

3.

于是就涉及到编码的转换，其原则上秉承以下流程：

<div class="blogPic">
	![编码转换流程示意图](https://squanblog.oss-cn-hongkong.aliyuncs.com/unicode/codetrans.jpg?x-oss-process=image/resize,h_120)
</div>

而在Python环境下，解码与编码的过程通过decode()与encode()函数实现。

因此，Python的编码转换流程就确定了。

(1). 确定取得的string是何编码。

(2). 将string解码为Unicode，并重新以目标编码进行输出。

其中第1步尤其重要，单凭string的字母是无法确定编码类型的(例如GB2312与BIG5)。编码类型原则上需要从数据源进行确定，而在大多数情况下，也可以通过chardet等第三方库进行检测。

<div class="blogPic">
	![Ascii/Unicode编码对比](https://squanblog.oss-cn-hongkong.aliyuncs.com/unicode/stringencoding.jpg)
</div>

4.

在Python2环境中，情况会更特殊一些。在Python出现几个月后Unicode才被提出，故Python2早期仍以Ascii编码为默认编码，Unicode仅是类似补丁包的存在。

Ascii码表不含非英文字符的对照关系，因此在Ascii环境中不能输出非英文字符。为规避此情况，需要将Python默认编码设定为Unicode或UTF-8。

{% codeblock Python2重设默认编码环境 lang:python %}
import sys

# Python系统启动时默认import site.py
# site.py中包含del sys.setdefaultencoding()动作
reload(sys)
sys.setdefaultencoding('utf-8')
{% endcodeblock %}

<span>————————</span>

<a href="#ansi" name="ansiexp">1.</a> 另外还存在ANSI编码的说法，但ANSI编码并非实际上的算法，而是第一顺序编码的代称。在简体中文环境下ANSI编码指代GB2312编码；日语环境下指代JIS编码等。