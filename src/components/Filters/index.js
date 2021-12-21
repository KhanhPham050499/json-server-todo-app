import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row, Input, Typography, Radio, Select, Tag } from 'antd';

import todoListSlice from '../TodoList/TodosSlice';
import { MessageFeedBack } from '../message';
import { getApi } from '../../config/api';

export default function Filters() {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('All');
  const [priority, setPrioriry] = useState('');

  const typingTimeoutRef = useRef(null);

  const handleSearchText = (e) => {

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      const paramStatus = status !== 'All' && { completed: status };
      const paramPriority = priority && { priority }

      dispatch(todoListSlice.actions.fetchTodoLoading())
      setSearchText(e.target.value);

      setTimeout(() => {
        getApi(
          'todoList',
          {
            name_like: e.target.value,
            ...paramStatus,
            ...paramPriority
          },
          resp => {
            dispatch(todoListSlice.actions.fetchTodoSuccess(resp))
          },
          err => {
            MessageFeedBack.error(err);
            dispatch(todoListSlice.actions.fetchTodoError(err))
          }
        )
      }, 1000)
    }, 1000);
  }

  const handleStatusFilter = (e) => {

    const paramSearchText = searchText && { name_like: searchText };
    const paramStatus = e.target.value !== 'All' && { completed: e.target.value };
    const paramPriority = priority && { priority };

    setStatus(e.target.value);

    dispatch(todoListSlice.actions.fetchTodoLoading())
    setTimeout(() => {
      getApi(
        'todoList',
        {
          ...paramSearchText,
          ...paramStatus,
          ...paramPriority,
        },
        resp => {
          dispatch(todoListSlice.actions.fetchTodoSuccess(resp))
        },
        err => {
          MessageFeedBack.error(err);
          dispatch(todoListSlice.actions.fetchTodoError(err))
        }
      )
    }, 1000)
  }

  const handleSelectFilter = (value) => {
    const paramSearchText = searchText && { name_like: searchText };
    const paramStatus = status !== 'All' && { completed: status };
    const paramPriority = value && { priority: value };

    setPrioriry(value);


    dispatch(todoListSlice.actions.fetchTodoLoading())
    setTimeout(() => {
      getApi(
        'todoList',
        {
          ...paramSearchText,
          ...paramStatus,
          ...paramPriority,
        },
        resp => {
          dispatch(todoListSlice.actions.fetchTodoSuccess(resp))
        },
        err => {
          MessageFeedBack.error(err);
          dispatch(todoListSlice.actions.fetchTodoError(err))
        }
      )
    }, 1000)
  }

  return (
    <Row justify='center'>
      <Col span={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Search
        </Typography.Paragraph>
        <Input placeholder='Search...' onChange={handleSearchText} />
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Status
        </Typography.Paragraph>
        <Radio.Group value={status} onChange={handleStatusFilter}>
          <Radio value='All'>All</Radio>
          <Radio value={true}>Completed</Radio>
          <Radio value={false}>To do</Radio>
        </Radio.Group>
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Priority
        </Typography.Paragraph>
        <Select
          allowClear
          placeholder='Please select'
          style={{ width: '100%' }}
          onChange={handleSelectFilter}
        >
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
      </Col>
    </Row>
  );
}
