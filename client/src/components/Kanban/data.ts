import { IColumn } from '../../context/types/kanban';

// Shouldn't use this object to create data

export const columnData: IColumn[] = [
  {
    _id: 'col-1',
    name: 'Philosophy',
    cards: [
      {
        _id: 'car-1',
        columnId: 'col-1',
        name: 'Essay on the environment',
        tag: 'green',
      },
    ],
  },
  {
    _id: 'col-2',
    name: 'Math',
    cards: [
      {
        _id: 'car-2',
        columnId: 'col-2',
        name: 'Midterm exam',
        dueDate: new Date(),
        tag: 'red',
      },
    ],
  },
  {
    _id: 'col-3',
    name: 'In Progress',
    cards: [
      {
        _id: 'car-3',
        columnId: 'car-3',
        name: 'Homework',
        tag: 'red',
        // other data (assignees, due dates, etc.)
      },
    ],
  },
  {
    _id: 'col-4',
    name: 'Done',
    cards: [
      {
        _id: 'car-4',
        columnId: 'col-4',
        name: 'Workshop',
        tag: 'yellow',
        // other data (assignees, due dates, etc.)
      },
      {
        _id: 'car-5',
        columnId: 'col-4',
        name: 'Practice exam',
        tag: 'red',
      },
      {
        _id: 'car-6',
        columnId: 'col-4',
        name: 'Research',
        tag: 'green',
      },
    ],
  },
];
