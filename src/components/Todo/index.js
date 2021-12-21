import { Row, Tag, Checkbox, Button, Divider } from 'antd';

import todoListSlice from '../TodoList/TodosSlice';
import { MessageFeedBack } from '../message/index';
import { getApi, putApi, deleteApi } from './../../config/api';
import { useDispatch } from 'react-redux';

const priorityColorMapping = {
  High: 'red',
  Medium: 'blue',
  Low: 'gray',
};

export default function Todo({ id, name, priority, completed }) {
  // const [checked, setChecked] = useState(completed);
  const dispatch = useDispatch();

  const toggleCheckbox = async () => {
    const params = { name, completed: !completed, priority };
    putApi(
      `todoList/${id}`,
      params,
      resp => {
        // setChecked(!checked);
        MessageFeedBack.success('Change status success!');
        getApi(
          'todoList',
          null,
          resp => {
            dispatch(todoListSlice.actions.fetchTodoSuccess(resp))
          },
          err => { });
      },
      err => {
        MessageFeedBack.error(err);
      })
  };

  const deleteTodo = (id) => {
    deleteApi(`todoList/${id}`,
      null,
      resp => {
        MessageFeedBack.success('Delete Todo Success!');
        getApi(
          'todoList',
          null,
          resp => {
            dispatch(todoListSlice.actions.fetchTodoSuccess(resp))
          },
          err => { });
      },
      err => {
        MessageFeedBack.error(err);
      })
  }

  return (
    <Row
      justify='space-between'
      style={{
        marginBottom: 3,
        ...(completed ? { opacity: 0.5, textDecoration: 'line-through' } : {}),
      }}
    >
      <Checkbox checked={completed} onChange={toggleCheckbox}>
        {name}
      </Checkbox>
      <div>
        <Tag color={priorityColorMapping[priority]} style={{ margin: 0 }}>
          {priority}
        </Tag>
        <Divider type="vertical" />
        <Button size='small' type="primary" danger shape="circle" onClick={() => deleteTodo(id)}>x</Button>
      </div>
    </Row>
  );
}
