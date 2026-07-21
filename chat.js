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

let expectedField = "initial";

window.addEventListener("load", () => {
  chatInput.focus();
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  chatInput.value = "";

  const reply = processMessage(text);
  window.setTimeout(() => addMessage(reply, "bot"), 450);
});

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.className = `message ${sender}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function processMessage(text) {
  if (expectedField === "initial") {
    extractInitialData(text);
  } else {
    saveExpectedAnswer(expectedField, text);
  }

  const missing = getFirstMissingField();

  if (!missing) {
    expectedField = "complete";
    return buildSummary();
  }

  expectedField = missing;
  return buildNextQuestion(missing);
}

function extractInitialData(text) {
  lead.necesidad = text;

  const quantityMatch = text.match(
    /\b\d[\d.,]*\s*(?:unidades?|piezas?|equipos?|repuestos?|componentes?|kg|kilos?|metros?|litros?)?\b/i
  );
  if (quantityMatch) {
    lead.cantidad = quantityMatch[0].trim();
  }

  if (/\b(mensual|mensuales|semanal|semanales|recurrente|recurrentes|todos los meses|cada mes)\b/i.test(text)) {
    lead.frecuencia = "Recurrente";
  } else if (/\b(única|unica|una sola vez|por única vez|por unica vez)\b/i.test(text)) {
    lead.frecuencia = "Compra única";
  }

  const urgencyMatch = text.match(
    /\b(urgente|esta semana|este mes|lo antes posible|sin urgencia|para hoy|para mañana)\b/i
  );
  if (urgencyMatch) {
    lead.urgencia = urgencyMatch[0];
  }

  const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  const phoneMatch = text.match(/(?:\+?\d[\d\s-]{7,}\d)/);
  if (emailMatch) {
    lead.contacto = emailMatch[0];
  } else if (phoneMatch) {
    lead.contacto = phoneMatch[0];
  }

  const nameCompanyMatch = text.match(
    /(?:soy|mi nombre es)\s+(.+?)\s+(?:de|y trabajo en|de la empresa)\s+(.+?)(?:[.,]|$)/i
  );
  if (nameCompanyMatch) {
    lead.nombreEmpresa = `${nameCompanyMatch[1].trim()} — ${nameCompanyMatch[2].trim()}`;
  }
}

function saveExpectedAnswer(field, text) {
  if (field === "cantidad") lead.cantidad = text;
  if (field === "frecuencia") lead.frecuencia = text;
  if (field === "localidad") lead.localidad = text;
  if (field === "urgencia") lead.urgencia = text;
  if (field === "nombreEmpresa") lead.nombreEmpresa = text;
  if (field === "contacto") lead.contacto = text;
}

function getFirstMissingField() {
  const order = [
    "necesidad",
    "cantidad",
    "frecuencia",
    "localidad",
    "urgencia",
    "nombreEmpresa",
    "contacto"
  ];

  return order.find((field) => !lead[field]) || null;
}

function buildNextQuestion(field) {
  const questions = {
    necesidad: "¿Qué producto, repuesto, equipo o servicio necesitás?",
    cantidad: "¿Qué cantidad aproximada necesitás?",
    frecuencia: "¿Se trata de una compra única o de una necesidad recurrente, por ejemplo mensual?",
    localidad: "¿En qué localidad o zona debería entregarse el producto o realizarse el servicio?",
    urgencia: "¿Para cuándo lo necesitás? Podés indicar: esta semana, este mes o sin urgencia.",
    nombreEmpresa: "¿Me indicás tu nombre y la empresa a la que pertenecés?",
    contacto: "Por último, dejame un WhatsApp o un email para que el responsable comercial pueda contactarte."
  };

  const detected = [];
  if (lead.cantidad) detected.push(`la cantidad (${lead.cantidad})`);
  if (lead.frecuencia) detected.push(`que es una necesidad ${lead.frecuencia.toLowerCase()}`);

  let intro = "Perfecto. Para preparar la consulta para el área comercial, necesito completar algunos datos.";
  if (detected.length) {
    intro += ` Ya registré ${detected.join(" y ")}.`;
  }

  return `${intro}\n\n${questions[field]}`;
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
