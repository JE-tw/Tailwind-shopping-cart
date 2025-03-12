<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const currentStep = ref(1);
    const cartItems = ref([
      { id: 1, name: "時尚手錶", price: 199, image: new URL( '/img/01.jpg', import.meta.url), quantity: 1 },
      { id: 2, name: "時尚眼鏡", price: 89, image: new URL( '/img/02.jpg', import.meta.url), quantity: 1 },
      { id: 3, name: "時尚耳機", price: 49, image: new URL( '/img/03.jpg', import.meta.url), quantity: 1 },
    ]);

    const totalSteps = 4;

    const progressPercentage = computed(() => ((currentStep.value - 1) / (totalSteps - 1)) * 100);

    const totalPrice = computed(() => {
      return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
    });

    function nextStep() {
      if (currentStep.value < totalSteps) {
        currentStep.value++;
      }
    }

    function prevStep() {
      if (currentStep.value > 1) {
        currentStep.value--;
      }
    }

    function changeQuantity(id, change) {
      const item = cartItems.value.find((item) => item.id === id);
      if (item) {
        item.quantity = Math.max(1, item.quantity + change);
      }
    }

    function removeItem(id) {
      cartItems.value = cartItems.value.filter((item) => item.id !== id);
    }

    return {
      currentStep,
      cartItems,
      totalPrice,
      progressPercentage,
      nextStep,
      prevStep,
      changeQuantity,
      removeItem,
    };
  },
};
</script>

