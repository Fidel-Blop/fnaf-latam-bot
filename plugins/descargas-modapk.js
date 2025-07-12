import { search, download } from 'aptoide-scraper';

var handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return conn.reply(m.chat, `${emoji} *Sistema de seguridad activado.*  
Ingresa el nombre de la APK que deseas rastrear y extraer del sistema.`, m);

  try {
    await m.react(rwait);
    conn.reply(m.chat, `${emoji2} *Iniciando descarga de la aplicación...*  
⏳ Por favor, mantente atento. El protocolo está en curso.`, m);

    let searchA = await search(text);
    let data5 = await download(searchA[0].id);

    let txt = `乂  *APTOIDE - EXTRACCIÓN DE APK*  乂

📦 *Nombre:* ${data5.name}
🧩 *Paquete:* ${data5.package}
📅 *Actualizado:* ${data5.lastup}
⚖️ *Tamaño:* ${data5.size}

⟢ El archivo ha sido localizado y preparado para la transferencia.`;

    await conn.sendFile(m.chat, data5.icon, 'thumbnail.jpg', txt, m);
    await m.react(done);

    if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) {
      return await conn.reply(m.chat, `${emoji2} ⚠️ *Atención:* El archivo excede el tamaño permitido para una descarga segura.`, m);
    }

    await conn.sendMessage(m.chat, {
      document: { url: data5.dllink },
      mimetype: 'application/vnd.android.package-archive',
      fileName: data5.name + '.apk',
      caption: '🔧 *FNaF LATAM - APK Transferencia Exitosa*'
    }, { quoted: fkontak });

  } catch {
    return conn.reply(m.chat, `${msm} ❌ *Error en el protocolo.*  
No fue posible completar la operación. Intenta nuevamente.`, m);
  }
};

handler.tags = ['descargas'];
handler.help = ['apkmod'];
handler.command = ['apk', 'modapk', 'aptoide'];
handler.group = true;
handler.register = true;
handler.coin = 5;

export default handler;
