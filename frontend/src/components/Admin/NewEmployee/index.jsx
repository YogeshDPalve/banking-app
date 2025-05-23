import { Button, Card, Form, Input, Table } from "antd";
import swal from "sweetalert";
import {
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Adminlayout from "../../Layouts/Adminlayout";
import { trimData, http } from "../../../modules/modules";
import { useState } from "react";
const { Item } = Form;
const NewEmployee = () => {
  // state collection
  const [empForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  // create new employee
  const onFinish = async (values) => {
    try {
      setLoading(true);
      let finalObj = trimData(values);
      finalObj.profile = photo ? photo : "bankImages/dummy.jpg";
      const httpReq = http();
      const { data } = await httpReq.post(`/users`, finalObj);
      swal("Success", "Employee created successfully", "success");
      empForm.resetFields();
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.error?.code === 11000) {
        empForm.setFields([
          {
            name: "email",
            errors: ["Email already exists !"],
          },
        ]);
      } else {
        swal("Warning", "Try again later", "warning");
      }
    } finally {
      setLoading(false);
    }
  };

  // handle upload

  const handleUpload = async (e) => {
    try {
      let file = e.target.files[0];
      const formData = new FormData();
      formData.append("photo", file);
      const httpReq = http();
      const { data } = await httpReq.post("/upload/file", formData);
      setPhoto(data.filePath);
    } catch (error) {
      swal("Failed", "unable to upload", "warning");
    }
  };
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
          <Form form={empForm} onFinish={onFinish} layout="vertical">
            <Item name="photo" label="Profile">
              <Input type="file" onChange={handleUpload} />
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
                loading={loading}
                className="w-full !bg-blue-500 !text-bold !text-white"
                htmlType="submit"
              >
                submit
              </Button>
            </Item>
          </Form>
        </Card>
        <Card className="md:col-span-2 overflow-auto" title="New employee list">
          <Table columns={columns} dataSource={[{}, {}]} />
        </Card>
      </div>
    </Adminlayout>
  );
};

export default NewEmployee;
