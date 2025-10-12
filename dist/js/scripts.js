/*!
* Start Bootstrap - Miftah-portfolio v1.0.1 (undefined)
* Copyright 2013-2025 Miftah Fentaw
* Licensed under undefined (https://github.com/StartBootstrap/Miftah-portfolio/blob/master/LICENSE)
*/
document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
            });
        });
    });

    const previewModal = document.getElementById("previewModal");
    if (previewModal) {
        previewModal.addEventListener("show.bs.modal", (event) => {
            const button = event.relatedTarget;
            const project = button.getAttribute("data-project");
            const carouselInner = previewModal.querySelector(".carousel-inner");
            carouselInner.innerHTML = ""; // Clear previous items

            const projectImages = {
                gebeya: ["gebeya1.png", "gebeya2.png", "gebeya3.png"],
                ConnectSocial: ["connectsocial1.png", "connectsocial2.png", "connectsocial3.png"],
                Autosort: ["Autosort1.png", "Aurosort2.png", "Autosort3.png"],
                taskify: ["taskify1.png", "taskify2.png", "taskify3.png"],
            };

            const images = projectImages[project];
            if (images) {
                images.forEach((image, index) => {
                    const carouselItem = document.createElement("div");
                    carouselItem.classList.add("carousel-item");
                    if (index === 0) {
                        carouselItem.classList.add("active");
                    }
                    carouselItem.innerHTML = `
                        <img src="assets/screenshots/${image}" class="d-block w-100" alt="Project screenshot">
                    `;
                    carouselInner.appendChild(carouselItem);
                });
            } else {
                carouselInner.innerHTML = '<div class="carousel-item active"><div class="p-5"><p>No images available for this project.</p></div></div>';
            }
        });
    }
});