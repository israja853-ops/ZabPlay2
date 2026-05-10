document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation & Page Management
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const videoPlayerScreen = document.getElementById('video-player-screen');
    const musicPlayerScreen = document.getElementById('music-player-screen');
    const mainVideo = document.getElementById('main-video');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            
            // UI Switch
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Page Switch (Fixing Music Page Visibility)
            pages.forEach(p => {
                p.classList.remove('active');
                p.style.display = 'none'; 
            });

            const activePage = document.getElementById(targetId);
            activePage.classList.add('active');
            activePage.style.display = 'block';
        });
    });

    // 2. Real Gallery Integration (Video/Music)
    window.selectFromGallery = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/*, audio/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const fileUrl = URL.createObjectURL(file);
            
            if (file.type.includes('video')) {
                startVideoPlayer(fileUrl, file.name);
            } else {
                startMusicPlayer(fileUrl, file.name);
            }
        };
        input.click();
    };

    function startVideoPlayer(src, name) {
        mainVideo.src = src;
        videoPlayerScreen.style.display = 'flex';
        videoPlayerScreen.classList.add('active');
        mainVideo.play();
        
        // Player के नीचे नाम अपडेट करना (Like your Photo)
        document.getElementById('player-bottom-list').innerHTML = `
            <div class="video-item" style="padding:15px; border-left: 4px solid #ff0033; background: #1a1a1a;">
                <div class="video-info">
                    <h3 style="color:#ff0033">Now Playing: ${name}</h3>
                    <p style="color:gray; font-size:12px;">ZabPlay Premium Player</p>
                </div>
            </div>
        `;
        showControls();
    }

    // 3. Advanced Video Controls
    const controlsOverlay = document.getElementById('video-controls');
    const playPauseBtn = document.getElementById('play-pause');
    const muteBtn = document.getElementById('mute-btn');
    const lockBtn = document.getElementById('lock-btn');
    let isLocked = false;
    let controlTimer;

    const showControls = () => {
        if (isLocked && !event.target.closest('#lock-btn')) return;
        controlsOverlay.style.opacity = '1';
        clearTimeout(controlTimer);
        controlTimer = setTimeout(() => {
            if (!mainVideo.paused) controlsOverlay.style.opacity = '0';
        }, 3000);
    };

    videoPlayerScreen.addEventListener('click', showControls);

    playPauseBtn.onclick = (e) => {
        e.stopPropagation();
        if (isLocked) return;
        if (mainVideo.paused) {
            mainVideo.play();
            playPauseBtn.className = 'fas fa-pause';
        } else {
            mainVideo.pause();
            playPauseBtn.className = 'fas fa-play';
        }
    };

    muteBtn.onclick = (e) => {
        e.stopPropagation();
        mainVideo.muted = !mainVideo.muted;
        muteBtn.className = mainVideo.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
    };

    lockBtn.onclick = (e) => {
        e.stopPropagation();
        isLocked = !isLocked;
        lockBtn.innerHTML = isLocked ? '<i class="fas fa-lock"></i>' : '<i class="fas fa-unlock"></i>';
        controlsOverlay.classList.toggle('locked-mode', isLocked);
    };

    // 4. Music Player Logic
    function startMusicPlayer(src, name) {
        musicPlayerScreen.style.display = 'flex';
        musicPlayerScreen.classList.add('active');
        document.getElementById('song-title').innerText = name;
        // यहाँ म्यूजिक प्ले करने का अलग ऑडियो टैग भी लगा सकते हैं
    }

    document.getElementById('close-player').onclick = () => {
        videoPlayerScreen.style.display = 'none';
        mainVideo.pause();
    };

    document.getElementById('close-music').onclick = () => {
        musicPlayerScreen.style.display = 'none';
    };
});

