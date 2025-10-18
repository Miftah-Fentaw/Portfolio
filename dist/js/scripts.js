/*!
* Start Bootstrap - Miftah-portfolio v1.0.1 (undefined)
* Copyright 2013-2025 Miftah Fentaw
* Licensed under undefined (https://github.com/StartBootstrap/Miftah-portfolio/blob/master/LICENSE)
*/

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
            });
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, .lead');
    textElements.forEach(element => {
        observer.observe(element);
    });

    const containers = document.querySelectorAll('.card, .skill-container, .experience-card, .project-card, .developer-stats .stat-item');
    containers.forEach(container => {
        observer.observe(container);
    });

    const previewModal = document.getElementById("previewModal");
    if (previewModal) {
        previewModal.addEventListener("show.bs.modal", (event) => {
            const button = event.relatedTarget;
            const project = button.getAttribute("data-project");
            const carouselInner = previewModal.querySelector(".carousel-inner");
            carouselInner.innerHTML = "";

            const projectImages = {
                gebeya: ["gebeya1.png", "gebeya2.png", "gebeya3.png","gebeya4.png"],
                huda: ["huda1.png", "huda2.png", "huda3.png","huda4.png"],
                autosort: ["Autosort1.png", "Autosort2.png", "Autosort3.png"],
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
                        <img src="assets/screenshots/${image}" class="img-fluid preview-image" alt="Project screenshot" style="max-height: 400px; object-fit: contain; margin: 0 auto;">
                    `;
                    carouselInner.appendChild(carouselItem);
                });
            } else {
                carouselInner.innerHTML = '<div class="carousel-item active"><div class="p-5"><p>No images available for this project.</p></div></div>';
            }
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const projectType = document.getElementById('projectType').value;
            const message = document.getElementById('message').value.trim();

            const submitButton = document.getElementById('submitButton');
            const submitSuccessMessage = document.getElementById('submitSuccessMessage');
            const submitErrorMessage = document.getElementById('submitErrorMessage');

            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const projectTypeSelect = document.getElementById('projectType');
            const messageTextarea = document.getElementById('message');

            nameInput.classList.remove('is-invalid');
            emailInput.classList.remove('is-invalid');
            projectTypeSelect.classList.remove('is-invalid');
            messageTextarea.classList.remove('is-invalid');

            if (!name) {
                nameInput.classList.add('is-invalid');
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            }

            if (!projectType) {
                projectTypeSelect.classList.add('is-invalid');
                isValid = false;
            }

            if (!message) {
                messageTextarea.classList.add('is-invalid');
                isValid = false;
            }

            if (!isValid) {
                return;
            }

            submitButton.disabled = true;
            submitSuccessMessage.classList.add('d-none');
            submitErrorMessage.classList.add('d-none');

            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, projectType, message }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Message sent successfully') {
                    submitSuccessMessage.classList.remove('d-none');
                    contactForm.reset();
                } else {
                    submitErrorMessage.classList.remove('d-none');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                submitErrorMessage.classList.remove('d-none');
            })
            .finally(() => {
                submitButton.disabled = false;
            });
        });
    }
});
