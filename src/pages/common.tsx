import { FormInstance } from 'antd/es/form';
import { message } from 'antd';

function restValue(formInstance: FormInstance) {
  formInstance?.resetFields();
}

const onCopyValue = async (id: string) => {
  let txa = document.getElementById(id);
  if (txa) {
    let txta = txa as HTMLInputElement | HTMLTextAreaElement;
    await navigator.clipboard.writeText(txta.value);
    message.success('复制成功');
  }
};

export { restValue, onCopyValue };
