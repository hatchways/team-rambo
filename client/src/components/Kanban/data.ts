import { IColumn } from '../../context/types/kanban';
import { CardTagColors } from '../../helpers/APICalls/kanban/colors';

export const columnData: IColumn[] = [
  {
    id: 'col-1',
    name: 'Philosophy',
    cards: [
      {
        id: 'car-1',
        columnId: 'col-1',
        name: 'Essay on the environment',
        tag: CardTagColors.green,
      },
    ],
  },
  {
    id: 'col-2',
    name: 'Math',
    cards: [
      {
        id: 'car-2',
        columnId: 'col-2',
        name: 'Midterm exam',
        dueDate: new Date(),
        tag: CardTagColors.red,
      },
    ],
  },
  {
    id: 'col-3',
    name: 'In Progress',
    cards: [
      {
        id: 'car-3',
        columnId: 'car-3',
        name: 'Homework',
        tag: CardTagColors.red,
        // other data (assignees, due dates, etc.)
      },
    ],
  },
  {
    id: 'col-4',
    name: 'Done',
    cards: [
      {
        id: 'car-4',
        columnId: 'col-4',
        name: 'Workshop',
        tag: CardTagColors.yellow,
        // other data (assignees, due dates, etc.)
      },
      {
        id: 'car-5',
        columnId: 'col-4',
        name: 'Practice exam',
        tag: CardTagColors.red,
      },
      {
        id: 'car-6',
        columnId: 'col-4',
        name: 'Research',
        tag: CardTagColors.green,
      },
    ],
  },
];
