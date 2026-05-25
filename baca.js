/**
 * LOGIKA INTERAKTIF LAPORAN BACAAN (MEME/KOCAK VER.)
 * Fitur: Mengubah tema bacaan (Serius, Bucin, Matrix), Resizer Teks, dan Kucing Progres dinamis.
 */

// Deteksi Refresh (F5) — langsung kembali ke halaman utama verifikasi
(function () {
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries.length > 0 && navEntries[0].type === 'reload') {
        window.location.replace('index.html');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    // 1. Personalisasi Sapaan Nama Pengguna
    const userGreeting = document.getElementById('user-greeting');
    const storedName = localStorage.getItem('userNickname');

    if (storedName) {
        userGreeting.textContent = storedName;
    } else {
        userGreeting.textContent = "Kamu Si Paling Cantik";
    }

    // Set tema bawaan/default saat halaman dimuat ke tema "Bucin"
    document.body.setAttribute('data-theme', 'bucin');

    // 2. Logika Resizer Ukuran Teks
    const readingText = document.getElementById('reading-text');
    const btnIncrease = document.getElementById('font-increase');
    const btnDecrease = document.getElementById('font-decrease');

    let currentFontSize = 17; // Ukuran optimal untuk font sans-serif
    const minFontSize = 13;
    const maxFontSize = 28;

    btnIncrease.addEventListener('click', () => {
        if (currentFontSize < maxFontSize) {
            currentFontSize += 2;
            readingText.style.fontSize = currentFontSize + 'px';
        }
    });

    btnDecrease.addEventListener('click', () => {
        if (currentFontSize > minFontSize) {
            currentFontSize -= 2;
            readingText.style.fontSize = currentFontSize + 'px';
        }
    });

    // 3. Logika Ganti Tema Bacaan (Kocak & Bermanfaat)
    const themeSerius = document.getElementById('theme-serius');
    const themeBucin = document.getElementById('theme-bucin');
    const themeGelap = document.getElementById('theme-gelap');
    const themeDots = document.querySelectorAll('.theme-dot');

    function changeTheme(themeName, activeDot, fontFamily) {
        // Ganti atribut tema di elemen body
        document.body.setAttribute('data-theme', themeName);

        // Ganti gaya font teks bacaan
        readingText.style.fontFamily = fontFamily;

        // Memindahkan kelas aktif pada bulatan kontrol tema
        themeDots.forEach(dot => dot.classList.remove('active'));
        activeDot.classList.add('active');
    }

    // Mode Serius: Gaya hacker, font konsol, teks hijau
    themeSerius.addEventListener('click', () => {
        changeTheme('serius', themeSerius, 'var(--font-mono)');
    });

    // Mode Bucin: Pink romantis pastel, tulisan tangan anggun & mudah dibaca
    themeBucin.addEventListener('click', () => {
        changeTheme('bucin', themeBucin, 'var(--font-ui)');
    });

    // Mode Gelap Gulita: Gaya Matrix hitam pekat
    themeGelap.addEventListener('click', () => {
        changeTheme('gelap', themeGelap, 'var(--font-mono)');
    });

    // 4. Bar Progres Gulir & Kucing Berlari Dinamis (Cute Interactive Feature)
    const progressBar = document.getElementById('progress-bar');
    const progressCat = document.getElementById('progress-cat');

    readingText.addEventListener('scroll', () => {
        const scrollTop = readingText.scrollTop;
        const scrollHeight = readingText.scrollHeight - readingText.clientHeight;

        // Persentase gulir
        const scrollPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

        // Perbarui lebar bar progres
        progressBar.style.width = scrollPercentage + '%';

        // Ganti Emoji Kucing berdasarkan tingkat keterbacaan (sangat kocak!)
        if (scrollPercentage < 5) {
            progressCat.textContent = "🐱"; // Kucing diam/penasaran
        } else if (scrollPercentage >= 5 && scrollPercentage < 40) {
            progressCat.textContent = "🏃‍♂️"; // Kucing mulai berlari
        } else if (scrollPercentage >= 40 && scrollPercentage < 85) {
            progressCat.textContent = "😼"; // Kucing bersemangat/menyengir nakal
        } else {
            progressCat.textContent = "😻"; // Kucing jatuh cinta (heart eyes) saat selesai membaca!
        }
    });

    initMusic();
});

