import { Button, Form, Input, InputNumber, message, Modal, Select } from 'antd';
import { FormInstance } from 'antd/es/form';
import React, { useRef, useState } from 'react';
import { api } from './service';

const { TextArea } = Input;
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const zz: React.FC = () => {
  const [formz] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataCount, setDataCount] = useState();
  const [commitValues, setCommmitValues] = useState({});

  const handleTextChange = (e: any) => {
    const replaceValue = e.studentCodeList.replace(/\n/g, ',');
    const itemList = replaceValue.split(',');
    const values = { studentCodeList: itemList, number: e.number };
    console.log(itemList);
    setIsModalOpen(true);
    setCommmitValues(values);
    setDataCount(itemList.length);
  };

  const onFinish = async (values: any) => {
    await api.AIGCRecharge(values);
    console.log(values);
    setIsModalOpen(false);
    message.success('提交成功');
  };

  function restValue(formInstance: FormInstance) {
    formInstance?.resetFields();
  }

  return (
    <>
      <Form
        // {...layout}
        style={{ marginTop: 10, marginLeft: 10 }}
        form={formz}
        name="zz"
        onFinish={handleTextChange}
      >
        <Form.Item
          label="学号"
          name="studentCodeList"
          rules={[{ required: true, message: '至少要输入一个学号' }]}
        >
          <TextArea
            autoSize={{ minRows: 10, maxRows: 10 }}
            placeholder="请输入学号"
            allowClear
            showCount
            style={{ height: 120, width: 600 }}
          />
        </Form.Item>
        <Form.Item
          label="充值次数"
          name="number"
          rules={[{ required: true, message: '请输入充值次数' }]}
        >
          <InputNumber
            placeholder="输入正整数"
            minLength={1}
            maxLength={5}
            controls={false}
            style={{ width: 200 }}
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            确认
          </Button>
          <Button
            htmlType="reset"
            onClick={() => restValue(formz)}
            style={{ margin: 10 }}
          >
            重置
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="请检查数据条数"
        visible={isModalOpen}
        onOk={() => onFinish(commitValues)}
        onCancel={() => setIsModalOpen(false)}
        okText="提交"
        cancelText="取消"
      >
        <p>有 {dataCount} 条数据</p>
      </Modal>
    </>
  );
};

export default zz;
