//==================
// 関数定義
//==================
// 再生・停止を切り替える関数
function togglePlay() {
    if(isPlaying){
        clearInterval(timer);
        player.pauseVideo();  // YouTubeプレイヤーを一時停止する
        playBtn.textContent = "▶";
        miniPlayerPlayBtn.textContent = "▶";
        isPlaying = false;
    }
    else {
        startTimer();
        player.playVideo();  // YouTubeプレイヤーを再生する
        playBtn.textContent = "⏸";
        miniPlayerPlayBtn.textContent = "⏸";
        isPlaying = true;
    }
}

// 再生状態にする関数（ボタン表示とタイマーをまとめて行進）
function startPlayback() {
    clearInterval(timer);
    isPlaying = true;
    playBtn.textContent = "⏸";
    miniPlayerPlayBtn.textContent = "⏸";
    player.playVideo();
    startTimer();
}

// 曲変更関数
function updatePlayerUI() {
    playerSongTitle.textContent = currentSong.snippet.title;
    playerArtist.textContent = currentSong.snippet.videoOwnerChannelTitle ||
    currentSong.snippet.channelTitle;
    playerThumbnail.innerHTML = `
        <img
            src="${currentSong.snippet.thumbnails.high.url}"
            class="player-thumbnail-image"
        >
    `;

    miniPlayerSongTitle.textContent = currentSong.snippet.title;
    miniPlayerArtist.textContent = currentSong.snippet.videoOwnerChannelTitle ||
    currentSong.snippet.channelTitle;
    miniPlayerThumbnail.innerHTML = `
        <img
            src="${currentSong.snippet.thumbnails.high.url}"
            class="mini-player-thumbnail-image"
        >
    `;

    duration = convertDuration(currentDuration);
    updateTimeDisplay();
}

// 曲時間取得関数
function convertDuration(durationText){
    const match = durationText.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
    const minutes = parseInt(match[1] || 0);
    const seconds = parseInt(match[2] || 0);
    return minutes * 60 + seconds;
}

// 現在再生時間、シークバー更新関数
function updateTimeDisplay() {
    // 現在の再生時間更新
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = currentTime % 60;
    currentTimeElement.textContent = 
    `${currentMinutes}:${String(currentSeconds).padStart(2, "0")}`;

    // 曲全体時間
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = duration % 60;
    durationElement.textContent =
    `${durationMinutes}:${String(durationSeconds).padStart(2,"0")}`;

    // シークバー更新
    progressBar.value = (currentTime / duration) * 100;
    progressBar.style.setProperty("--progress", `${progressBar.value}%`)
    miniPlayerProgressBar.style.width = `${(currentTime / duration) * 100}%`;
}

// 曲が終わった時の処理
async function onSongEnd() {
    if(repeatMode === 2){
        // 1曲リピート → 同じ曲を頭から
        resetPlayer();
        player.seekTo(0,true);
        startPlayback();
    }
    else if(shuffleMode){
        // シャッフルモード → ランダムに曲を選ぶ
        currentSongIndex = Math.floor(Math.random() * currentSongs.length);
        await changeSong();
        startPlayback();
    }
    else if(currentSongIndex < currentSongs.length - 1){
        // 次の曲へ
        currentSongIndex++;
        await changeSong();
        startPlayback();
    }
    else if(repeatMode === 1){
        // プレイリストリピート → 最初の曲へ
        currentSongIndex = 0;
        await changeSong();
        startPlayback();
    }
    else{
        // 最後の曲で、リピートなし： 再生停止
        isPlaying = false;
        playBtn.textContent = "▶";
        miniPlayerPlayBtn.textContent = "▶";
    }
}

// 時間、曲終了を監視する関数
function startTimer() {
    timer = setInterval(() => {
        currentTime = Math.floor(player.getCurrentTime());
        updateTimeDisplay();
    }, 500);
}

