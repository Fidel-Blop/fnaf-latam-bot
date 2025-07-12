import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

  if (!text) throw m.reply(`${emoji} *¡Alerta! 👁️*  
Debes enviarme un enlace válido de *Mediafire* para extraer su secreto.`);

  // Reacción visual tipo reloj de arena
  conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

  let ouh = await fetch(`https://api.agatz.xyz/api/mediafire?url=${text}`)
  let gyh = await ouh.json()

  // Mensaje con estilo FNaF LATAM
  let mensaje = 
`乂  *MEDIAFIRE - ARCHIVO ESCANEADO*  乂

🔮 *Nombre:* ${gyh.data[0].nama}
⚖️ *Tamaño:* ${gyh.data[0].size}
🗂️ *Tipo:* ${gyh.data[0].mime}

*Descarga segura desde las sombras...*

> ${dev}`;

  await conn.sendFile(m.chat, gyh.data[0].link, `FNaF-LATAM-Archivo`, mensaje, m);

  // Reacción de éxito
  await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }});
}

handler.help = ['mediafire'];
handler.tags = ['descargas'];
handler.command = ['mf', 'mediafire'];
handler.coin = 10;
handler.register = true;
handler.group = true;

export default handler;
