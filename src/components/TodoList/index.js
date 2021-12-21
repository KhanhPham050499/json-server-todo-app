import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Input, Button, Select, Tag, Spin } from 'antd';

import Todo from '../Todo';
import todoListSlice from './TodosSlice';
import { getApi, postApi } from './../../config/api';
import { MessageFeedBack } from './../message/index';

export default function TodoList() {
  const dispatch = useDispatch();

  const todo = useSelector(state => state.todoList);

  const [todoName, setTodoName] = useState('');
  const [prioriry, setPrioriry] = useState('Low');

  const getTodoList = () => {
    getApi(
      'todoList',
      null,
      resp => {
        dispatch(todoListSlice.actions.fetchTodoSuccess(resp))
      },
      err => {
        MessageFeedBack.error(err);
        dispatch(todoListSlice.actions.fetchTodoError(err))
      }
    )
  }

  const postTodoList = (params) => {
    postApi(
      'todoList',
      params,
      data => {
        MessageFeedBack.success('Add Success!');
        dispatch(todoListSlice.actions.fetchTodoAddSuccess())
        dispatch(todoListSlice.actions.fetchTodoLoading())
        getTodoList();
        setTodoName('');
        setPrioriry('Low')
      },
      err => {
        MessageFeedBack.error(err);
        dispatch(todoListSlice.actions.fetchTodoAddError(err))
      }
    );
  }

  useEffect(() => {
    dispatch(todoListSlice.actions.fetchTodoLoading())
    setTimeout(() => {
      getTodoList();
    }, 1500);
  }, [])

  const handleAddTodo = () => {
    if (!todoName) {
      MessageFeedBack.warning('Please Enter Todo!')
      return;
    }

    dispatch(todoListSlice.actions.fetchTodoAddLoading())

    const params = {
      name: todoName,
      completed: false,
      priority: prioriry
    }

    setTimeout(() => {
      postTodoList(params);
    }, 1500);
  }

  const handleInputChange = (e) => {
    setTodoName(e.target.value);
  }

  const handlePrioriryChange = (value) => {
    setPrioriry(value);
  }

  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: 10 }}>
        {
          todo.loading ? <Spin tip="Loading..." size='large' ></Spin> :
            todo.todoList.length ?
              todo.todoList.map(todo => <Todo key={todo.id} id={todo.id} name={todo.name} priority={todo.priority} completed={todo.completed} />)
              :
              <h3>No todo</h3>
        }
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex' }} compact >
          <Input disabled={todo.loadingAdd} placeholder="Add todo..." value={todoName} onChange={handleInputChange} allowClear />
          <Select defaultValue="Medium" value={prioriry} onChange={handlePrioriryChange} disabled={todo.loadingAdd}>
            <Select.Option value='High' label='High'>
              <Tag color='red'>High</Tag>
            </Select.Option>
            <Select.Option value='Medium' label='Medium'>
              <Tag color='blue'>Medium</Tag>
            </Select.Option>
            <Select.Option value='Low' label='Low'>
              <Tag color='gray'>Low</Tag>
            </Select.Option>
          </Select>
          <Button type='primary' onClick={handleAddTodo} loading={todo.loadingAdd}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
