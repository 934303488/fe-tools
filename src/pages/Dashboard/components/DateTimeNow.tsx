import { Button, Card, Col, Form, Input } from 'antd';
import React, { useState } from 'react';
import { onCopyValue } from '../../common';

const DateTimeNow: React.FC = () => {
  const [form] = Form.useForm();
  const [timeNow, setTimeNow] = useState('');

  const onFinish = async () => {
    setTimeNow(Date.now().toString());
  };

  return (
    <Col span={8}>
      <Card title="获取当前时间戳" style={{ width: 400, margin: 10 }}>
        <Form form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item label="时间戳">
            <Input id="timeNow" value={timeNow} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
            <Button
              htmlType="button"
              style={{ margin: 10 }}
              onClick={() => onCopyValue('timeNow')}
            >
              复制
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Col>
  );
};

export default DateTimeNow;
