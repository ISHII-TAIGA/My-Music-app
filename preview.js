//===================
// プレビュー切り替え機能（最後に消す）
//===================
mobileViewBtn.addEventListener("click", () => {
    appContainer.classList.add("mobile-preview");
});

pcViewBtn.addEventListener("click", () => {
    appContainer.classList.remove("mobile-preview");
});

//===================
//===================