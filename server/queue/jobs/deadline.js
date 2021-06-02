const mongoose = require('mongoose');
const { Board } = require('../../models/Board');
const connectDB = require('../../db');
const sendEmail = require('../../utils/sendEmail');

const cardDueTemplate = (dueCards) => {
  let template = `
<img src="https://res.cloudinary.com/dpepwhv11/image/upload/v1622628335/logo_hgrobp.png" />
<div>
  <h2>Some cards are due today</h2>
  <p>
    Hello, just reminding you of the cards that are due today.
  </p>
  <div>
    
`
  dueCards.forEach(card => {
    template += `
      <div style="background-color: #eee; padding: 20px;">
        <p>${card.name}</p>
        <p>Due ${new Intl.DateTimeFormat('en-US').format(new Date(card.dueDate))}</p>
      </div>
    `
  });

  template += '</div>'
  return template;
}

/*
  Deadline reminder job handler.
*/
module.exports = async (_, done) => {
  // spawned processes don't share mongo connection.
  connectDB();
  const boards = await Board.find({}).populate('user');
  if (boards.length === 0) return null;

  const mappedBoard = boards.map((board) => {
    return {
      name: board.name,
      user: board.user,
      cards: board.columns.map((col) =>
        col.cards.filter((card) => new Date().getDay() === new Date(card.dueDate).getDay())
      ).flat()
    }
  });

  for (const board of mappedBoard) {
    if (board.cards.length === 0) continue;
    sendEmail(board.user.email, { 
      subject: `${board.name} has some tasks due today`,
      html: cardDueTemplate(board.cards),
      text: 'need to complete'
    });
  }

  mongoose.disconnect();
  done();
}
