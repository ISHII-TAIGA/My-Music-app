//==================
// 関数定義
//==================
// ログイン状態によって表示画面を切り替え
function updateScreen() {
    if (isLoggedIn) {
        loginSection.style.display = "none";
        playlistSection.style.display = "block";
    } else {
        loginSection.style.display = "block";
        playlistSection.style.display = "none";
    }
}

// シートを閉じる関数
function closeSheet() {
    sheetOverlay.style.display = "none";
    playlistSheet.style.transform = "translateY(100%)";
}

//===================
// ログイン関係の処理
//===================
/*
loginBtn.addEventListener("click", () => {
    isLoggedIn = true;
    updateScreen();

    // alert("Googleログイン");  // 最後に有効化
});
*/

//===================
// sheet表示、非表示処理
//===================
playlistBtn.addEventListener("click", () => {
    sheetOverlay.style.display = "block";
    playlistSheet.style.transform = "translateY(0)";
});

closeSheetBtn.addEventListener("click", () => {
    closeSheet();
});

sheetOverlay.addEventListener("click", () => {
    closeSheet();
});

playlistSheet.addEventListener("click", (event) => {
    event.stopPropagation();
});

//===================
// 曲一覧画面からの戻る処理
//===================
backBtn.addEventListener("click", () => {
    header.style.display = "block";
    loginBtn.style.display = "block";
    playlistSection.style.display = "block";
    songSection.style.display = "none";
});