<template>
  <div class="bg-accent py-10">
    <main class="bg-background min-h-[80vh] p-6 rounded-lg shadow-lg w-3/5 max-w-2xl mx-auto my-10">
      <h2>購物車</h2>
      <!-- 進度條 -->
      <div class="relative w-4/5 mx-auto mb-6">
        <!-- 灰色背景線 -->
        <div class="w-full bg-gray-200 h-1 absolute top-1/3 transform -translate-y-1/2"></div>
        <!-- 綠色進度條 -->
        <div
          id="progress-bar"
          class="bg-accent h-1 absolute top-1/3 transform -translate-y-1/2"
          :style="{ width: progressPercentage + '%' }"
        ></div>
        <!-- 步驟圓圈 -->
        <div class="flex justify-between relative">
          <div class="step" :class="{ active: currentStep >= 1 }" data-step="1">
            <div
              class="circle"
              :class="{ 'bg-accent': currentStep >= 1, 'bg-gray-300': currentStep < 1 }"
            >
              1
            </div>
            <p class="text-sm mt-2">確認購物車</p>
          </div>
          <div class="step" :class="{ active: currentStep >= 2 }" data-step="2">
            <div
              class="circle"
              :class="{ 'bg-accent': currentStep >= 2, 'bg-gray-300': currentStep < 2 }"
            >
              2
            </div>
            <p class="text-sm mt-2">付款與運送</p>
          </div>
          <div class="step" :class="{ active: currentStep >= 3 }" data-step="3">
            <div
              class="circle"
              :class="{ 'bg-accent': currentStep >= 3, 'bg-gray-300': currentStep < 3 }"
            >
              3
            </div>
            <p class="text-sm mt-2">填寫資料</p>
          </div>
          <div class="step" :class="{ active: currentStep >= 4 }" data-step="4">
            <div
              class="circle ml-auto"
              :class="{ 'bg-accent': currentStep >= 4, 'bg-gray-300': currentStep < 4 }"
            >
              4
            </div>
            <p class="text-sm mt-2">完成訂購</p>
          </div>
        </div>
      </div>
      <hr />
      <!-- 步驟內容 -->
      <div id="steps-container" class="min-h-[50vh] p-5">
        <div
          class="step-content text-center font-semibold"
          v-show="currentStep === 1"
          data-step="1"
        >
          <h3>訂單明細</h3>
          <div id="cart-items">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="flex items-center justify-between py-2"
            >
              <img :src="item.image" alt="商品圖片" class="w-16 h-16 rounded-full object-cover" />
              <div class="mr-auto px-5">
                <p>{{ item.name }}</p>
                <p class="text-sm text-gray-500">價格: ${{ item.price }}</p>
              </div>
              <div>
                <button @click="changeQuantity(item.id, -1)" class="px-2 py-1 border rounded-md">
                  -
                </button>
                <span class="mx-2">{{ item.quantity }}</span>
                <button @click="changeQuantity(item.id, 1)" class="px-2 py-1 border rounded-md">
                  +
                </button>
                <button @click="removeItem(item.id)" class="px-2 py-1 text-red-600">&times;</button>
              </div>
            </div>
          </div>
        </div>
        <div class="step-content text-left" v-show="currentStep === 2" data-step="2">
          <h2 class="py-1">付款方式</h2>
          <ul>
            <li class="border-b p-3">
              <input type="radio" name="payment_method" id="credit_card" /><label for="credit_card"
                >信用卡付款</label
              >
            </li>
            <li class="border-b p-3">
              <input type="radio" name="payment_method" id="online_atm" /><label for="online_atm"
                >網路ATM</label
              >
            </li>
            <li class="p-3">
              <input type="radio" name="payment_method" id="store_code" /><label for="store_code"
                >超商代碼</label
              >
            </li>
          </ul>
          <hr />
          <h2 class="py-1 mt-2">運送方式</h2>
          <ul>
            <li class="border-b p-3">
              <input type="radio" name="shipping_method" id="home_delivery" /><label
                for="home_delivery"
                >黑貓宅配</label
              >
            </li>
            <li class="border-b p-3">
              <input type="radio" name="shipping_method" id="store_pickup" /><label
                for="store_pickup"
                >超商店到店</label
              >
            </li>
          </ul>
        </div>
        <div class="step-content text-left" v-show="currentStep === 3" data-step="3">
          <h2>寄送資料</h2>
          <div class="py-1">
            <label class="block" for="full_name">姓名</label>
            <input
              class="block w-full border px-3 py-1"
              type="text"
              id="full_name"
              placeholder="王小明"
            />
          </div>
          <div class="py-1">
            <label class="block" for="phone_number">電話</label>
            <input
              class="block w-full border px-3 py-1"
              type="number"
              id="phone_number"
              placeholder="0912345678"
            />
          </div>
          <div class="py-1">
            <label class="block" for="email">Email</label>
            <input
              class="block w-full border px-3 py-1"
              type="email"
              id="email"
              placeholder="abc123@mail.com"
            />
          </div>
          <div class="py-1">
            <label class="block">地址</label>
            <div class="grid grid-cols-2 gap-1">
              <input
                class="block col-span-1 border px-3 py-1"
                type="text"
                id="city"
                placeholder="城市"
              />
              <input
                class="block col-span-1 border px-3 py-1"
                type="text"
                id="postal_code"
                placeholder="郵遞區號"
              />
              <input
                class="block col-span-2 border px-3 py-1"
                type="text"
                id="address"
                placeholder="地址"
              />
            </div>
          </div>
        </div>
        <div
          class="step-content text-center text-lg font-semibold"
          v-show="currentStep === 4"
          data-step="4"
        >
          訂單成立
        </div>
      </div>
      <div class="mt-6 border-t pt-4 flex justify-between items-center">
        <span class="text-lg font-semibold">總計:</span>
        <span class="text-2xl font-bold">${{ totalPrice }}</span>
      </div>
      <!-- 按鈕 -->
      <div class="flex justify-between mt-6">
        <button
          @click="prevStep"
          class="px-4 py-2 border rounded-md text-black bg-white shadow-md"
          :disabled="currentStep === 1"
        >
          ← 繼續購物
        </button>
        <button
          @click="nextStep"
          class="px-4 py-2 border rounded-md bg-accent hover:bg-highlight text-white shadow-md"
          :disabled="currentStep === totalSteps"
        >
          下一步 →
        </button>
      </div>
    </main>
  </div>
</template>

<style>
@reference "tailwindcss";

.circle {
  @apply w-10 h-10 rounded-full flex items-center justify-center text-white font-bold;
}
</style>
