function showToast(message, type) {
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    document.body.appendChild(t);
  }
  t.textContent = message;
  t.className = type === "error" ? "error" : "";
  setTimeout(() => t.classList.add("show"), 10);
  setTimeout(() => t.classList.remove("show"), 3000);
}