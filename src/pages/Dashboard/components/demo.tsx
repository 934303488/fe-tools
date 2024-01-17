import React, { useState } from 'react';
import { exportOrderType } from '@/utils/enum';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Select,
  message,
  InputNumber,
  Radio,
  RadioChangeEvent,
} from 'antd';
import FormItem from 'antd/es/form/FormItem';

type FormValues = {
  radioValue: string;
  inputValue: string;
};

const MyForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    radioValue: '',
    inputValue: '',
  });

  const handleRadioChange = (e: RadioChangeEvent) => {
    console.info('radio' + formValues + '  ' + e.target.value);
    setFormValues({ ...formValues, radioValue: e.target.value });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.info('input' + formValues + '  ' + event.target.value);
    setFormValues({ ...formValues, inputValue: event.target.value });
  };

  const finish = (values: any) => {
    console.info(values);
  };

  return (
    <Col>
      <Card style={{ width: 400, margin: 10 }}>
        <Form onFinish={finish}>
          <FormItem label="订单类型">
            <Radio.Group>
              {exportOrderType.map((item) => (
                <Radio
                  value={item.value}
                  key={item.value}
                  checked={formValues.radioValue === item.value}
                  onChange={handleRadioChange}
                >
                  {item.lable}
                </Radio>
              ))}
            </Radio.Group>
          </FormItem>
          {formValues.radioValue === 'competition' && (
            <>
              <Form.Item
                name="matchId"
                label="赛事id"
                key={2}
                rules={[{ required: true, message: '请输入赛事id' }]}
              >
                <Input placeholder="请输入赛事id" allowClear />
              </Form.Item>
              <Form.Item
                name="schemeId"
                label="售卖方案id"
                key={3}
                rules={[{ required: true, message: '请输入售卖方案id' }]}
              >
                <Input placeholder="请输入售卖方案id" allowClear />
              </Form.Item>
            </>
          )}
          <Form.Item
            name="fileCount"
            label="文件个数"
            key={4}
            rules={[{ required: true, message: '请输入文件个数' }]}
          >
            <Input placeholder="请输入文件个数" allowClear />
          </Form.Item>
          <Form.Item
            name="dataCount"
            label="单文件数据量"
            key={5}
            rules={[{ required: true, message: '请输入单个文件数据数量' }]}
          >
            <Input placeholder="请输入单个文件数据数量" allowClear />
          </Form.Item>
          <Form.Item
            name="beginPhoneNum"
            label="起始手机号"
            key={6}
            rules={[{ required: true, message: '请输入起始手机号' }]}
          >
            <InputNumber
              placeholder="请输入11位数字"
              minLength={11}
              maxLength={11}
              controls={false}
              style={{ width: 200 }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              生成文件
            </Button>
            <Button
              htmlType="button"
              // onClick={() => restValue(formDownload)}
              style={{ margin: 10 }}
            >
              重置
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Col>
  );
};

export default MyForm;
