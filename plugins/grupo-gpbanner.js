import { makeWASocket } from '@whiskeysockets/baileys';

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || '';

  // Verificar si se ha citado una imagen
  if (/image/.test(mime)) {
    let img = await q.download();
    if (!img) {
      return m.reply(
        `🖼️ Protocolo de actualización fallido.\n\n📌 Se detectó ausencia de datos visuales.\nCita o responde una imagen válida para proceder.\n\n— Sistema respaldado por FNaF LATAM™`
      );
    }

    try {
      // Actualizar imagen del grupo
      await conn.updateProfilePicture(m.chat, img);
      m.reply(
        `📸 *ACTUALIZACIÓN VISUAL COMPLETADA*\n\n✅ El archivo ha sido sincronizado correctamente con el sistema de vigilancia del sector.\n\n— Sistema respaldado por FNaF LATAM™`
      );
    } catch (e) {
      m.reply(
        `⚠️ *ERROR DETECTADO EN EL SUBSISTEMA DE IMÁGENES*\n\n🧨 Detalle técnico: ${e.message}\n\n— Sistema respaldado por FNaF LATAM™`
      );
    }
  } else {
    return m.reply(
      `📡 *SIN DATOS DE IMAGEN DETECTADOS*\n\n📌 Cita o responde una imagen para actualizar el panel visual del grupo.\n\n— Sistema respaldado por FNaF LATAM™`
    );
  }
};

handler.command = ['gpbanner', 'groupimg'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
