import { Button, Card, Col, Form, Input, message, Select } from 'antd';
import React from 'react';
import { api } from '../service';

const ChangeContact: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    const content = await api.AddTeacher(values);
    console.log(content.data.success);
    if ((content.data.success = true)) {
      message.success('发送成功');
    }
  };

  return (
    <Col span={8}>
      <Card title="变更企微好友关系事件发送" style={{ width: 400, margin: 10 }}>
        <Form form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            label="MarvinCode"
            name="userId"
            rules={[{ required: true, message: '请输入MarvinCode' }]}
          >
            <Input placeholder="请输入MarvinCode" allowClear />
          </Form.Item>
          <Form.Item
            label="用户externalUserId"
            name="externalUserId"
            rules={[{ required: true, message: '请输入用户externalUserId' }]}
          >
            <Input placeholder="请输入用户externalUserId" allowClear />
          </Form.Item>
          <Form.Item
            label="发送类型"
            name="eventName"
            rules={[{ required: true, message: '请选择消息发送类型' }]}
          >
            <Select
              options={[
                { value: 'ADD_TEACHER', label: '加老师' },
                { value: 'DELETE_TEACHER', label: '老师删除用户' },
                { value: 'DELETE_TEACHER_FROM_USER', label: '用户删除老师' },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Col>
  );
};

export default ChangeContact;
