// ⁱ𝔇ĕ𝐬†𝓻⊙γ𒆜 -  >> https://github.com/The-King-Destroy

let handler = async (m, { text, usedPrefix, command }) => {
    const userId = m.sender;

    if (command === 'setmeta') {
        const packParts = text.split(/[\u2022|]/).map(part => part.trim());
        if (packParts.length < 2) {
            return m.reply(`🎭 *Configuración de Credenciales Animatrónicas*\n\n💬 Usa el siguiente formato:\n> *${usedPrefix + command} FNaF LATAM • Seguridad Nocturna*`);
        }

        const packText1 = packParts[0];
        const packText2 = packParts[1];

        if (!global.db.data.users[userId]) {
            global.db.data.users[userId] = {};
        }

        const packstickers = global.db.data.users[userId];

        if (packstickers.text1 || packstickers.text2) {
            return m.reply(`⚠️ Ya tienes una credencial registrada.\n\n🧩 Usa *${usedPrefix}delmeta* para reiniciar la identidad del sticker.`);
        }

        packstickers.text1 = packText1;
        packstickers.text2 = packText2;

        await global.db.write();

        return m.reply(`✅ *Credenciales Animatrónicas actualizadas*\n\n🗂️ Pack: ${packText1}\n👤 Autor: ${packText2}`);
    }

    if (command === 'delmeta') {
        if (!global.db.data.users[userId] || (!global.db.data.users[userId].text1 && !global.db.data.users[userId].text2)) {
            return m.reply(`❌ No hay una identidad de sticker configurada para este usuario.`);
        }

        const packstickers = global.db.data.users[userId];
        delete packstickers.text1;
        delete packstickers.text2;

        await global.db.write();

        return m.reply(`♻️ *Identidad de sticker reiniciada*\n\n🎭 Ahora usarás el pack por defecto del sistema FNaF LATAM.`);
    }
};

handler.help = ['setmeta', 'delmeta']
handler.tags = ['tools']
handler.command = ['setmeta', 'delmeta']
handler.register = true
handler.group = true

export default handler;
