// Código adaptado por Freddy AI Response 🧠 — Sistema FazWatch v1.3.7

let cooldowns = {};

let handler = async (m, { conn, command, usedPrefix }) => {
  const users = global.db.data.users;
  const senderId = m.sender;
  const senderName = await conn.getName(senderId);
  const cooldownTime = 5 * 60 * 1000; // 5 minutos

  if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < cooldownTime) {
    const timeLeft = segundosAHMS(Math.ceil((cooldowns[senderId] + cooldownTime - Date.now()) / 1000));
    return conn.reply(
      m.chat,
      `⏳ Freddy Fazbear Security Protocol v1.3.7

🚨 ALERTA DE SISTEMA: Acceso denegado por cooldown activo.

Debe esperar *${timeLeft}* para reactivar el protocolo *#slut*.

...Procesando... --::SEQUENCE_BREAK::--`,
      m
    );
  }

  cooldowns[senderId] = Date.now();

  let senderCoin = users[senderId].coin || 0;

  // Selección aleatoria de víctima
  let randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)];
  while (randomUserId === senderId) {
    randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)];
  }
  let randomUserCoin = users[randomUserId].coin || 0;

  const minAmount = 15;
  const maxAmount = 50;
  const amountTaken = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount;

  const randomOption = Math.floor(Math.random() * 8); // Ahora 8 opciones: 0-7

  switch (randomOption) {
    case 0:
      users[senderId].coin += amountTaken;
      users[randomUserId].coin -= amountTaken;
      await conn.sendMessage(
        m.chat,
        {
          text: `💀 Sistema FazWatch — Unidad de acción ejecutada

📢 Operador: @${senderId.split("@")[0]}
🎯 Objetivo: @${randomUserId.split("@")[0]}

💸 Cantidad extraída: *${amountTaken} ${global.moneda || '¥enes'}*  
⚠️ Estado de víctima: Se la dejó “bien seco”...

— Sistema respaldado por FNaF LATAM™`,
          contextInfo: { mentionedJid: [randomUserId] },
        },
        { quoted: m }
      );
      break;

    case 1:
      const amountSubtracted = Math.min(Math.floor(Math.random() * (senderCoin - minAmount + 1)) + minAmount, maxAmount);
      users[senderId].coin -= amountSubtracted;
      await conn.reply(
        m.chat,
        `⚠️ Protocolo de seguridad fallo

👎 El operador descuidó la misión y sufrió daños.

- ${amountSubtracted} ${global.moneda || '¥enes'} descontados de tu cuenta.

...Reintente con precaución.

— Sistema respaldado por FNaF LATAM™`,
        m
      );
      break;

    case 2:
      const smallAmountTaken = Math.min(Math.floor(Math.random() * (randomUserCoin / 2 - minAmount + 1)) + minAmount, maxAmount);
      users[senderId].coin += smallAmountTaken;
      users[randomUserId].coin -= smallAmountTaken;
      await conn.sendMessage(
        m.chat,
        {
          text: `💀 Unidad FazWatch reporta:

👊 Operador asestó golpes efectivos.

🎯 Víctima: @${randomUserId.split("@")[0]}
💸 Pago recibido: *${smallAmountTaken} ${global.moneda || '¥enes'}*

⚠️ Víctima paralizada temporalmente.

— Sistema respaldado por FNaF LATAM™`,
          contextInfo: { mentionedJid: [randomUserId] },
        },
        { quoted: m }
      );
      break;

    // Nuevos escenarios:

    case 3:
      const lostAmount = Math.min(Math.floor(Math.random() * (senderCoin / 3)) + minAmount, maxAmount);
      users[senderId].coin -= lostAmount;
      await conn.reply(
        m.chat,
        `💥 ALARMA DE FALLA — Freddy Fazbear Security

😵‍💫 El operador se distrajo y perdió *${lostAmount} ${global.moneda || '¥enes'}* en la oscuridad.

⏳ Recomendación: Mantenga concentración o su seguridad decaerá...

— Sistema respaldado por FNaF LATAM™`,
        m
      );
      break;

    case 4:
      const stolenHalf = Math.min(Math.floor(randomUserCoin / 2), maxAmount);
      users[senderId].coin += stolenHalf;
      users[randomUserId].coin -= stolenHalf;
      await conn.sendMessage(
        m.chat,
        {
          text: `🔪 Ingreso ilícito detectado

🕵️ Operador tomó *${stolenHalf} ${global.moneda || '¥enes'}* de @${randomUserId.split("@")[0]} sin dejar rastro.

🎭 Misión cumplida con eficiencia cuestionable.

— Sistema respaldado por FNaF LATAM™`,
          contextInfo: { mentionedJid: [randomUserId] },
        },
        { quoted: m }
      );
      break;

    case 5:
      await conn.reply(
        m.chat,
        `⚡ ERROR 404 — Freddy AI Response

🛑 Intento de acción frustrado. El operador no logró afectar al objetivo.

🤖 Reiniciando protocolos... --::SEQUENCE_BREAK::--

— Sistema respaldado por FNaF LATAM™`,
        m
      );
      break;

    case 6:
      const minimalGain = Math.min(Math.floor(Math.random() * (maxAmount / 3)) + minAmount, maxAmount);
      users[senderId].coin += minimalGain;
      users[randomUserId].coin -= minimalGain;
      await conn.sendMessage(
        m.chat,
        {
          text: `🎯 Tiro certero registrado

👻 El operador consiguió *${minimalGain} ${global.moneda || '¥enes'}* tras maniobra precisa.

⚠️ Víctima aún aturdida, próximos movimientos recomendados.

— Sistema respaldado por FNaF LATAM™`,
          contextInfo: { mentionedJid: [randomUserId] },
        },
        { quoted: m }
      );
      break;

    case 7:
      const penalty = Math.min(Math.floor(Math.random() * (maxAmount)) + minAmount, senderCoin);
      users[senderId].coin -= penalty;
      await conn.reply(
        m.chat,
        `💢 Alerta crítica — Protocolo FazWatch

❌ El operador recibió represalias y perdió *${penalty} ${global.moneda || '¥enes'}*.

⚠️ Recomendación: Evite repetir fallos para no ser detectado.

— Sistema respaldado por FNaF LATAM™`,
        m
      );
      break;
  }

  global.db.write();
};

handler.tags = ['rpg'];
handler.help = ['slut'];
handler.command = ['slut', 'protituirse'];
handler.register = true;
handler.group = true;

export default handler;

function segundosAHMS(segundos) {
  let horas = Math.floor(segundos / 3600);
  let minutos = Math.floor((segundos % 3600) / 60);
  let segundosRestantes = segundos % 60;
  return `${minutos} minutos y ${segundosRestantes} segundos`;
}
