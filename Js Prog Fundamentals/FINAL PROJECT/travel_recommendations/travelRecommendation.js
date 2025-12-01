function showPage(pageId) {
    const pages = document.querySelectorAll(".pageSection");
    pages.forEach((page) => {
        page.classList.remove("active");
    });
    const pageActive = document.getElementById(pageId);
    pageActive.classList.add("active");
}