// ==========================
// HabitFlow Website
// Version 2.1.1
// ==========================

const addHabitBtn = document.getElementById("addHabitBtn");
const habitBody = document.getElementById("habitBody");

let habits = [];
const savedHabits = localStorage.getItem("habits");

if (savedHabits) {
    habits = JSON.parse(savedHabits);
}


    function renderTable() {

    habitBody.innerHTML = "";

    const search = document.getElementById("searchHabit").value.toLowerCase();

    habits.forEach(function (habit, index) {

        if (!habit.name.toLowerCase().includes(search)) return;

        let completed = 0;

        let row = `
            <tr>
                <td>${habit.name}</td>
                <td>${habit.target}</td>
        `;

        for (let i = 0; i < 31; i++) {

            if (habit.days[i]) completed++;

            row += `
                <td>
                    <input
                        type="checkbox"
                        ${habit.days[i] ? "checked" : ""}
                        onclick="toggleDay(${index}, ${i})">
                </td>
            `;
        }

        const progress = Math.round((completed / 31) * 100);

        row += `
                <td>${progress}%</td>

                <td>
                    <button onclick="deleteHabit(${index})">🗑️</button>
                </td>
            </tr>
        `;

        habitBody.innerHTML += row;

    });
       updateDashboard();
}


addHabitBtn.addEventListener("click", function(){

    const habitName = prompt("Enter Habit Name");

    if(!habitName) return;

    const target = prompt("Enter Target");

    habits.push({
        name: habitName,
        target: target || "-",
        days:new Array(31).fill(false)
    });
    saveData();
    renderTable();

});
function deleteHabit(index) {

    if (!confirm("Are you sure you want to delete this habit?")) return;

    habits.splice(index,1);

    saveData();
    renderTable();
}
function saveData() {

    localStorage.setItem(
        "habits",
        JSON.stringify(habits)
    );

}
function toggleDay(habitIndex, dayIndex) {

    habits[habitIndex].days[dayIndex] =
        !habits[habitIndex].days[dayIndex];

        saveData();
    renderTable();

}
function updateDashboard() {

    document.getElementById("totalHabits").textContent = habits.length;

    let totalCompleted = 0;

    habits.forEach(habit => {

        totalCompleted += habit.days.filter(day => day).length;

    });

    const totalPossible = habits.length * 31;

    const progress = totalPossible === 0
        ? 0
        : Math.round((totalCompleted / totalPossible) * 100);

    document.getElementById("todayProgress").textContent = progress + "%";

    const circle = document.getElementById("progressCircle");

    if (circle) {

        const circumference = 314;

        circle.style.strokeDashoffset =
            circumference - (progress / 100) * circumference;

    }

    document.getElementById("monthlyProgress").textContent = progress + "%";

    document.getElementById("currentStreak").textContent = totalCompleted;

    updateAchievements(totalCompleted);

}
renderTable();
document.getElementById("searchHabit").addEventListener("input", renderTable);

const notes = document.getElementById("notes");

notes.value = localStorage.getItem("notes") || "";

notes.addEventListener("input", function () {
    localStorage.setItem("notes", notes.value);
});

   // -----------------------------
// Splash & Onboarding
// -----------------------------

const splash = document.getElementById("splash");
const onboarding = document.getElementById("onboarding");
const splashImage = document.getElementById("splashImage");
const getStartedBtn = document.getElementById("getStartedBtn");
const container = document.querySelector(".container");

const splashCards = [
    "images/splash1.jpg",
    "images/splash2.jpg",
    "images/splash3.jpg",
    "images/splash4.jpg"
];

let currentCard = 0;

container.style.display = "none";

// Logo 3 sec
setTimeout(() => {

    splash.style.display = "none";

    const firstVisit = localStorage.getItem("firstVisit");

    if(firstVisit === "yes"){

        container.style.display = "flex";

    }else{

        onboarding.style.display = "flex";

        showCards();

    }

},3000);

function showCards() {

    splashImage.src = splashCards[currentCard];

    // शेवटच्या card वर Button दाखव
    if (currentCard === splashCards.length - 1) {

        getStartedBtn.style.display = "block";
        return;

    }

    currentCard++;

    setTimeout(showCards, 4000);

}
getStartedBtn.addEventListener("click",function(){

    localStorage.setItem("firstVisit","yes");

    onboarding.style.display = "none";

    container.style.display = "flex";

});

const quotes = [

"Stick to the plan, not your mood.",

"Small habits, big changes. Keep flowing every day.",

"Consistency is your super power. Don't break the chain!",

"Success isn't overnight. It's built one daily habit at a time.",

"Progress over perfection. Every single step counts!",

"You don't need to be extreme, just consistent.",

"Flow with your habits, build your future.",

"One small win today leads to big victories tomorrow.",

"Habits shape your destiny. Make today count!",

"Motivation gets you started. Habit keeps you going.",

"Your future is hidden in your daily routine.",

"Don't wait for inspiration. Build the routine.",

"Focus on the process, and the results will flow.",

"Every checkmark brings you closer to your goal.",

"Master your day, master your life.",

"Trust the flow. Good things take time and consistency."

];

const quoteText = document.getElementById("quoteText");

quoteText.textContent =
quotes[Math.floor(Math.random()*quotes.length)];
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {

    link.addEventListener("click", function(){

        const target = document.querySelector(this.getAttribute("href"));

        target.classList.remove("pop-section");

        void target.offsetWidth;

        target.classList.add("pop-section");

    });

});
function updateAchievements(totalCompleted){

    if(totalCompleted >= 1){

        document.getElementById("badge1").classList.add("unlocked");

    }

    if(totalCompleted >= 7){

        document.getElementById("badge2").classList.add("unlocked");

    }

    if(totalCompleted >= 15){

        document.getElementById("badge3").classList.add("unlocked");

    }

    if(totalCompleted >= 30){

        document.getElementById("badge4").classList.add("unlocked");

    }

}
const today = new Date();

const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
};

document.getElementById("currentDate").textContent =
    today.toLocaleDateString("en-IN", options);