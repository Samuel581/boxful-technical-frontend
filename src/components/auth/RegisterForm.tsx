"use client";
import {
  Input,
  Typography,
  Button,
  DatePicker,
  Row,
  Select,
  Form,
  Col,
  Space,
} from "antd";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

function RegisterForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { Title, Text } = Typography;
  const options = [
    {
        value: "502",
        label: "502"
    },
    {
        value: "503",
        label: "503"
    },
    {
        value: "504",
        label: "504"
    },
  ]
  return (
    <div style={{ margin: "40px" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Header */}
        <Space align="center" size="small">
          <Button size="small" icon={<ChevronLeft />} type="text" />
          <Title level={3} style={{ margin: 0 }}>
            Cuentanos de ti
          </Title>
        </Space>

        <Text type="secondary">Completa la informacion de registro</Text>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                <Form.Item label={<Text strong>Nombre</Text>}>
                  <Input placeholder="Digita tu nombre" />
                </Form.Item>

                <Form.Item label={<Text strong>Sexo</Text>}>
                  <Select placeholder="Seleccionar">
                    <Select.Option value="masculino">Masculino</Select.Option>
                    <Select.Option value="femenino">Femenino</Select.Option>
                    <Select.Option value="otro">Otro</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label={<Text strong>Correo Electronico</Text>}>
                  <Input placeholder="Digitar correo" type="email" />
                </Form.Item>

                <Form.Item label={<Text strong>Contraseña</Text>}>
                  <Input.Password
                    placeholder="Digitar contraseña"
                    iconRender={(visible) => (visible ? <Eye /> : <EyeOff />)}
                  />
                </Form.Item>
              </Space>
            </Col>

            <Col span={12}>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                <Form.Item label={<Text strong>Apellido</Text>}>
                  <Input placeholder="Digita tu apellido" />
                </Form.Item>

                <Form.Item label={<Text strong>Fecha de nacimiento</Text>}>
                  <DatePicker
                    placeholder="Seleccionar"
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                <Form.Item label={<Text strong>Numero de Whatsapp</Text>}>
                  <Space.Compact style={{width: "100%"}}>
                    <Select
                      defaultValue="503"
                      options={options}
                      style={{width: "auto"}}
                    />
                    <Input style={{width: "100%"}}/>
                  </Space.Compact>
                </Form.Item>

                <Form.Item label={<Text strong>Confirmar Contraseña</Text>}>
                  <Input.Password
                    placeholder="Repetir contraseña"
                    iconRender={(visible) => (visible ? <Eye /> : <EyeOff />)}
                  />
                </Form.Item>
              </Space>
            </Col>
            <Button type="primary" style={{width: "100%"}}>Siguiente</Button>
          </Row>
        </Form>
      </Space>
    </div>
  );
}

export default RegisterForm;
