const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

const lead = {
  necesidad: "",
  cantidad: "",
  frecuencia: "",
  localidad: "",
  urgencia: "",
  nombreEmpresa: "",
  contacto: ""
};

let step = 0;

window.addEventListener("load", () => {
  chatInput.focus();
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  chatInput.value = "";

  const reply = processGuidedDemo(text);
  window.setTimeout(() => addMessage(reply, "bot"), 450);
});

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.className = `message ${sender}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function processGuidedDemo(text) {
  switch (step) {
    case 0:
      lead.necesidad = text;
      step = 1;
      return `Perfecto. Para preparar la consulta para el área comercial, necesito algunos datos.

¿Qué cantidad aproximada necesitás?`;

    case 1:
      lead.cantidad = text;
      step = 2;
      return `Gracias. ¿Se trata de una compra única o de una necesidad recurrente, por ejemplo mensual?`;

    case 2:
      lead.frecuencia = text;
      step = 3;
      return `¿En qué localidad o zona debería entregarse o realizarse el servicio?`;

    case 3:
      lead.localidad = text;
      step = 4;
      return `¿Para cuándo lo necesitás? Podés indicar, por ejemplo: esta semana, este mes o sin urgencia.`;

    case 4:
      lead.urgencia = text;
      step = 5;
      return `¿Me indicás tu nombre y la empresa a la que pertenecés?`;

    case 5:
      lead.nombreEmpresa = text;
      step = 6;
      return `Por último, dejame un WhatsApp o un email para que el responsable comercial pueda contactarte.`;

    case 6:
      lead.contacto = text;
      step = 7;
      return buildSummary();

    default:
      return `La consulta de demostración ya quedó completa.

Podés recargar la página para probar nuevamente con otro ejemplo.`;
  }
}

function buildSummary() {
  return `Perfecto. Ahora sí, la consulta quedó preparada para el seguimiento comercial.

Resumen:
- Necesidad: ${lead.necesidad}
- Cantidad: ${lead.cantidad}
- Tipo de compra: ${lead.frecuencia}
- Localidad o zona: ${lead.localidad}
- Urgencia: ${lead.urgencia}
- Nombre y empresa: ${lead.nombreEmpresa}
- Contacto: ${lead.contacto}
- Estado: Nuevo potencial cliente

En una implementación real, estos datos se registrarían automáticamente en una planilla y se enviaría un aviso al responsable comercial.`;
}
