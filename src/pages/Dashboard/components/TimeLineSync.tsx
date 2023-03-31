import { Button, Card, Col, Form, Input, Select, message } from 'antd';
import React from 'react';
import { api } from '../service';

const TimeLineSync: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    const content = await api.timeLineSync(values);
    console.log(content.data.success);
    if ((content.data.success = true)) {
      message.success('同步成功');
    }
  };

  return (
    <Col span={8}>
      <Card title="同步IM消息到timeline" style={{ width: 400, margin: 10 }}>
        <Form form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            label="消息id"
            name="messageId"
            rules={[{ required: true, message: '请输入消息id' }]}
          >
            <Input placeholder="请输入消息id" allowClear />
          </Form.Item>
          <Form.Item
            label="发送类型"
            name="eventName"
            rules={[{ required: true, message: '请选择消息发送类型' }]}
          >
            <Select
              options={[
                { value: 'MESSAGE_REPLIED', label: '老师to学生' },
                { value: 'MESSAGE_SENT', label: '学生to老师' },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              同步
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Col>
  );
};

export default TimeLineSync;
