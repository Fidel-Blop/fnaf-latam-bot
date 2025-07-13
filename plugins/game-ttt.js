import TicTacToe from '../lib/tictactoe.js';

const handler = async (m, {conn, usedPrefix, command, text}) => {
  conn.game = conn.game || {};

  if (Object.values(conn.game).find((room) => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) {
    throw `☠️ *¡Alerta!* Aún tienes una partida activa. Termínala antes de empezar otra.`;
  }

  if (!text) {
    return m.reply(`👾 *FNaF LATAM* 👾\n\nPara comenzar, debes escribir el nombre de la sala.\n\n*Ejemplo:*\n*${usedPrefix + command} sala_fnaf*\n\n*🕹 ¡Prepárate para el duelo terrorífico!*`, m.chat);
  }

  let room = Object.values(conn.game).find((room) => room.state === 'WAITING' && (text ? room.name === text : true));

  if (room) {
    await m.reply(`👻 *¡Un valiente se ha unido!* Iniciando la partida...`);
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
🎲 *FNaF LATAM - TRES EN RAYA* 🎲

❎ = @${room.game.playerX.split('@')[0]}
⭕ = @${room.game.playerO.split('@')[0]}

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

⚡ Turno de: @${room.game.currentTurn.split('@')[0]}

*Que la noche te acompañe...* 👁️
`.trim();

    if (room.x !== room.o) await conn.sendMessage(room.x, {text: str, mentions: conn.parseMention(str)}, {quoted: m});
    await conn.sendMessage(room.o, {text: str, mentions: conn.parseMention(str)}, {quoted: m});
  } else {
    room = {
      id: 'tictactoe-' + Date.now(),
      x: m.chat,
      o: '',
      game: new TicTacToe(m.sender, 'o'),
      state: 'WAITING',
      name: text
    };

    const imgplay = `https://i.imgur.com/NzZ9pjB.png`; // Imagen sugerida FNaF LATAM (puedes cambiar)
    conn.reply(m.chat, `🎮 *FNaF LATAM - TRES EN RAYA* 🎮\n\n👤 Esperando al segundo jugador para iniciar la batalla...\n\n🛑 Para salir o eliminar la sala usa: *${usedPrefix}delttt*\n\n🕹️ Para unirte, escribe:\n*${usedPrefix + command} ${text}*\n\n*La noche es oscura y llena de terrores...*`, m);
    conn.game[room.id] = room;
  }
};

handler.command = ['ttt', 'tictactoe'];
handler.group = true;
handler.register = true;

export default handler;
