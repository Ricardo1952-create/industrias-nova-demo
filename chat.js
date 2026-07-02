const chatToggle = document.getElementById("chat-toggle");
const chatWindow = document.getElementById("chat-window");
const chatClose = document.getElementById("chat-close");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

chatToggle.addEventListener("click", () => {
  chatWindow.classList.add("open");
  chatInput.focus();
});

chatClose.addEventListener("click", () => {
  chatWindow.classList.remove("open");
});

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  chatInput.value = "";

  const reply = getDemoReply(text);
  setTimeout(() => {
    addMessage(reply, "bot");
  }, 500);
});

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.className = `message ${sender}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getDemoReply(text) {
  const lower = text.toLowerCase();

  if (
    lower.includes("martín") ||
    lower.includes("envapack") ||
    lower.includes("500") ||
    lower.includes("whatsapp") ||
    lower.includes("email")
  ) {
    saveDemoLead({
      fecha: new Date().toLocaleString("es-AR"),
      nombre: "Martín",
      empresa: "Envapack",
      contacto: "11-5555-5555",
      email: "martin@envapack.com",
      tipo: "Cotización / compra recurrente",
      necesidad: "500 unidades mensuales de un componente técnico para línea de producción",
      urgencia: "No especificada",
      estado: "Nuevo lead"
    });

    return `Perfecto, Martín. Dejé registrada tu consulta para seguimiento comercial.

Resumen de consulta:
- Nombre: Martín
- Empresa: Envapack
- Contacto: 11-5555-5555
- Email: martin@envapack.com
- Tipo de consulta: Cotización / compra recurrente
- Necesidad: 500 unidades mensuales de un componente técnico para línea de producción
- Estado: Nuevo lead

En una implementación real, esta información se enviaría automáticamente a Google Sheets.`;
  }

  if (lower.includes("cotizar") || lower.includes("cotización") || lower.includes("precio")) {
    return `Puedo ayudarte a preparar la consulta para el área comercial.

Para cotizar correctamente, necesitaría estos datos:
- Producto, insumo o componente que necesitás
- Cantidad estimada
- Si es compra única o recurrente
- Localidad o zona de entrega
- Urgencia
- Nombre, empresa, WhatsApp y email de contacto

No te paso un precio automático porque depende de especificaciones, cantidad, disponibilidad y condiciones comerciales.`;
  }

  if (lower.includes("stock") || lower.includes("disponibilidad") || lower.includes("repuesto")) {
    return `Para verificar disponibilidad, el equipo comercial necesita identificar bien el producto.

¿Me podés indicar?
- Producto, repuesto o código
- Marca/modelo si corresponde
- Cantidad
- Localidad
- Nombre, empresa y contacto

Con esos datos puedo dejar la consulta registrada para seguimiento.`;
  }

  if (lower.includes("mensual") || lower.includes("proveedor") || lower.includes("recurrente")) {
    return `Entiendo. Una compra recurrente es una oportunidad importante para el equipo comercial.

Para registrarla bien, necesito:
- Tipo de producto o insumo
- Volumen mensual aproximado
- Industria o aplicación
- Zona de entrega
- Nombre, empresa, WhatsApp y email

Con esa información queda ordenada para seguimiento comercial.`;
  }

  return `Gracias por tu consulta. Para orientarte mejor, contame qué necesitás: cotización, disponibilidad, ficha técnica, repuesto, compra recurrente o contacto con ventas.

Si querés, podés escribirme algo como:
“Soy Martín de Envapack. Necesitamos cotizar 500 unidades mensuales de un componente técnico. Mi WhatsApp es 11-5555-5555 y mi email es martin@envapack.com.”`;
}

// Esta función simula el registro local de leads.
// En la versión real, este punto se reemplaza por una llamada al backend,
// que luego enviará los datos a Google Sheets.
function saveDemoLead(lead) {
  const leads = JSON.parse(localStorage.getItem("demoLeads") || "[]");
  leads.push(lead);
  localStorage.setItem("demoLeads", JSON.stringify(leads));
  console.log("Lead demo registrado:", lead);
}
