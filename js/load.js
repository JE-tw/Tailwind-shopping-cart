
function loadComponent(id, file, callback) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback(); // 確保載入完成後執行回調函式
        })
        .catch(error => console.error(`載入 ${file} 失敗:`, error));
}

// 確保 header 載入後才綁定會員按鈕事件
document.addEventListener("DOMContentLoaded", function() {
    loadComponent("header-placeholder", "header.html", bindUserMenuEvents);
    loadComponent("footer-placeholder", "footer.html");
});

// 會員登出按鈕事件
function bindUserMenuEvents() {
    const userMenuBtn = document.getElementById("user-menu-btn");
    const logoutMenu = document.getElementById("logout-menu");

    if (!userMenuBtn || !logoutMenu) return; // 避免找不到元素時出錯

    userMenuBtn.addEventListener("click", (event) => {
        event.stopPropagation(); // 防止事件冒泡
        logoutMenu.classList.toggle("hidden");
    });

    document.addEventListener("click", (event) => {
        if (!userMenuBtn.contains(event.target) && !logoutMenu.contains(event.target)) {
            logoutMenu.classList.add("hidden");
        }
    });
}
