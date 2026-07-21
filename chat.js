const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

window.addEventListener("load", () => {
  chatInput.focus();
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  chatInput.value = "";

  const reply = getDemoReply(text);
  window.setTimeout(() => addMessage(reply, "bot"), 500);
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
    return `Perfecto. Dejé preparada la consulta para el seguimiento comercial.

Resumen:
- Empresa: Envapack
- Necesidad: 500 unidades mensuales de un componente técnico
- Tipo: Cotización / compra recurrente
- Estado: Nuevo potencial cliente

En una implementación real, el sistema también pediría nombre, teléfono, email, urgencia y otros datos necesarios, los registraría en una planilla y avisaría al responsable comercial.`;
  }

  if (lower.includes("cotizar") || lower.includes("cotización") || lower.includes("precio")) {
    return `Puedo ayudarte a preparar la consulta para el área comercial.

Para cotizar correctamente, necesitaría:
- Producto, insumo o componente
- Cantidad estimada
- Compra única o recurrente
- Localidad o zona de entrega
- Urgencia
- Nombre, empresa, WhatsApp y email

Con esos datos, la oportunidad queda ordenada para que un vendedor pueda continuarla.`;
  }

  if (lower.includes("stock") || lower.includes("disponibilidad") || lower.includes("repuesto")) {
    return `Para verificar disponibilidad, necesito identificar bien el producto.

Indicame:
- Producto, repuesto o código
- Marca y modelo, si corresponde
- Cantidad
- Localidad
- Nombre, empresa y datos de contacto

Después, la consulta puede quedar registrada y ser derivada al responsable correspondiente.`;
  }

  if (lower.includes("mensual") || lower.includes("proveedor") || lower.includes("recurrente")) {
    return `Una compra recurrente es una oportunidad importante.

Para registrarla bien, necesito:
- Tipo de producto o insumo
- Volumen mensual aproximado
- Industria o aplicación
- Zona de entrega
- Nombre, empresa, WhatsApp y email

Con esa información queda preparada para el seguimiento comercial.`;
  }

  return `Gracias por tu consulta. Contame un poco más qué necesitás: una cotización, disponibilidad, una ficha técnica, un repuesto, una compra recurrente o contacto con ventas.

También podés probar escribiendo:
“Necesitamos cotizar 500 unidades mensuales de un componente técnico.”`;
}
