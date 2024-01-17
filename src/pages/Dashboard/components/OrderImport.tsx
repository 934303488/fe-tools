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
import React, { useState } from 'react';
import { api, domainMap } from '../service';
import { restValue } from '../../common';
import { TOOLS_API } from '@/utils/api';
import { exportOrderType } from '@/utils/enum';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

type FormValues = {
  radioValue: string;
  inputValue: string;
};

const OrderImport: React.FC = () => {
  const [formDownload] = Form.useForm();
  const [formValues, setFormValues] = useState<FormValues>({
    radioValue: '',
    inputValue: '',
  });

  const handleRadioChange = (e: RadioChangeEvent) => {
    console.info('radio' + formValues + '  ' + e.target.value);
    setFormValues({ ...formValues, radioValue: e.target.value });
  };

  const createFile = async (values: any) => {
    const content = await api.orderImportFileGenerate(values);
    const fileList: [] = content.data.body;
    const zip = new JSZip();
    const fetchPromises = fileList.map(async (file) => {
      const filecontent = await api.orderImportFileDownload({
        suffix: file,
        method: 'GET',
        responseType: 'arraybuffer',
      });
      // 将相应内容解析为二进制数组
      const content = new Uint8Array(filecontent.data);
      // 使用 xlsx.js 将二进制数组解析为工作簿对象
      const workbook = XLSX.read(content, { type: 'array' });
      // 将 workbook 内容导出为二进制数组
      const exportContent = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      const fileContentfile = new Blob([exportContent], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      console.log('fileContentfile::' + fileContentfile);
      // var link = document.createElement('a');
      // link.href = window.URL.createObjectURL(fileContentfile);
      // link.download = file;
      // link.click();
      zip.file(file, fileContentfile);
    });
    Promise.all(fetchPromises)
      .then(() => {
        zip.generateAsync({ type: 'blob' }).then((content) => {
          FileSaver.saveAs(content, 'orderfileList.zip');
        });
      })
      .catch((error) => {
        console.error('error:' + error);
      });
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
            label="订单类型"
            id="type"
            name="type"
            rules={[{ required: true, message: '请选择订单类型' }]}
          >
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
          </Form.Item>
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
            </>
          )}
          <Form.Item
            name="schemeId"
            label="售卖方案id"
            key={3}
            rules={[{ required: true, message: '请输入售卖方案id' }]}
          >
            <Input placeholder="请输入售卖方案id" allowClear />
          </Form.Item>
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
