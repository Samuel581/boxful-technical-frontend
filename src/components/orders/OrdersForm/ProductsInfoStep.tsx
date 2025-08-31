import React from "react";
import { Row, Col, Form, Input } from "antd";
function ProductsInfoStep() {
  return (
    <div className="flex flex-col">
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="First Name">
            <Input placeholder="Enter first name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Last Name">
            <Input placeholder="Enter last name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Email">
            <Input placeholder="Enter email" />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}

export default ProductsInfoStep;
