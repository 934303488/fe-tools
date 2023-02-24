import { Alert, Button, Card, Col, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { api } from '../service';

const TimeLineSync: React.FC = () => {
  const [form] = Form.useForm();
  // const [alertDisplay, setAlertDisplay] = useState('');

  // const showAlert =(value: string)=>{
  //   document.getElementById('showAlert').style.display=value
  // }

  const onFinish = async (values: any) => {
    const content = await api.timeLineSync(values);
    console.log(content.data.success);
    if ((content.data.success = true)) {
      alert('同步成功');
    }
  };

  return (
    <Col span={8}>
      <Card title="获取测试账号token" style={{ width: 400, margin: 10 }}>
        {/* <div id ='showAlert' style={{display:'none',width: 120,marginLeft:100}}>
          <Alert
            message="同步成功" 
            type="success"
            showIcon
          /> 
        </div> */}
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
