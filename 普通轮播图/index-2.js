const Prev = document.querySelector("#btn-wrapper .prev");
const Next = document.querySelector("#btn-wrapper .next");
const ImgItem = Array.from(document.querySelectorAll("#img-wrapper .img-item"));
const Spans = Array.from(document.querySelectorAll("#box-wrapper span"));
const MainWrapper = document.getElementById("main-wrapper");

let curIndex = 0; // 保存当前显示第几张图片
let count = Spans.length; // 获取圆点数组长度
function moveTo(index) {
	const current = document.querySelector("#img-wrapper .img-dis");
	const Span = document.querySelector("#box-wrapper .active");
	if (index === count) {
		index = 0;
	}
	if (index < 0) {
		index = count - 1;
	}
	current.classList.remove("img-dis");
	ImgItem[index].classList.add("img-dis");
	Span.classList.remove("active");
	Spans[index].classList.add("active");
	curIndex = index;
}

// 小圆点点击事件
// Spans.forEach((item, i) => {
// 	item.onclick = () => {
// 		moveTo(i);
// 	};
// });

// 按钮点击事件
// Next.onclick = () => {
// 	moveTo(curIndex + 1);
// };
// Prev.onclick = () => {
// 	moveTo(curIndex - 1);
// };

// > 小圆点点击事件 && 按钮点击事件 方法2 事件的委派
document.addEventListener("click", (event) => { 
	if ([...Spans].includes(event.target)) moveTo(Spans.indexOf(event.target));
	if (Next === event.target) moveTo(curIndex + 1);
	if (Prev === event.target) moveTo(curIndex - 1);
});

const autoTime = (function () {
	let timer = null;
	return () => {
		if (timer === null) {
			timer = setTimeout(function fn() {
				moveTo(curIndex + 1);
				timer = setTimeout(fn, 1000);
			}, 1000);
		} else {
			clearTimeout(timer);
			timer = null;
		}
	};
})();
autoTime();

// 鼠标移入
MainWrapper.onmouseenter = () => {
	autoTime();
};

// 鼠标移出
MainWrapper.onmouseleave = () => {
	autoTime();
};
