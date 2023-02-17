const containerImg = document.querySelector(".container-img");
class Img {
	constructor(containerImg) {
		// 获取要执行轮播图的元素
		this.containerImg = containerImg;
		// 获取当前图片元素
		const item = containerImg.querySelectorAll("div");
		this.item = item;
		// 获取图片元素的下一个兄弟元素的子元素 spans
		const spans = containerImg.nextElementSibling.children;
		this.spans = spans;
		// 获取 spans 父元素的下一个兄弟元素的子元素
		const icons = spans[1].parentNode.nextElementSibling.children;
		this.icons = icons;
		// 首尾添加图片
		this.init();
		// 记录当前第几张
		this.curIndex = 0;
		// 获取item长度
		this.count = item.length;
		//定时器
		this.time = null;
		this.timer;
		// 调用定时器函数
		this.autoImg();
	}
	init() {
		let first = this.item[0].cloneNode(true);
		let last = this.item[this.item.length - 1].cloneNode(true);
		containerImg.insertAdjacentElement("beforeend", first);
		containerImg.insertAdjacentElement("afterbegin", last);
	}
	moveTo(index) {
		containerImg.style.transform = `translateX(-${index + 1}00%)`;
		document.querySelector(".span-item .active")?.classList.remove("active");
		this.spans[index].classList.add("active");
		this.curIndex = index;
	}
	// 设置点击事件需要的函数 两种方法 无参和有参
	next() {
		if (this.curIndex === this.count - 1) {
			containerImg.style.transition = "none";
			containerImg.style.transform = "translateX(0%)";
			containerImg.clientHeight;
			containerImg.style.transition = ".5s";
			this.moveTo(0);
		} else {
			this.moveTo(this.curIndex + 1);
		}
	}

	prev(index) {
		if (this.curIndex === 0) {
			containerImg.style.transition = "none";
			containerImg.style.transform = `translateX(-${this.count + 1}00%)`;
			containerImg.clientHeight;
			containerImg.style.transition = ".5s";
			this.moveTo(this.count - 1);
		} else {
			this.moveTo(index);
		}
	}

	autoImg() {
		if (this.time === null) {
			this.time = setTimeout(
				(this.timer = () => {
					this.next();
					this.time = setTimeout(this.timer, 1000);
				}),
				1000
			);
		} else {
			clearTimeout(this.time);
			this.time = null;
		}
	}
}

let img = new Img(containerImg);

// 按钮点击事件
img.icons[0].onclick = () => {
	img.prev(img.curIndex - 1);
};
img.icons[1].onclick = () => {
	img.next();
};

const container = document.querySelector(".container");
// 鼠标移入
container.onmouseenter = () => {
	img.autoImg();
};
// 鼠标移出
container.onmouseleave = () => {
	img.autoImg();
};

const spanItem = document.querySelector(".span-item");

// 小圆点点击事件
spanItem.addEventListener("click", (e) => {
	if ([...img.spans].includes(e.target)) {
		img.moveTo(Array.from(img.spans).indexOf(e.target));
	}
});
