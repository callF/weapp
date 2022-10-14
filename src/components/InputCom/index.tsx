import { Button, Form, Input, Textarea, View } from '@tarojs/components';
import { Fragment, useState } from 'react';
import styles from './index.module.less';

interface Props {
  callBackInput?: Function;
  setIsOpen: Function;
  isOpen: boolean;
}
const InputCom = (props: Props) => {
  const { callBackInput, isOpen, setIsOpen } = props;

  const handleBlur = () => {
    const timeOut = setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    callBackInput && callBackInput(e.detail.value.textarea);
  };
  return (
    <>
      {isOpen ? (
        <Form onSubmit={handleSubmit}>
          <View className={styles.input_section}>
            <Textarea
              name="textarea"
              className={styles.input_input}
              focus
              cursorSpacing={10}
              placeholder="请评论"
              onConfirm={(e) => callBackInput && callBackInput(e)}
              onBlur={handleBlur}
            />
            <View className={styles.btnView}>
              <Button formType="submit" className={styles.btn}>
                发送
              </Button>
            </View>
          </View>
        </Form>
      ) : null}
    </>
  );
};

export default InputCom;
