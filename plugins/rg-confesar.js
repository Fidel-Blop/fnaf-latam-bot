let handler = async (m, { conn, text, usedPrefix, command }) => {
    const emoji = '📝';  // emoji uniforme para esta sección
    const emoji2 = '⚠️'; // emoji para advertencias/errors
    const channel = 'https://tus-redes-o-link.com'; // cambia el link a tu canal o sitio

    conn.menfess = conn.menfess || {};
    
    if (!text) throw m.reply(`${emoji} Ejemplo:\n\n${usedPrefix + command} numero mensaje\n\n${emoji2} Uso: ${usedPrefix + command} ${m.sender.split`@`[0]} Hola.`);

    let split = text.trim().split(/ (.+)/);
    let jid = split[0];
    let pesan = split[1];

    if (!jid || !pesan) throw m.reply(`${emoji} Ejemplo:\n\n${usedPrefix + command} numero mensaje\n\n${emoji2} Uso: ${usedPrefix + command} ${m.sender.split`@`[0]} Hola.`);

    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    
    if (!data.exists) throw m.reply(`${emoji2} El número no está registrado en WhatsApp.`);
    if (jid === m.sender) throw m.reply(`${emoji2} No puedes mandarte un mensaje a ti mismo.`);

    let mf = Object.values(conn.menfess).find(mf => mf.status === true);
    if (mf) return;

    let id = Math.floor(1000 + Math.random() * 9000);
    let teks = `*📩 ¡Nueva Confesión Anónima!* \n\n@${data.jid.split("@")[0]}, has recibido un mensaje anónimo.\n\n` +
               `Para responder utiliza:\n*${usedPrefix}respuesta ${id} <tu mensaje>*\n\n` +
               `*ID:* ${id}\n*MENSAJE:* \n${pesan.trim()}`;

    try {
        let sentMessage = await conn.sendMessage(data.jid, {
            text: teks,
            contextInfo: {
                mentionedJid: [data.jid],
                externalAdReply: {
                    title: 'FNaF LATAM | CONFESIONES',
                    body: '¡Responde con .respuesta <ID> <mensaje>!',
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyz1dMPkZuNleUyfXPMsltHwKKdVddTf4-A&usqp=CAU',
                    sourceUrl: channel,
                }
            }
        });

        if (sentMessage) {
            conn.menfess[id] = {
                id,
                dari: m.sender,
                penerima: data.jid,
                pesan,
                status: false
            };
            return conn.reply(m.chat, `${emoji} Mensaje enviado con éxito.\n*IDENTIFICADOR:* ${id}`, m);
        }
    } catch (e) {
        console.error(e);
        m.reply(`${emoji2} Ocurrió un error al enviar la confesión.`);
    }
};

handler.tags = ['rg'];
handler.help = ['confesar <número> <mensaje>'];
handler.command = ['confesar', 'confesiones'];
handler.register = true;
handler.private = true;

export default handler;
