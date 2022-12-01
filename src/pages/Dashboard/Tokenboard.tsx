import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { FormInstance } from 'antd/es/form';
import React, { useCallback, useEffect, useState } from 'react';
import { api } from './service';

const { Option } = Select;

// const {token}=bearerToken;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Page: React.FC = () => {
  const [bearerToken, setBearerToken] = useState('');
  const [phoneCypherStr, setPhoneCypherStr] = useState('');
  const [appList, setAppList] = useState([]);
  const [form] = Form.useForm();
  const [formDownload] = Form.useForm();
  const [formCypher] = Form.useForm();

  const onFinish = async (values: any) => {
    const content = await api.getBearerToken(values);
    setBearerToken(content.data.body);
    console.log(content.data);
  };

  const createFile = async (values: any) => {
    const content = await api.getBearerToken(values);
    console.log(content.data);
  };

  const getAppList = async () => {
    const content = await api.getAppList();
    console.log(content.data.body);
    setAppList(content.data.body);
  };

  const phoneNumCypher = async (values: any) => {
    if (
      values.phoneNum != '' &&
      values.phoneNum &&
      values.phoneNum != undefined
    ) {
      const content = await api.encryptPhone(values);
      console.log('encryptPhone>' + content.data.body);
      setPhoneCypherStr(content.data.body);
    } else {
      const content = await api.decryptPhone(values);
      console.log('decryptPhone' + content.data.body);
      setPhoneCypherStr(content.data.body);
    }
  };

  function restValue(formInstance: FormInstance) {
    formInstance?.resetFields();
  }

  const onCopyValue = () => {
    let txa = document.getElementById('tokenTextArea');
    const selection = window.getSelection();
    const range = document.createRange();
    if (selection != null && selection.rangeCount > 0) {
      selection.removeAllRanges();
      txa != null ? range.selectNode(txa) : null;
      selection.addRange(range);
      // 执行浏览器复制命令
      document.execCommand('copy');
    }
  };

  const fetchData = useCallback(() => {
    getAppList;
  }, []);

  useEffect(() => {
    // fetchData();
    getAppList;
  }, [setAppList]);

  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="获取bearerToken" style={{ width: 400, margin: 10 }}>
            <Form
              {...layout}
              form={form}
              name="control-hooks"
              onFinish={onFinish}
            >
              <Form.Item
                name="serviceName"
                label="服务名"
                rules={[{ required: true, message: '请选择要获取token的服务' }]}
              >
                <Select
                  placeholder="选择要获取token的服务"
                  allowClear
                  onClick={getAppList}
                >
                  {appList.map((item, index) => (
                    <Option key={index} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.gender !== currentValues.gender
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue('serviceName') === 'other' ? (
                    <Form.Item
                      name="customizeGender"
                      label="Customize Gender"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  ) : null
                }
              </Form.Item>
              <Form.Item label="token">
                <TextArea
                  id="tokenTextArea"
                  showCount
                  maxLength={1000}
                  style={{ height: 120 }}
                  value={bearerToken}
                />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  确认
                </Button>
                <Button
                  htmlType="button"
                  style={{ margin: 10 }}
                  onClick={onCopyValue}
                >
                  复制
                </Button>
                <Button
                  htmlType="reset"
                  onClick={() => restValue(form)}
                  style={{ margin: 10 }}
                >
                  重置
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="生成导入订单文件" style={{ width: 400, margin: 10 }}>
            <Form
              {...layout}
              form={formDownload}
              name="matchFile"
              onFinish={createFile}
            >
              <Form.Item
                name="matchId"
                label="赛事id"
                rules={[{ required: true, message: '请输入赛事id' }]}
              >
                <Input placeholder="请输入赛事id" allowClear />
              </Form.Item>
              <Form.Item
                name="schemeId"
                label="售卖方案id"
                rules={[{ required: true, message: '请输入售卖方案id' }]}
              >
                <Input placeholder="请输入售卖方案id" allowClear />
              </Form.Item>
              <Form.Item
                name="fileNumber"
                label="文件个数"
                rules={[{ required: true, message: '请输入文件个数' }]}
              >
                <Input placeholder="请输入文件个数" allowClear />
              </Form.Item>
              <Form.Item
                name="fileDataNumber"
                label="单文件数据量"
                rules={[{ required: true, message: '请输入单个文件数据数量' }]}
              >
                <Input placeholder="请输入单个文件数据数量" allowClear />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  确认
                </Button>
                <Button
                  htmlType="button"
                  onClick={() => restValue(formDownload)}
                  style={{ margin: 10 }}
                >
                  重置
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="User手机号加解密" style={{ width: 400, margin: 10 }}>
            <Form
              {...layout}
              form={formCypher}
              name="phoneCypher"
              onFinish={phoneNumCypher}
            >
              <Form.Item
                name="phoneNum"
                label="手机号"
                rules={[{ message: '请输入手机号' }]}
              >
                <Input placeholder="请输入手机号" allowClear />
              </Form.Item>
              <Form.Item
                name="decryptPhoneNum"
                label="加密手机号"
                rules={[{ message: '请输入加密字符串' }]}
              >
                <Input placeholder="请输入加密字符串" allowClear />
              </Form.Item>
              <Form.Item label="计算结果">
                <TextArea
                  id="phoneNumCypherStr"
                  style={{ height: 120 }}
                  value={phoneCypherStr}
                />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  加密
                </Button>
                <Button style={{ margin: 10 }} htmlType="submit" type="primary">
                  解密
                </Button>
                <Button
                  htmlType="button"
                  onClick={() => restValue(formCypher)}
                  style={{ margin: 10 }}
                >
                  重置
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Page;
