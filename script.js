// Ma'lumotlar saqlanadigan massiv
let gradesData = [];

// Elementlarni tanlab olish
const gradeForm = document.getElementById('grade-form');
const studentNameInput = document.getElementById('student-name');
const subjectNameInput = document.getElementById('subject-name');
const scoreInput = document.getElementById('score');

const tableBody = document.getElementById('grades-table-body');
const avgScoreEl = document.getElementById('avg-score');
const maxScoreEl = document.getElementById('max-score');
const minScoreEl = document.getElementById('min-score');

// 1. Ballga qarab an'anaviy bahoni aniqlash funksiyasi
function getGradeLetter(score) {
    if (score >= 90) return '5 (A)';
    if (score >= 80) return '4 (B)';
    if (score >= 70) return '3 (C)';
    if (score >= 60) return '3 (D)';
    return '2 (F)';
}

// 2. Formani jo'natganda ishlaydigan hodisa
gradeForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Sahifa yangilanib ketishining oldini oladi

    const name = studentNameInput.value.trim();
    const subject = subjectNameInput.value.trim();
    const score = parseInt(scoreInput.value);

    // Yangi ob'ekt yaratish
    const newGrade = {
        id: Date.now(),
        name: name,
        subject: subject,
        score: score
    };

    // Ro'yxatga qo'shish
    gradesData.push(newGrade);

    // Formani tozalash
    gradeForm.reset();

    // UI-ni yangilash
    updateUI();
});

// 3. O'chirish funksiyasi
function deleteGrade(id) {
    gradesData = gradesData.filter(item => item.id !== id);
    updateUI();
}

// 4. Statistikani hisoblash funksiyasi
function calculateStats() {
    if (gradesData.length === 0) {
        avgScoreEl.textContent = '0';
        maxScoreEl.textContent = '0';
        minScoreEl.textContent = '0';
        return;
    }

    const scores = gradesData.map(item => item.score);
    
    // O'rtacha ball
    const total = scores.reduce((sum, score) => sum + score, 0);
    const avg = (total / scores.length).toFixed(1);

    // Maksimal va Minimal ball
    const max = Math.max(...scores);
    const min = Math.min(...scores);

    // Ekrandagi yozuvlarni yangilash
    avgScoreEl.textContent = avg;
    maxScoreEl.textContent = max;
    minScoreEl.textContent = min;
}

// 5. Jadvalni qayta chizish va UI-ni yangilash funksiyasi
function updateUI() {
    // Avval jadvalni tozalaymiz
    tableBody.innerHTML = '';

    // Jadvalga ma'lumotlarni joylash
    gradesData.forEach((item, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${item.name}</strong></td>
            <td>${item.subject}</td>
            <td>${item.score}</td>
            <td>${getGradeLetter(item.score)}</td>
            <td><button class="delete-btn" onclick="deleteGrade(${item.id})">O'chirish</button></td>
        `;

        tableBody.appendChild(row);
    });

    // Statistikani qayta hisoblash
    calculateStats();
}