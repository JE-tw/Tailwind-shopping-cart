let currentStep = 1;
const totalSteps = document.querySelectorAll(".step").length;
const steps = document.querySelectorAll(".step-content");
const progressBar = document.getElementById("progress-bar");
const circles = document.querySelectorAll(".circle");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function updateStepView() {
  // 隱藏所有步驟內容，顯示當前步驟
  steps.forEach((step) => step.classList.add("hidden"));
  document
    .querySelector(`.step-content[data-step="${currentStep}"]`)
    .classList.remove("hidden");

  // 更新進度條寬度
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
  progressBar.style.width = `${progressPercentage}%`;

  // 更新步驟圓圈樣式
  circles.forEach((circle, index) => {
    if (index < currentStep) {
      circle.classList.add("bg-green-500", "text-white");
      circle.classList.remove("bg-gray-300");
    } else {
      circle.classList.add("bg-gray-300");
      circle.classList.remove("bg-green-500", "text-white");
    }
  });

  // 更新按鈕狀態
  prevBtn.textContent = currentStep === 1 ? "← 返回購物" : "← 上一步";
  nextBtn.textContent = currentStep < totalSteps ? "下一步 →" : "完成";
}

prevBtn.addEventListener("click", () => {
  if (currentStep > 1) {
    currentStep--;
    updateStepView();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentStep < totalSteps) {
    currentStep++;
    updateStepView();
  }
});

// 初始化
updateStepView();

// ------購物車商品---------
const cartItems = [
  {
    id: 1,
    name: "時尚手錶",
    price: 199,
    image: "../assets/img/01.jpg",
    quantity: 1,
  },
  {
    id: 2,
    name: "時尚眼鏡",
    price: 89,
    image: "../assets/img/02.jpg",
    quantity: 1,
  },
  {
    id: 3,
    name: "時尚耳機",
    price: 49,
    image: "../assets/img/03.jpg",
    quantity: 1,
  },
];

function updateCart() {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";
  let total = 0;

  cartItems.forEach((item) => {
    total += item.price * item.quantity;
    const itemElement = document.createElement("div");
    itemElement.className =
      "flex items-center mb-4 p-4 hover:bg-gray-50 transition-colors duration-200 rounded-lg";

    const imgElement = document.createElement("img");
    imgElement.src = item.image;
    imgElement.alt = item.name;
    imgElement.className =
      "w-20 h-20 object-cover rounded-full mr-4 hover:scale-105 transition-transform duration-200";

    const detailsDiv = document.createElement("div");
    detailsDiv.className = "flex-grow text-left";
    detailsDiv.innerHTML = `<h2 class="text-lg font-semibold">${
      item.name
    }</h2><p class="text-gray-600">$${item.price}</p>`;

    const controlsDiv = document.createElement("div");
    controlsDiv.className = "flex items-center space-x-2";

    const decreaseBtn = document.createElement("button");
    decreaseBtn.textContent = "-";
    decreaseBtn.className =
      "bg-gray-200 text-gray-700 px-3 py-1 rounded-l hover:bg-gray-300";
    decreaseBtn.addEventListener("click", () => changeQuantity(item.id, -1));

    const quantitySpan = document.createElement("span");
    quantitySpan.textContent = item.quantity;
    quantitySpan.className = "bg-gray-100 px-4 py-1 w-12 text-center";

    const increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";
    increaseBtn.className =
      "bg-gray-200 text-gray-700 px-3 py-1 rounded-r hover:bg-gray-300";
    increaseBtn.addEventListener("click", () => changeQuantity(item.id, 1));

    controlsDiv.appendChild(decreaseBtn);
    controlsDiv.appendChild(quantitySpan);
    controlsDiv.appendChild(increaseBtn);

    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "&times;";
    removeBtn.className = "text-red-500 hover:text-red-700 p-2 ml-4";
    removeBtn.addEventListener("click", () => removeItem(item.id));

    itemElement.appendChild(imgElement);
    itemElement.appendChild(detailsDiv);
    itemElement.appendChild(controlsDiv);
    itemElement.appendChild(removeBtn);

    cartContainer.appendChild(itemElement);
  });

  document.getElementById("total-price").textContent = `$${total}`;
}

function changeQuantity(id, change) {
  const item = cartItems.find((i) => i.id === id);
  if (item) {
    item.quantity = Math.max(1, item.quantity + change);
    updateCart();
  }
}

function removeItem(id) {
  const index = cartItems.findIndex((i) => i.id === id);
  if (index !== -1) {
    cartItems.splice(index, 1);
    updateCart();
  }
}

updateCart();
