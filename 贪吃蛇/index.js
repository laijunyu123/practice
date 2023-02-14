window.onload = function () {
	// 获取蛇的容器
	const snake = document.getElementById("snake");
	// 获取蛇身体的部位
	const snakes = snake.getElementsByTagName("div");

	// 获取食物
	const food = document.getElementById("food");

	// 获取分数和level的span
	const scoreSpan = document.getElementById("score");
	const levelSpan = document.getElementById("level");

	let score = 0;
	let level = 0;

	function changeFood() {
		// 生成0-29的随机数
		const x = Math.floor(Math.random() * 30) * 10;
		const y = Math.floor(Math.random() * 30) * 10;

		// 设置食物的坐标
		food.style.left = x + "px";
		food.style.top = y + "px";
	}
	changeFood();

	// 存储蛇头运动的方向
	let dir;

	// 创建一个变量来记录按键的状态
	let keyActive = true;

	const keyArr = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

	// 创建一个属性值与属性名相反的对象
	const reObj = {
		ArrowRight: "ArrowLeft",
		ArrowLeft: "ArrowRight",
		ArrowDown: "ArrowUp",
		ArrowUp: "ArrowDown"
	};

	document.addEventListener("keydown", (event) => {
		if (keyActive && keyArr.includes(event.key)) {
			// 设置方向
			if (snakes.length < 2 || reObj[dir] !== event.key) {
				dir = event.key;
				keyActive = false;
			}
		}
	});

	setTimeout(function move() {
		// 获取蛇头
		const head = snakes[0];
		// 获取坐标
		let x = head.offsetLeft;
		let y = head.offsetTop;

		switch (dir) {
			// 上移
			case "ArrowUp":
				y -= 10;
				break;
			// 下移
			case "ArrowDown":
				y += 10;
				break;
			// 左移
			case "ArrowLeft":
				x -= 10;
				break;
			// 右移
			case "ArrowRight":
				x += 10;
				break;
		}

		// 检查蛇有没有吃到食物
		if (
			head.offsetTop === food.offsetTop &&
			head.offsetLeft === food.offsetLeft
		) {
			// 1.改变食物的位置
			changeFood();
			// 增加身体
			snake.insertAdjacentHTML("beforeend", "<div></div>");
			score += 10;
			scoreSpan.textContent = score;
			if (score % 50 === 0 && level < 14) {
				level++;
				levelSpan.textContent = level + 1;
			}
		}

		// 判断是否撞墙
		if (x < 0 || x > 290 || y < 0 || y > 290) {
			// 游戏结束
			return alert("撞墙了！游戏结束了");
		}

		// 判断是否撞到自己
		for (let i = 0; i < snakes.length - 1; i++) {
			if (snakes[i].offsetLeft === x && snakes[i].offsetTop === y) {
				return alert("撞到自己了！游戏结束了");
			}
		}

		// 获取尾巴
		const tail = snakes[snakes.length - 1];
		tail.style.left = x + "px";
		tail.style.top = y + "px";
		snake.insertAdjacentElement("afterbegin", tail);
		keyActive = true;

		// 继续前进
		setTimeout(move, 260 - level * 10);
	}, 260 - level * 10);
};
