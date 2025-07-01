const handler = (m) => m;

handler.before = async function (m) {
  this.suit = this.suit || {};

  if (db.data.users[m.sender].suit < 0) db.data.users[m.sender].suit = 0;

  const room = Object.values(this.suit).find((room) => room.id && room.status && [room.p, room.p2].includes(m.sender));

  if (room) {
    let win = '';
    let tie = false;

    if (
      m.sender === room.p2 &&
      /^(acc(ept)?|terima|aceptar|gas|aceptare?|nao|gamau|rechazar|ga(k.)?bisa)/i.test(m.text) &&
      m.isGroup &&
      room.status === 'wait'
    ) {
      if (/^(tolak|gamau|rechazar|ga(k.)?bisa)/i.test(m.text)) {
        const textno = `📡 *PVP ABORTADO*

@${room.p2.split`@`[0]} canceló el enfrentamiento.  
— Sistema FNaF LATAM™`;
        m.reply(textno, null, { mentions: this.parseMention(textno) });
        delete this.suit[room.id];
        return !0;
      }

      room.status = 'play';
      room.asal = m.chat;
      clearTimeout(room.waktu);

      const textplay = `🎮 *SIMULADOR DE COMBATE PVP ACTIVADO* 🎮

🧠 Sistema de elección en marcha...

> Participantes identificados:  
🔹 @${room.p.split`@`[0]}  
🔹 @${room.p2.split`@`[0]}

📥 Instrucciones enviadas por canal privado.  
🎥 Monitoreo en curso...`;

      m.reply(textplay, m.chat, { mentions: this.parseMention(textplay) });

      const mensaje = `🧠 *Sistema de batalla Freddy Fazbear™*

Elige tu arma de combate:
— piedra
— papel
— tijera

⚠️ Ganador obtiene +${room.poin}XP  
🪦 Perdedor pierde ${room.poin_lose}XP

📩 *Responde este mensaje con tu opción*`;

      if (!room.pilih) this.sendMessage(room.p, { text: mensaje }, { quoted: m });
      if (!room.pilih2) this.sendMessage(room.p2, { text: mensaje }, { quoted: m });

      room.waktu_milih = setTimeout(() => {
        const sinMovimiento = `📡 *PROTOCOLO DE INACTIVIDAD DETECTADO*

Ningún participante respondió a tiempo.  
⛔ PVP cancelado por inactividad.`;

        if (!room.pilih && !room.pilih2) this.sendMessage(m.chat, { text: sinMovimiento }, { quoted: m });
        else if (!room.pilih || !room.pilih2) {
          win = !room.pilih ? room.p2 : room.p;
          const textoIncompleto = `⚠️ @${(room.pilih ? room.p2 : room.p).split`@`[0]} no eligió ninguna opción.  
PVP anulado. Ganador por abandono.`;
          this.sendMessage(m.chat, { text: textoIncompleto }, { quoted: m, mentions: this.parseMention(textoIncompleto) });

          db.data.users[win].exp += room.poin + room.poin_bot;
          db.data.users[win == room.p ? room.p2 : room.p].exp -= room.poin_lose;
        }
        delete this.suit[room.id];
        return !0;
      }, room.timeout);
    }

    const jwb = m.sender === room.p;
    const jwb2 = m.sender === room.p2;
    const g = /tijera/i;
    const b = /piedra/i;
    const k = /papel/i;
    const reg = /^(tijera|piedra|papel)/i;

    if (jwb && reg.test(m.text) && !room.pilih && !m.isGroup) {
      room.pilih = reg.exec(m.text.toLowerCase())[0];
      room.text = m.text;
      m.reply(`📡 *Elección registrada:* ${m.text}\nVuelve al grupo para ver el resultado...`);
      if (!room.pilih2) this.reply(room.p2, `📩 Tu oponente ya eligió, ¡es tu turno!`, 0);
    }

    if (jwb2 && reg.test(m.text) && !room.pilih2 && !m.isGroup) {
      room.pilih2 = reg.exec(m.text.toLowerCase())[0];
      room.text2 = m.text;
      m.reply(`📡 *Elección registrada:* ${m.text}\nVuelve al grupo para ver el resultado...`);
      if (!room.pilih) this.reply(room.p, `📩 Tu oponente ya eligió, ¡es tu turno!`, 0);
    }

    const stage = room.pilih;
    const stage2 = room.pilih2;

    if (room.pilih && room.pilih2) {
      clearTimeout(room.waktu_milih);

      if (b.test(stage) && g.test(stage2)) win = room.p;
      else if (b.test(stage) && k.test(stage2)) win = room.p2;
      else if (g.test(stage) && k.test(stage2)) win = room.p;
      else if (g.test(stage) && b.test(stage2)) win = room.p2;
      else if (k.test(stage) && b.test(stage2)) win = room.p;
      else if (k.test(stage) && g.test(stage2)) win = room.p2;
      else if (stage === stage2) tie = true;

      const resultado = `
🎥 *SISTEMA DE COMBATE — REGISTRO FINAL*

⚙️ @${room.p.split`@`[0]} (${room.text}) ${tie ? '' : room.p === win ? `🟢 *GANADOR +${room.poin}XP*` : `🔴 *PERDIÓ ${room.poin_lose}XP*`}
⚙️ @${room.p2.split`@`[0]} (${room.text2}) ${tie ? '' : room.p2 === win ? `🟢 *GANADOR +${room.poin}XP*` : `🔴 *PERDIÓ ${room.poin_lose}XP*`}
${tie ? '⚖️ *RESULTADO: EMPATE*' : ''}

🧠 Registro archivado por Freddy Fazbear Security Protocol™`;

      this.reply(room.asal, resultado.trim(), m, { mentions: [room.p, room.p2] });

      if (!tie) {
        db.data.users[win].exp += room.poin + room.poin_bot;
        db.data.users[win === room.p ? room.p2 : room.p].exp -= room.poin_lose;
      }

      delete this.suit[room.id];
    }
  }

  return !0;
};

handler.exp = 0;
export default handler;
