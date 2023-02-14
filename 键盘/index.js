
// 获取所有字母按键
const keyboardKey = document.querySelectorAll(".row>button");
// 获取p
const Ip = document.getElementById("ip");

// 字母按键点击事件
keyboardKey.forEach((item, i) => {
	item.onmousedown = () => {
		KeyDown(item);
		down(i);
	};
	item.onmouseup = () => {
		KeyUp(item);
	};
});

// 字母按键触发函数
function down(index) {
	Ip.textContent = Ip.textContent + keyboardKey[index].textContent;
}

// 退格事件
const backspace = document.getElementById("backspace");
backspace.onmousedown = () => {
	let Text = Ip.textContent;
	Ip.textContent = Text.substring(0, Text.length - 1);
	KeyDown(backspace);
};

backspace.onmouseup = () => {
	KeyUp(backspace);
};

// 空格事件

const space = document.getElementById("space");
space.onmousedown = () => {
	KeyDown(space);
	Ip.innerHTML += "&nbsp;";
};
space.onmouseup = () => {
	KeyUp(space);
};

// 按键按下变色

function KeyDown(i) {
	i.style.color = "black";
	i.style.backgroundColor = "#bababa";
}

// 按键松开
function KeyUp(i) {
	i.style.color = "white";
	i.style.backgroundColor = "transparent";
}

// // 字母按键按下时执行函数
// document.addEventListener("keydown", (event) => {
// 	keyboardKey.forEach((item, i) => {
// 		if (event.key == item.textContent.toLowerCase()) {
// 			KeyDown(item);
// 			down(i);
// 		}
// 	});
// });

// document.addEventListener("keyup", (event) => {
// 	keyboardKey.forEach((item, i) => {
// 		if (event.key == item.textContent.toLowerCase()) {
// 			KeyUp(item);
// 		}
// 	});
// });

// // 退回按键事件
// document.addEventListener("keydown", (event) => {
// 	if (backspace.textContent === event.key) {
// 		KeyDown(backspace);
// 		let Text = Ip.textContent;
// 		Ip.textContent = Text.substring(0, Text.length - 1);
// 	}
// });
// document.addEventListener("keyup", (event) => {
// 	if (backspace.textContent === event.key) {
// 		KeyUp(backspace);
// 	}
// });

// // 空格按键事件
// document.addEventListener("keydown", (event) => {
// 	if (" " === event.key) {
// 		KeyDown(space);
// 		Ip.innerHTML += "&nbsp;";
// 	}
// });
// document.addEventListener("keyup", (event) => {
// 	if (" " === event.key) {
// 		KeyUp(space);
// 	}
// });

// 按键按下时执行函数
document.addEventListener("keydown", (event) => {
	keyboardKey.forEach((item, i) => {
		if (event.key == item.textContent.toLowerCase()) {
			KeyDown(item);
			down(i);
		}
	});
	if (backspace.textContent === event.key) {
		KeyDown(backspace);
		let Text = Ip.textContent;
		Ip.textContent = Text.substring(0, Text.length - 1);
	}
	if (" " === event.key) {
		KeyDown(space);
		Ip.innerHTML += "&nbsp;";
	}
});

document.addEventListener("keyup", (event) => {
	keyboardKey.forEach((item, i) => {
		if (event.key == item.textContent.toLowerCase()) {
			KeyUp(item);
		}
		if (backspace.textContent === event.key) {
			KeyUp(backspace);
		}
		if (" " === event.key) {
			KeyUp(space);
		}
	});
});
