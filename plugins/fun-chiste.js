const handler = async (m, { conn }) => {
  conn.reply(m.chat, `🤖🎪 *FNaF LATAM Bot* 🎪🤖\n\n⏳ Buscando un chiste macabro... espera un momento...`, m);

  conn.reply(m.chat, `*┏━━━━━━━━━━━━━━━┓*\n\n🎭 *Aquí tienes un chiste para sobrevivir la noche:* 🎭\n\n*»* _${pickRandom(global.chiste)}_\n\n*┗━━━━━━━━━━━━━━━┛*\n\n👻 *Sigue jugando... si te atreves...* 👻`, m);
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

global.chiste = [
  "¿Cuál es el último animal que subió al arca de Noé? El del-fin...",
  "¿Cómo se dice pañuelo en japonés? Saka-moko...",
  "¿Cómo se dice disparo en árabe? Ahí-va-la-bala...",
  "¿Qué le dice un gusano a otro gusano? Voy a dar una vuelta a la manzana.",
  "Un gato empieza a ladrar en el tejado. Otro gato le dice: ¿Por qué ladras? Y responde: ¿No puedo aprender otro idioma?",
  "El doctor dice: respira profundo, te voy a auscultar. El paciente responde: ¿De quién me va a ocultar si no debo a nadie?",
  "Después de un parto, el doctor dice: todo salió bien, pero tuvimos que ponerle oxígeno. El padre responde: ¡Pero queríamos ponerle Gabriel!",
  "Un pez le pregunta a otro: ¿Qué hace tu mamá? Nada. ¿Y la tuya? Nada también.",
  "¿Cuál es el colmo de Aladdín? Tener mal genio.",
  "El profesor dice: tu trabajo me ha conmovido. El estudiante pregunta: ¿Por qué? Profesor: porque me dio mucha pena.",
  "Le dice un niño a su madre: No quiero jugar con Pedrito. ¿Por qué? Porque le pego y se pone a llorar.",
  "La maestra pregunta: ¿Qué harías si te ahogas? Juanito responde: llorar mucho para desahogarme.",
  "Hijo, me veo gorda, fea y vieja. ¿Qué tienes? Mamá, tienes toda la razón.",
  "¿Cómo se dice pelo sucio en chino? Chin cham pu.",
  "Había un niño tan despistado que... ¡da igual, olvidé el chiste!",
  "Una amiga dice: No me puedo quejar. Otra responde: ¿Va bien? No, porque mi marido está aquí.",
  "¿Por qué las focas miran hacia arriba? ¡Porque ahí están los focos!",
  "Camarero, este filete tiene muchos nervios. Es la primera vez que se lo comen.",
  "¿Cómo se llama el primo de Bruce Lee? Broco Lee.",
  "Una madre dice: Jaimito, me dijo un pajarito que te drogas. Jaimito responde: ¡Tú hablas con pajaritos!"
];
