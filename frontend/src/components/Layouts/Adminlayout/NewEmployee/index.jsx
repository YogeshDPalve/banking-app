import { Button, Card, Form, Input, Table } from "antd";

import Adminlayout from "..";
import {
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
const { Item } = Form;

const NewEmployee = () => {
  const columns = [
    {
      title: "Profile",
      key: "fullname",
    },
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex gap-1">
          <Button
            className="!bg-pink-100 !text-pink-500"
            icon={<EyeInvisibleOutlined />}
            type="text"
          />
          <Button
            className="!bg-green-100 !text-green-500"
            icon={<EditOutlined />}
            type="text"
          />
          <Button
            className="!bg-rose-100 !text-rose-500"
            icon={<DeleteOutlined />}
            type="text"
          />
        </div>
      ),
    },
  ];
  return (
    <Adminlayout>
      <div className="grid md:grid-cols-3 gap-3">
        <Card title="Add new employee">
          <Form layout="vertical">
            <Item name="John" label="Profile">
              <Input type="file" />
            </Item>
            <div className="grid md:grid-cols-2 gap-x-2">
              <Item
                name="fullname"
                label="Fullname"
                rules={[{ required: true }]}
              >
                <Input />
              </Item>
              <Item name="mobile" label="Mobile" rules={[{ required: true }]}>
                <Input type="number" />
              </Item>
              <Item name="email" label="Email" rules={[{ required: true }]}>
                <Input type="email" />
              </Item>
              <Item
                name="password"
                label="Password"
                rules={[{ required: true }]}
              >
                <Input type="password" />
              </Item>
            </div>
            <Item name="address" label="Address">
              <Input.TextArea />
            </Item>
            <Item>
              <Button
                type="text"
                className="w-full !bg-blue-500 !text-bold !text-white"
                htmlType="submit"
              >
                submit
              </Button>
            </Item>
          </Form>
        </Card>
        <Card className="md:col-span-2" title="New employee list">
          <Table columns={columns} dataSource={[{}, {}]} />
        </Card>
      </div>
    </Adminlayout>
  );
};

export default NewEmployee;
