//==================
// HTML要素の取得
//==================
const header = document.querySelector("header");
const loginBtn = document.getElementById("login-btn");

const playlistSheet = document.getElementById("playlist-sheet");
const closeSheetBtn = document.getElementById("close-sheet-btn");
const sheetOverlay = document.getElementById("sheet-overlay");

// プレイリスト
const playlistBtn = document.getElementById("playlist-btn");
const youtubeItem = document.getElementById("youtube");
const myPlaylistItem = document.getElementById("my-playlist");
const playlistList = document.getElementById("playlist-List");
const songList = document.getElementById("song-list");

// 各セクション
const playlistSection = document.getElementById("playlist-section");
const songSection = document.getElementById("song-section");
const playerSection = document.getElementById("player-section");
const miniPlayerSection = document.getElementById("mini-player-section");

const backBtn = document.getElementById("song-back-btn");
const playlistTitle = document.getElementById("playlist-title");

// 再生画面
const playerBackBtn =document.getElementById("player-back-btn");
const playerSongTitle =document.getElementById("player-song-title");
const playerArtist =document.getElementById("player-artist");
const currentTimeElement = document.getElementById("current-time");
const progressBar = document.getElementById("progress-bar");
const durationElement = document.getElementById("duration");
const playerThumbnail = document.getElementById("player-thumbnail");
// 裏でYoutubeのiframeを生成するための要素
const youtubePlayer = document.getElementById("youtube-player");

// 再生・次の曲・前の曲・リピート・シャッフルボタン
const playBtn = document.getElementById("play-btn");
const prevSongBtn = document.getElementById("prev-song-btn");
const nextSongBtn = document.getElementById("next-song-btn");
const repeatBtn = document.getElementById("repeat-btn");
const shuffleBtn = document.getElementById("shuffle-btn");

// ミニプレイヤー
const miniPlayer = document.getElementById("mini-player");
const miniPlayerPlayBtn = document.getElementById("mini-player-play-btn");
const miniPlayerSongTitle = document.getElementById("mini-player-song-title")
const miniPlayerArtist = document.getElementById("mini-player-artist");
const miniPlayerProgressBar = document.getElementById("mini-player-progress-bar");
const miniPlayerThumbnail = document.getElementById("mini-player-thumbnail");

// 最後に消す ==================
const loginSection = document.getElementById("login-section");
const appContainer = document.getElementById("app-container");
const mobileViewBtn = document.getElementById("mobile-view-btn");
const pcViewBtn = document.getElementById("pc-view-btn");
//=============================