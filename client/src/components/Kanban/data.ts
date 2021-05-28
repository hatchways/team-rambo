import { IColumn } from '../../interface/Column';

export const columnData: IColumn[] = [
  {
    id: 'col-1',
    name: 'Philosophy',
    createdAt: new Date(),
    cards: [
      {
        id: 'car-1',
        columnId: 'col-1',
        name: 'Essay on the environment',
        tag: 'green',
      },
    ],
  },
  {
    id: 'col-2',
    name: 'Math',
    createdAt: new Date(),
    cards: [
      {
        id: 'car-2',
        columnId: 'col-2',
        name: 'Midterm exam',
        dueDate: new Date(),
        tag: 'red',
      },
    ],
  },
  {
    id: 'col-3',
    name: 'In Progress',
    createdAt: new Date(),
    cards: [
      {
        id: 'car-3',
        columnId: 'col-3',
        name: 'Homework',
        tag: 'red',
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
        tag: 'yellow',
        // other data (assignees, due dates, etc.)
      },
      {
        id: 'car-5',
        columnId: 'col-4',
        name: 'Practice exam',
        tag: 'red',
      },
      {
        id: 'car-6',
        columnId: 'col-4',
        name: 'Research',
        tag: 'green',
      },
    ],
  },
];
