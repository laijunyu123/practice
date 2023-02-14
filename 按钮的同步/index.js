const Btn = {
	// 获取全选按钮以及全选多选框
	All: document.getElementById("all"),
	cheAll: document.querySelector("form>div>input"),
	// 获取取消按钮
	Cancel: document.getElementById("no"),
	// 获取反选按钮
	Invert: document.getElementById("reverse"),
	// 获取提交按钮
	Send: document.getElementById("send"),
	// 获取所有多选框
	Hobby: document.getElementsByName("hobby")
};

// 全选按钮点击事件
Btn.All.onclick = () => {
	for (const item of Btn.Hobby) {
		item.checked = true;
	}
	Btn.cheAll.checked = true;
};

// 取消按钮点击事件
Btn.Cancel.onclick = () => {
	for (const item of Btn.Hobby) {
		item.checked = false;
	}
	Btn.cheAll.checked = false;
};

// 反选按钮事件
Btn.Invert.onclick = () => {
	for (const item of Btn.Hobby) {
		item.checked = !item.checked;
	}
	auto();
};

// 提交按钮事件
Btn.Send.onclick = () => {
	for (const item of Btn.Hobby) {
		item.checked && alert(item.value);
	}
};

// 全选按键事件
Btn.cheAll.onchange = () => {
	for (const item of Btn.Hobby) {
		item.checked = Btn.cheAll.checked;
	}
};

for (const item of Btn.Hobby) {
	item.onchange = () => {
		auto();
	};
}

function auto() {
	const checkedBox = document.querySelectorAll("[name=hobby]:checked");
	checkedBox.length === Btn.Hobby.length
		? (Btn.cheAll.checked = true)
		: (Btn.cheAll.checked = false);
}
