import { Button, Card, Col, Form, Input, Select, message } from 'antd';
import React from 'react';
import { api, domainMap } from '../service';
import { restValue } from '../../common';
import { TOOLS_API } from '@/utils/api';

const OrderImport: React.FC = () => {
  const [formDownload] = Form.useForm();

  const createFile = async (values: any) => {
    const content = await api.orderImportFileGenerate(values);
    const fileList: [] = content.data.body;
    fileList.forEach(async (file) => {
      // const content = await api.orderImportFileDownload({suffix:file,method:"GET"})
      // domainMap.api+TOOLS_API.orderImportFileDownload+file
      window.open(domainMap.api + TOOLS_API.orderImportFileDownload + file);
    });
    console.info(fileList);
    // await api.orderImportFileDownload();
  };

  return (
    <Col span={8}>
      <Card title="生成导入订单文件" style={{ width: 400, margin: 10 }}>
        <Form
          // {...layout}
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
            name="dataNumber"
            label="单文件数据量"
            rules={[{ required: true, message: '请输入单个文件数据数量' }]}
          >
            <Input placeholder="请输入单个文件数据数量" allowClear />
          </Form.Item>
          <Form.Item
          // {...tailLayout}
          >
            <Button type="primary" htmlType="submit">
              生成文件
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
  );
};

export default OrderImport;
