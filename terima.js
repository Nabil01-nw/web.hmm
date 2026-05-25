/**
 * LOGIKA INTERAKTIF KEPUTUSAN CINTA & MESIN CONFETTI EMOJI KUSTOM (MEME VER.)
 * Fitur: Tombol menghindar jahil, pop-up speech bubble kocak, sertifikat jadian dinamis, canvas confetti emoji.
 */

// Deteksi Refresh (F5) — langsung kembali ke halaman utama verifikasi
(function () {
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries.length > 0 && navEntries[0].type === 'reload') {
        window.location.replace('index.html');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    // 1. Personalisasi Sapaan Nama Pasangan
    const letterName = document.getElementById('letter-name');
    const certPartnerName = document.getElementById('cert-partner-name');
    const certMyName = document.getElementById('cert-my-name');
    const storedName = localStorage.getItem('userNickname');

    if (storedName) {
        letterName.textContent = storedName;
        certPartnerName.textContent = storedName;
    } else {
        letterName.textContent = "Si Paling Lucu";
        certPartnerName.textContent = "Kamu Si Paling Imut";
    }

    // Set nama pembuat web secara default (bisa diubah manual oleh user nanti)
    certMyName.textContent = "Nabil Q. Ahmad";



    // 2. Hubungkan Trik Tombol Menghindar "Gak Mau"
    const btnNo = document.getElementById('btn-no');

    // Saat kursor mouse mendekat atau layar disentuh (mobile)
    btnNo.addEventListener('mouseover', moveButtonNo);
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Mencegah klik bawaan pada layar sentuh
        moveButtonNo();
    });

    // Jika entah bagaimana mereka berhasil mengklik tombol No (misalnya memakai tombol TAB)
    btnNo.addEventListener('click', () => {
        alert("Nice try! Tapi server menolak pilihan ini. Kontrak menyatakan kamu HARUS pilih 'MAU'! 😉");
        resetButtonNoPosition();
    });

    initMusic();
});

// ==========================================================================
// 3. LOGIKA INTERAKSI & TRIK TOMBOL MENGHINDAR
// ==========================================================================
let isEnvelopeOpened = false;

function openEnvelope() {
    if (isEnvelopeOpened) return;

    const envelope = document.getElementById('gift-envelope');
    const decisionArea = document.getElementById('decision-area');
    const pageTitle = document.getElementById('page-title');
    const pageSubtitle = document.getElementById('page-subtitle');

    envelope.classList.add('opened');
    isEnvelopeOpened = true;

    // Perbarui Teks
    pageTitle.textContent = "AMBIL KEPUTUSANMU!";
    pageTitle.style.color = "var(--primary)";
    pageSubtitle.textContent = "Silakan klik tombol pilihan di bawah. Ingat, pilih dengan bijak!";

    // Munculkan Pilihan Tombol Jadian setelah amplop terbuka
    setTimeout(() => {
        decisionArea.style.display = "flex";
        decisionArea.scrollIntoView({ behavior: 'smooth' });
    }, 500);
}

// Kalimat reaksi kocak saat tombol No didekati
const warningTexts = [
    "Yakin bos? 🧐",
    "Gak bisa diklik woi! 😂",
    "Salah pencet kali? 😜",
    "Tidak ada opsi ini di kontrak jadian! 📜",
    "Sistem menolak pilihan Anda! 🤡",
    "Eits, gak kena! ⚡",
    "Gak boleh nolak, titik! 💖",
    "Pilihan ini sedang mogok kerja 🛠️",
    "Pikir-pikir dulu bos! 😉"
];

function moveButtonNo() {
    const btnNo = document.getElementById('btn-no');
    const container = document.querySelector('.decision-group');

    // Get container dimensions
    const containerRect = container.getBoundingClientRect();
    const btnHeight = btnNo.offsetHeight;
    const btnWidth = btnNo.offsetWidth;

    // Calculate max positions
    const maxX = containerRect.width - btnWidth;
    const maxY = containerRect.height - btnHeight;

    // Calculate random position
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Apply position
    btnNo.style.position = 'absolute';
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';

    // Show floating sad meme near button
    const sadMeme = document.getElementById('sad-meme-gif');
    if (sadMeme) {
        sadMeme.style.display = 'block';
        sadMeme.style.left = (randomX + btnWidth / 2 - 50) + 'px';
        sadMeme.style.top = (randomY - 110) + 'px';
    }

    // Create warning bubble above button
    createWarningBubble(randomX, randomY - 40);
}

