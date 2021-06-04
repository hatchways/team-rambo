const DATES = ['2021-06-10', '2021-06-13', '2021-06-17', '2021-06-07'];
import useStyles from '../../components/Calendar/useStyles';
import { IColumn, IBoard, ICard } from '../../interface/';

// Temp function that manipulates cards for testing of drag-and-drop in calendar;
// This function will be deprecated when backend is integrated

export const initCalendarCards = (board: IBoard) => {
  const classes = useStyles();
  const allCards: any[] = [];

  board.columns.forEach((col: IColumn) => {
    col.cards.forEach((card: any, i: number) => {
      card.classNames = [classes.calendarEvent];
      card.backgroundColor = card.tag;
      card.title = card.name;
      card.date = DATES[i];
      allCards.push(card);
    });
  });

  return allCards;
};
