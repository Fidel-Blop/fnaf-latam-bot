let R = Math.random;
let Fl = Math.floor;
let toM = (a) => "@" + a.split("@")[0];

function handler(m, { groupMetadata }) {
  let ps = groupMetadata.participants.map((v) => v.id);
  if (ps.length < 10) return m.reply("Se necesitan al menos 10 participantes para formar las 5 parejas.");

  // Seleccionamos 10 personas distintas
  let seleccionados = [];
  while (seleccionados.length < 10) {
    let candidato = ps[Fl(R() * ps.length)];
    if (!seleccionados.includes(candidato)) seleccionados.push(candidato);
  }

  let [a, b, c, d, e, f, g, h, i, j] = seleccionados;

  m.reply(
    `*🎃 Las 5 parejas más oscuras del grupo — FNaF LATAM 🎃*\n\n` +

    `*1.- ${toM(a)} y ${toM(b)}*\n` +
    `- Una pareja que ni Freddy podría separar 💙\n\n` +

    `*2.- ${toM(c)} y ${toM(d)}*\n` +
    `- Estos tortolitos son la luz en la oscuridad ✨\n\n` +

    `*3.- ${toM(e)} y ${toM(f)}*\n` +
    `- Ya deberían tener un panteón en Fazbear 🤱🧑‍🍼\n\n` +

    `*4.- ${toM(g)} y ${toM(h)}*\n` +
    `- Casados en secreto bajo la mirada de los animatrónicos 💍\n\n` +

    `*5.- ${toM(i)} y ${toM(j)}*\n` +
    `- Luna de miel entre sombras y sustos 🥵😍❤️`,
    null,
    { mentions: seleccionados }
  );
}

handler.help = ["formarpareja5"];
handler.tags = ["fun"];
handler.command = ["formarpareja5"];
handler.register = true;
handler.group = true;

export default handler;
