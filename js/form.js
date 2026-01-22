const form = () => {
  const contactForm = document.querySelector(".contactForm");
  const responseMessage = document.querySelector(".response");

  if (!contactForm || !responseMessage) {
    return;
  }

  const serviceId = contactForm.dataset.emailjsService;
  const templateId = contactForm.dataset.emailjsTemplate;
  const contactEmail = contactForm.dataset.contactEmail;

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    responseMessage.classList.add("open");
    responseMessage.textContent = "Please wait...";
    responseMessage.style.color = "";

    const emailJsReady =
      window.emailjs &&
      serviceId &&
      templateId &&
      serviceId !== "YOUR_SERVICE_ID" &&
      templateId !== "YOUR_TEMPLATE_ID";

    try {
      if (emailJsReady) {
        await window.emailjs.sendForm(serviceId, templateId, contactForm);
        responseMessage.textContent = "Your message has been sent successfully!";
        responseMessage.style.color = "green";
        contactForm.reset();
      } else if (contactEmail) {
        const name = contactForm.querySelector("#contact-name")?.value.trim();
        const email = contactForm.querySelector("#contact-email")?.value.trim();
        const message = contactForm.querySelector("#contact-message")?.value.trim();
        const subject = encodeURIComponent("Portfolio Contact Form");
        const bodyLines = [
          name ? `Name: ${name}` : null,
          email ? `Email: ${email}` : null,
          "",
          message || "",
        ].filter(Boolean);
        const body = encodeURIComponent(bodyLines.join("\n"));
        window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
        responseMessage.textContent = "Opening your email client...";
        responseMessage.style.color = "green";
      } else {
        responseMessage.textContent = "Contact form isn't configured yet.";
        responseMessage.style.color = "red";
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      responseMessage.textContent = "Sorry, something went wrong. Please try again.";
      responseMessage.style.color = "red";
    }

    setTimeout(() => {
      responseMessage.classList.remove("open");
      responseMessage.textContent = "";
    }, 5000);
  });
};

export default form;
