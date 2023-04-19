import { Button, Card, Col, Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import { api } from '../service';
import { onCopyValue } from '../../common';

const ChangeToken: React.FC = () => {
  const [form] = Form.useForm();
  const [token, setToken] = useState('');

  const onFinish = async (values: any) => {
    const content = await api.getTesterToken(values);
    console.log('content:' + content);
    // setToken(content.data.body);
    console.log(content.data);
  };

  return (
    <Col span={8}>
      <Card title="获取测试账号token" style={{ width: 400, margin: 10 }}>
        <Form form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item label="token">
            <TextArea
              id="tokenArea"
              showCount
              maxLength={100}
              style={{ height: 120 }}
              value={token}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              获取测试账号token
            </Button>
            <Button
              htmlType="button"
              style={{ margin: 10 }}
              onClick={() => onCopyValue('tokenArea')}
            >
              复制
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Col>
  );
};

export default ChangeToken;
