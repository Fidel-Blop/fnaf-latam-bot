import TicTacToe from '../lib/tictactoe.js';

const handler = async (m, { conn, usedPrefix, command, text }) => {
  conn.game = conn.game || {};

  // Verificar si ya estás en una partida activa
  if (Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) {
    throw `⚠️ Unidad en conflicto detectada.\nFinaliza la sesión de juego activa antes de iniciar otra. — Sistema respaldado por FNaF LATAM™`;
  }

  // Solicitar nombre de sala
  if (!text) {
    return m.reply(
      `🧩 Protocolo de Juego: Tres en Raya Activado\n\n⚙️ Ingreso incompleto. Necesitas asignar un identificador de sala.\n\n📌 *Ejemplo:* ${usedPrefix + command} nueva_sala\n\n— Sistema respaldado por FNaF LATAM™`,
      m.chat
    );
  }

  // Buscar si ya existe una sala con ese nombre esperando jugador
  let room = Object.values(conn.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true));

  if (room) {
    await m.reply(`📡 Segundo operador registrado.\nIniciando protocolo FazPlay™...`);

    room.o = m.chat;
    room.game.playerO = m.sender;
    room.state = 'PLAYING';

    const arr = room.game.render().map((v) => {
      return {
        X: '❎',
        O: '⭕',
        1: '1️⃣',
        2: '2️⃣',
        3: '3️⃣',
        4: '4️⃣',
        5: '5️⃣',
        6: '6️⃣',
        7: '7️⃣',
        8: '8️⃣',
        9: '9️⃣',
      }[v];
    });

    const str = `
🎮 TRES EN RAYA: SISTEMA DE ENFRENTAMIENTO 🎮

❎ = Unidad @${room.game.playerX.split('@')[0]}  
⭕ = Unidad @${room.game.playerO.split('@')[0]}

██ ██ ██
${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}
██ ██ ██

🎯 Turno de @${room.game.currentTurn.split('@')[0]}

— Protocolo FazWatch™ v1.3.7 activo
— Sistema respaldado por FNaF LATAM™
`.trim();

    if (room.x !== room.o) await conn.sendMessage(room.x, { text: str, mentions: conn.parseMention(str) }, { quoted: m });
    await conn.sendMessage(room.o, { text: str, mentions: conn.parseMention(str) }, { quoted: m });
  } else {
    // Crear nueva sala
    room = {
      id: 'tictactoe-' + Date.now(),
      x: m.chat,
      o: '',
      game: new TicTacToe(m.sender, 'o'),
      state: 'WAITING',
      name: text
    };

    conn.reply(
      m.chat,
      `🧩 MÓDULO DE COMBATE FNaF LATAM™ — TRES EN RAYA ACTIVADO 🧩\n\n📡 Unidad registrada: @${m.sender.split('@')[0]}\n\n⌛ En espera de segundo jugador...\n\n📝 Para cancelar esta operación usa: *${usedPrefix}delttt*\n\n🎮 Para unirse: *${usedPrefix + command} ${text}*\n\n— Sistema respaldado por FNaF LATAM™`,
      m
    );

    conn.game[room.id] = room;
  }
};

handler.command = ['ttt', 'tictactoe'];
handler.group = true;
handler.register = true;

export default handler;
