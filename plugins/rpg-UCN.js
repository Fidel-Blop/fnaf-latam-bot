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
  `📸 Freddy fue cegado por tu Flash... ¡y ganaste el reto! Te llevás +*${'${ganancia}'}* FazTokens.`, 
  `🧠 *Dominaste cada mecánica sin fallar una sola vez.* El bot lo registró como un récord legendario. +*${'${ganancia}'}* FazTokens.`,
  `📀 *Lograste silenciar a todos los animatrónicos a tiempo.* El silencio fue tu mayor arma. +*${'${ganancia}'}* FazTokens.`,
  `🔋 *Manejaste la energía con precisión quirúrgica.* No se cortó la luz en toda la noche. Recompensa: +*${'${ganancia}'}* FazTokens.`,
  `🔦 *Con tu flash bien dirigido, mantuviste a todos a raya.* Los animatrónicos no tuvieron oportunidad. +*${'${ganancia}'}* FazTokens.`,
  `📊 *Supervisaste todos los monitores como un guardia veterano.* El sistema FazbearNet™ te premia con +*${'${ganancia}'}* FazTokens.`, 
];

const escenariosDerrota = [
  `😵 *No le cerraste la ventilación a Molten Freddy.* Perdiste -*${'${perdida}'}* FazTokens.`,
  `🔇 *Te olvidaste de silenciar a Phone Guy.* Fuiste detectado. Te quitaron -*${'${perdida}'}* FazTokens.`,
  `🌀 *No resististe los jumpscares de Nightmare BB.* Tu alma se fragmentó. -*${'${perdida}'}* FazTokens.`,
  `🥶 *Lefty te localizó por el ruido.* El susto te hizo soltar -*${'${perdida}'}* FazTokens.`,
  `💀 *Funtime Foxy apareció a la hora incorrecta.* Perdiste -*${'${perdida}'}* FazTokens.`, 
  `📡 *Olvidaste revisar el sistema de ventilación.* Ennard se coló sin que lo notes. Perdiste -*${'${perdida}'}* FazTokens.`,
  `🪫 *Sobrecalentaste el generador.* Los animatrónicos aprovecharon el caos. Te arrebataron -*${'${perdida}'}* FazTokens.`,
  `🔊 *El ruido del sistema atrajo a Music Man.* No pudiste esquivarlo. Perdiste -*${'${perdida}'}* FazTokens.`,
  `📉 *Ignoraste el medidor de temperatura.* Fue tu final. Los FazTokens se derritieron: -*${'${perdida}'}*`,
  `🔪 *A Nightmare Freddy no le gustó que descuidaras la cama.* Te quitó -*${'${perdida}'}* FazTokens por el susto.`, 
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
