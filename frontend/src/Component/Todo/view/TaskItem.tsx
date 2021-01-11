import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';

import { compose } from '@Helpers';

import { PassingProps, TaskItemProps } from '../ts/TaskItem';

import FileUpload from './FileUpload';

const TaskContainer = styled.div`
  width: 100%;
  background-color: #F2f2f2;
  border: 1px solid #F2f2f2;
  border-radius: 5px;
`;

const HeaderWrapper = styled.div`
  > input {
    font-size: 24px;
  }
  padding: 25px 30px;
  border-bottom: 2px solid #c8c8c8c8;
`;

const ContentWrapper = styled.div`
  padding: 25px 70px;
`;

const TaskItemWrapper = styled.div`
  margin-bottom: 20px;
`;

const ItemTitle = styled.p`
  color: #000;
  margin-bottom: 5px;
`;

const EnhanceDatePicker = styled(DatePicker)`
  width: 150px;
  border-radius: 5px;
  padding: 10px 15px;
`;

const ItemInput = styled.input`
  border-radius: 5px;
  padding: 10px 15px;
`;

const ItemTextarea = styled.textarea`
  border-radius: 5px;
  width: 100%;
  height: 120px;
  padding: 10px 15px;
`;

const Task: React.FC<TaskItemProps> = (props) => {
  // @ts-ignore
  const {
    localState,
    setLocalState,
    uploadFile,
    changeInputHandler,
    changeDatelineHandler,
  } = props;

  console.log('localState');

  const changeInputHandler2 = (e, props) => {
    const { name, value } = e.target;

    console.log('changeInputHandler', props);

    setLocalState({
      ...localState,
      [name]: value,
    });
  };

  return (
    <TaskContainer>
      <HeaderWrapper>
        <ItemInput
          name="title"
          value={localState.title}
          // @ts-ignore
          onChange={(_, newProps): void => {
            console.log(_);
            console.log(newProps);
            // setDescription(newProps.value);
          }}
          style={{
            width: '100%',

          }}
        />
      </HeaderWrapper>
      <ContentWrapper>
        <TaskItemWrapper>
          <ItemTitle>
            Deadline
          </ItemTitle>
          <EnhanceDatePicker
            selected={new Date(localState.datelineAt)}
            onChange={(date) => changeDatelineHandler(date)}
          />
          {' '}
          <EnhanceDatePicker
            selected={new Date(localState.datelineAt)}
            onChange={(date) => changeDatelineHandler(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </TaskItemWrapper>
        <TaskItemWrapper>
          <ItemTitle>
            File
          </ItemTitle>
          <ItemInput
            defaultValue={localState.file as string}
          />
        </TaskItemWrapper>
        <TaskItemWrapper>
          <FileUpload
            uploadFile={uploadFile}
          />
        </TaskItemWrapper>
        <TaskItemWrapper>
          <ItemTitle>
            Comment
          </ItemTitle>
          <ItemTextarea
            name="comment"
            defaultValue={localState.comment as string}
            onChange={changeInputHandler}
          />
        </TaskItemWrapper>
      </ContentWrapper>
    </TaskContainer>
  );
};

export default compose(
  <P extends {}>(
    BaseComponent: React.ComponentType<P>,
  ): React.FC<P & PassingProps> => (props) => {
    const { localState, setLocalState } = props;

    const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, props) => {
      const { name, value } = e.target;

      console.log('changeInputHandler', props);

      setLocalState({
        ...localState,
        [name]: value,
      });
    };

    const changeDatelineHandler = (date) => {
      console.log(date);
    };

    return (
      <BaseComponent
        {...props}
        changeInputHandler={changeInputHandler}
        changeDatelineHandler={changeDatelineHandler}
      />
    );
  },
)(Task);
