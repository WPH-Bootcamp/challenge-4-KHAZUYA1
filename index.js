const prompt = require("prompt-sync")({ sigint: true });

let todos = [];

function generateUniqueId() {
  // TODO: Implementasi fungsi untuk menghasilkan ID unik
  // Ini akan digunakan secara internal untuk setiap objek to-do
  // Contoh: Gabungan waktu saat ini dan angka acak
  return Date.now().toString() + Math.random().toString(36).substring(2, 8);
}

function addTodo() {
  // TODO: Implementasi logika untuk menambah to-do baru
  // 1. Minta input teks to-do dari user menggunakan `prompt()`
   const text = prompt("Enter a new to-do: ");
  // 2. Validasi input: Pastikan teks tidak kosong atau hanya spasi
   if (!text || text.trim() === "") {
    // feedback kalau input tidak valid
    console.log("Invalid input. To-do cannot be empty.");
    return; // keluar dari fungsi, tidak menambahkan apa-apa
  }
  // 3. Buat objek to-do baru dengan properti: id (dari generateUniqueId), text, dan isCompleted (boolean, default false)
  const newTodo = {
    id: generateUniqueId(),
    text: text.trim(),
    isCompleted: false,
  };

  // 4. Tambahkan objek to-do ini ke array `todos`
  todos.push(newTodo);
  // 5. Beri feedback ke user bahwa to-do berhasil ditambahkan
 console.log("To-do added successfully.");
}

function markTodoCompleted() {
  // TODO: Implementasi logika untuk menandai to-do sebagai selesai
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
   listTodos();
  // 2. Minta user memasukkan NOMOR to-do yang ingin ditandai sebagai selesai
  const input = prompt("Enter the NUMBER of the to-do to mark as completed:");
  const index = parseInt(input, 10) - 1;
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid (1 sampai jumlah to-do)
  if (!input || isNaN(index) || index < 0 || index >= todos.length) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }
  // 6. Tangani kasus jika to-do sudah selesai
if (todos[index].isCompleted === true) {
    console.log("This to-do is already completed.");
    return;
  }
  // 4. Ubah properti `isCompleted` dari to-do yang dipilih menjadi `true`
  todos[index].isCompleted = true;
  // 5. Beri feedback ke user bahwa to-do berhasil ditandai selesai
  console.log(`To-do "${todos[index].text}" marked as completed.`);
}
  

function deleteTodo() {
  // TODO: Implementasi logika untuk menghapus to-do
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  listTodos();
  // 2. Minta user memasukkan NOMOR to-do yang ingin dihapus
  const input = prompt("Enter the NUMBER of the to-do to delete:");
  const index = parseInt(input, 10) - 1;
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid
  if (!input || isNaN(index) || index < 0 || index >= todos.length) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }
  // 4. Hapus to-do yang dipilih dari array `todos`
  const removed = todos.splice(index, 1);
  // 5. Beri feedback ke user bahwa to-do berhasil dihapus
  console.log(`To-do "${removed[0].text}" has been deleted.`);
}

function listTodos() {
  // TODO: Implementasi logika untuk menampilkan semua to-do
  // 1. Tampilkan judul daftar (misal: "--- YOUR TO-DO LIST ---")
  console.log("--- YOUR TO-DO LIST ---");
  // 2. Cek apakah array `todos` kosong. Jika ya, tampilkan pesan "No to-dos to display."
  if (todos.length === 0) {
    console.log("No to-dos to display.");
    console.log("-------------------------");
    return;
  }
  // 3. Jika tidak kosong, iterasi (loop) melalui array `todos`
  // 4. Untuk setiap to-do, tampilkan nomor urut, status ([DONE] atau [ACTIVE]), dan teks to-do
  todos.forEach((todo, index) => {
    const status = todo.isCompleted ? "[DONE]" : "[ACTIVE]";
    console.log(`${index + 1}. ${status} | ${todo.text}`);
  });
  //    Contoh format: "1. [ACTIVE] | Belajar JavaScript"
  // 5. Tampilkan garis penutup daftar
  console.log("-------------------------");
}

function runTodoApp() {
  // TODO: Implementasi logika utama aplikasi (menu interaktif)
  // Ini adalah "otak" aplikasi yang terus berjalan sampai user memilih untuk keluar
  let running = true;
  while (running) {
    
    // 1. Tampilkan menu perintah yang tersedia (add, complete, delete, list, exit)
    console.log("\n=== TO-DO APP MENU ===");
    console.log("add      - Tambah to-do");
    console.log("complete - Tandai to-do selesai");
    console.log("delete   - Hapus to-do");
    console.log("list     - Tampilkan semua to-do");
    console.log("exit     - Keluar aplikasi");
    // 2. Minta user memasukkan perintah menggunakan `prompt()`
     const command = prompt("Enter command: ");
    // 3. Gunakan `switch` statement atau `if/else if` untuk memanggil fungsi yang sesuai
    //    berdasarkan perintah yang dimasukkan user
    switch (command) {
      case "add":
        addTodo();
        break;

      case "complete":
        markTodoCompleted();
        break;

      case "delete":
        deleteTodo();
        break;

      case "list":
        listTodos();
        break;

      case "exit":
        running = false;
        console.log("Exiting the app...");
        break;

    // 4. Tangani perintah 'exit' untuk menghentikan loop aplikasi
    // 5. Tangani input perintah yang tidak valid
    default:
        console.log("Invalid command. Please try again.");
    }
  }
}

// Jangan ubah bagian di bawah ini. Ini adalah cara Node.js menjalankan fungsi utama
// dan mengekspor fungsi-fungsi untuk pengujian (jika nanti ada).

if (require.main === module) {
  runTodoApp();
}

module.exports = {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
};
