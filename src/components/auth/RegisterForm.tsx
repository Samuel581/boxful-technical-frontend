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
  Modal,
} from "antd";
import { ChevronLeft, Eye, EyeOff, TriangleAlert} from "lucide-react";
import React, { useState } from "react";

function RegisterForm() {
  const [modalVisible, setModalVisible] = useState(false);
  const { Title, Text } = Typography;

  const handleConfirmNumber = (e: any) => {
    console.log(e);
    setModalVisible(!modalVisible)
  }

  const handleCancelNumber = (e: any) => {
    console.log(e);
    setModalVisible(!modalVisible)
  }
  const options = [
    {
      value: "502",
      label: "502",
    },
    {
      value: "503",
      label: "503",
    },
    {
      value: "504",
      label: "504",
    },
  ];

  const testNumber = "+503 7777 7777"
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
                  <Space.Compact style={{ width: "100%" }}>
                    <Select
                      defaultValue="503"
                      options={options}
                      style={{ width: "auto" }}
                    />
                    <Input style={{ width: "100%" }} />
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
            <Button type="primary" style={{ width: "100%" }} onClick={() => setModalVisible(!modalVisible)}>
              Siguiente
            </Button>
          </Row>
        </Form>
      </Space>
      <Modal
        open={modalVisible}
        onOk={(e) => handleConfirmNumber(e)}
        onCancel={(e) => handleCancelNumber(e)}
      >
        <Space direction="vertical" size="small" align="center">
            <Row justify="center" style={{ width: "100%" }}>
              <Col>
                <div
                  style={{
                    background: "#FDE68A", // amber-300
                    borderRadius: "2.5rem", // rounded-4xl
                    padding: 32,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 24,
                  }}
                >
                  <TriangleAlert style={{ fontSize: 64, color: "#B45309" }} />
                </div>
              </Col>
            </Row>
            <Row><p className="text-2xl">Confirmar número <b>de teléfono</b></p></Row>
            <Row><Text>
            ¿Está seguro que desea continuar con el número <b>{testNumber}</b>?</Text></Row>
        </Space>
      </Modal>
    </div>
  );
}

export default RegisterForm;
