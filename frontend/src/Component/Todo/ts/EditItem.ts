import { Task, IndexProps } from './index';

export type PassingProps = {
  task: Task;
}
& Pick<IndexProps,
  'updateTodo'
  | 'uploadFile'
  | 'deleteTodo'>

export type EditItemProps = PassingProps;
