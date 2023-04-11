import { FormInstance } from 'antd/es/form';
import { message } from 'antd';

function restValue(formInstance: FormInstance) {
  formInstance?.resetFields();
}

const onCopyValue = (id: string) => {
  let txa = document.getElementById(id);
  const selection = window.getSelection();
  const range = document.createRange();
  if (selection != null && selection.rangeCount > 0) {
    selection.removeAllRanges();
    txa != null ? range.selectNode(txa) : null;
    selection.addRange(range);
    // 执行浏览器复制命令
    document.execCommand('copy');
    message.success('复制成功');
  }
};

export { restValue, onCopyValue };
