// 🕹️ Comando UCN — FNaF LATAM™ 
// Desafía la Ultimate Custom Night. Si fallás, los animatrónicos no te perdonarán. Si ganás, las recompensas son legendarias.

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

const cooldown = 5 * 60 * 1000; // 5 minutos

const escenariosVictoria = [
  `🏆 Superaste el *50/20 Mode* sin errores. Has demostrado ser el guardia supremo. *+${ganancia}* FazTokens.`,
  `🎮 Toy Freddy ganó su partida de FNaF gracias a tu vigilancia. Triunfaste. *+${ganancia}* FazTokens.`,
  `🧸 Compraste el peluche de Nightmare Bonnie a tiempo. ¡Victoria sin rasguños! *+${ganancia}* FazTokens.`,
  `🎭 Pusiste la máscara justo cuando Golden Freddy apareció. Te salvaste de milagro. *+${ganancia}* FazTokens.`,
  `🔕 Silenciaste la llamada de Phone Guy antes de causar alboroto. Recompensa: *+${ganancia}* FazTokens.`,
  `💡 Iluminaste a los Freddles a tiempo. Nightmare Freddy jamás tuvo oportunidad. *+${ganancia}* FazTokens.`,
  `🔒 Cerraste las compuertas a Ennard y Molten Freddy justo a tiempo. Dominaste los conductos. *+${ganancia}* FazTokens.`,
  `🎵 Mantuiste la caja musical cargada toda la noche. El Puppet jamás se despertó. *+${ganancia}* FazTokens.`,
  `🐥 Cambiaste la música a tiempo. Chica no tuvo oportunidad de acercarse. *+${ganancia}* FazTokens.`,
  `💰 Reuniste las Fazcoins y le pagaste a Rockstar Freddy. Evitaste su ataque con clase. *+${ganancia}* FazTokens.`
];

const escenariosDerrota = [
  `🕹️ Toy Freddy perdió su partida de FNaF... y vos también. Perdiste *-${perdida}* FazTokens.`,
  `🛑 No pusiste la máscara a tiempo. Withered Bonnie te reconoció. Susto fatal. *-${perdida}* FazTokens.`,
  `🎶 Olvidaste mantener la caja musical cargada. El Puppet se soltó. *-${perdida}* FazTokens.`,
  `🔥 La temperatura superó los 100°C. Jack-O-Chica te incineró. *-${perdida}* FazTokens.`,
  `🎭 No te pusiste la máscara con Golden Freddy. El error fue letal. *-${perdida}* FazTokens.`,
  `🔊 Hiciste demasiado ruido. Music Man despertó... y no tuvo piedad. *-${perdida}* FazTokens.`,
  `🧸 No compraste el peluche a tiempo. Nightmare Fredbear se lanzó sobre vos. *-${perdida}* FazTokens.`,
  `📞 Dejaste sonar el teléfono. El ruido atrajo compañía mortal. *-${perdida}* FazTokens.`,
  `🚪 No cerraste la puerta cuando Ennard llegó por el ducto. Perdiste *-${perdida}* FazTokens.`,
  `🐇 No vigilaste el ducto correctamente. Molten Freddy te atrapó por sorpresa. *-${perdida}* FazTokens.`
];

const textoPrevio = `
🕹️ *Iniciando Ultimate Custom Night...*

🎛️ Configurando dificultad personalizada: 50/20  
📡 Sincronizando con el sistema FazbearNet™...  
🔌 Verificando cámaras, ventilaciones y generador...

🎬 *Todo listo... Comienza la noche.*
`;

const handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender];
  const tiempoRestante = cooldown - (Date.now() - (user.lastucn || 0));

  if (tiempoRestante > 0) {
    return conn.reply(
      m.chat,
      `🕒 *Cooldown activo*\n\n⏳ Podés volver a jugar en *${msToTime(tiempoRestante)}*.\n\n💡 Comando sugerido por Criss — 50379661965\n\n— Sistema respaldado por FNaF LATAM™`,
      m
    );
  }

  // Mensaje narrativo previo
  await conn.reply(m.chat, textoPrevio, m);

  // Espera artificial de 3 segundos antes del resultado
  await new Promise(resolve => setTimeout(resolve, 10000));

  const exito = Math.random() < 0.5; // 50% probabilidad

  if (exito) {
    const ganancia = Math.floor(Math.random() * 251) + 250; // 250–500
    user.coin += ganancia;

    const textoVictoria = pickRandom(escenariosVictoria)
      .replace('${ganancia}', ganancia);

    await conn.reply(m.chat, textoVictoria, m);
  } else {
    const perdida = Math.floor(Math.random() * 101) + 50; // 50–150
    user.coin = Math.max(0, user.coin - perdida);

    const textoDerrota = pickRandom(escenariosDerrota)
      .replace('${perdida}', perdida);

    await conn.reply(m.chat, textoDerrota, m);
  }

  user.lastucn = Date.now();
};

handler.help = ['ucn'];
handler.tags = ['rpg'];
handler.command = ['ucn'];
handler.register = true;
handler.group = true;

export default handler;

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  return `${minutes} minuto(s) y ${seconds} segundo(s)`;
}
