function scrollToBooking() {
  document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
}

// Grab elements
const form = document.getElementById("bookingForm");
const message = document.getElementById("message");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const serviceSelect = document.getElementById("service");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");

form.addEventListener("submit", function(e){
  e.preventDefault(); // Prevent page refresh

  const booking = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    service: serviceSelect.value,
    date: dateInput.value,
    time: timeInput.value,
    status: "Pending"
  };

  // Validation
  if(!booking.name || !booking.email || !booking.service || !booking.date || !booking.time){
    message.style.color = "red";
    message.textContent = "⚠️ Please fill all fields!";
    return;
  }

  // Save to localStorage
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  message.style.color = "green";
  message.textContent = "✅ Booking submitted successfully!";

  form.reset();
});
