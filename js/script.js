const todos = []; // Array untuk menyimpan daftar todo
const RENDER_EVENT = "render-todo"; // Event untuk merender ulang daftar todo

// Fungsi untuk membuat ID unik berdasarkan timestamp
function generateId() {
  return +new Date();
}

// Fungsi untuk membuat objek todo
function generateTodoObject(id, task, timestamp, isCompleted) {
  return {
    id,
    task,
    timestamp,
    isCompleted,
  };
}

// Fungsi untuk mencari todo berdasarkan ID
function findTodo(todoId) {
  for (todoItem of todos) {
    if (todoItem.id === todoId) {
      return todoItem;
    }
  }
  return null;
}

// Fungsi untuk mencari index todo berdasarkan ID
function findTodoIndex(todoId) {
  for (index in todos) {
    if (todos[index].id === todoId) {
      return index;
    }
  }
  return -1;
}

// Fungsi untuk membuat elemen todo di dalam DOM
function makeTodo(todoObject) {
  const { id, task, timestamp, isCompleted } = todoObject;

  const textTitle = document.createElement("h2"); // Membuat elemen judul todo
  textTitle.innerText = task;

  const textTimestamp = document.createElement("p"); // Membuat elemen tanggal
  textTimestamp.innerText = timestamp;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textTitle, textTimestamp);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);
  container.setAttribute("id", `todo-${id}`);

  container.style.background = "linear-gradient(135deg, #EBD3F8, #ffff)";
  container.style.color = "#2E073F";
  container.style.padding = "16px";
  container.style.borderRadius = "12px";

  if (isCompleted) {
    // Jika todo sudah selesai, tambahkan tombol undo dan hapus
    const undoButton = document.createElement("button");
    undoButton.classList.add("undo-button");
    undoButton.addEventListener("click", function () {
      undoTaskFromCompleted(id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");
    trashButton.addEventListener("click", function () {
      removeTaskFromCompleted(id);
    });

    container.append(undoButton, trashButton);
  } else {
    // Jika belum selesai, tambahkan tombol checklist
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");
    checkButton.addEventListener("click", function () {
      addTaskToCompleted(id);
    });

    container.append(checkButton);
  }

  return container;
}

const SAVED_EVENT = "saved-todo";
const STORAGE_KEY = "TODO_APPS";

// Fungsi untuk mengecek apakah local storage tersedia
function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

// Fungsi untuk menyimpan data ke local storage
function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT)); // Memicu event setelah data disimpan
  }
}

// TOAST BERHASIL
document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY)); // Menampilkan data yang tersimpan di console

  // Buat elemen toast
  const toast = document.createElement("div");
  toast.classList.add("toast-notification");
  toast.innerHTML = "✅ Tugas baru berhasil ditambahkan.";

  // Styling toast
  toast.style.position = "fixed";
  toast.style.bottom = "-50px";
  toast.style.right = "20px";
  toast.style.backgroundColor = "#28a745";
  toast.style.color = "#fff";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 4px 6px rgba(1, 0, 0, 0.1)";
  toast.style.fontSize = "14px";
  toast.style.fontWeight = "bold";
  toast.style.display = "flex";
  toast.style.alignItems = "center";
  toast.style.gap = "10px";
  toast.style.zIndex = "1000";
  toast.style.transition = "bottom 0.5s ease-in-out, opacity 0.5s ease-in-out";

  // Tambahkan ke body
  document.body.appendChild(toast);

  // Munculkan toast dengan animasi slide-up
  setTimeout(() => {
    toast.style.bottom = "20px";
  }, 100);

  // Hapus toast setelah beberapa detik
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 3000);
});

// TOAST DELETE
const DELETED_EVENT = "deleted-todo";

document.addEventListener(DELETED_EVENT, function () {
  // Buat elemen toast
  const toast = document.createElement("div");
  toast.classList.add("toast-notification");
  toast.innerHTML = "❌ Tugas berhasil dihapus.";

  // Styling toast
  toast.style.position = "fixed";
  toast.style.bottom = "-50px"; // Mulai dari luar layar
  toast.style.right = "20px";
  toast.style.backgroundColor = "#dc3545"; // Merah untuk error/hapus
  toast.style.color = "#fff";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 4px 6px rgba(206, 0, 0, 0.1)";
  toast.style.fontSize = "14px";
  toast.style.fontWeight = "bold";
  toast.style.display = "flex";
  toast.style.alignItems = "center";
  toast.style.gap = "10px";
  toast.style.zIndex = "1000";
  toast.style.transition = "bottom 0.5s ease-in-out, opacity 0.5s ease-in-out";

  // Tambahkan ke body
  document.body.appendChild(toast);

  // Munculkan toast dengan animasi slide-up
  setTimeout(() => {
    toast.style.bottom = "20px";
  }, 100);

  // Hapus toast setelah beberapa detik
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 3000);
});

