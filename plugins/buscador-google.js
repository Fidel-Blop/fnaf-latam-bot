import fetch from 'node-fetch';

let handler = async (m, { text }) => {
  const emoji = '🔎💡';
  const emoji2 = '🌐✨';
  const msm = '⚠️';

  if (!text) {
    m.reply(`${emoji} *Debes escribir lo que deseas buscar en Google.*\n\n🕹️ _Ejemplo:_ */google Animatronics reales*\n\n🌙 *Respaldado por FNAF LATAM* 🌙`);
    return;
  }

  const apiUrl = `https://delirius-apiofc.vercel.app/search/googlesearch?query=${encodeURIComponent(text)}`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!result.status) {
      m.reply(`${msm} No se encontraron resultados. Intenta con otra búsqueda.`);
      return;
    }

    let replyMessage = `📡 *BÚSQUEDA GOOGLE ACTIVADA* 📡\n🔍 _Término:_ *"${text}"*\n\n`;

    result.data.slice(0, 1).forEach((item, index) => {
      replyMessage += `🎯 *${index + 1}.* 🧠 *${item.title}*\n`;
      replyMessage += `📘 *Descripción:* ${item.description}\n`;
      replyMessage += `🔗 *Enlace directo:* ${item.url}`;
    });

    replyMessage += `\n\n🌙 *Respaldado por FNAF LATAM* 🌙`;

    m.react('✅');
    m.reply(replyMessage);

  } catch (error) {
    console.error(`${msm} Error al realizar la solicitud a la API:`, error);
    m.reply(`${msm} Se produjo un error al obtener los resultados. Vuelve a intentarlo más tarde.`);
  }
};

handler.command = ['google'];

export default handler;
