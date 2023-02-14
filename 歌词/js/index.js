// 获取需要的dom
let doms = {
	audio: document.querySelector("audio"),
	ul: document.querySelector("ul"),
	container: document.getElementsByClassName("container")[0]
};

/**
 * 解析歌词字符串
 * 得到歌词对象数组
 * 每个歌词对象 {time:开始时间,words:歌词内容}
 */
function parseLrc() {
	let result = [];
	lrc.split("\n").forEach((item) => {
		let parse = item.split("]");
		let timeStr = parse[0].substring(1);
		let obj = {
			time: parseTime(timeStr),
			words: parse[1]
		};
		parseTime(timeStr);
		result.push(obj);
	});
	return result;
}

/**
 * 将一个时间字符串解析为数字(秒)
 * @param {String} timeStr 时间字符串
 * @returns
 */
function parseTime(timeStr) {
	let a = timeStr.split(":");
	return +a[0] * 60 + +a[1];
}

let lrcData = parseLrc();

/**
 * 计算出,在当前播放器播放到第几秒的情况下
 * lrcData数组中,应该高亮显示的歌词下标
 * 如果没有任何一句歌词要显示,则得到-1
 */
function findIndex() {
	// 播放器的当前播放时间
	let curTime = doms.audio.currentTime;
	for (const item of lrcData) {
		if (item.time > curTime) {
			return lrcData.indexOf(item) - 1;
		}
	}
	// 找遍了都没有找到,(说明播放到最后一句了)
	return lrcData.length - 1;
}

// 界面
/**
 * 创建歌词列表元素 li
 */
function createLrcElement() {
	let frag = document.createDocumentFragment(); // 文档片段
	lrcData.forEach((item) => {
		let li = document.createElement("li");
		li.textContent = item.words;
		// 改动了dom树
		frag.appendChild(li);
	});
	doms.ul.appendChild(frag);
}

createLrcElement();

/**
 * 设置ul的偏移量
 */

// 容器高度
let containerHeight = doms.container.clientHeight;
// li的高度
let liHeight = doms.ul.children[0].clientHeight;
// 最大高度
let maxOffset = liHeight * lrcData.length + liHeight / 2 - containerHeight / 2;
function setOffset() {
	let index = findIndex();

	let offset = liHeight * index + liHeight / 2 - containerHeight / 2;

	if (offset < 0) offset = 0;

	if (offset > maxOffset) offset = maxOffset;

	doms.ul.style.transform = `translateY(-${offset}px)`;
	// => ?. 条件式调用 当表达式的值不为 undefined 和 null 时调用
	// 去掉 之前的样式
	document.querySelector(".active")?.classList.remove("active");
	// => 当前需要高亮显示的歌词
	doms.ul.children[index]?.classList.add("active");
}

// 事件
doms.audio.addEventListener("timeupdate", setOffset);
