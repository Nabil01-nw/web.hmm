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
});

// 5. Fungsi Navigasi
function goBack() {
    window.location.href = 'index.html';
}

function goToNext() {
    window.location.href = 'terima.html';
}
