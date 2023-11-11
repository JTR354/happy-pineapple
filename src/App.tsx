import React, { useState } from "react";
import { Button, Form, Input, Result } from "antd";

const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 12, span: 16 },
};

const App: React.FC = () => {
  const [form] = Form.useForm<{ username: string; password: string }>();

  const [success, setSuccess] = useState(false);

  const onFinish = (values: { username: string; password: string }) => {
    console.log(values);
    setSuccess(true)
    form.resetFields()
  };

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!success ? (
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 1280, width: 500 }}
        >
          <Form.Item
            name="username"
            label="账号(G+身份证号)"
            rules={[
              () => ({
                validator(_, value) {
                  if (String(value).startsWith("G") && value?.length === 19) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("需要字符G开头+身份证号码"));
                },
              }),
            ]}
          >
            <Input autoComplete="off"/>
          </Form.Item>
          <Form.Item
            name="password"
            label="密码(Ad123456@)"
            rules={[
              () => ({
                validator(_, value) {
                  if (value === "Ad123456@") {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(`正确密码是Ad123456@,你输入的是${value}`)
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              登陆
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Result
          status="success"
          title="恭喜你测试通过"
          extra={[
            <Button type="primary" key="console" onClick={() => {
              setSuccess(false)
            }}>
              再来一次
            </Button>,
          ]}
        />
      )}
    </div>
  );
};

export default App;
