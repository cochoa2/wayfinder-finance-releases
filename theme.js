// Light or dark: follows the system until the reader picks one, then remembers the pick in this browser only.
(function () {
  var root = document.documentElement;
  var KEY = "wf-site-theme";
  function stored() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }
  function current() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  var saved = stored();
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);

  function label(button) {
    var next = current() === "dark" ? "light" : "dark";
    button.textContent = next === "dark" ? "Dark theme" : "Light theme";
    button.setAttribute("aria-label", "Switch to the " + next + " theme");
  }
  document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("theme");
    if (!button) return;
    button.hidden = false;
    label(button);
    button.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem(KEY, next);
      } catch (e) {}
      label(button);
    });
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
        label(button);
      });
    }
  });
})();
