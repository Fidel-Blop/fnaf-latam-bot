let handler = async (m, { conn, usedPrefix, command }) => {
  let uptime = await process.uptime()
  let runtime = `${global.botname}

*⚙️ Estado del sistema:* Operando sin interrupciones.
*⏳ Tiempo activo continuo desde el último reinicio:*
${rTime(uptime)}

Gracias por usar *The Mimic Bot*, el bot que te acompaña en todas tus aventuras.`
  
  await conn.sendMessage(m.chat, {
    text: runtime,
    contextInfo: {
      externalAdReply: {
        title: global.botname,
        body: 'FNaF LATAM - Manteniéndote siempre informado',
        thumbnailUrl: 'https://images.adagio.com/images2/custom_blends/230042.jpg', // Cambia acá la URL de la imagen
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true,
      }
    }
  }, { quoted: m })
}

handler.help = ['runtime']
handler.tags = ['main']
handler.command = ['runtime', 'uptime']

export default handler

function rTime(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " día, " : " días, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hora, " : " horas, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minuto, " : " minutos, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " segundo" : " segundos") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}
