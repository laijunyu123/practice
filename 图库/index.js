window.onload = function () {
	// 获取大图
	const imgWrapper = document.querySelectorAll("#img-wrapper>img");
	// 获取小图
	const imgItem = document.querySelectorAll("#img-item>img");
	// 获取大图容器和小图容器
	const imgBox = document.getElementById("img-wrapper");
	const minImg = document.getElementById("img-item");

	imgItem.forEach((item, i) => {
		item.onclick = () => {
            autoActive(i);
            autoTime()
		};
	});

	let curIndex = 0;
	function autoActive(index) {
		const imgActive = document.querySelector("#img-wrapper .active");
		imgActive.classList.remove("active");
		imgWrapper[index].classList.add("active");
		curIndex = index;
	}

	let time = null;
	function autoTime() {
		if (time === null) {
			time = setTimeout(function auto() {
				curIndex === 4 ? autoActive(0) : autoActive(curIndex + 1);
				time = setTimeout(auto, 3000);
			}, 3000);
		} else {
			clearTimeout(time);
			time = null;
		}
	}
	autoTime();

	imgBox.onmouseenter = () => {
		autoTime();
	};
	imgBox.onmouseleave = () => {
		autoTime();
	};
	minImg.onmouseenter = () => {
		autoTime();
	};
	minImg.onmouseleave = () => {
		autoTime();
	};
};
