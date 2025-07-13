import moment from 'moment-timezone';

const handler = async (m, {conn}) => {
  const fechaper = moment().tz('America/Lima').format('DD/MM HH:mm');
  const fechamex = moment().tz('America/Mexico_City').format('DD/MM HH:mm');
  const fechabol = moment().tz('America/La_Paz').format('DD/MM HH:mm');
  const fechachi = moment().tz('America/Santiago').format('DD/MM HH:mm');
  const fechaarg = moment().tz('America/Argentina/Buenos_Aires').format('DD/MM HH:mm');
  const fechacol = moment().tz('America/Bogota').format('DD/MM HH:mm');
  const fechaecu = moment().tz('America/Guayaquil').format('DD/MM HH:mm');
  const fechacosr = moment().tz('America/Costa_Rica').format('DD/MM HH:mm');
  const fechacub = moment().tz('America/Havana').format('DD/MM HH:mm');
  const fechagua = moment().tz('America/Guatemala').format('DD/MM HH:mm');
  const fechahon = moment().tz('America/Tegucigalpa').format('DD/MM HH:mm');
  const fechanic = moment().tz('America/Managua').format('DD/MM HH:mm');
  const fechapan = moment().tz('America/Panama').format('DD/MM HH:mm');
  const fechauru = moment().tz('America/Montevideo').format('DD/MM HH:mm');
  const fechaven = moment().tz('America/Caracas').format('DD/MM HH:mm');
  const fechapar = moment().tz('America/Asuncion').format('DD/MM HH:mm');
  const fechanew = moment().tz('America/New_York').format('DD/MM HH:mm');
  const fechaasi = moment().tz('Asia/Jakarta').format('DD/MM HH:mm');
  const fechabra = moment().tz('America/Sao_Paulo').format('DD/MM HH:mm');
  const fechaafri = moment().tz('Africa/Malabo').format('DD/MM HH:mm');

  const header = '🌒 『 Reloj de Freddy\'s 』🌒\n*Horarios actuales según zona* ⏰\n─────────────────────────────\n'
  const footer = `─────────────────────────────\n⌚ Servidor: [ ${Intl.DateTimeFormat().resolvedOptions().timeZone} ]\n` +
                 `⏳ Fecha y hora: ${moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('DD/MM/YY HH:mm:ss')}\n` +
                 `\n*¡No pierdas la noción del tiempo, guardián de Freddy's!* 👁️‍🗨️`

  let body = `
🕰️ Perú       : ${fechaper}
🕰️ México     : ${fechamex}
🕰️ Bolivia    : ${fechabol}
🕰️ Chile      : ${fechachi}
🕰️ Argentina  : ${fechaarg}
🕰️ Colombia   : ${fechacol}
🕰️ Ecuador    : ${fechaecu}
🕰️ Costa Rica : ${fechacosr}
🕰️ Cuba       : ${fechacub}
🕰️ Guatemala  : ${fechagua}
🕰️ Honduras   : ${fechahon}
🕰️ Nicaragua  : ${fechanic}
🕰️ Panamá     : ${fechapan}
🕰️ Uruguay    : ${fechauru}
🕰️ Venezuela  : ${fechaven}
🕰️ Paraguay   : ${fechapar}
🕰️ New York   : ${fechanew}
🕰️ Asia       : ${fechaasi}
🕰️ Brasil     : ${fechabra}
🕰️ Guinea Eq. : ${fechaafri}
`

  await conn.sendMessage(m.chat, {
    text: header + body.trim() + '\n' + footer,
  }, { quoted: m })
};

handler.help = ['horario'];
handler.tags = ['info'];
handler.command = ['horario'];

export default handler;
