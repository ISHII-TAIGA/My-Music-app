//==================
// 関数定義
//==================
// プレイリスト表示関数
function showPlaylists(playlists){
    playlistList.innerHTML = "";
    playlists.forEach((playlist) => {
        const li = document.createElement("li"); // プレイリスト項目を作成
        li.textContent = playlist.snippet.title;
            li.addEventListener("click", async () => {
                await getPlaylistItems(playlist.id);
                console.log(playlist.id);

                header.style.display = "none";
                loginBtn.style.display = "none";
                playlistSection.style.display = "none";
                songSection.style.display = "block";
                playlistTitle.textContent = playlist.snippet.title;

                songList.innerHTML = "";
                currentPlaylistItems.forEach((song, index) => {
                    const songLi = document.createElement("li");
                    songLi.classList.add("song-item");
                    const thumbs = song.snippet.thumbnails || {};
                    const thumbUrl = (thumbs.medium || thumbs.default || {}).url || "";
                    songLi.innerHTML = `
                        <div class="song-thumbnail-placeholder">
                            <img
                                src = "${thumbUrl}"
                                class = "song-thumbnail"
                            >
                        </div>
                        <div class="song-info">
                            <div class="song-title">
                                ${song.snippet.title}
                            </div>
                            <div class="song-meta">
                                ${song.snippet.videoOwnerChannelTitle}
                            </div>
                        </div>
                        <button class="song-menu-btn">
                            ⋮
                        </button>
                    `;
                    songLi.addEventListener("click", async () => {
                        currentSongs = currentPlaylistItems;
                        currentSongIndex = index;
                        currentSong = currentSongs[currentSongIndex];

                        await getVideoDetails(currentSong.snippet.resourceId.videoId);

                        isPlaying = true;
                        playBtn.textContent = "⏸";
                        miniPlayerPlayBtn.textContent = "⏸";
                
                        clearInterval(timer);
                        resetPlayer();
                        updatePlayerUI();      
                        playCurrentVideo();
                        startTimer();

                        songSection.style.display = "none";
                        playerSection.style.display = "block";
                        miniPlayerSection.style.display = "none";
                    });
                    songList.appendChild(songLi);
                });
            });
        playlistList.appendChild(li); // 画面に表示
    })
}

// 初期表示処理関数
function initializePlaylists() {
    if(currentPlaylistType === "youtube") {
        showPlaylists(youtubePlaylists);
    }
    if(currentPlaylistType === "my-playlist") {
        showPlaylists(myPlaylists);
    }
}

//===================
// プレイリスト選択処理
//===================
youtubeItem.addEventListener("click", () => {
    closeSheet();
    currentPlaylistType = "youtube";
    showPlaylists(youtubePlaylists);
    playlistBtn.textContent = "YouTubeプレイリスト ▼";
});

myPlaylistItem.addEventListener("click", () => {
    closeSheet();
    currentPlaylistType = "my-playlist";
    showPlaylists(myPlaylists);
    playlistBtn.textContent = "マイプレイリスト ▼";
});
