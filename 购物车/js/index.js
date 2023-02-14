// 单件商品的数据
class UIGoods {
	constructor(g) {
		this.data = g;
		this.choose = 0;
	}
	// 获取总价
	getTotalPrice() {
		return this.data.price * this.choose;
	}
	// 是否选中了此件商品
	isChoose() {
		return this.choose > 0;
	}
	// 选择的数量加1
	increase() {
		this.choose++;
	}
	// 选择的数量减1
	decrease() {
		if (this.choose === 0) {
			return;
		}
		this.choose--;
	}
}

// 整个界面的数据
class UIData {
	constructor() {
		let uiGoods = [];

		goods.forEach((item) => {
			let uig = new UIGoods(item);
			uiGoods.push(uig);
		});

		this.uiGoods = uiGoods;
		this.deliveryThreshold = 30;
		this.deliveryPrice = 5;
	}

	// 总价
	getTotalPrice() {
		let sum = this.uiGoods.reduce((sum, a) => sum + a.getTotalPrice(), 0);
		return sum;
	}

	// 增加某件商品的选中数量
	increase(index) {
		return this.uiGoods[index].increase();
	}

	// 减少某件商品的选中数量
	decrease(index) {
		return this.uiGoods[index].decrease();
	}

	// 得到总共的选中数量
	getTotalChooseNumber() {
		let sum = this.uiGoods.reduce((sum, a) => sum + a.choose, 0);
		return sum;
	}

	// 购物车中有没有东西
	hasGoodInCar() {
		return this.getTotalChooseNumber() > 0;
	}

	// 是否跨过的配送标准
	isCrossDeliveryThreshold() {
		return this.getTotalPrice() >= this.deliveryThreshold;
	}

	isChoose(index) {
		return this.uiGoods[index].isChoose();
	}
}

// 整个界面
class UI {
	constructor() {
		this.uiData = new UIData();
		this.doms = {
			goodsContainer: document.querySelector(".goods-list"),
			deliveryPrice: document.querySelector(".footer-car-tip"),
			footerPay: document.querySelector(".footer-pay"),
			footerPayInnerSpan: document.querySelector(".footer-pay span"),
			totalPrice: document.querySelector(".footer-car-total"),
			car: document.querySelector(".footer-car"),
			badge: document.querySelector(".footer-car-badge")
		};

		let carRect = this.doms.car.getBoundingClientRect();
		let jumpTarget = {
			x: carRect.left + carRect.width / 2,
			y: carRect.top + carRect.height / 5
		};
		this.jumpTarget = jumpTarget;

		this.createHTML();
		this.updateFooter();
		this.listenEvent();
	}
	// 监听各种事件
	listenEvent() {
		this.doms.car.addEventListener("animationend", () => {
			this.doms.car.classList.remove("animate");
		});
	}

	// 根据商品数据创建商品列表元素
	createHTML() {
		// 生成HTML字符串
		let html = "";
		this.uiData.uiGoods.forEach((item, i) => {
			html += `
			<div class="goods-item">
          <img src="${item.data.pic}" alt="" class="goods-pic" />
          <div class="goods-info">
            <h2 class="goods-title">${item.data.title}</h2>
            <p class="goods-desc">
              ${item.data.desc}
            </p>
            <p class="goods-sell">
              <span>月售 ${item.data.sellNumber}</span>
              <span>好评率${item.data.favorRate}</span>
            </p>
            <div class="goods-confirm">
              <p class="goods-price">
                <span class="goods-price-unit">￥</span>
                <span>${item.data.price}</span>
              </p>
              <div class="goods-btns">
                <i index="${i}" class="iconfont i-jianhao"></i>
                <span>${item.choose}</span>
                <i index="${i}" class="iconfont i-jiajianzujianjiahao"></i>
              </div>
            </div>
          </div>
        </div>
			`;
		});
		this.doms.goodsContainer.innerHTML = html;
	}

	increase(index) {
		this.uiData.increase(index);
		this.updateGoodsItem(index);
		this.updateFooter();
		this.jump(index);
	}

	decrease(index) {
		this.uiData.decrease(index);
		this.updateGoodsItem(index);
		this.updateFooter();
		this.jump(index);
	}

	// 更新某个商品元素的显示状态
	updateGoodsItem(index) {
		let goodsDom = this.doms.goodsContainer.children[index];
		if (this.uiData.isChoose(index)) {
			goodsDom.classList.add("active");
		} else {
			goodsDom.classList.remove("active");
		}
		let span = goodsDom.querySelector(".goods-btns span");
		span.textContent = this.uiData.uiGoods[index].choose;
	}
	// 更新页脚
	updateFooter() {
		// 得到总价数据
		let total = this.uiData.getTotalPrice();
		// 设置配送费
		this.doms.deliveryPrice.textContent = `配送费￥${this.uiData.deliveryPrice}`;
		// 设置起送费还差多少
		if (this.uiData.isCrossDeliveryThreshold()) {
			// 到达起送点
			this.doms.footerPay.classList.add("active");
		} else {
			this.doms.footerPay.classList.remove("active");
			// 更新还差多少钱
			let dis = this.uiData.deliveryThreshold - total;
			this.doms.footerPayInnerSpan.textContent = `还差￥${Math.round(
				dis
			)}元起送`;
		}
		// 设置总价
		this.doms.totalPrice.textContent = total.toFixed(2);
		// 设置购物车的样式状态
		if (this.uiData.hasGoodInCar()) {
			this.doms.car.classList.add("active");
		} else {
			this.doms.car.classList.remove("active");
		}
		// 设置购物车中的数量
		this.doms.badge.textContent = this.uiData.getTotalChooseNumber();
	}

	// 购物车动画
	carAnimate() {
		this.doms.car.classList.add("animate");
	}

	// 抛物线跳跃的元素
	jump(index) {
		// 找到对应商品的加号
		let btnAdd = this.doms.goodsContainer.children[index].querySelector(
			".i-jiajianzujianjiahao"
		);
		let rect = btnAdd.getBoundingClientRect();
		let start = {
			x: rect.left,
			y: rect.top
		};
		// 跳吧
		let div = document.createElement("div");
		div.classList.add("add-to-car");
		let i = document.createElement("i");
		i.classList.add("iconfont", "i-jiajianzujianjiahao");
		// 设置初始位置
		div.style.transform = `translateX(${start.x}px)`;
		i.style.transform = `translateY(${start.y}px)`;
		div.appendChild(i);
		document.body.appendChild(div);
		// 强行渲染
		div.clientHeight;

		// 设置结束位置
		div.style.transform = `translateX(${this.jumpTarget.x}px)`;
		i.style.transform = `translateY(${this.jumpTarget.y}px)`;

		div.addEventListener(
			"transitionend",
			() => {
				div.remove();
				this.carAnimate();
			},
			{
				once: true
			}
		);
	}
}

let ui = new UI();

// 事件
ui.doms.goodsContainer.addEventListener("click", (event) => {
	if (event.target.classList.contains("i-jiajianzujianjiahao")) {
		let index = +event.target.getAttribute("index");
		ui.increase(index);
	}
	if (event.target.classList.contains("i-jianhao")) {
		let index = +event.target.getAttribute("index");
		ui.decrease(index);
	}
});
