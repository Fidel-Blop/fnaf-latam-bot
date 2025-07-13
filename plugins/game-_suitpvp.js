const handler = (m) => m;

handler.before = async function(m) {
  this.suit = this.suit || {};
  if (db.data.users[m.sender].suit < 0) db.data.users[m.sender].suit = 0;

  const room = Object.values(this.suit).find(room => room.id && room.status && [room.p, room.p2].includes(m.sender));
  if (room) {
    let win = '';
    let tie = false;

    if (
      m.sender == room.p2 &&
      /^(acc(ept)?|terima|aceptar|gas|aceptare?|nao|gamau|rechazar|ga(k.)?bisa)/i.test(m.text) &&
      m.isGroup &&
      room.status == 'wait'
    ) {
      if (/^(tolak|gamau|rechazar|ga(k.)?bisa)/i.test(m.text)) {
        const msg = `🛑 @${room.p2.split`@`[0]} ha rechazado el *PvP*. La partida ha sido cancelada.`;
        m.reply(msg, null, { mentions: this.parseMention(msg) });
        delete this.suit[room.id];
        return !0;
      }

      room.status = 'play';
      room.asal = m.chat;
      clearTimeout(room.waktu);

      const textplay = `🎮 *PvP Activado - FNaF LATAM Arena* 🎮\n\n🔔 ¡El enfrentamiento ha comenzado!\n🧸 @${room.p.split`@`[0]} vs @${room.p2.split`@`[0]}\n\n📩 Revisen su chat privado y elijan su arma:\n> piedra, papel o tijera.\n\n*Responder por privado a wa.me/${conn.user.jid.split`@`[0]}*`;
      m.reply(textplay, m.chat, { mentions: this.parseMention(textplay) });

      const intro = `👁️ *Selecciona tu opción:*\n\n🪨 piedra\n📄 papel\n✂️ tijera\n\n🥇 Ganador +${room.poin} XP\n💀 Perdedor -${room.poin_lose} XP\n\n🔧 *Responde con la palabra clave*\nEjemplo: *papel*`;

      if (!room.pilih) this.sendMessage(room.p, { text: intro }, { quoted: m });
      if (!room.pilih2) this.sendMessage(room.p2, { text: intro }, { quoted: m });

      room.waktu_milih = setTimeout(() => {
        const cancel = `🕐 Tiempo agotado. Nadie eligió. El PvP ha sido cancelado.`;
        if (!room.pilih && !room.pilih2) {
          this.sendMessage(m.chat, { text: cancel }, { quoted: m });
        } else if (!room.pilih || !room.pilih2) {
          win = !room.pilih ? room.p2 : room.p;
          const msg = `⚠️ @${(room.pilih ? room.p2 : room.p).split`@`[0]} no eligió. El enfrentamiento terminó automáticamente.`;
          this.sendMessage(m.chat, { text: msg }, { mentions: this.parseMention(msg) });
          db.data.users[win].exp += room.poin + room.poin_bot;
          db.data.users[win == room.p ? room.p2 : room.p].exp -= room.poin_lose;
        }
        delete this.suit[room.id];
        return !0;
      }, room.timeout);
    }

    const isP1 = m.sender == room.p;
    const isP2 = m.sender == room.p2;
    const g = /tijera/i, b = /piedra/i, k = /papel/i;
    const reg = /^(tijera|piedra|papel)/i;

    if (isP1 && reg.test(m.text) && !room.pilih && !m.isGroup) {
      room.pilih = reg.exec(m.text.toLowerCase())[0];
      m.reply(`✅ Has elegido *${room.pilih}*. Regresa al grupo.`);
      if (!room.pilih2) this.reply(room.p2, `🎮 Tu oponente ya eligió. ¡Es tu turno!`, 0);
    }

    if (isP2 && reg.test(m.text) && !room.pilih2 && !m.isGroup) {
      room.pilih2 = reg.exec(m.text.toLowerCase())[0];
      m.reply(`✅ Has elegido *${room.pilih2}*. Regresa al grupo.`);
      if (!room.pilih) this.reply(room.p, `🎮 Tu oponente ya eligió. ¡Es tu turno!`, 0);
    }

    if (room.pilih && room.pilih2) {
      clearTimeout(room.waktu_milih);

      if (b.test(room.pilih) && g.test(room.pilih2)) win = room.p;
      else if (b.test(room.pilih) && k.test(room.pilih2)) win = room.p2;
      else if (g.test(room.pilih) && k.test(room.pilih2)) win = room.p;
      else if (g.test(room.pilih) && b.test(room.pilih2)) win = room.p2;
      else if (k.test(room.pilih) && b.test(room.pilih2)) win = room.p;
      else if (k.test(room.pilih) && g.test(room.pilih2)) win = room.p2;
      else if (room.pilih == room.pilih2) tie = true;

      const resultado = `
🧸 *FNaF PvP - Resultados Finales* 🧸

${tie ? '🤝 *Empate técnico!*' : ''}

👤 @${room.p.split`@`[0]} (${room.pilih})
${tie ? '' : room.p == win ? `🎉 *Ganó* (+${room.poin} XP)` : `💀 *Perdió* (-${room.poin_lose} XP)`}

👤 @${room.p2.split`@`[0]} (${room.pilih2})
${tie ? '' : room.p2 == win ? `🎉 *Ganó* (+${room.poin} XP)` : `💀 *Perdió* (-${room.poin_lose} XP)`}`.trim();

      this.reply(room.asal, resultado, m, { mentions: [room.p, room.p2] });

      if (!tie) {
        db.data.users[win].exp += room.poin + room.poin_bot;
        db.data.users[win == room.p ? room.p2 : room.p].exp -= room.poin_lose;
      }
      delete this.suit[room.id];
    }
  }
  return !0;
};

handler.exp = 0;
export default handler;

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
