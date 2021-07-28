/* eslint-disable react/jsx-one-expression-per-line */
import * as React from "react";
import { Button, Modal } from "antd";

import styles from "./demo.module.scss";

interface Props {
  id: number;
  onChange: (id: number) => void;
}

export const Demo = (props: Props) => {
  console.log("React Demo run", props.id);
  const [count, setCount] = React.useState(0);

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.reactdemo}>
      <p>props id: {props.id}</p>
      <p>
        <Button
          onClick={() => {
            console.log("Demo onChange", props.id + 1);
            props.onChange(props.id + 1);
          }}
        >
          id ++
        </Button>
      </p>

      <p>state count: {count}</p>
      <p>
        <Button onClick={() => setCount((c) => 1 + c)}>count ++</Button>
      </p>

      <p>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
      </p>

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};
