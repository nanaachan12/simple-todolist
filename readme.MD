# Resume Kode Aplikasi To-Do List

Website ini adalah project **To-Do List** sederhana yang memungkinkan pengguna untuk menambahkan, menyimpan, menandai sebagai selesai, menghapus, dan mengembalikan tugas yang telah selesai. Project ini juga menggunakan **local storage** untuk menyimpan data sehingga tidak hilang ketika halaman dimuat ulang.

---

## 1. Deklarasi Variabel Global
```js
const todos = [];
const RENDER_EVENT = "render-todo";
```
Variabel `todos` digunakan untuk menyimpan daftar tugas.
Variabel `RENDER_EVENT` adalah event custom yang akan digunakan untuk memperbarui tampilan daftar tugas di halaman.

---

## 2. Fungsi untuk Membuat ID Unik
```js
function generateId() {
  return +new Date();
}
```
Fungsi ini menghasilkan **ID unik** berbasis timestamp menggunakan `new Date()`.

---

## 3. Fungsi untuk Membuat Objek Tugas
```js
function generateTodoObject(id, task, timestamp, isCompleted) {
  return {
    id,
    task,
    timestamp,
    isCompleted,
  };
}
```
Fungsi ini membuat **objek tugas** dengan properti:
- `id`: ID unik tugas
- `task`: Nama tugas
- `timestamp`: Tanggal tugas
- `isCompleted`: Status tugas (selesai atau belum)

---

## 4. Fungsi untuk Mencari Tugas Berdasarkan ID
```js
function findTodo(todoId) {
  for (todoItem of todos) {
    if (todoItem.id === todoId) {
      return todoItem;
    }
  }
  return null;
}
```
Fungsi ini mencari tugas dalam array `todos` berdasarkan `id`. Jika ditemukan, akan mengembalikan objek tugas tersebut. Jika tidak, mengembalikan `null`.

---

## 5. Fungsi untuk Mencari Index Tugas Berdasarkan ID
```js
function findTodoIndex(todoId) {
  for (index in todos) {
    if (todos[index].id === todoId) {
      return index;
    }
  }
  return -1;
}
```
Fungsi ini mengembalikan **index tugas** dalam array `todos` berdasarkan ID. Jika tidak ditemukan, akan mengembalikan `-1`.

---

## 6. Fungsi untuk Membuat Elemen DOM Tugas
```js
function makeTodo(todoObject) {
  const { id, task, timestamp, isCompleted } = todoObject;
```
Fungsi ini membuat elemen HTML untuk menampilkan tugas di halaman.

- **Membuat elemen teks tugas**
```js
  const textTitle = document.createElement("h2");
  textTitle.innerText = task;
```
- **Membuat elemen tanggal tugas**
```js
  const textTimestamp = document.createElement("p");
  textTimestamp.innerText = timestamp;
```
- **Membuat container untuk teks**
```js
  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textTitle, textTimestamp);
```
- **Membuat container utama tugas**
```js
  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);
  container.setAttribute("id", `todo-${id}`);
```
- **Menambahkan tombol berdasarkan status tugas**
```js
  if (isCompleted) {
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
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");
    checkButton.addEventListener("click", function () {
      addTaskToCompleted(id);
    });

    container.append(checkButton);
  }
```
Fungsi ini mengembalikan elemen **tugas yang sudah dibuat** dalam bentuk HTML.

---

## 7. Fungsi untuk Menyimpan Data ke Local Storage
```js
function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}
```
Menyimpan data `todos` ke **local storage** dengan key `TODO_APPS`.

---

## 8. Fungsi untuk Memuat Data dari Local Storage
```js
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);
```
Memuat data dari local storage dan menambahkannya ke dalam array `todos`.

---

## 9. Fungsi untuk Menambahkan Tugas Baru
```js
function addTodo() {
  const textTodo = document.getElementById("title").value;
  const timestamp = document.getElementById("date").value;
```
Membaca input tugas dari form, membuat objek tugas, menambahkannya ke `todos`, lalu menyimpan ke local storage.

---

## 10. Fungsi untuk Menandai Tugas Selesai
```js
function addTaskToCompleted(todoId) {
  const todoTarget = findTodo(todoId);
  if (todoTarget == null) return;

  todoTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}
```
Mengubah status tugas menjadi `true` (selesai) dan menyimpannya.

---

## 11. Fungsi untuk Menghapus Tugas
```js
function removeTaskFromCompleted(todoId) {
  const todoTarget = findTodoIndex(todoId);
  if (todoTarget === -1) return;
  todos.splice(todoTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}
```
Menghapus tugas dari array `todos` dan memperbarui local storage.

---

## 12. Fungsi untuk Mengembalikan Tugas ke Belum Selesai
```js
function undoTaskFromCompleted(todoId) {
  const todoTarget = findTodo(todoId);
  if (todoTarget == null) return;
  todoTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}
```
Mengubah status tugas kembali menjadi `false` (belum selesai).

---

Kode ini memungkinkan pengguna untuk mengelola daftar tugas dengan tampilan yang interaktif serta menyimpan data menggunakan local storage agar tetap tersimpan setelah halaman dimuat ulang.

