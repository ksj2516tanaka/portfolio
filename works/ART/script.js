const year = 2026;
const monthNames = [
  "1月", "2月", "3月", "4月", "5月", "6月",
  "7月", "8月", "9月", "10月", "11月", "12月"
];
const weekdayNames = ["日", "月", "火", "水", "木", "金", "土"];

let currentMonth = 0;

const currentLabel = document.getElementById("calendarCurrentLabel");
const weekdaysEl = document.getElementById("calendarWeekdays");
const daysEl = document.getElementById("calendarDays");
const prevBtn = document.getElementById("prevMonthBtn");
const nextBtn = document.getElementById("nextMonthBtn");
const board = document.getElementById("calendarBoard");

function renderWeekdays() {
  weekdaysEl.innerHTML = "";
  weekdayNames.forEach((day) => {
    const el = document.createElement("div");
    el.textContent = day;
    weekdaysEl.appendChild(el);
  });
}

function getDaysInMonth(targetYear, targetMonth) {
  return new Date(targetYear, targetMonth + 1, 0).getDate();
}

function renderCalendar(month) {
  currentLabel.textContent = `${year}年${monthNames[month]}`;
  daysEl.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = getDaysInMonth(year, month);

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "empty";
    daysEl.appendChild(empty);
  }

  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, month, day);
    const weekday = date.getDay();

    const cell = document.createElement("div");
    cell.textContent = day;

    if (weekday === 1) {
      cell.classList.add("closed");
    } else {
      cell.classList.add("open");
    }

    daysEl.appendChild(cell);
  }
}

function goPrevMonth() {
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  renderCalendar(currentMonth);
}

function goNextMonth() {
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  renderCalendar(currentMonth);
}

prevBtn.addEventListener("click", goPrevMonth);
nextBtn.addEventListener("click", goNextMonth);

board.addEventListener("click", () => {
  goPrevMonth();
});

board.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  goNextMonth();
});

renderWeekdays();
renderCalendar(currentMonth);