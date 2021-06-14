import { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import useStyles from '../../pages/Dashboard/dashboardStyles';
import { useKanban } from '../../context';
import { updateCardDate } from '../../helpers/';
import { IBoard, IColumn, ICard } from '../../interface/';

const Mapper = ({ activeBoard }: { activeBoard: IBoard }) => {
  const classes = useStyles();
  const [cards, setCards] = useState<ICard[]>([]);

  const getCards = (board: IBoard) => {
    const allCards: ICard[] = [];

    board.columns.forEach((col: IColumn) => {
      col.cards.forEach((card: ICard) => {
        if (!card.date) {
          card.classNames = [classes.calendarEvent];
          card.backgroundColor = card.tag;
          allCards.push(card);
        }
      });
    });

    return allCards;
  };

  useEffect(() => {
    setCards(getCards(activeBoard));
  }, []);

  return (
    <Grid container direction="column" className={classes.leftBox}>
      {cards.map((card) => {
        return (
          <Box
            key={card._id}
            data-event={`{"title": "${card.title}", "id": "${card._id}", "columnId": "${card.columnId}"}`}
            className={`${classes.card} fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event`}
          >
            {card.title}
          </Box>
        );
      })}
    </Grid>
  );
};

const Calendar = (): JSX.Element => {
  const classes = useStyles();
  const { activeBoard } = useKanban();

  const eventDrop = async (info: any) => {
    const columnId = info.oldEvent._def.extendedProps.columnId;
    const cardId = info.oldEvent._def.extendedProps._id;
    const newDate = info.event.start.toISOString();

    await updateCardDate(activeBoard._id, columnId, cardId, newDate);
  };

  const getCards = (board: IBoard) => {
    const allCards: ICard[] = [];

    board.columns.forEach((col: IColumn) => {
      col.cards.forEach((card: ICard) => {
        card.classNames = [classes.calendarEvent];
        card.backgroundColor = card.tag;
        allCards.push(card);
      });
    });

    return allCards;
  };

  const handleEventClick = (arg: any) => {
    console.log(arg);
  };

  const receiveNewEvent = async (ev: any) => {
    ev.draggedEl.parentNode.removeChild(ev.draggedEl);
    const newDate = ev.event.start.toISOString();
    const data = JSON.parse(ev.draggedEl.dataset.event);

    await updateCardDate(activeBoard._id, data.columnId, data.id, newDate);
  };

  useEffect(() => {
    const containerEl = document.getElementById('external-events');

    new Draggable(containerEl as unknown as HTMLElement, {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
        return {
          title: eventEl.innerText,
        };
      },
    });
  }, []);

  return (
    <Grid container className={classes.calendarBox}>
      <Grid item id="external-events" xs={12} md={2}>
        <Typography className={classes.leftBoxTypo}>Date-less Cards: </Typography>
        <Mapper activeBoard={activeBoard} />
      </Grid>
      <Grid item className={classes.calendar} xs={12} md={10}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          droppable={true}
          editable={true}
          events={getCards(activeBoard)}
          eventDrop={eventDrop}
          showNonCurrentDates={false}
          eventClick={handleEventClick}
          eventReceive={(event) => receiveNewEvent(event)}
        />
      </Grid>
    </Grid>
  );
};

export default Calendar;
