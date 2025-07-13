let handler = async (m, { conn, text }) => {
  let room = Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))
  
  if (!room) return conn.reply(m.chat, `💤 *No estás participando en una partida activa de TicTacToe.*\nUsa *.tictactoe* para iniciar una nueva.`, m)

  delete conn.game[room.id]

  await conn.reply(m.chat, `🔁 *Se ha reiniciado la sesión de TicTacToe.*\nPuedes comenzar una nueva partida cuando quieras con *.tictactoe*`, m)
}

handler.help = ['delttt']
handler.tags = ['game']
handler.command = ['delttc', 'delttt', 'delxo', 'tictactoe']
handler.group = true
handler.register = true

export default handler
