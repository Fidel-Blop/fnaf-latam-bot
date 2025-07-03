let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.menfess = conn.menfess ? conn.menfess : {};
  
  if (!text) throw m.reply(`
🔧 *Sistema de Confesiones FNaF LATAM™*
> ⚠️ Uso incorrecto del protocolo.

🗂️ *Ejemplo autorizado:*
${usedPrefix + command} 549XXXXXXXXX Estoy observándote desde la sala 3...
  `.trim());

  let split = text.trim().split(/ (.+)/); 
  let jid = split[0]; 
  let mensaje = split[1]; 

  if (!jid || !mensaje) throw m.reply(`
📎 *Formato inválido*

💡 *Usa el comando correctamente:*
${usedPrefix + command} 549XXXXXXXXX Mensaje confidencial
  `.trim());

  jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net'; 
  let data = (await conn.onWhatsApp(jid))[0] || {}; 

  if (!data.exists) throw m.reply(`🛑 *No se ha encontrado el sujeto en el sistema de vigilancia.*`);
  if (jid === m.sender) throw m.reply(`🤖 *Autodiálogo detectado. Confesión rechazada.*`);

  let active = Object.values(conn.menfess).find(mf => mf.status === true);
  if (active) return;

  let id = Math.floor(1000 + Math.random() * 9000); 

  let textoConfesion = `
🎙️ *Unidad de Comunicación Anónima - Activada*

👁️‍🗨️ *Has recibido una confesión anónima desde una terminal remota...*

📎 *ID de Confesión:* ${id}
📄 *Mensaje:*

${mensaje}

📬 *Para responder, usa:* 
.respuesta ${id} <tu mensaje confidencial>

— Sistema automatizado por FNaF LATAM™
`.trim();

  try {
    let mensajeEnviado = await conn.sendMessage(data.jid, {
      text: textoConfesion,
      contextInfo: {
        mentionedJid: [data.jid],
        externalAdReply: {
          title: 'Fazbear Surveillance Unit',
          body: 'Confesión recibida. Activa protocolo de respuesta.',
          mediaType: 1,
          renderLargerThumbnail: true,
          thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyz1dMPkZuNleUyfXPMsltHwKKdVddTf4-A&usqp=CAU',
          sourceUrl: channel,
        }
      }
    });

    if (mensajeEnviado) {
      conn.menfess[id] = {
        id,
        dari: m.sender,
        penerima: data.jid,
        pesan: mensaje,
        status: false 
      };
      return conn.reply(m.chat, `
✅ *Transmisión codificada completada*

🆔 *ID registrado:* ${id}
📡 *El receptor ha sido notificado...*

— Sistema respaldado por FNaF LATAM™
`.trim(), m);
    }

  } catch (e) {
    console.error(e);
    m.reply(`⚠️ *Error en la transmisión. La conexión ha sido interrumpida.*`);
  }
};

handler.tags = ['rg'];
handler.help = ['confesar'].map(v => v + ' <número mensaje>');
handler.command = ['confesar', 'confesiones'];
handler.register = true;
handler.private = true;

export default handler;
