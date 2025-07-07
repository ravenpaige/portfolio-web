document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname.split("/").pop();

  document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
    const linkPath = link.getAttribute("href");

    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });
});// JavaScript Document