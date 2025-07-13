import { format } from 'util';

const debugMode = false;
const winScore = 4999;
const playScore = 99;

export async function before(m) {
  let ok;
  let isWin = false;
  let isTie = false;
  let isSurrender = false;

  this.game = this.game || {};

  const room = Object.values(this.game).find(room =>
    room.id &&
    room.game &&
    room.state === 'PLAYING' &&
    room.id.startsWith('tictactoe') &&
    [room.game.playerX, room.game.playerO].includes(m.sender)
  );

  if (room) {
    const surrenderRegex = /^([1-9]|me?nyerah|rendirse|surr?ender)$/i;

    if (!surrenderRegex.test(m.text)) return true;

    isSurrender = !/^[1-9]$/.test(m.text);

    if (m.sender !== room.game.currentTurn && !isSurrender) return true;

    if (debugMode) {
      m.reply('[DEBUG]\n' + format({ isSurrender, text: m.text }));
    }

    // Movimiento en el tablero
    if (!isSurrender && (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1)) < 1) {
      m.reply({
        '-3': '⚠️ El juego ya ha terminado.',
        '-2': '❌ Movimiento inválido.',
        '-1': '❌ Posición fuera del rango.',
        '0': '🚫 Casilla ocupada.'
      }[ok]);
      return true;
    }

    if (m.sender === room.game.winner) {
      isWin = true;
    } else if (room.game.board === 511) {
      isTie = true;
    }

    // Tablero renderizado con emojis
    const board = room.game.render().map(v => ({
      X: '❎', O: '⭕',
      1: '1️⃣', 2: '2️⃣', 3: '3️⃣',
      4: '4️⃣', 5: '5️⃣', 6: '6️⃣',
      7: '7️⃣', 8: '8️⃣', 9: '9️⃣'
    }[v]));

    if (isSurrender) {
      room.game._currentTurn = m.sender === room.game.playerX;
      isWin = true;
    }

    const winner = isSurrender ? room.game.currentTurn : room.game.winner;

    const str = `
🎮 *TRES EN RAYA - MODO FNaF* 🎮

❎ = @${room.game.playerX.split('@')[0]}
⭕ = @${room.game.playerO.split('@')[0]}

${board.slice(0, 3).join('')}
${board.slice(3, 6).join('')}
${board.slice(6).join('')}

${isWin
      ? `🏆 ¡@${winner.split('@')[0]} ha ganado el duelo! +${winScore} XP 🎉`
      : isTie
        ? '🤝 El juego ha terminado en empate.'
        : `⏳ Turno de: @${room.game.currentTurn.split('@')[0]}`
}
`.trim();

    const users = global.db.data.users;
    if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat) {
      room[room.game._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat;
    }

    if (room.x !== room.o) {
      await this.sendMessage(room.x, { text: str, mentions: this.parseMention(str) }, { quoted: m });
    }
    await this.sendMessage(room.o, { text: str, mentions: this.parseMention(str) }, { quoted: m });

    if (isWin || isTie) {
      users[room.game.playerX].exp += playScore;
      users[room.game.playerO].exp += playScore;

      if (isWin) {
        users[winner].exp += winScore - playScore;
      }

      if (debugMode) {
        m.reply('[DEBUG]\n' + format(room));
      }

      delete this.game[room.id];
    }
  }
  return true;
}
