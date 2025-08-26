document.getElementById("formulario").addEventListener("submit", async function (e) {
  e.preventDefault();

  const destino = e.target.destino.value;
  const llegada = e.target.llegada.value;
  const salida = e.target.salida.value;
  const preferencias = e.target.preferencias.value || "sin preferencias específicas";

  const prompt = `
Quiero que generes un itinerario turístico para un cliente que viaja a ${destino}.
Llega el ${llegada} y se va el ${salida}. Tiene interés en ${preferencias}.
Crea una tabla por cada día del viaje con las siguientes columnas:
- Lugar de visita
- Horario de apertura
- Horario de cierre
- Precio de entrada
- Medio de transporte desde el lugar anterior
- Tiempo estimado de desplazamiento
- Duración aproximada de la visita
Distribuye las visitas de forma lógica según los horarios y distancias. No repitas lugares. Incluye entre 2 y 4 visitas por día. El itinerario debe ser realista y agradable para el viajero.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer TU_API_KEY_AQUI"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    })
  });

  const data = await response.json();
  document.getElementById("resultado").textContent = data.choices[0].message.content;
});
