import { Task } from './index';
import { EditItemProps } from './EditItem';

export type PassingProps = Pick<EditItemProps, 'uploadFile'>
 & {
    localState: Task;
    setLocalState: (v: Task) => void;
  }

type AdditionalProps = {
  changeInputHandler: (v) => void;
  changeDatelineHandler: (date) => void;
}

export type TaskItemProps = PassingProps
  & AdditionalProps;
