// 1. Tab Switching Logic
function switchTab(pageId, element) {
    document.querySelectorAll('.app-page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    element.classList.add('active');
}

// 2. Real Gallery Access
function selectFromGallery() {
    const picker = document.createElement('input');
    picker.type = 'file';
    picker.accept = 'video/*, audio/*';
    picker.onchange = e => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        if (file.type.startsWith('video')) {
            openVideoPlayer(url, file.name);
        } else {
            openMusicPlayer(url, file.name);
        }
    };
    picker.click();
}

// 3. Open Video Player (Page 3)
function openVideoPlayer(url, name) {
    const player = document.getElementById('player-video-full');
    const v = document.getElementById('main-v-element');
    v.src = url;
    player.style.display = 'flex';
    v.play();
    // Suggested list update logic here
}

// 4. Open Music Player (Page 4)
function openMusicPlayer(url, name) {
    const player = document.getElementById('player-music-full');
    document.getElementById('m-title-text').innerText = name;
    player.style.display = 'flex';
    // Audio play logic here
}

// Close All Players
function closePlayers() {
    document.querySelectorAll('.full-screen-player').forEach(p => p.style.display = 'none');
    document.getElementById('main-v-element').pause();
}

// 3 Second Auto-Hide for Video Controls
let timer;
function handleVideoTouch() {
    const overlay = document.querySelector('.v-overlay');
    overlay.style.opacity = '1';
    clearTimeout(timer);
    timer = setTimeout(() => { overlay.style.opacity = '0'; }, 3000);
}
