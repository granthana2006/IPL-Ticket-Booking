
// Reusable Toast Notification Function

function showToast(message) {

    // Create a toast element
    let toast = document.createElement("div");

    // Add message
    toast.innerText = message;

    // Add styling
    toast.style.position = "fixed";
    toast.style.bottom = "25px";
    toast.style.right = "25px";
    toast.style.background = "#092b70";
    toast.style.color = "white";
    toast.style.padding = "15px 25px";
    toast.style.borderRadius = "8px";
    toast.style.fontSize = "15px";
    toast.style.zIndex = "9999";

    // Add toast to webpage
    document.body.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(function() {
        toast.remove();
    }, 3000);
}

// Smooth Scrolling for Book Buttons

document.addEventListener("DOMContentLoaded", function() {

    // Select all Book buttons
    let bookButtons = document.querySelectorAll(".book-small");

    bookButtons.forEach(function(button) {

        button.addEventListener("click", function(event) {

            // Find the booking section
            let bookingSection = document.querySelector("#booking");

            if (bookingSection) {

                // Smoothly scroll to booking section
                bookingSection.scrollIntoView({
                    behavior: "smooth"
                });

                // Display confirmation toast
                showToast("Redirecting to booking form!");

            }

        });

    });

});

// ACTIVITY 7 - LIVE BOOKING SUMMARY

document.addEventListener("DOMContentLoaded", function() {

    // Select booking form controls
    const matchSelect = document.getElementById("matchSelect");
    const standSelect = document.getElementById("stand");
    const ticketQuantity = document.getElementById("quantity");

    // Function to show notification
    function notifySummaryUpdate() {
        showToast("Booking Summary Updated!");
    }

    // Match selection event
    matchSelect.addEventListener("change", function() {
        notifySummaryUpdate();
    });

    // Stand selection event
    standSelect.addEventListener("change", function() {
        notifySummaryUpdate();
    });

    // Ticket quantity event
    ticketQuantity.addEventListener("change", function() {
        notifySummaryUpdate();
    });

});

// ACTIVITY 8 - HAMBURGER MENU

document.addEventListener("DOMContentLoaded", function() {

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", function() {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.innerHTML = isOpen ? "✕" : "☰";

    });

    // Close menu after clicking a navigation link
    navLinks.querySelectorAll("a").forEach(function(link) {

        link.addEventListener("click", function() {
            navLinks.classList.remove("active");
            menuToggle.innerHTML = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        });

    });

});
