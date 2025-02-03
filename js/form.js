const form = () => {
  const contactForm = document.querySelector(".contactForm"),
    responseMessage = document.querySelector(".response");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    responseMessage.classList.add("open");
    responseMessage.textContent = "Please wait...";

    setTimeout(() => {
      responseMessage.textContent = "Your message has been sent successfully!";
      responseMessage.style.color = "green";
      contactForm.reset();
    }, 2000);
    
    // Hide message after 3 seconds
    setTimeout(() => {
      responseMessage.classList.remove("open");
      responseMessage.textContent = "";
    }, 5000);
  });
};

export default form;
