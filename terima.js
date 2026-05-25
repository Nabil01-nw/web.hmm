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

    // Inisialisasi Canvas Confetti
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

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

    // Nyalakan Kembang Api Confetti Emoji yang heboh!
    triggerEmojiConfetti();
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

        // Luncurkan ledakan kembang api emoji lebih heboh lagi!
        triggerEmojiConfetti();
    }, 1200);
}

function restartJourney() {
    localStorage.removeItem('userNickname');
    window.location.href = 'index.html';
}


// ==========================================================================
// 5. ENGINE CONFETTI EMOJI CANVAS (100% PURE HTML5 CANVAS - CUTE & MEME STYLE)
// ==========================================================================
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let emojiParticles = [];
let animationId = null;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

const confettiEmojis = [
    "💖", "❤️", "🐱", "😻", "🌟", "⭐", "🤡", "🎉", "🥤", "🐾"
];

class EmojiConfetti {
    constructor() {
        this.x = Math.random() * canvas.width;
        // Dimulai dari bagian bawah layar untuk dilempar ke atas bagai kembang api
        this.y = canvas.height + Math.random() * 20;
        this.size = Math.random() * 16 + 20; // Ukuran font emoji lebih besar biar kelihatan lucu

        // Memilih emoji acak dari daftar di atas
        this.emoji = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];

        this.speedY = -(Math.random() * 14 + 12); // Meluncur ke atas dengan kencang
        this.speedX = Math.random() * 8 - 4; // Menyebar ke samping

        this.gravity = 0.32; // Tarikan jatuh kembali
        this.wind = Math.random() * 0.08 - 0.04;

        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5 - 2.5;
    }

    update() {
        this.speedY += this.gravity;
        this.x += this.speedX + this.wind;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);

        // Gambar emoji sebagai teks di Canvas
        ctx.font = `${this.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.emoji, 0, 0);

        ctx.restore();
    }
}

function animateEmojiConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = emojiParticles.length - 1; i >= 0; i--) {
        const ep = emojiParticles[i];
        ep.update();
        ep.draw();

        // Hapus partikel jika jatuh keluar layar bawah
        if (ep.y > canvas.height + 50) {
            emojiParticles.splice(i, 1);
        }
    }

    if (emojiParticles.length > 0) {
        animationId = requestAnimationFrame(animateEmojiConfetti);
    } else {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

function triggerEmojiConfetti() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    emojiParticles = [];

    // Buat 130 partikel emoji acak
    for (let i = 0; i < 130; i++) {
        emojiParticles.push(new EmojiConfetti());
    }

    animateEmojiConfetti();
}
