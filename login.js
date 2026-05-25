/**
 * LOGIKA INTERAKTIF PORTAL MASUK KEAMANAN JODOH v2.0 (MEME/KOCAK VER.)
 * Didesain jenaka, menjamin pasangan Anda tidak terhambat namun tertawa saat membaca.
 */

function handleLogin(event) {
    event.preventDefault(); // Mencegah reload halaman bawaan browser

    // Mengambil elemen-elemen halaman
    const usernameInput = document.getElementById('username');
    const accessCodeInput = document.getElementById('access-code');
    const errorMessage = document.getElementById('error-message');
    const loginButton = document.getElementById('login-button');

    const username = usernameInput.value.trim();
    const accessCode = accessCodeInput.value.trim().toLowerCase();

    // 1. Validasi Keberadaan Input
    if (username === "" || accessCode === "") {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Error: Input kosong! Harap masukkan data agar satelit bisa melacak.";
        return;
    }

    // Menyembunyikan pesan error awal
    errorMessage.style.display = "none";

    // Menyimpan nama panggilan ke localStorage untuk personalisasi halaman selanjutnya
    localStorage.setItem('userNickname', username);

    // 2. Evaluasi Tingkat Keromantisan Sandi (Kocak & Interaktif) & Tampilkan GIF Meme
    const memeContainer = document.getElementById('login-meme-container');
    let warningMessage = "";
    let gifUrl = "";
    
    if (accessCode === "sayang" || accessCode === "love" || accessCode === "pacar" || accessCode === "jodoh") {
        warningMessage = "Akses Diterima! Sandi sangat romantis (Tingkat Kebucinan: 1000%!) 🥰";
        gifUrl = "https://media.tenor.com/p3n7J-0p92gAAAAC/heart-cat.gif"; // Kucing cinta
    } else {
        // Jika sandi ngasal, sistem meloloskan secara paksa karena "terlalu imut"
        warningMessage = "Sandi kurang romantis, tapi karena kamu terlalu imut, sistem terpaksa menjebol pintu hati sendiri! ⚡💻";
        gifUrl = "https://media.tenor.com/2P6jNlB97xIAAAAC/hacker-cat.gif"; // Kucing hacker mengetik cepat
    }

    if (memeContainer) {
        memeContainer.style.display = "flex";
        memeContainer.innerHTML = `<img src="${gifUrl}" alt="Meme Cat" class="meme-gif">`;
    }

    // 3. Efek Loading Berurutan Mewah & Jenaka (Simulasi Satelit)
    const buttonText = loginButton.querySelector('span');
    const buttonSvg = loginButton.querySelector('svg');

    // Nonaktifkan tombol
    loginButton.style.cursor = "not-allowed";
    loginButton.style.opacity = "0.85";

    // Tahap 1 Pemuatan (0 - 600ms)
    buttonText.textContent = "Menghubungkan ke satelit jodoh...";
    if (buttonSvg) buttonSvg.style.transform = "rotate(90deg)";

    // Tahap 2 Pemuatan (600ms - 1300ms)
    setTimeout(() => {
        buttonText.textContent = "Mengukur kadar kebucinan DNA...";
        errorMessage.style.display = "block";
        errorMessage.style.color = "var(--secondary)"; // Mengubah warna pesan menjadi kuning/gold untuk notifikasi khusus
        errorMessage.textContent = warningMessage;
        if (buttonSvg) buttonSvg.style.transform = "rotate(180deg)";
    }, 600);

    // Tahap 3 Pemuatan Akhir (1300ms - 2200ms)
    setTimeout(() => {
        buttonText.textContent = "Lolos Kelayakan! Membuka Portal...";
        if (buttonSvg) buttonSvg.style.transform = "rotate(360deg)";
    }, 1400);

    // Redirect ke Halaman Baca setelah 2.2 detik
    setTimeout(() => {
        window.location.href = 'baca.html';
    }, 2200);
}

// Bersihkan riwayat lama saat memuat portal login
window.onload = function() {
    localStorage.removeItem('userNickname');
};

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
