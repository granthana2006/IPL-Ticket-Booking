
/* ====================================
   IPL TICKET BOOKING WEBSITE
   JAVASCRIPT
==================================== */

// 1. MATCH DATA

const matches = [
    {
        id: 1,
        team1: "RCB",
        team2: "CSK",
        date: "10 Nov 2026, 7:30 PM",
        venue: "Bengaluru",
        general: 800,
        premium: 1800,
        vip: 3500
    },
    {
        id: 2,
        team1: "MI",
        team2: "KKR",
        date: "12 Nov 2026, 7:30 PM",
        venue: "Mumbai",
        general: 700,
        premium: 1600,
        vip: 3200
    },
    {
        id: 3,
        team1: "SRH",
        team2: "DC",
        date: "14 Nov 2026, 3:30 PM",
        venue: "Hyderabad",
        general: 600,
        premium: 1400,
        vip: 3000
    },
    {
        id: 4,
        team1: "RR",
        team2: "PBKS",
        date: "16 Nov 2026, 7:30 PM",
        venue: "Jaipur",
        general: 750,
        premium: 1700,
        vip: 3300
    },
    {
        id: 5,
        team1: "GT",
        team2: "LSG",
        date: "18 Nov 2026, 7:30 PM",
        venue: "Ahmedabad",
        general: 650,
        premium: 1500,
        vip: 3100
    },
    {
        id: 6,
        team1: "CSK",
        team2: "MI",
        date: "20 Nov 2026, 7:30 PM",
        venue: "Chennai",
        general: 850,
        premium: 1900,
        vip: 3600
    }
];


// 2. HTML ELEMENTS

const matchTable = document.getElementById("matchTable");
const matchSelect = document.getElementById("matchSelect");
const teamFilter = document.getElementById("teamFilter");
const stand = document.getElementById("stand");
const quantity = document.getElementById("quantity");
const bookingForm = document.getElementById("bookingForm");
const bookingRecords = document.getElementById("bookingRecords");


// 3. LOAD BOOKINGS FROM LOCAL STORAGE

let savedBookings = [];

try {
    const stored = JSON.parse(
        localStorage.getItem("iplBookings") || "[]"
    );

    if (Array.isArray(stored)) {
        savedBookings = stored;
    }
} catch (error) {
    console.error("Unable to load bookings:", error);
}


// 4. CURRENCY FORMAT

function formatCurrency(amount) {
    return "₹" + amount.toLocaleString("en-IN");
}


// 5. DISPLAY MATCHES

function displayMatches(filter = "all") {

    matchTable.innerHTML = "";

    const filteredMatches = matches.filter(match => {

        return filter === "all" ||
            match.team1 === filter ||
            match.team2 === filter;

    });

    if (filteredMatches.length === 0) {

        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 8;
        cell.textContent = "No matches found.";

        row.appendChild(cell);
        matchTable.appendChild(row);

        return;
    }

    filteredMatches.forEach(match => {

        const row = document.createElement("tr");

        const values = [
            "#" + match.id,
            match.team1 + " vs " + match.team2,
            match.date,
            match.venue,
            formatCurrency(match.general),
            formatCurrency(match.premium),
            formatCurrency(match.vip)
        ];

        values.forEach(value => {

            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);

        });

        const actionCell = document.createElement("td");
        const button = document.createElement("button");

        button.textContent = "Book";
        button.className = "book-small";

        button.addEventListener("click", () => {
            selectMatch(match.id);
        });

        actionCell.appendChild(button);
        row.appendChild(actionCell);

        matchTable.appendChild(row);

    });

}


// 6. POPULATE MATCH DROPDOWN

function populateMatchDropdown() {

    matches.forEach(match => {

        const option = document.createElement("option");

        option.value = match.id;

        option.textContent =
            `${match.team1} vs ${match.team2} - ${match.date}`;

        matchSelect.appendChild(option);

    });

}


// 7. FILTER MATCHES

teamFilter.addEventListener("change", function() {
    displayMatches(this.value);
});


// 8. SELECT MATCH

function selectMatch(id) {

    matchSelect.value = id;

    updateSummary();

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });

}


// 9. GET SELECTED MATCH

function getSelectedMatch() {

    return matches.find(match =>
        match.id === Number(matchSelect.value)
    );

}


// 10. GET TICKET PRICE

function getTicketPrice(match, category) {

    if (!match) return 0;

    return match[category.toLowerCase()];

}


// 11. UPDATE SUMMARY

