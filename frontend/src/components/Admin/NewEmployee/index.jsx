import { Button, Card, Form, Image, Input, Popconfirm, Table } from "antd";
import swal from "sweetalert";
import {
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Adminlayout from "../../Layouts/Adminlayout";
import { trimData, http } from "../../../modules/modules";
import { useEffect, useState } from "react";
const { Item } = Form;
const NewEmployee = () => {
  // state collection
  const [empForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [allEmployee, setAllEmployee] = useState([]);
  const [no, setNo] = useState(0);
  // get all employee
  useEffect(() => {
    const fetcher = async () => {
      try {
        const httpReq = http();
        const { data } = await httpReq.get("/api/users/");
        console.log(data);
        setAllEmployee(data?.data);
      } catch (error) {
        swal("Failed", "Unable to fetch data.", "warning");
      }
    };
    fetcher();
  }, [no]);
  // create new employee
  const onFinish = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      let finalObj = trimData(values);
      finalObj.profile = photo ? photo : "bankImages/dummy.jpg";
      finalObj.key = finalObj.email;
      const httpReq = http();
      const { data } = await httpReq.post(`/api/users`, finalObj);

      const obj = {
        email: finalObj.email,
        password: finalObj.password,
      };

      const res = await httpReq.post(`/api/send-email`, obj);
      console.log(res);
      swal("Success", "Employee created successfully", "success");
      empForm.resetFields();
      setNo(no + 1);
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
  // udpate isActive
  const updateIsActive = async (id, isActive) => {
    try {
      const obj = {
        isActive: !isActive,
      };
      const httpReq = http();
      await httpReq.put(`/api/users/${id}`, obj);
      swal("Success", "Status updated successfully", "success");
      setNo(no + 1);
    } catch (error) {
      console.log(error);
      swal("Error", "Unable to update status", "error");
    }
  };

  // handle upload
  const handleUpload = async (e) => {
    try {
      let file = e.target.files[0];
      const formData = new FormData();
      formData.append("photo", file);
      const httpReq = http();
      const { data } = await httpReq.post("/api/upload/file", formData);
      setPhoto(data.filePath);
      setNo(no + 1);
    } catch (error) {
      swal("Failed", "unable to upload", "warning");
    }
  };
  const columns = [
    {
      title: "Profile",
      key: "profile",
      render: (src, obj) => (
        <Image
          className="rounded-full"
          width={40}
          height={40}
          src={`${import.meta.env.VITE_BASEURL}/${obj.profile}`}
        />
      ),
    },
    {
      title: "Fullname",
      dataIndex: "fullName",
      key: "fullName",
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
      fixed: "right",
      render: (_, obj) => (
        <div className="flex gap-1">
          <Popconfirm
            title="Are you sure?"
            description="Once you update, you can also re-update !"
            onCancel={() => swal("No changes occur", "")}
            onConfirm={() => updateIsActive(obj._id, obj.isActive)}
          >
            <Button
              className={`${
                obj.isActive
                  ? "!bg-indigo-100 !text-indigo-500"
                  : "!bg-pink-100 !text-pink-500"
              }`}
              icon={obj.isActive ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              type="text"
            />
          </Popconfirm>
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
                name="fullName"
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
        <Card
          className="md:col-span-2 "
          title="New employee list"
          style={{
            overflowX: "auto",
          }}
        >
          <Table
            columns={columns}
            dataSource={allEmployee}
            scroll={{
              x: "max-content",
            }}
          />
        </Card>
      </div>
    </Adminlayout>
  );
};

export default NewEmployee;
