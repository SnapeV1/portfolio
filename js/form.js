const form = () => {
  const contactForm = document.querySelector(".contactForm");
  const responseMessage = document.querySelector(".response");

  if (!contactForm || !responseMessage) {
    return;
  }

  const serviceId = contactForm.dataset.emailjsService;
  const templateId = contactForm.dataset.emailjsTemplate;

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    responseMessage.classList.add("open");
    responseMessage.textContent = "Please wait...";
    responseMessage.style.color = "";

    if (
      !window.emailjs ||
      !serviceId ||
      !templateId ||
      serviceId === "YOUR_SERVICE_ID" ||
      templateId === "YOUR_TEMPLATE_ID"
    ) {
      responseMessage.textContent = "Contact form isn't configured yet.";
      responseMessage.style.color = "red";

      setTimeout(() => {
        responseMessage.classList.remove("open");
        responseMessage.textContent = "";
      }, 5000);
      return;
    }

    try {
      await window.emailjs.sendForm(serviceId, templateId, contactForm);
      responseMessage.textContent = "Your message has been sent successfully!";
      responseMessage.style.color = "green";
      contactForm.reset();
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