// 今の currentSongIndex の曲に切り替える関数
async function changeSong() {
    currentSong = currentSongs[currentSongIndex];
    clearInterval(timer);

    await getVideoDetails(currentSong.snippet.resourceId.videoId);

    resetPlayer();
    updatePlayerUI();
    playCurrentVideo();
}

// 曲時間リセット関数
function resetPlayer() {
    currentTime = 0;
    updateTimeDisplay();
}

// リピートボタン更新関数
function updateRepeatButton() {
    repeatBtn.classList.toggle("active", repeatMode !== 0);
    repeatBtn.dataset.mode = repeatMode;  // 0:なし 1:全曲  2:1曲
}

// シャッフルボタン更新関数
function updateShuffleButton() {
    shuffleBtn.classList.toggle("active", shuffleMode);
}

//===================
// YouTubeプレイヤー作成
//===================
function onYouTubeIframeAPIReady() {
    player = new YT.Player("youtube-player", {
        height: "200",
        width: "300",
        playerVars: {
            playsinline: 1
        },
        events: {
            onReady: () => {
                console.log("プレイヤー準備完了");
            },
            onStateChange: (event) => {
                if(event.data === YT.PlayerState.ENDED){
                    clearInterval(timer);
                    onSongEnd();
                }
            }
        }
    });
}

//YouTubeプレイヤー再生
function playCurrentVideo() {
    player.loadVideoById(currentSong.snippet.resourceId.videoId);
}

//===================
// 曲再生、戻し、送り処理、リピート、シャッフル処理
//===================
// 再生ボタン
playBtn.addEventListener("click", () => {
    togglePlay();
});

// 曲飛ばしボタン
nextSongBtn.addEventListener("click", async () => {
    if(shuffleMode){
        currentSongIndex = Math.floor(
            Math.random() * currentSongs.length
        );
    }
    else {
        if(currentSongIndex < currentSongs.length - 1){
            currentSongIndex++;
        }else{
            return;
        }
    }
    await changeSong();
    startPlayback();
});

// 曲戻りボタン
prevSongBtn.addEventListener("click", async () => {
    if(currentTime >= 5) {
        resetPlayer();
        player.seekTo(0,true);  // 音楽も最初に戻す
        startPlayback();
    }
    else {
        if(currentSongIndex > 0){
            currentSongIndex--;
            await changeSong();
            startPlayback();
        }
    }
});

// リピートボタン
repeatBtn.addEventListener("click", () => {
    repeatMode++;
    if(repeatMode > 2){
        repeatMode = 0;
    }
    updateRepeatButton();
    if(repeatMode === 0){
        console.log("リピート解除");
    }
    else if(repeatMode === 1){
        console.log("プレイリストリピート開始");
    }
    else{
        console.log("1曲リピート開始");
    }
});

// シャッフルボタン
shuffleBtn.addEventListener("click", () => {
    shuffleMode = !shuffleMode;
    updateShuffleButton();
    if(shuffleMode){
        console.log("シャッフルモード開始");
    }
    else{
        console.log("シャッフルモード解除");
    }
});

//===================
// シークバー操作処理
//===================
progressBar.addEventListener("input", () => {
    currentTime = Math.floor(
        (progressBar.value / 100) * duration
    );
    player.seekTo(currentTime, true);  // YouTubeプレイヤーの再生位置を、指定した秒数に移動する
    updateTimeDisplay();
});

//===================
// 曲再生画面から戻る処理
//===================
playerBackBtn.addEventListener("click", () => {
    playerSection.style.display = "none";
    songSection.style.display = "block";
    miniPlayerSection.style.display = "block";
});

//===================
// ミニプレイヤー
//===================
// ミニプレイヤータッチで再生画面に戻る処理
miniPlayer.addEventListener("click", () => {
    playlistSection.style.display = "none";
    songSection.style.display = "none";
    playerSection.style.display = "block";
    miniPlayerSection.style.display = "none";
});

// ミニプレイヤー再生ボタン
miniPlayerPlayBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    togglePlay();
});