// 5. Fungsi Navigasi
function goBack() {
    window.location.href = 'index.html';
}

function goToNext() {
    window.location.href = 'terima.html';
}

// Fitur Lucu & Interaktif: Emoji Click Trail
document.addEventListener('click', (e) => {
    const emojis = ["💖", "✨", "🐱", "🐾", "🥤", "🌸", "💫", "🍿"];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    const sparkle = document.createElement('div');
    sparkle.className = 'click-sparkle';
    sparkle.textContent = randomEmoji;
    sparkle.style.left = e.pageX + 'px';
    sparkle.style.top = e.pageY + 'px';

    document.body.appendChild(sparkle);

    // Hapus setelah selesai animasi
    setTimeout(() => {
        sparkle.remove();
    }, 800);
});

// Daftar ramalan cinta lucu
const fortunes = [
    "🔮 Ramalan Bintang: Kamu 1000% jodohnya Nabil. Dilarang keras melirik cowo Ambon lain!",
    "🔮 Hari ini Nabil sedang merindukanmu. Segera kirim pesan suara bilang 'kangen' par dia!",
    "🔮 Fakta Lucu: Kaka Fira dan ibu dulu bantu comblang, sekarang dia bangga melihat kebucinan kalian! 🤝😎",
    "🔮 Fakta Lucu 2: Nabil udah penasaran sejak 2022 loh 😜",
    "🔮 Ramalan Bulan: Kamu 1000% kalian berjodoh",
];

// Fungsi Ramalan Jodoh Lucu
function showLoveFortune() {
    const fortuneBox = document.getElementById('fortune-box');
    const btn = document.getElementById('btn-fortune');

    btn.disabled = true;
    btn.textContent = "🔮 Sedang meramal bintang...";
    fortuneBox.innerHTML = `<span style="color: var(--secondary); font-style: italic;">Membaca garis takdir cinta...</span>`;

    setTimeout(() => {
        const randomQuote = fortunes[Math.floor(Math.random() * fortunes.length)];
        fortuneBox.innerHTML = `<span>${randomQuote}</span>`;
        btn.disabled = false;
        btn.textContent = "Ramal Lagi 🔮";
    }, 1200);
}

// Fitur Musik Latar Belakang (Shape of My Heart)
let audio = null;
let musicBtn = null;
let musicText = null;

function initMusic() {
    audio = new Audio('https://archive.org/download/Backstreetboys/Backstreet%20Boys%20-%20Shape%20Of%20My%20Heart.mp3');
    audio.loop = true;
    
    musicBtn = document.getElementById('music-btn');
    musicText = document.getElementById('music-text');
    
    let hasInteracted = false;
    
    function playReff() {
        if (hasInteracted) return;
        hasInteracted = true;
        audio.currentTime = 48; // Mulai langsung di Reff (48 detik)
        audio.play().then(() => {
            updateMusicUI(true);
        }).catch(err => {
            console.log("Autoplay blocked:", err);
            hasInteracted = false;
        });
    }
    
    document.addEventListener('click', playReff, { once: true });
    document.addEventListener('touchstart', playReff, { once: true });
}

function toggleMusic(e) {
    if (e) e.stopPropagation();
    if (!audio) return;
    
    if (audio.paused) {
        if (audio.currentTime < 48) {
            audio.currentTime = 48;
        }
        audio.play().then(() => {
            updateMusicUI(true);
        });
    } else {
        audio.pause();
        updateMusicUI(false);
    }
}

function updateMusicUI(isPlaying) {
    if (!musicBtn || !musicText) return;
    if (isPlaying) {
        musicBtn.classList.add('disc-rotating');
        musicBtn.textContent = "🔊";
        musicText.textContent = "Playing: Shape of My Heart 🎵";
    } else {
        musicBtn.classList.remove('disc-rotating');
        musicBtn.textContent = "🔇";
        musicText.textContent = "Music Paused 🔇";
    }
}
