const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;

var handler = async (m, { conn, text }) => {
  conn.reply(m.chat, `🤖 Buscando un facto en el Backstage... espera un instante...`, m);

  conn.reply(m.chat, `*┏━═══༺ 𝙵𝙽𝙰𝙵 𝙻𝙰𝚃𝙰𝙼 ༻═══━┓*\n\n🎃 *"${pickRandom(global.factos)}"*\n\n*┗━═══༺ 𝙵𝙰𝙲𝚃𝙾 𝙳𝙴𝙻 𝙱𝙰𝙲𝙺𝚂𝚃𝙰𝙶𝙴 ༻═══━┛*`, m);
};

handler.help = ['facto'];
handler.tags = ['fun'];
handler.command = ['facto'];
handler.fail = null;
handler.exp = 0;
handler.group = true;
handler.register = true;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

global.factos = [
  "¿Sabías que Freddy Fazbear casi fue un robot real en los años 80?",
  "La ubicación exacta de Freddy's sigue siendo un misterio incluso para los expertos.",
  "Cada animatrónico tiene un diseño inspirado en miedos infantiles comunes.",
  "El sonido de los pasos en los pasillos se basa en grabaciones reales de un asilo abandonado.",
  "La historia de FNaF está inspirada en leyendas urbanas de terror en EE.UU.",
  "Los colores oscuros en los animatrónicos ocultan detalles perturbadores que no siempre notas.",
  "Freddy fue creado originalmente para entretener en fiestas infantiles, pero algo salió mal...",
  "Algunos fans creen que los animatrónicos tienen conciencia propia durante la noche.",
  "El creador del juego dejó pistas ocultas en cada entrega para los más valientes.",
  "Los sonidos estáticos en el juego se basan en interferencias reales de radios antiguas.",
  "La música de fondo en FNaF esconde mensajes en código morse.",
  "Los saltos de miedo están diseñados para provocar un aumento instantáneo del pulso.",
  "La leyenda dice que una vez un animatrónico fue visto moviéndose fuera del juego.",
  "Las sombras en el juego no son solo efecto visual, sino parte de la historia.",
  "Cada animatrónico tiene un número secreto que representa su fecha de fabricación ficticia.",
  "Las cámaras de seguridad en FNaF están inspiradas en sistemas reales de vigilancia.",
  "El nombre Freddy Fazbear proviene de una combinación de nombres reales del creador.",
  "Los modelos de los animatrónicos fueron inspirados en esqueletos reales de animales.",
  "El juego fue prohibido en algunas escuelas por causar demasiado miedo.",
  "Los fans han creado teorías que conectan FNaF con otros universos de terror populares.",
  "Algunos sonidos del juego fueron grabados en locaciones reales de fábricas abandonadas.",
  "La luz parpadeante es un detalle intencional para aumentar la tensión.",
  "Los animatrónicos tienen personalidades basadas en arquetipos de miedo clásicos.",
  "El rostro de Freddy tiene más detalles ocultos que solo los expertos notan.",
  "Los jumpscares tienen un diseño específico para sorprender incluso a los jugadores más veteranos.",
  "El juego usa una paleta de colores limitada para mantener un ambiente oscuro y opresivo.",
  "Las pistas visuales en el juego son claves para resolver su complejo lore.",
  "La voz distorsionada en algunas grabaciones pertenece a un actor famoso en el mundo del horror.",
  "Las salas de juegos en FNaF están inspiradas en lugares reales de los 80s.",
  "El creador de FNaF usa un seudónimo para mantener el misterio detrás de la historia.",
];