// TOAST TUGAS DITAMBAHKAN
// Fungsi untuk menampilkan notifikasi tugas berhasil dilakukan
function showTaskCompletedNotification() {
  const toast = document.createElement("div");
  toast.classList.add("toast-notification");
  toast.innerHTML = "✅  Tugas berhasil diselesaikan!";

  // Styling toast
  toast.style.position = "fixed";
  toast.style.bottom = "-50px"; // Mulai dari luar layar
  toast.style.right = "20px";
  toast.style.backgroundColor = "#007bff"; // Warna biru
  toast.style.color = "#fff";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  toast.style.fontSize = "14px";
  toast.style.fontWeight = "bold";
  toast.style.display = "flex";
  toast.style.alignItems = "center";
  toast.style.gap = "10px";
  toast.style.zIndex = "1000";
  toast.style.transition = "bottom 0.5s ease-in-out, opacity 0.5s ease-in-out";

  // Tambahkan ke body
  document.body.appendChild(toast);

  // Munculkan toast dengan animasi slide-up
  setTimeout(() => {
    toast.style.bottom = "20px";
  }, 100);

  // Hapus toast setelah beberapa detik
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 3000);
}

// TOAST UNDO
function showUndoNotification() {
  const toast = document.createElement("div");
  toast.classList.add("toast-notification");
  toast.innerHTML = "⏪ Tugas dikembalikan, ayo selesaikan lagi nanti!";

  Object.assign(toast.style, {
    position: "fixed",
    bottom: "-50px",
    right: "20px",
    backgroundColor: "#ffc107",
    color: "#333",
    padding: "12px 20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontSize: "14px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    zIndex: "1000",
    transition: "bottom 0.5s ease-in-out, opacity 0.5s ease-in-out",
  });

  // Tambahkan ke body
  document.body.appendChild(toast);
  console.log("Toast undo berhasil ditambahkan ke DOM");

  // Munculkan toast dengan animasi slide-up
  setTimeout(() => {
    toast.style.bottom = "20px";
    console.log("Toast undo naik ke atas");
  }, 100);

  // Hapus toast setelah beberapa detik
  setTimeout(() => {
    toast.style.opacity = "0";
    console.log("Toast undo mulai menghilang");
    setTimeout(() => {
      toast.remove();
      console.log("Toast undo dihapus dari DOM");
    }, 500);
  }, 3000);
}

// Modifikasi fungsi addTaskToCompleted untuk menampilkan notifikasi
function addTaskToCompleted(todoId) {
  const todoTarget = findTodo(todoId);
  if (todoTarget == null) return;

  todoTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  showTaskCompletedNotification(); // Tampilkan notifikasi
}

// Fungsi untuk mengambil data dari local storage
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const todo of data) {
      todos.push(todo);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT)); // Memicu event render ulang
}

// Fungsi untuk menambahkan todo baru
function addTodo() {
  const textTodo = document.getElementById("title").value;
  const timestamp = document.getElementById("date").value;

  const generatedID = generateId();
  const todoObject = generateTodoObject(
    generatedID,
    textTodo,
    timestamp,
    false
  );
  todos.push(todoObject);

  document.dispatchEvent(new Event(RENDER_EVENT)); // Memicu event render ulang
  saveData(); // Simpan perubahan ke local storage
}

// Fungsi untuk memindahkan todo ke daftar selesai
function addTaskToCompleted(todoId) {
  const todoTarget = findTodo(todoId);
  if (todoTarget == null) return;

  todoTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  console.log("Tugas berhasil dipindahkan ke bagian 'Sudah Dilakukan'");

  showTaskCompletedNotification();
}

// Fungsi untuk menghapus todo dari daftar selesai
function removeTaskFromCompleted(todoId) {
  const todoTarget = findTodoIndex(todoId);
  if (todoTarget === -1) return;
  todos.splice(todoTarget, 1);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  document.dispatchEvent(new Event(DELETED_EVENT));
}

// Fungsi untuk mengembalikan todo ke daftar belum selesai
function undoTaskFromCompleted(todoId) {
  const todoTarget = findTodo(todoId);
  if (todoTarget == null) return;

  todoTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  console.log("Tugas dikembalikan ke daftar tugas yang belum selesai");

  showUndoNotification();
}

// Event listener untuk menunggu halaman selesai dimuat
document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah form melakukan reload halaman
    addTodo();
  });

  if (isStorageExist()) {
    loadDataFromStorage(); // Memuat data dari local storage jika ada
  }
});

// Event listener untuk merender ulang daftar todo
document.addEventListener(RENDER_EVENT, function () {
  const uncompletedTODOList = document.getElementById("todos");
  const listCompleted = document.getElementById("completed-todos");

  // Mengosongkan list sebelum merender ulang
  uncompletedTODOList.innerHTML = "";
  listCompleted.innerHTML = "";

  // Menambahkan setiap todo ke dalam daftar sesuai statusnya
  for (todoItem of todos) {
    const todoElement = makeTodo(todoItem);
    if (todoItem.isCompleted) {
      listCompleted.append(todoElement);
    } else {
      uncompletedTODOList.append(todoElement);
    }
  }
});
