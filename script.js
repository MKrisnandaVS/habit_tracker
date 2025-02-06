let habits = JSON.parse(localStorage.getItem("habits")) || [];
let currentFilter = "all";

function addHabit() {
  const habitInput = document.getElementById("habit-input");
  const importanceSelect = document.getElementById("importance-select");
  const dateInput = document.getElementById("habit-date");
  
  const habitText = habitInput.value.trim();
  const importance = importanceSelect.value;
  const habitDate = dateInput.value;

  if (habitText && habitDate) {
    const habit = {
      id: Date.now(),
      text: habitText,
      importance: importance,
      date: habitDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    habits.unshift(habit);
    saveAndRender();
    habitInput.value = "";
    dateInput.value = "";
  }
}

function toggleHabit(id) {
  habits = habits.map((habit) =>
    habit.id === id ? { ...habit, completed: !habit.completed } : habit
  );
  saveAndRender();
}

function deleteHabit(id) {
  habits = habits.filter((habit) => habit.id !== id);
  saveAndRender();
}

function filterHabits(filter) {
  currentFilter = filter;
  renderHabits();
}

function getImportanceColor(importance) {
  switch (importance) {
    case "High":
      return "text-red-500";
    case "Medium":
      return "text-yellow-500";
    case "Low":
      return "text-blue-500";
    default:
      return "text-gray-500";
  }
}

function renderHabits() {
  const habitList = document.getElementById("habit-list");
  let filteredHabits = habits;

  if (currentFilter === "active") {
    filteredHabits = habits.filter((habit) => !habit.completed);
  } else if (currentFilter === "completed") {
    filteredHabits = habits.filter((habit) => habit.completed);
  }

  habitList.innerHTML = filteredHabits
    .map(
      (habit) => `
        <div class="habit-item flex items-center justify-between p-4 bg-gray-50 rounded-lg ${habit.completed ? "completed" : ""}">
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <input type="checkbox" 
              ${habit.completed ? "checked" : ""} 
              onclick="toggleHabit(${habit.id})"
              class="w-5 h-5 rounded-full cursor-pointer">
            <div>
              <span class="habit-text font-semibold">${habit.text}</span>
              <p class="text-sm text-gray-500">Due: ${habit.date}</p>
            </div>
            <span class="text-sm ${getImportanceColor(habit.importance)}">${habit.importance}</span>
          </div>
          <button onclick="deleteHabit(${habit.id})" 
            class="text-red-500 hover:text-red-700 transition">
            ✕
          </button>
        </div>
      `
    )
    .join("");
}

function saveAndRender() {
  localStorage.setItem("habits", JSON.stringify(habits));
  renderHabits();
}

// Initial render
renderHabits();

// Enter key support
document.getElementById("habit-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addHabit();
  }
});
