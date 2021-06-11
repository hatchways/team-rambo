import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useKanban } from '../../context';

const Calendar = (): JSX.Element => {
  const { activeBoard } = useKanban();

  console.log(activeBoard);
  // Needs to be integrated here with backend (updating, etc);
  // Leaving in a console.log to display data that is accessible
  const eventDrop = (info: any) => {
    console.log(info);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      droppable={true}
      editable={true}
      // initCalendarCards is a function that temp sets the data as the calendar expects it;
      // will be adapted to work with BE integration

      // events={initCalendarCards(activeBoard)}
      eventDrop={eventDrop}
      showNonCurrentDates={false}
    />
  );
};

export default Calendar;
