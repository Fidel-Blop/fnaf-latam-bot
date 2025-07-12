import { igdl } from 'ruhend-scraper';

const handler = async (m, { args, conn }) => {
  if (!args[0]) {
    return conn.reply(
      m.chat,
      `🤖 *¡Atención, humano!* 👁️  
🕹️ Necesito que me des un enlace de *Instagram* para capturar su oscuro secreto.  
\n*Ejemplo:* ${usedPrefix}instagram https://www.instagram.com/p/ABC123xyz`,
      m
    );
  }

  try {
    await m.react('⏳'); // reloj de arena
    const res = await igdl(args[0]);
    const data = res.data;

    for (let media of data) {
      await conn.sendFile(
        m.chat,
        media.url,
        'fnaf-latam-instagram.mp4',
        `👁️‍🗨️ *Mira lo que encontré en la oscuridad...*  
ฅ^•ﻌ•^ฅ Aquí tienes tu video de Instagram, directo desde las sombras...`,
        m
      );
      await m.react('✅'); // check verde
    }
  } catch (e) {
    await m.react('⚠️'); // alerta
    return conn.reply(
      m.chat,
      `💀 *Error fatal*  
No pude capturar nada esta vez... ¿Revisaste el enlace?  
${msm}`,
      m
    );
  }
};

handler.command = ['instagram', 'ig'];
handler.tags = ['descargas'];
handler.help = ['instagram', 'ig'];
handler.group = true;
handler.register = true;
handler.coin = 2;

export default handler;
