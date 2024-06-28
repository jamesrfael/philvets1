import React from "react";
import { Table, Button } from "antd";
import VetProducts from "../pages/data/VetProducts"; // Importing veterinary products data
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"; // Importing Ant Design icons

const ProductTable = () => {
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="product" style={{ width: 50 }} />,
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Expiry",
      dataIndex: "expiry",
      key: "expiry",
    },
    {
      title: "Reorder Level",
      dataIndex: "reorderLevel",
      key: "reorderLevel",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button type="primary" icon={<EyeOutlined />} style={{ backgroundColor: "#007bff", marginRight: 5 }} />
          <Button icon={<EditOutlined />} style={{ backgroundColor: "#28a745", marginRight: 5 }} />
          <Button type="danger" icon={<DeleteOutlined />} style={{ backgroundColor: "#dc3545", marginRight: 5 }} />
        </span>
      ),
    },
  ];

  return (
    <div className="px-4 py-2 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-2">Veterinary Products</h2>
      <div className="max-h-screen">
        <Table columns={columns} dataSource={VetProducts} scroll={{ x: true, y: true }} pagination={false} />
      </div>
    </div>
  );
};

export default ProductTable;
