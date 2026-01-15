const button = document.getElementById("alertBtn");
const message = document.getElementById("message");
const countText = document.getElementById("count");

let count = 0;

button.addEventListener("click", () => {
  count++;
  countText.textContent = count;

  if (count === 5) {
    message.textContent = "5번 눌렀습니다!";
    button.classList.add("active");
  }

  if (count === 6) {
    message.textContent = "다시 원래대로!";
    button.classList.remove("active");
    count = 0;
    countText.textContent = count;
  }
});
const nameInput = document.getElementById("nameInput");
const nameBtn = document.getElementById("nameBtn");
const nameResult = document.getElementById("nameResult");

nameBtn.addEventListener("click", () => {
  const value = nameInput.value.trim();

  if (value === "") {
    nameResult.textContent = "이름을 입력하세요!";
    return;
  }

  nameResult.textContent = `안녕하세요, ${value}님!`;
});
nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    nameBtn.click();
  }
});
// TODO 기능
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");
const clearTodoBtn = document.getElementById("clearTodoBtn");

clearTodoBtn.addEventListener("click", () => {
  todoList.innerHTML = "";
});

addTodoBtn.addEventListener("click", () => {
  const text = todoInput.value.trim();
  if (text === "") return;

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;
  span.addEventListener("click", () => {
    span.classList.toggle("done");
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "삭제";
  deleteBtn.style.marginLeft = "10px";

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  todoInput.value = "";
  todoInput.focus();
});
