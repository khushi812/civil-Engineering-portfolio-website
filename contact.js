// Initialize EmailJS
(function() {
  emailjs.init("iNeMfJv3COBWOqMHD"); // Your public key
})();

const contactForm = document.getElementById("contactForm");
const statusMsg = document.getElementById("statusMsg");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // --- Form values ---
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  // --- Validation ---
  if (!name || /^[0-9 ]+$/.test(name)) {
    statusMsg.textContent = "❌ Enter a valid name.";
    statusMsg.style.color = "red";
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    statusMsg.textContent = "❌ Enter a valid email.";
    statusMsg.style.color = "red";
    return;
  }
  if (!/^[6-9]\d{9}$/.test(phone)) {
    statusMsg.textContent = "❌ Enter a valid 10-digit Indian phone number.";
    statusMsg.style.color = "red";
    return;
  }
  if (!message) {
    statusMsg.textContent = "❌ Message cannot be empty.";
    statusMsg.style.color = "red";
    return;
  }

  // --- Sending ---
  statusMsg.textContent = "Sending...";
  statusMsg.style.color = "black";
  contactForm.querySelector('button').disabled = true;

  try {
    // --- 1) Send to Owner ---
    await emailjs.send("service_w0jz272", "template_uzfnfdm", {
      name: name,      // matches {{name}}
      email: email,    // matches {{email}}
      phone: phone,    // matches {{phone}}
      message: message // matches {{message}}
    });

    // --- 2) Send confirmation to Visitor ---
    await emailjs.send("service_w0jz272", "template_50soqxa", {
      to_name: name,   // matches {{to_name}}
      to_email: email, // matches {{to_email}}
      message: message // matches {{message}}
    });

    statusMsg.textContent = "✅ Message sent successfully! Check your email.";
    statusMsg.style.color = "green";
    contactForm.reset();

  } catch (err) {
    console.error("EmailJS error:", err);
    statusMsg.textContent = "❌ Failed to send. Please try again.";
    statusMsg.style.color = "red";
  } finally {
    contactForm.querySelector('button').disabled = false;
    setTimeout(() => { statusMsg.textContent = ""; }, 5000);
  }
});
