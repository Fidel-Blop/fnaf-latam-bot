import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw m.reply(`🎵 *¡Atención, guardia!* Ingresa un enlace válido de TikTok para extraer el audio.`);

  conn.sendMessage(m.chat, { react: { text: "🔧", key: m.key } });

  let d2 = await fetch(`https://eliasar-yt-api.vercel.app/api/search/tiktok?query=${text}`);
  let dp = await d2.json();

  const doc = {
    audio: { url: dp.results.audio },
    mimetype: 'audio/mp4',
    fileName: `Audio_TT_FNaF_Latam.mp3`,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 2,
        mediaUrl: text,
        title: `🔊 ${dp.results.title}`,
        sourceUrl: text,
        thumbnail: await (await conn.getFile(dp.results.thumbnail)).data
      }
    }
  };

  await conn.sendMessage(m.chat, doc, { quoted: m });
  await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}

handler.help = ['tiktokmp3 *<url>*']
handler.tags = ['dl']
handler.command = ['tiktokmp3', 'ttmp3']
handler.group = true
handler.register = true
handler.coin = 2

export default handler
