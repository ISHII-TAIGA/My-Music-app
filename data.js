//==================
// 変数定義
//==================
let currentPlaylistType = "youtube"; // 現在のプレイリストタイプを保持する変数
let isLoggedIn = false;
let isPlaying = false;

let currentSongs = [];
let currentSongIndex = 0;

let currentTime = 0;
let timer = null;

let repeatMode = 0;
let shuffleMode = false;

let tokenClient;
let currentUser = null;
let accessToken = null;

let youtubePlaylists = [];
let currentPlaylistItems = [];

let currentSong = null;

let currentDuration = "PT0S";  // YouTubeから受け取った生のデータ
let duration = 0;  // 画面とタイマーが実際に使う、計算用の数値

let player = null;  // YouTubeプレイヤーを入れる変数

//==================
// ダミーデータ（後で消す）
//==================
/*
const youtubePlaylists = [
    {
        name: "お気に入り曲",
        songs: [
            "カウントアップ",
            "この夜に乾杯",
            "ネグローニ"
        ]
    },

    {
        name: "キタニタツヤ",
        songs: [
            {
                title: "クラブアンリアリティ",
                artist: "キタニタツヤ",
                duration: 241,
                thumbnail: "images/club-unreality.jpg"
            },
            {
                title: "Stoned Child",
                artist: "キタニタツヤ",
                duration: 172,
                thumbnail: "images/Stoned-Child.jpg"
            },
            {
                title: "トリガーハッピー",
                artist: "キタニタツヤ",
                duration: 212,
                thumbnail: "images/triggerhappy.jpg"
            },
            {
                title: "ハイドアンドシーク",
                artist: "キタニタツヤ",
                duration: 221,
                thumbnail: "images/hydeandseek.jpg"
            },
            {
                title: "Rapport",
                artist: "キタニタツヤ",
                duration: 220,
                thumbnail: "images/Rapport.jpg"
            },
            {
                title: "PINK",
                artist: "キタニタツヤ",
                duration: 177,
                thumbnail: "images/pink.jpg"
            },
            {
                title: "キュートアグレッション",
                artist: "キタニタツヤ",
                duration: 191,
                thumbnail: "images/cute-aggression.jpg"
            },
            {
                title: "旅にでも出よっか",
                artist: "キタニタツヤ",
                duration: 216,
                thumbnail: "images/tabinidemodeyokka.jpg"
            },
            {
                title: "ずうっといっしょ！",
                artist: "キタニタツヤ",
                duration: 185,
                thumbnail: "images/zuuttoissyo.jpg"
            },
            {
                title: "ウィスパー",
                artist: "キタニタツヤ",
                duration: 251,
                thumbnail: "images/whisper.jpg"
            },
            {
                title: "れびてーしょん",
                artist: "キタニタツヤ",
                duration: 243,
                thumbnail: "images/rebite-syon.jpg"
            },
        ]
    },

    {
        name: "なとり",
        songs: [
            {
                title: "プロポーズ",
                artist: "なとり",
                duration: 181,
                thumbnail: "images/propose.jpg"
            },
            {
                title: "ポルターガイスト",
                artist: "なとり",
                duration: 192,
                thumbnail: "images/poruta-gaisuto.jpg"
            },
            {
                title: "Puppet",
                artist: "なとり",
                duration: 220,
                thumbnail: "images/puppet.jpg"
            }
        ]
    },
];
*/

const myPlaylists = [
    "最近ハマった曲",
    "落ち着きたい時",
    "気分上げたい時"
]