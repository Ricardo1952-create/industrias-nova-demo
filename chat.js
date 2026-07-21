const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

let formShown = false;
let completed = false;

window.addEventListener("load", () => {
  chatInput.focus();
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = chatInput.value.trim();
  if (!text || completed) return;

  addMessage(text, "user");
  chatInput.value = "";

  if (isQuoteRequest(text)) {
    if (!formShown) {
      window.setTimeout(showQuoteForm, 350);
    } else {
      window.setTimeout(() => {
        addMessage(
          "El formulario ya está disponible. Completalo para registrar la solicitud.",
          "bot"
        );
      }, 350);
    }
    return;
  }

  window.setTimeout(() => {
    addMessage(
      "Esta demostración está preparada únicamente para mostrar una solicitud de cotización.\n\nPara continuar, escribí: cotizar",
      "bot"
    );
  }, 350);
});

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.!?¿¡]/g, "")
    .trim();
}

function isQuoteRequest(text) {
  const normalized = normalize(text);
  return normalized === "cotizar" || normalized.includes("cotizacion");
}

function addMessage(text, sender, extraClass = "") {
  const message = document.createElement("div");
  message.className = `message ${sender} ${extraClass}`.trim();
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showQuoteForm() {
  formShown = true;

  addMessage(
    "Perfecto 👍 Para que un especialista revise tu consulta y pueda responderte correctamente, completá el siguiente formulario. Recordá que para cotizar es necesario informar el CUIT de la empresa.",
    "bot"
  );

  const form = document.createElement("form");
  form.className = "quote-form";
  form.innerHTML = `
    <h2>Solicitud de cotización</h2>

    <div class="form-grid">
      <label>
        Empresa
        <input name="empresa" type="text" required />
      </label>

      <label>
        CUIT de la empresa
        <input
          name="cuit"
          type="text"
          inputmode="numeric"
          placeholder="XX-XXXXXXXX-X"
          required
        />
      </label>

      <label>
        Nombre
        <input name="nombre" type="text" required />
      </label>

      <label>
        WhatsApp
        <input name="whatsapp" type="tel" required />
      </label>

      <label class="full">
        Trabajo a cotizar
        <textarea
          name="trabajo"
          placeholder="Describí brevemente qué necesitás cotizar."
          required
        ></textarea>
      </label>
    </div>

    <button type="submit">Enviar solicitud</button>
    <p class="form-note">Todos los campos son obligatorios en esta demostración.</p>
  `;

  form.addEventListener("submit", handleQuoteSubmit);
  chatMessages.appendChild(form);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  const firstInput = form.querySelector("input");
  if (firstInput) firstInput.focus();
}

function handleQuoteSubmit(event) {
  event.preventDefault();
  if (completed) return;

  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  completed = true;

  form.querySelectorAll("input, textarea, button").forEach((element) => {
    element.disabled = true;
  });

  chatForm.style.display = "none";

  window.setTimeout(() => {
    addMessage(
      "Perfecto 👍 Ya registramos tu solicitud. Un asesor revisará tu consulta y se comunicará con vos dentro de nuestro horario de atención, de lunes a viernes de 8 a 17 hs.",
      "bot",
      "success"
    );

    window.setTimeout(() => {
      addMessage(
        "Además, en el agente real que prepare para tu empresa, también podrá responder consultas sobre disponibilidad, repuestos, horarios de atención presencial, productos técnicos o pedidos de contacto con ventas.",
        "bot",
        "info"
      );
    }, 450);
  }, 350);
}
