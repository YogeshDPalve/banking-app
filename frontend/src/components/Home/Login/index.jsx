import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
const { Item } = Form;

const Login = () => {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div className="flex">
      <div className="w-1/2 hidden md:flex items-center justify-center">
        <img
          src="/bank-img.jpg"
          alt="bank"
          className="w-4/5 md:flex hidden object-contain"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center md:p-6 bg-white">
        <Card className="w-full max-w-sm shadow-xl">
          <h2 className="text-2xl font-semibold text-center">Bank Login</h2>
          <Form name="login" onFinish={onFinish} layout="vertical">
            <Item name="username" label="Username" rules={[{ required: true }]}>
              <Input
                placeholder="Enter your username"
                prefix={<UserOutlined />}
              />
            </Item>
            <Item name="password" label="Password" rules={[{ required: true }]}>
              <Input
                placeholder="Enter your password"
                prefix={<LockOutlined />}
              />
            </Item>
            <Item>
              <Button
                type="text"
                className="!bg-blue-500 !text-white !font-bold"
                htmlType="submit"
                block
              >
                Login
              </Button>
            </Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
