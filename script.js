let habits = JSON.parse(localStorage.getItem("habits")) || [];

function addHabit() {
  const habitInput = document.getElementById("habit-input");
  const habitName = habitInput.value.trim();
  const importanceSelect = document.getElementById("importance-select");
  const importance = importanceSelect.value;

  if (habitName) {
    habits.push({ name: habitName, importance: importance, completed: [] });
    habitInput.value = "";
    saveToLocalStorage();
    renderHabits();
  }
}

function toggleHabit(index, day) {
  const habit = habits[index];

  if (!habit.completed.includes(day)) {
    habit.completed.push(day);
  } else {
    habit.completed = habit.completed.filter((d) => d !== day);
  }

  saveToLocalStorage();
  renderHabits();
}

function deleteHabit(index) {
  habits.splice(index, 1);
  saveToLocalStorage();
  renderHabits();
}

function renderHabits() {
  const habitList = document.getElementById("habit-list");
  habitList.innerHTML = "";

  habits.forEach((habit, index) => {
    const today = getToday();
    const isCompleted = habit.completed.includes(today);

    const habitItem = document.createElement("div");
    habitItem.classList.add(
      "habit-item",
      "flex",
      "flex-col",
      "sm:flex-row",
      "gap-3",
      "sm:items-center",
      "sm:justify-between",
      "p-4",
      "bg-green-50",
      "rounded-lg",
      "shadow"
    );

    const habitTextContainer = document.createElement("div");
    habitTextContainer.classList.add("flex-1");

    const habitText = document.createElement("span");
    habitText.classList.add("text-base", "sm:text-lg", "habit-text");
    if (isCompleted) {
      habitText.classList.add("line-through");
    }
    habitText.textContent = `${habit.name} - Importance: ${habit.importance}`;

    habitTextContainer.appendChild(habitText);

    const actionContainer = document.createElement("div");
    actionContainer.classList.add(
      "flex",
      "items-center",
      "gap-4",
      "justify-end"
    );

    const habitChecklist = document.createElement("input");
    habitChecklist.type = "checkbox";
    habitChecklist.checked = isCompleted;
    habitChecklist.classList.add("w-5", "h-5");
    habitChecklist.onclick = () => toggleHabit(index, today);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteHabit(index);
    deleteButton.classList.add(
      "bg-red-500",
      "text-white",
      "px-3",
      "sm:px-4",
      "py-1.5",
      "sm:py-2",
      "text-sm",
      "sm:text-base",
      "rounded-lg",
      "hover:bg-red-600"
    );

    actionContainer.appendChild(habitChecklist);
    actionContainer.appendChild(deleteButton);

    habitItem.appendChild(habitTextContainer);
    habitItem.appendChild(actionContainer);
    habitList.appendChild(habitItem);
  });
}

function getToday() {
  const date = new Date();
  return date.toISOString().split("T")[0];
}

function saveToLocalStorage() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

// Add enter key support for habit input
document
  .getElementById("habit-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addHabit();
    }
  });

renderHabits();
