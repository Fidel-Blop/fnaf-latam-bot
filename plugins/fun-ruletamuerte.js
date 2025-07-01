import { delay } from '@whiskeysockets/baileys';

const salasRuleta = {};

const handler = async (m, { conn }) => {
  const chatId = m.chat;
  const senderId = m.sender;

  if (salasRuleta[chatId]) 
    return conn.reply(m.chat, '🎥 *Monitoreo FNaF LATAM™:*\n\n⛔ Ya existe una sala activa en este canal de seguridad. Esperando resolución final...', m);

  salasRuleta[chatId] = { jugadores: [senderId], estado: 'esperando' };

  await conn.sendMessage(m.chat, { 
    text: `🔫 *PROGRAMA: RULETA DE LA MUERTE™*\n\n📡 Operador: @${senderId.split('@')[0]}\n\n🦴 *Inició una sala de eliminación.*\n\n🕒 Responde *acepto* para ingresar al protocolo. Tiempo límite: 60 segundos...`, 
    mentions: [senderId] 
  }, { quoted: m });

  await delay(60000);

  if (salasRuleta[chatId] && salasRuleta[chatId].estado === 'esperando') {
    delete salasRuleta[chatId];
    await conn.sendMessage(m.chat, { 
      text: '📴 *Protocolo cancelado.*\n\n🎥 Ningún usuario ingresó al experimento. La sala ha sido desactivada.\n\n— Sistema respaldado por FNaF LATAM™' 
    });
  }
};

handler.command = ['ruletamuerte'];
handler.botAdmin = true;

export default handler;

handler.before = async (m, { conn }) => {
  const chatId = m.chat;
  const senderId = m.sender;
  const texto = m.text?.toLowerCase();

  if (!salasRuleta[chatId]) return;

  if (texto === 'acepto' || texto === 'aceptar') {
    if (salasRuleta[chatId].jugadores.length >= 2) 
      return conn.reply(m.chat, '⚠️ Esta sala de ejecución ya posee dos participantes activos.', m);

    if (senderId === salasRuleta[chatId].jugadores[0])
      return conn.reply(m.chat, '🎭 El retador no puede unirse a su propio protocolo.', m);

    salasRuleta[chatId].jugadores.push(senderId);
    salasRuleta[chatId].estado = 'completa';

    await conn.sendMessage(m.chat, { 
      audio: { url: "https://qu.ax/iwAmy.mp3" }, 
      mimetype: "audio/mp4", 
      ptt: true 
    });

    await conn.sendMessage(m.chat, { 
      text: `🔐 *PROTOCOLO ACTIVADO*\n\n🎮 Jugadores conectados.\n\n📊 Iniciando el cálculo del perdedor...` 
    });

    const loadingMessages = [
      "《 █▒▒▒▒▒▒▒▒▒▒▒ 》10%\n📡 Iniciando escaneo neurológico...",
      "《 ████▒▒▒▒▒▒▒▒ 》30%\n🔍 Analizando patrones de riesgo...",
      "《 ███████▒▒▒▒▒ 》50%\n⚙️ Cargando algoritmo de predicción...",
      "《 ██████████▒▒ 》80%\n🧠 Calculando el destino final...",
      "《 ████████████ 》100%\n🩸 Selección completada. Resultado final..."
    ];

    let { key } = await conn.sendMessage(m.chat, { text: "📊 *Cargando resultado..." }, { quoted: m });

    for (let msg of loadingMessages) {
      await delay(3000);
      await conn.sendMessage(m.chat, { text: msg, edit: key }, { quoted: m });
    }

    const [jugador1, jugador2] = salasRuleta[chatId].jugadores;
    const perdedor = Math.random() < 0.5 ? jugador1 : jugador2;

    await conn.sendMessage(m.chat, { 
      text: `🪓 *Ejecución Confirmada*\n\n@${perdedor.split('@')[0]} ha sido seleccionado como el objetivo final.\n\n🎙 Tiene 60 segundos para emitir su último mensaje al canal.\n\n— Protocolo respaldado por FNaF LATAM™`, 
      mentions: [perdedor] 
    });

    await delay(60000);

    try {
      await conn.groupParticipantsUpdate(m.chat, [perdedor], 'remove');
      await conn.sendMessage(m.chat, { 
        text: `⚰️ *Eliminación Completada*\n\n@${perdedor.split('@')[0]} ha sido retirado del canal por el sistema automático de FNaF LATAM™.`, 
        mentions: [perdedor] 
      });
    } catch (e) {
      await conn.sendMessage(m.chat, { 
        text: `⛔ Error al ejecutar la eliminación.\n@${perdedor.split('@')[0]} fue identificado pero no pudo ser expulsado.\n\n— Sistema FNaF LATAM™` 
      });
    }

    delete salasRuleta[chatId];
  }

  if (texto === 'rechazar' && senderId === salasRuleta[chatId].jugadores[0]) {
    delete salasRuleta[chatId];
    await conn.sendMessage(m.chat, { 
      text: '📴 *El retador ha desconectado el protocolo.*\n\n— Ruleta de la Muerte desactivada.' 
    });
  }
};
