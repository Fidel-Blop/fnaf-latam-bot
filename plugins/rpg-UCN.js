// 🕹️ Comando UCN — FNaF LATAM™ 
// Desafía la Ultimate Custom Night. Si fallás, los animatrónicos no te perdonarán. Si ganás, las recompensas son legendarias.

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

const cooldown = 5 * 60 * 1000; // 5 minutos

const escenariosVictoria = [
  `🏆 ¡Completaste la noche 50/20 sin un rasguño! Ganaste +*${'${ganancia}'}* FazTokens.`,
  `🎉 Superaste la UCN en modo caos absoluto. Te recompensan con +*${'${ganancia}'}* FazTokens.`,
  `🔥 Sobreviviste a Golden Freddy Mode. Tus reflejos impresionaron a todos. +*${'${ganancia}'}* FazTokens.`,
  `💡 Desactivaste todos los sistemas a tiempo. Springtrap jamás te alcanzó. +*${'${ganancia}'}* FazTokens.`,
  `📸 Freddy fue cegado por tu Flash... ¡y ganaste el reto! Te llevás +*${'${ganancia}'}* FazTokens.`
];

const escenariosDerrota = [
  `😵 *No le cerraste la ventilación a Molten Freddy.* Perdiste -*${'${perdida}'}* FazTokens.`,
  `🔇 *Te olvidaste de silenciar a Phone Guy.* Fuiste detectado. Te quitaron -*${'${perdida}'}* FazTokens.`,
  `🌀 *No resististe los jumpscares de Nightmare BB.* Tu alma se fragmentó. -*${'${perdida}'}* FazTokens.`,
  `🥶 *Lefty te localizó por el ruido.* El susto te hizo soltar -*${'${perdida}'}* FazTokens.`,
  `💀 *Funtime Foxy apareció a la hora incorrecta.* Perdiste -*${'${perdida}'}* FazTokens.`
];

const handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender];
  const tiempoRestante = cooldown - (Date.now() - (user.lastucn || 0));

  if (tiempoRestante > 0) {
    return conn.reply(
      m.chat,
      `🕒 *Cooldown activo*\n\n⏳ Podés volver a jugar en *${msToTime(tiempoRestante)}*.\n\n💡 Comando sugerido por Criss — 50379661965 \n\n — Sistema respaldado por FNaF LATAM™`
      ,
      m
    );
  }

  const exito = Math.random() < 0.5; // 50% probabilidad de ganar o perder

  if (exito) {
    const ganancia = Math.floor(Math.random() * 251) + 250; // 250–500 FazTokens
    user.coin += ganancia;

    const textoVictoria = pickRandom(escenariosVictoria)
      .replace('${ganancia}', ganancia);

    await conn.reply(m.chat, textoVictoria, m);
  } else {
    const perdida = Math.floor(Math.random() * 101) + 50; // 50–150 FazTokens
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
