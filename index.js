import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuAxRBvLBcwuRVrou1SrjQsHivOJvgl2I",
  authDomain: "my-daily-journal-fac49.firebaseapp.com",
  databaseURL: "https://my-daily-journal-fac49-default-rtdb.firebaseio.com",
  projectId: "my-daily-journal-fac49",
  storageBucket: "my-daily-journal-fac49.firebasestorage.app",
  messagingSenderId: "69916344226",
  appId: "1:69916344226:web:3f80cb56018c53e9043cfb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const entriesRef = ref(database, "entries");

// Elements
const form = document.getElementById("journal-form");
const entryInput = document.getElementById("entry");
const entriesList = document.getElementById("entries-list");
const toggleThemeBtn = document.getElementById("toggle-theme");

// Theme toggle
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.className);
});

// Load theme from storage
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.add(savedTheme);
});

// Add entry
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = entryInput.value.trim();
  if (text) {
    push(entriesRef, { text, timestamp: Date.now() });
    entryInput.value = "";
  }
});

// Display entries
onValue(entriesRef, (snapshot) => {
  entriesList.innerHTML = "";
  const data = snapshot.val();
  for (let id in data) {
    const li = document.createElement("li");
    li.textContent = data[id].text;
    li.addEventListener("click", () => remove(ref(database, "entries/" + id)));
    entriesList.appendChild(li);
  }
});
