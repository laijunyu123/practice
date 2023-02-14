// 获取 修改/删除 超链接
const Revises = document.getElementsByClassName("revise");
const Dels = document.getElementsByClassName("delete");

// 获取tbody
const Tbody = document.querySelector("table>tbody");

// 获取 添加/重置/提交 按钮
const Add = document.getElementById("add");
const Reset = document.getElementById("reset");
const Send = document.getElementById("send");

// 获取input
const userId = document.getElementById("userId");
const userName = document.getElementById("userName");
const userAge = document.getElementById("userAge");
const userEmail = document.getElementById("userEmail");
const userGender = (document.querySelector("form").onchange = () => {
	const Genders = document.querySelectorAll(".gender>label>input");
	for (const item of Genders) {
		if (item.checked) {
			return item;
		}
	}
});

// 修改
function RevFn() {
	// 获取 td
	let tr = Array.from(this.parentNode.parentNode.getElementsByTagName("td"));

	// input 变成数组
	// # v2 版本 优化 修改功能 代码
	let RevisesArr = [];
	// RevisesArr.push(
	// 	userId.value,
	// 	userName.value,
	// 	userAge.value,
	// 	userGender().value,
	// 	userEmail.value
	// );
	// console.log(RevisesArr);
	tr.forEach((item, i) => {
		if (i < tr.length - 1) {
			RevisesArr[i] = item.textContent;
		}
	});

	[userId.value, userName.value, userAge.value, judge, userEmail.value] =
		RevisesArr;
	// 判断性别
	if (RevisesArr[3] === "男") {
		document.getElementById("male").checked = true;
		document.getElementById("flmale").checked = false;
	} else {
		document.getElementById("male").checked = false;
		document.getElementById("flmale").checked = true;
	}

	Send.onclick = () => {
		RevisesArr = [
			userId.value,
			userName.value,
			userAge.value,
			userGender().value,
			userEmail.value
		];
		tr.forEach((item, i) => {
			if (i < tr.length - 1) {
				item.textContent = RevisesArr[i];
			}
		});
		ResetFn();
	};
}

for (const item of Revises) {
	item.onclick = RevFn;
}

// 删除
function Del() {
	let tr = this.parentNode.parentNode;
	if (confirm("确定要删除吗")) tr.remove();
}
for (const item of Dels) {
	item.onclick = Del;
}

// 添加
Add.onclick = () => {
	// 创建tr
	let tr = document.createElement("tr");

	// 创建td
	let idTd = document.createElement("td");
	let nameTd = document.createElement("td");
	let ageTd = document.createElement("td");
	let genderTd = document.createElement("td");
	let emailTd = document.createElement("td");

	// 添加文本到td
	idTd.textContent = userId.value;
	nameTd.textContent = userName.value;
	ageTd.textContent = userAge.value;
	genderTd.textContent = userGender().value;
	emailTd.textContent = userEmail.value;

	// td添加到tr
	tr.appendChild(idTd);
	tr.appendChild(nameTd);
	tr.appendChild(ageTd);
	tr.appendChild(genderTd);
	tr.appendChild(emailTd);
	tr.insertAdjacentHTML(
		"beforeend",
		`<td>
						<a href="javascript:;" class="revise">修改</a>
						<a href="javascript:;" class="delete">删除</a>
					</td>`
	);

	Tbody.appendChild(tr);
	ResetFn();
	Dels[Dels.length - 1].onclick = Del;
	Revises[Revises.length - 1].onclick = RevFn;
};

// 重置
function ResetFn() {
	userId.value = null;
	userName.value = null;
	userAge.value = null;
	document.getElementById("male").checked = true;
	document.getElementById("flmale").checked = false;
	userEmail.value = null;
}
Reset.onclick = () => {
	ResetFn();
};