function resetButtonNoPosition() {
    const btnNo = document.getElementById('btn-no');
    btnNo.style.position = 'relative';
    btnNo.style.left = '';
    btnNo.style.top = '';

    const sadMeme = document.getElementById('sad-meme-gif');
    if (sadMeme) {
        sadMeme.style.display = 'none';
    }
}

function createWarningBubble(x, y) {
    // Hapus bubble lama jika masih ada agar layar tidak penuh
    const oldBubble = document.querySelector('.meme-warning-bubble');
    if (oldBubble) oldBubble.remove();

    const bubble = document.createElement('div');
    bubble.className = 'meme-warning-bubble';

    // Pilih teks acak
    const randomText = warningTexts[Math.floor(Math.random() * warningTexts.length)];
    bubble.textContent = randomText;

    // Posisikan bubble di atas tombol No
    bubble.style.left = (x - 20) + 'px';
    bubble.style.top = y + 'px';

    document.getElementById('decision-area').appendChild(bubble);

    // Hapus otomatis setelah 1.2 detik
    setTimeout(() => {
        bubble.remove();
    }, 1200);
}

// ==========================================================================
// 4. LOGIKA MENERIMA CINTA (SUCCESS SCENE)
// ==========================================================================
function acceptLove() {
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const decisionArea = document.getElementById('decision-area');
    const feedbackSection = document.getElementById('feedback-section');
    const pageTitle = document.getElementById('page-title');
    const pageSubtitle = document.getElementById('page-subtitle');

    // Sembunyikan Amplop dan Tombol Pilihan
    envelopeWrapper.style.display = "none";
    decisionArea.style.display = "none";

    // Perbarui Judul Sukses
    pageTitle.textContent = "YEEAAAY! KITA JADIAN! 🥳💖";
    pageTitle.style.color = "var(--primary)";
    pageTitle.style.animation = "beat 1s infinite alternate ease-in-out";

    pageSubtitle.textContent = "Pintu gerbang masa depan bahagia resmi dibuka! Silakan tanda tangani kontrak.";

    // Tampilkan Box Sertifikat & Form dengan transisi halus
    feedbackSection.style.display = "block";
    feedbackSection.scrollIntoView({ behavior: 'smooth' });

    // Format Tanggal Jadian Hari Ini Secara Otomatis dalam bahasa Indonesia
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    const dateString = today.toLocaleDateString("id-ID", options);
    document.getElementById('jadian-date').textContent = dateString;


}

function sendFeedback(event) {
    event.preventDefault(); // Mencegah refresh

    const feedbackInput = document.getElementById('feedback-input');
    const sendButton = document.getElementById('send-button');
    const feedbackSection = document.getElementById('feedback-section');
    const storedName = localStorage.getItem('userNickname') || "Dia";

    const feedbackText = feedbackInput.value.trim();
    if (feedbackText === "") return;

    // Animasi tombol mengirim
    const btnSpan = sendButton.querySelector('span');
    btnSpan.textContent = "Merekam ke Memori Hati...";
    sendButton.style.opacity = "0.7";
    sendButton.disabled = true;

    setTimeout(() => {
        // Tampilkan pesan sukses penutup bertema boba kocak
        feedbackSection.innerHTML = `
            <div class="card" style="padding: 30px; text-align: center; background: rgba(255, 255, 255, 0.04); border: 2px solid var(--secondary); animation: slideUp 0.6s ease forwards;">
                <h3 style="color: var(--secondary); margin-bottom: 12px; font-size: 1.4rem;">Perjanjian Tersegel! 🤝🥤</h3>
                <p style="color: var(--text-secondary); font-size: 1rem; line-height: 1.6;">
                    Pesan manismu: <strong>"${feedbackText}"</strong> telah terekam aman di satelit jodoh!<br>
                    Persiapkan diri Anda, <strong>${storedName}</strong>. Pihak 1 akan segera datang menjemputmu untuk kencan traktir Boba pertama kita!
                </p>
                <div class="meme-container" style="margin-top: 16px; margin-bottom: 16px;">
                    <img src="https://media1.tenor.com/m/9Z4SlwWXEsEAAAAC/gal%C3%A3demais-rose.gif" alt="Ganteng Banget Rose Meme" class="meme-gif" style="max-height: 120px;">
                </div>
                <div style="font-size: 3rem; animation: beat 1s infinite alternate ease-in-out;">🐱💖🥤</div>
            </div>
            <div style="margin-top: 24px; text-align: center;">
                <button class="btn-secondary" onclick="restartJourney()">
                    <span>Mulai Dari Awal (Reset)</span>
                </button>
            </div>
        `;


    }, 1200);
}

function restartJourney() {
    localStorage.removeItem('userNickname');
    window.location.href = 'index.html';
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



