import { format } from 'util';
const debugMode = !1;
const winScore = 4999;
const playScore = 99;

export async function before(m) {
  let ok;
  let isWin = false;
  let isTie = false;
  let isSurrender = false;

  this.game = this.game || {};
  const room = Object.values(this.game).find(
    (room) =>
      room.id &&
      room.game &&
      room.state &&
      room.id.startsWith('tictactoe') &&
      [room.game.playerX, room.game.playerO].includes(m.sender) &&
      room.state === 'PLAYING'
  );

  if (room) {
    if (!/^([1-9]|(me)?nyerah|rendirse|RENDIRSE|surr?ender)$/i.test(m.text)) return !0;

    isSurrender = !/^[1-9]$/.test(m.text);

    if (m.sender !== room.game.currentTurn && !isSurrender) return !0;

    if (debugMode) {
      m.reply('[DEBUG]\n' + format({ isSurrender, text: m.text }));
    }

    if (!isSurrender && (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1)) < 1) {
      m.reply(
        {
          '-3': '⚠️ Sistema detectó: El juego ya ha concluido.',
          '-2': '⚠️ Entrada no válida.',
          '-1': '⚠️ Posición inválida.',
          '0': '⚠️ Casilla ocupada.',
        }[ok]
      );
      return !0;
    }

    if (m.sender === room.game.winner) {
      isWin = true;
    } else if (room.game.board === 511) {
      isTie = true;
    }

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

    if (isSurrender) {
      room.game._currentTurn = m.sender === room.game.playerX;
      isWin = true;
    }

    const winner = isSurrender ? room.game.currentTurn : room.game.winner;
    const turnoActual = room.game.currentTurn.split('@')[0];
    const jugadorX = room.game.playerX.split('@')[0];
    const jugadorO = room.game.playerO.split('@')[0];

    const str = `
📡 *SISTEMA DE SIMULACIÓN DE JUEGO - FNaF LATAM™*

🎮 *TRES EN RAYA — MÓDULO DE COMBATE LÚDICO* 🎮
━━━━━━━━━━━━━━━
❎ = @${jugadorX}
⭕ = @${jugadorO}

📟 Estado del tablero:
${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

${isWin 
  ? `👁 *@${winner.split('@')[0]} ha ganado el enfrentamiento virtual.*\n🏆 Recompensa asignada: +${winScore} XP` 
  : isTie 
    ? '🤖 Resultado: EMPATE — El sistema no detectó un ganador.' 
    : `🎮 Esperando acción de: @${turnoActual}`
}
━━━━━━━━━━━━━━━
🛡 *Registro seguro bajo vigilancia Freddy Fazbear™*
`.trim();

    const users = global.db.data.users;

    // Asegurar consistencia de ID de chat
    if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat) {
      room[room.game._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat;
    }

    // Enviar resultados a ambos jugadores
    if (room.x !== room.o) {
      await this.sendMessage(room.x, { text: str, mentions: this.parseMention(str) }, { quoted: m });
    }

    await this.sendMessage(room.o, { text: str, mentions: this.parseMention(str) }, { quoted: m });

    // Finalizar juego si hay ganador o empate
    if (isTie || isWin) {
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

  return !0;
}
