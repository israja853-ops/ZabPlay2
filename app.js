// ZabPlay Logic - Real App Experience
document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Logic
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');
            
            // UI Update
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Page Switch
            pages.forEach(p => p.classList.remove('active'));
            document.getElementById(target).classList.add('active');
        });
    });

    // 2. Video Player Logic
    const mainVideo = document.getElementById('main-video');
    const videoPlayerScreen = document.getElementById('video-player-screen');
    const controlsOverlay = document.getElementById('video-controls');
    const playPauseBtn = document.getElementById('play-pause');
    const muteBtn = document.getElementById('mute-btn');
    const lockBtn = document.getElementById('lock-btn');
    
    let isLocked = false;
    let controlTimer;

    // Gallery से वीडियो उठाने का फंक्शन (Simulated for Web)
    // असल APK में यह आपके फोन की फाइल एक्सेस करेगा
    window.openVideo = (src) => {
        mainVideo.src = src;
        videoPlayerScreen.classList.add('active');
        mainVideo.play();
        showControls();
    };

    // Play/Pause
    playPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isLocked) return;
        if (mainVideo.paused) {
            mainVideo.play();
            playPauseBtn.className = 'fas fa-pause';
        } else {
            mainVideo.pause();
            playPauseBtn.className = 'fas fa-play';
        }
    });

    // Mute/Unmute (Baja Wala Icon)
    muteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mainVideo.muted = !mainVideo.muted;
        muteBtn.className = mainVideo.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
    });

    // Lock Screen Logic
    lockBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isLocked = !isLocked;
        lockBtn.innerHTML = isLocked ? '<i class="fas fa-lock"></i>' : '<i class="fas fa-unlock"></i>';
        if (isLocked) {
            // सिर्फ लॉक बटन दिखेगा बाकी गायब
            controlsOverlay.classList.add('locked-state');
        } else {
            controlsOverlay.classList.remove('locked-state');
        }
    });

    // 3. Auto-Hide Controls (3 Seconds)
    const showControls = () => {
        controlsOverlay.style.opacity = '1';
        clearTimeout(controlTimer);
        if (!isLocked) {
            controlTimer = setTimeout(() => {
                controlsOverlay.style.opacity = '0';
            }, 3000);
        }
    };

    videoPlayerScreen.addEventListener('click', showControls);

    // Close Player
    document.getElementById('close-player').addEventListener('click', () => {
        videoPlayerScreen.classList.remove('active');
        mainVideo.pause();
    });

    // 4. Music Logic
    const musicPlayerScreen = document.getElementById('music-player-screen');
    
    window.playMusic = () => {
        musicPlayerScreen.classList.add('active');
    };

    document.getElementById('close-music').addEventListener('click', () => {
        musicPlayerScreen.classList.remove('active');
    });

    // Demo Data: गैलरी जैसा दिखाने के लिए
    const videoList = document.getElementById('gallery-video-list');
    for(let i=1; i<=5; i++) {
        videoList.innerHTML += `
            <div class="video-item" onclick="openVideo('video${i}.mp4')">
                <div class="thumb-container">
                    <img src="https://picsum.photos/200/110?random=${i}">
                    <span class="duration-tag">10:32</span>
                </div>
                <div class="video-info">
                    <h3>ZabPlay Video Sample ${i}</h3>
                    <p style="color:#b3b3b3; font-size:12px;">Beautiful Nature in 4K</p>
                </div>
            </div>
        `;
    }
});
