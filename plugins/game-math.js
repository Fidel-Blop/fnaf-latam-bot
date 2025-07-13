global.math = global.math || {};

const handler = async (m, { conn, args, usedPrefix, command }) => {
  const mat = `${emoji} Por favor, ingresa la dificultad con la que deseas jugar.

*Dificultades Disponibles:* ${Object.keys(modes).join(' | ')}
*Ejemplo de uso:* ${usedPrefix}${command} medium`.trim();

  if (!args[0] || !(args[0].toLowerCase() in modes))
    return await conn.reply(m.chat, mat, m);

  const mode = args[0].toLowerCase();
  const id = m.chat;

  if (id in global.math)
    return conn.reply(m.chat, `${emoji2} Todavía hay un juego en proceso en este chat.`, global.math[id][0]);

  const math = genMath(mode);

  const msg = await conn.sendMessage(m.chat, {
    text: `${emoji} ¿Cuánto es el resultado de *${math.str}*?\n\n🕒 Tiempo: ${(math.time / 1000).toFixed(2)} segundos\n🎁 Premio: ${math.bonus} XP`,
    footer: 'Toca "Rendirse" si no sabes la respuesta.',
    buttons: [
      { buttonId: `${usedPrefix}surrendermath`, buttonText: { displayText: '✋ Rendirse' }, type: 1 },
    ],
    headerType: 1,
  }, { quoted: m });

  global.math[id] = [
    msg,
    math,
    4,
    setTimeout(() => {
      if (global.math[id]) {
        conn.reply(m.chat, `⌛ Se acabó el tiempo.\nLa respuesta correcta era: *${math.result}*`, m);
        delete global.math[id];
      }
    }, math.time),
  ];
};

handler.help = ['math <modo>'];
handler.tags = ['game'];
handler.command = ['matemáticas', 'mates', 'math'];
handler.group = true;
handler.register = true;

export default handler;

const surrenderHandler = async (m, { conn }) => {
  const id = m.chat;
  if (!(id in global.math)) return conn.reply(m.chat, `🚫 No hay ningún juego activo.`, m);
  const [msg, math] = global.math[id];
  delete global.math[id];
  return conn.reply(m.chat, `❌ Te has rendido.\n> La respuesta era: *${math.result}*`, m);
};

surrenderHandler.command = /^surrendermath$/i;
export { surrenderHandler };

const modes = {
  noob: [-3, 3, -3, 3, '+-', 15000, 10],
  easy: [-10, 10, -10, 10, '*/+-', 20000, 40],
  medium: [-40, 40, -20, 20, '*/+-', 40000, 150],
  hard: [-100, 100, -70, 70, '*/+-', 60000, 350],
  extreme: [-999999, 999999, -999999, 999999, '*/', 99999, 9999],
  impossible: [-99999999999, 99999999999, -99999999999, 999999999999, '*/', 30000, 35000],
  impossible2: [-999999999999999, 999999999999999, -999, 999, '/', 30000, 50000],
};

const operators = { '+': '+', '-': '-', '*': '×', '/': '÷' };

function genMath(mode) {
  const [a1, a2, b1, b2, ops, time, bonus] = modes[mode];
  let a = randomInt(a1, a2);
  const b = randomInt(b1, b2);
  const op = pickRandom([...ops]);
  let result = Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`)();
  if (op == '/') [a, result] = [result, a];
  return {
    str: `${a} ${operators[op]} ${b}`,
    mode,
    time,
    bonus,
    result,
  };
}

function randomInt(from, to) {
  if (from > to) [from, to] = [to, from];
  return Math.floor((to - from) * Math.random() + from);
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
