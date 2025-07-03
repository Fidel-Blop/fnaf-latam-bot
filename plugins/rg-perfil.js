import moment from 'moment-timezone';
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
  let targetId;
  if (m.quoted && m.quoted.sender) {
    targetId = m.quoted.sender;
  } else {
    targetId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  }

  let user = global.db.data.users[targetId];

  let nombre = await conn.getName(targetId);
  let foto = await conn.profilePictureUrl(targetId, 'image').catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg');

  // Variables limpias
  let desc = user.description || '██ SIN DESCRIPCIÓN ██';
  let edad = user.age || 'Desconocida';
  let cumple = user.birth || 'No registrado';
  let genero = user.genre || 'No declarado';
  let pareja = user.marry || '— Ninguno —';
  let exp = user.exp || 0;
  let nivel = user.level || 0;
  let rango = user.role || 'Sin asignar';
  let coins = user.coin || 0;
  let bank = user.bank || 0;
  let esPremium = user.premium ? '✅ ACTIVADO' : '❌ INACTIVO';

  let scan = `
🗂️ *ARCHIVO DE IDENTIDAD FNaF LATAM™*
> Unidad escaneada: @${targetId.split('@')[0]}
> Nombre: ${nombre}
> Estado: ${user.banned ? '⛔ BANEADO' : '🟢 ACTIVO'}

╭─────────────◜⚙️◞─────────────╮
│ 🧠 *Descripción del sujeto:* 
│ ${desc}
╰─────────────────────────────╯

🎂 *Edad:* ${edad}
📅 *Cumpleaños:* ${cumple}
⚧ *Género:* ${genero}
💍 *Vínculo afectivo:* ${pareja}

📈 *Experiencia:* ${exp.toLocaleString()} XP
📊 *Nivel Actual:* ${nivel}
🏅 *Rango Fazbear:* ${rango}

💰 *Coins Cartera:* ${coins.toLocaleString()} ${moneda}
🏦 *Coins Banco:* ${bank.toLocaleString()} ${moneda}
🌟 *Estado Premium:* ${esPremium}

🕯️ _Informe generado por el sistema de observación FazWatch..._
— Sistema respaldado por FNaF LATAM™
`.trim();

  await conn.sendMessage(m.chat, {
    text: scan,
    contextInfo: {
      mentionedJid: [targetId],
      externalAdReply: {
        title: '🎭 ESCANEO DE IDENTIDAD',
        body: 'Fazbear Monitoring Protocol v1.9.8',
        thumbnailUrl: foto,
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true
      }
    }
  }, { quoted: m });
};

handler.help = ['perfil', 'profile'];
handler.tags = ['rg'];
handler.command = ['perfil', 'profile'];

export default handler;
