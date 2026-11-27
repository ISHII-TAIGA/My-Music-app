// Googleログイン、Youtube承認関係
//==================
// 関数定義
//==================
function initializeGoogleLogin() {
    
    // 以下デバック
    if(typeof google === "undefined"){
        console.log("google未読込");
        return;
    }

    console.log("google読込成功");
    //----------------------------------

    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id:
        "323994057507-0igucanpitg9q6s17vmc2vu0bn4gra71.apps.googleusercontent.com",

        scope:
        "openid email profile https://www.googleapis.com/auth/youtube.readonly",

        callback: async (response) => {
            accessToken = response.access_token;

            console.log(response);
            console.log("scope =", response.scope);

            const userInfoResponse = await fetch(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {
                    headers: {
                        Authorization:
                        `Bearer ${response.access_token}`
                    }
                }
            );

            const userInfo =
            await userInfoResponse.json();

            console.log(userInfo);
            currentUser = userInfo;
            await getYoutubePlaylists();


            isLoggedIn = true;
            updateScreen();
        }
    });

    loginBtn.addEventListener("click", () => {
        console.log("googleログイン開始");
        tokenClient.requestAccessToken();
    });
}

// Youtubeプレイリスト取得関数
async function getYoutubePlaylists() {
    const response = await fetch("https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&maxResults=50",
        {
            headers: {
                Authorization:
                `Bearer ${accessToken}`
            }
        }
    );
    const data = await response.json();
    youtubePlaylists = data.items;
    showPlaylists(youtubePlaylists);
    console.log(youtubePlaylists);
}

// Youtubeプレイリスト内の曲情報取得関数
async function getPlaylistItems(playlistId) {
    let items = [];
    let pageToken = "";

    do {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50` +
            (pageToken ? `&pageToken=${pageToken}` : "");

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const data = await response.json();

        if (data.error) {
            console.error("playlistItems API エラー:", data.error);
            break;
        }

        // 非公開・削除された動画は表示から除外する
        const playable = data.items.filter(song =>
            song.snippet.title !== "Private video" &&
            song.snippet.title !== "Deleted video"
        );
        items = items.concat(playable);
        pageToken = data.nextPageToken || "";
    } while (pageToken);

    currentPlaylistItems = items;
    console.log(currentPlaylistItems);
}

async function getVideoDetails(videoId) {
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}`,
        {
            headers: {
                Authorization:
                `Bearer ${accessToken}`
            }
        }
    );
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
        console.warn("動画情報が取得できません:", videoId);
        return;
    }

    console.log(data.items[0]);
    console.log(data.items[0].contentDetails.duration);
    currentDuration =data.items[0].contentDetails.duration;
}

//==================
// ページ読込後に実行
//==================
window.addEventListener("load", () => {
    initializeGoogleLogin();
});