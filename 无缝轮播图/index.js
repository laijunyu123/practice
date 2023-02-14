const BtnPrev = document.getElementById("prev");
const BtnNext = document.getElementById("next");
const Wrapper = document.getElementById("wrapper");
const Span = document.querySelectorAll("#box-wrapper span");
const MainWrapper = document.getElementById("main-wrapper");

let curIndex = 0; // 记录目前第几张
function moveTo(index) {
	Wrapper.style.transform = `translateX(-${index + 1}00%)`;
	Wrapper.style.transition = ".5s";
	// 小圆点跟随变化
	let active = document.querySelector("#box-wrapper span.active");
	active.classList.remove("active");
	Span[index].classList.add("active");
	curIndex = index;
}

// 小圆点点击事件
// > 方法1
Span.forEach((item, i) => {
	item.onclick = () => {
		moveTo(i);
	};
});

// > 方法2
// for (let i = 0; i < Span.length;i++) {
//     Span[i].onclick = () => {
//         moveTo(i)
//     }
// }

const init = () => {
	// 复制第一张图片
	let first = Wrapper.firstElementChild.cloneNode(true);
	// 复制最后一张图片
	let last = Wrapper.lastElementChild.cloneNode(true);
	// 添加
	Wrapper.insertAdjacentElement("beforeend", first);
	Wrapper.insertAdjacentElement("afterbegin", last);
};
init();
let count = Span.length;
const Next = () => {
	if (curIndex === count - 1) {
		Wrapper.style.transition = "none";
		Wrapper.style.transform = `translateX(0%)`;
		// 回流
		Wrapper.clientHeight;
		moveTo(0);
	} else {
		moveTo(curIndex + 1);
	}
};

const Prev = () => {
	if (curIndex === 0) {
		Wrapper.style.transition = "none";
		Wrapper.style.transform = `translateX(-${count + 1}00%)`;
		Wrapper.clientHeight;
		moveTo(count - 1);
	} else {
		moveTo(curIndex - 1);
	}
};

BtnPrev.onclick = Prev;
BtnNext.onclick = Next;

// 自动切换图片
// setInterval(() => {
// 	Next()
// },5000)

const autoTime = (function () {
	let timer = null;
	return () => {
		if (timer === null) {
			timer = setTimeout(function fn() {
				Next();
				timer = setTimeout(fn, 1000);
			}, 1000);
		} else {
			clearTimeout(timer);
			timer = null;
		}
	};
})();
autoTime();

MainWrapper.onmouseenter = () => {
	autoTime();
};
MainWrapper.onmouseleave = () => {
	autoTime();
};
