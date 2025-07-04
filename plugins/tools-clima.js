import axios from "axios";

let handler = async (m, { conn, args }) => {
  const chatId = m.chat;

  // Si no se proporciona argumento, solicitar entrada con estilo FNaF
  if (!args[0]) {
    let prompt = `👁️ Freddy Fazbear Security Protocol v1.3.7 activado ⛓️\n\n` +
      `⏳ Monitoreo activo: espera de datos de ubicación...\n\n` +
      `🚨 ERROR 404: No se detectó ubicación.\n` +
      `Ingrese el nombre de su *País* o *Ciudad* para continuar.\n\n` +
      `...Operación suspendida --::SEQUENCE_BREAK::--`;

    await sendSlow(conn, m, prompt);
    return;
  }

  try {
    // Consulta a API de clima
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: args[0],
        units: "metric",
        appid: "060a6bcfa19809c2cd4d97a212b19273",
      },
    });

    const data = response.data;
    const weatherReport = `
⛓️ Unidad FazWatch - Informe Meteorológico

📍 Ubicación: ${data.name}
🗺️ País: ${data.sys.country}
🌤️ Condición: ${data.weather[0].description}
🌡️ Temperatura actual: ${data.main.temp}°C
💠 Mínima: ${data.main.temp_min}°C
📛 Máxima: ${data.main.temp_max}°C
💦 Humedad: ${data.main.humidity}%
🌬️ Viento: ${data.wind.speed} km/h

... Monitoreo finalizado.

— Sistema respaldado por FNaF LATAM™
    `.trim();

    await sendSlow(conn, m, weatherReport);

  } catch (error) {
    let errorMsg = `
⚠️ Freddy AI Response 🧠

##ERROR## No se pudo encontrar la ubicación: *${args[0]}*

Revise la ortografía o ingrese una ciudad/país válido.

--::SEQUENCE_BREAK::--

— Sistema respaldado por FNaF LATAM™
    `.trim();

    await sendSlow(conn, m, errorMsg);
  }
};

// Función para enviar texto lento simulando un sistema antiguo
async function sendSlow(conn, m, text) {
  let temp = '';
  let count = 0;
  for (const c of text) {
    temp += c;
    count++;
    if (count % 10 === 0) await conn.sendPresenceUpdate('composing', m.chat);
    await new Promise(r => setTimeout(r, 5));
  }
  await conn.sendMessage(m.chat, { text: temp.trim(), mentions: conn.parseMention(temp) }, { quoted: m, ephemeralExpiration: 86400, disappearingMessagesInChat: 86400 });
}

handler.help = ['clima *<ciudad/país>*'];
handler.tags = ['herramientas', 'monitoreo'];
handler.command = ['clima', 'tiempo'];

export default handler;
