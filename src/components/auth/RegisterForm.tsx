"use client";
import { RegisterFormValues, registerSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
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
  Alert,
} from "antd";

import { ChevronLeft, Eye, EyeOff, TriangleAlert } from "lucide-react";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { SEX } from "@/types/user";
import dayjs from "dayjs";
import type { Dayjs } from 'dayjs';

function RegisterForm() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const { Title, Text } = Typography;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstNames: "",
      lastNames: "",
      sex: undefined,
      bornDate: undefined,
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (values: RegisterFormValues) => {
      console.log("[Register] mutate() called with values:", values);
      return authService.register({
        firstNames: values.firstNames,
        lastNames: values.lastNames,
        sex: values.sex as unknown as SEX,
        bornDate: values.bornDate,
        phone: `+${countryCode}${values.phone}`,
        email: values.email,
        password: values.password,
      });
    },
    onSuccess: (res) => {
      console.log("[Register] mutation success:", res);
      if (res.ok) {
        // Redirect to login page after successful registration
        router.push("/login");
      }
    },
    onError: (err) => {
      console.error("[Register] mutation error:", err);
    },
  });

  const watchedPhone = watch("phone");
  const countryCode = "503"; // Default to 503

  const onSubmit = (values: RegisterFormValues) => {
    console.log("[Register] Form submitted:", values);
    setModalVisible(true);
  };

  const handleConfirmNumber = () => {
    console.log("[Register] Confirming registration");
    setModalVisible(false);

    // Get current form values and submit
    handleSubmit((values) => {
      mutate(values);
    })();
  };

  const handleCancelNumber = () => {
    console.log("[Register] Cancelled");
    setModalVisible(false);
  };

  const getServerError = (): string | null => {
    if (error) {
      if (error && typeof error === "object" && "message" in error) {
        return error.message as string;
      }
      return "Error en el registro";
    }
    return null;
  };

  const serverError = !isPending ? getServerError() : null;

  const options = [
    { value: "502", label: "502" },
    { value: "503", label: "503" },
    { value: "504", label: "504" },
  ];

  const displayNumber = watchedPhone ? `+${countryCode} ${watchedPhone}` : "";
  return (
    <div style={{ margin: "40px" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Header */}
        <Space align="center" size="small">
          <Button
            size="small"
            icon={<ChevronLeft />}
            type="text"
            onClick={() => router.back()}
          />
          <Title level={3} style={{ margin: 0 }}>
            Cuentanos de ti
          </Title>
        </Space>

        <Text type="secondary">Completa la informacion de registro</Text>

        {/* Server Error */}
        {serverError && <Alert type="error" showIcon message={serverError} />}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={16}>
            <Col span={12}>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                {/* First Name */}
                <div>
                  <Text strong>Nombre</Text>
                  <Controller
                    name="firstNames"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Digita tu nombre"
                        status={errors.firstNames ? "error" : ""}
                      />
                    )}
                  />
                  {errors.firstNames && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.firstNames.message}
                    </p>
                  )}
                </div>

                {/* Sex */}
                <div>
                  <Text strong>Sexo</Text>
                  <Controller
                    name="sex"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="Seleccionar"
                        style={{ width: "100%" }}
                        status={errors.sex ? "error" : ""}
                      >
                        <Select.Option value="MALE">Masculino</Select.Option>
                        <Select.Option value="FEMALE">Femenino</Select.Option>
                      </Select>
                    )}
                  />
                  {errors.sex && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.sex.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Text strong>Correo Electronico</Text>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Digitar correo"
                        type="email"
                        status={errors.email ? "error" : ""}
                      />
                    )}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <Text strong>Contraseña</Text>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input.Password
                        {...field}
                        placeholder="Digitar contraseña"
                        iconRender={(visible) =>
                          visible ? <Eye /> : <EyeOff />
                        }
                        status={errors.password ? "error" : ""}
                      />
                    )}
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </Space>
            </Col>

            <Col span={12}>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                {/* Last Name */}
                <div>
                  <Text strong>Apellido</Text>
                  <Controller
                    name="lastNames"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Digita tu apellido"
                        status={errors.lastNames ? "error" : ""}
                      />
                    )}
                  />
                  {errors.lastNames && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.lastNames.message}
                    </p>
                  )}
                </div>
                <div>
                  <Text strong>Fecha de nacimiento</Text>
                  <Controller
                    name="bornDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        placeholder="Seleccionar"
                        style={{ width: "100%" }}
                        format="DD/MM/YYYY"
                        status={errors.bornDate ? "error" : ""}
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date: Dayjs | null) => {
                          field.onChange(date ? date.toDate() : null);
                        }}
                      />
                    )}
                  />
                  {errors.bornDate && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.bornDate.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <Text strong>Numero de Whatsapp</Text>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Space.Compact style={{ width: "100%" }}>
                        <Select
                          defaultValue="503"
                          options={options}
                          style={{ width: "auto" }}
                        />
                        <Input
                          {...field}
                          style={{ width: "100%" }}
                          placeholder="7777 7777"
                          status={errors.phone ? "error" : ""}
                        />
                      </Space.Compact>
                    )}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <Text strong>Confirmar Contraseña</Text>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <Input.Password
                        {...field}
                        placeholder="Repetir contraseña"
                        iconRender={(visible) =>
                          visible ? <Eye /> : <EyeOff />
                        }
                        status={errors.confirmPassword ? "error" : ""}
                      />
                    )}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </Space>
            </Col>

            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={isPending}
            >
              Siguiente
            </Button>
          </Row>
        </form>
      </Space>

      {/* Confirmation Modal */}
      <Modal
        open={modalVisible}
        onOk={handleConfirmNumber}
        onCancel={handleCancelNumber}
        okText="Confirmar"
        cancelText="Cancelar"
        confirmLoading={isPending}
      >
        <Space direction="vertical" size="small" align="center">
          <Row justify="center" style={{ width: "100%" }}>
            <Col>
              <div
                style={{
                  background: "#FDE68A",
                  borderRadius: "2.5rem",
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
          <Row>
            <p className="text-2xl">
              Confirmar número <b>de teléfono</b>
            </p>
          </Row>
          <Row>
            <Text>
              ¿Está seguro que desea continuar con el número{" "}
              <b>{displayNumber}</b>?
            </Text>
          </Row>
        </Space>
      </Modal>
    </div>
  );
}

export default RegisterForm;