function updateSummary() {

    const match = getSelectedMatch();
    const category = stand.value;
    const count = Number(quantity.value) || 0;

    const price = getTicketPrice(match, category);
    const total = price * count;

    document.getElementById("summaryMatch").textContent =
        match ? `${match.team1} vs ${match.team2}` : "Not Selected";

    document.getElementById("summaryStand").textContent =
        category;

    document.getElementById("summaryPrice").textContent =
        formatCurrency(price);

    document.getElementById("summaryQuantity").textContent =
        count;

    document.getElementById("summaryTotal").textContent =
        formatCurrency(total);

}


// 12. LISTEN FOR CHANGES

matchSelect.addEventListener("change", updateSummary);
stand.addEventListener("change", updateSummary);
quantity.addEventListener("input", updateSummary);


// 13. DISPLAY BOOKING RECORDS

function displaySavedBookings() {

    bookingRecords.innerHTML = "";

    if (savedBookings.length === 0) {

        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 6;
        cell.className = "empty-message";
        cell.textContent = "No bookings available yet.";

        row.appendChild(cell);
        bookingRecords.appendChild(row);

        return;
    }

    savedBookings.forEach(booking => {

        const row = document.createElement("tr");

        const values = [
            booking.id,
            booking.name,
            booking.match,
            booking.stand,
            booking.quantity,
            formatCurrency(booking.total)
        ];

        values.forEach(value => {

            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);

        });

        bookingRecords.appendChild(row);

    });

}


// 14. GENERATE DIGITAL TICKET

function generateDigitalTicket(booking) {

    const ticketSection = document.getElementById("digital-ticket");

    ticketSection.hidden = false;

    document.getElementById("ticketBookingId").textContent =
        booking.id;

    document.getElementById("ticketName").textContent =
        booking.name;

    document.getElementById("ticketTeams").textContent =
        booking.match;

    document.getElementById("ticketDate").textContent =
        booking.date;

    document.getElementById("ticketVenue").textContent =
        booking.venue;

    document.getElementById("ticketStand").textContent =
        booking.stand;

    document.getElementById("ticketQuantity").textContent =
        booking.quantity;

    document.getElementById("ticketTotal").textContent =
        formatCurrency(booking.total);


    // GENERATE QR CODE

    const qrContainer = document.getElementById("qrCode");

    qrContainer.innerHTML = "";

    const qrData = JSON.stringify({
        bookingId: booking.id,
        match: booking.match,
        name: booking.name,
        venue: booking.venue,
        stand: booking.stand,
        quantity: booking.quantity
    });

    if (typeof QRCode !== "undefined") {

        new QRCode(qrContainer, {
            text: qrData,
            width: 120,
            height: 120,
            colorDark: "#061b48",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

    } else {

        qrContainer.textContent = "QR library unavailable";

    }

    ticketSection.scrollIntoView({
        behavior: "smooth"
    });

}


// 15. HANDLE FORM SUBMISSION

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        return;
    }

    const match = getSelectedMatch();

    if (!match) {
        alert("Please select a match.");
        return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    const category = stand.value;
    const count = Number(quantity.value);

    if (!name || !email || !phone || count < 1 || count > 10) {
        alert("Please enter valid booking details.");
        return;
    }

    const price = getTicketPrice(match, category);
    const total = price * count;

    const bookingId =
        "IPL" + Date.now().toString().slice(-8);


    // CREATE BOOKING OBJECT

    const booking = {

        id: bookingId,
        name: name,
        email: email,
        phone: phone,

        match: match.team1 + " vs " + match.team2,

        date: match.date,
        venue: match.venue,

        stand: category,
        quantity: count,
        price: price,
        total: total

    };


    // SAVE BOOKING

    savedBookings.push(booking);

    try {

        localStorage.setItem(
            "iplBookings",
            JSON.stringify(savedBookings)
        );

    } catch (error) {

        savedBookings.pop();

        alert("Unable to save booking. Please try again.");

        console.error(error);

        return;
    }


    // UPDATE BOOKING TABLE

    displaySavedBookings();


    // GENERATE DIGITAL TICKET

    generateDigitalTicket(booking);


    // CONFIRMATION MESSAGE

    alert(
        "Booking Successful!\n\n" +
        "Booking ID: " + bookingId +
        "\nMatch: " + booking.match +
        "\nTotal: " + formatCurrency(total) +
        "\n\nYour demo digital ticket is ready!"
    );


    // RESET FORM

    bookingForm.reset();

    updateSummary();

});


// 16. PRINT OR SAVE TICKET

document.getElementById("printTicket").addEventListener("click", function() {

    window.print();

});


// 17. BOOK ANOTHER TICKET

document.getElementById("newBooking").addEventListener("click", function() {

    document.getElementById("digital-ticket").hidden = true;

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });

});


// 18. INITIALIZE WEBSITE

function initializeWebsite() {

    populateMatchDropdown();

    displayMatches();

    displaySavedBookings();

    updateSummary();

}

initializeWebsite();
