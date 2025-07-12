import axios from 'axios';
import baileys from '@whiskeysockets/baileys';

let handler = async (m, { conn, text }) => {
  const firma = '🎭 *Respaldado por FNAF LATAM* 🎭';

  if (!text) {
    return m.reply(`🔎 *Debes ingresar un término para buscar en Pinterest.*\n\n📌 _Ejemplo:_ *pinterest Chica FNaF*\n\n${firma}`);
  }

  try {
    await m.react('🕒');

    let results = await pins(text);
    if (!results.length) {
      return conn.reply(m.chat, `❌ *No se encontraron resultados para:* "${text}".\n\n${firma}`, m);
    }

    const medias = results.slice(0, 10).map(img => ({
      type: 'image',
      data: { url: img.hd }
    }));

    await conn.sendSylphy(m.chat, medias, {
      caption: `🎨 *Pinterest - Resultados de Búsqueda* 🎨\n\n📌 *Término:* "${text}"\n🖼️ *Resultados encontrados:* ${medias.length}\n\n${firma}`,
      quoted: m
    });

    await conn.sendMessage(m.chat, {
      react: { text: '✅', key: m.key }
    });

  } catch (error) {
    conn.reply(m.chat, `⚠️ *Ha ocurrido un error inesperado.*\n\n🧩 *Detalles:* ${error.message}\n\n${firma}`, m);
  }
};

handler.help = ['pinterest'];
handler.command = ['pinterest', 'pin'];
handler.tags = ['dl'];
export default handler;

const pins = async (query) => {
  try {
    const { data } = await axios.get(`https://api.stellarwa.xyz/search/pinterest?query=${encodeURIComponent(query)}`);
    if (data?.status && data?.data?.length) {
      return data.data.map(item => ({
        hd: item.hd,
        mini: item.mini
      }));
    }
    return [];
  } catch (error) {
    console.error("🛑 Error al obtener imágenes de Pinterest:", error);
    return [];
  }
};
