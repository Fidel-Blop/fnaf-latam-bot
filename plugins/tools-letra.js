function handler(m, { text, conn, emoji }) {
  if (!text) return conn.reply(m.chat, `${emoji} ¡Hey! Para transformar el texto, primero debes enviarlo. Intenta de nuevo.`, m);

  let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text;

  let transformed = teks.replace(/[a-z]/gi, v => {
    return {
      'a': 'ᥲ',
      'b': 'ᑲ',
      'c': 'ᥴ',
      'd': 'ძ',
      'e': 'ᥱ',
      'f': '𝖿',
      'g': 'g',
      'h': 'һ',
      'i': 'і',
      'j': 'ȷ',
      'k': 'k',
      'l': 'ᥣ',
      'm': 'm',
      'n': 'ᥒ',
      'o': '᥆',
      'p': '⍴',
      'q': '𝗊',
      'r': 'r',
      's': 's',
      't': '𝗍',
      'u': 'ᥙ',
      'v': '᥎',
      'w': 'ᥕ',
      'x': '᥊',
      'y': 'ᥡ',
      'z': 'z'
    }[v.toLowerCase()] || v;
  });

  m.reply(`🎃 *Texto transformado por FNaF LATAM:* 🎃\n\n${transformed}`);
}

handler.help = ['letra *<texto>*'];
handler.tags = ['fun'];
handler.command = ['letra'];
handler.register = true;

export default handler;
