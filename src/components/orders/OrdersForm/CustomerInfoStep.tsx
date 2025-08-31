import React from "react";
import { Typography, Input, DatePicker } from "antd";
import { useFormContext, Controller } from "react-hook-form";
import { OrderFormValues } from "@/lib/schemas/order";
import dayjs from "dayjs";
import type { Dayjs } from 'dayjs';

function CustomerInfoStep() {
  const { control, formState: { errors } } = useFormContext<OrderFormValues>();

  return (
    <div className="flex flex-col gap-3 h-full">
      <p className="font-bold text-xl">Completa los datos</p>

      <div className="flex flex-row w-full gap-5">
        <div className="w-2/3">
          <Typography className="font-bold">Direccion de recoleccion</Typography>
          <Controller
            name="collectionAddress"
            control={control}
            render={({ field }) => (
              <Input 
                {...field}
                placeholder="Ingresa la direccion de recoleccion" 
                className="w-full"
                status={errors.collectionAddress ? "error" : ""}
              />
            )}
          />
          {errors.collectionAddress && (
            <Typography.Text type="danger" className="text-sm">
              {errors.collectionAddress.message}
            </Typography.Text>
          )}
        </div>
        <div className="w-1/3">
          <Typography className="font-bold">Fecha programada</Typography>
          <Controller
            name="scheduledDate"
            control={control}
            render={({ field }) => (
              <DatePicker 
                className="w-full"
                format="DD/MM/YYYY"
                status={errors.scheduledDate ? "error" : ""}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date: Dayjs | null) => {
                  field.onChange(date ? date.toDate() : null);
                }}
              />
            )}
          />
          {errors.scheduledDate && (
            <Typography.Text type="danger" className="text-sm">
              {errors.scheduledDate.message}
            </Typography.Text>
          )}
        </div>
      </div>

      <div className="flex flex-row w-full gap-5">
        <div className="w-full">
          <Typography className="font-bold">Nombres</Typography>
          <Controller
            name="destinationFirstName"
            control={control}
            render={({ field }) => (
              <Input 
                {...field}
                className="w-full"
                status={errors.destinationFirstName ? "error" : ""}
              />
            )}
          />
          {errors.destinationFirstName && (
            <Typography.Text type="danger" className="text-sm">
              {errors.destinationFirstName.message}
            </Typography.Text>
          )}
        </div>
        <div className="w-full">
          <Typography className="font-bold">Apellidos</Typography>
          <Controller
            name="destinationLastName"
            control={control}
            render={({ field }) => (
              <Input 
                {...field}
                className="w-full"
                status={errors.destinationLastName ? "error" : ""}
              />
            )}
          />
          {errors.destinationLastName && (
            <Typography.Text type="danger" className="text-sm">
              {errors.destinationLastName.message}
            </Typography.Text>
          )}
        </div>
        <div className="w-full">
          <Typography className="font-bold">Correo Electronico</Typography>
          <Controller
            name="destinationEmail"
            control={control}
            render={({ field }) => (
              <Input 
                {...field}
                className="w-full"
                status={errors.destinationEmail ? "error" : ""}
              />
            )}
          />
          {errors.destinationEmail && (
            <Typography.Text type="danger" className="text-sm">
              {errors.destinationEmail.message}
            </Typography.Text>
          )}
        </div>
      </div>

      <div className="flex flex-row w-full gap-5">
        <div className="w-1/3">
          <Typography className="font-bold">Numero de Whatsapp</Typography>
          <Controller
            name="destinationPhone"
            control={control}
            render={({ field }) => (
              <Input 
                {...field}
                className="w-full"
                status={errors.destinationPhone ? "error" : ""}
              />
            )}
          />
          {errors.destinationPhone && (
            <Typography.Text type="danger" className="text-sm">
              {errors.destinationPhone.message}
            </Typography.Text>
          )}
        </div>
        <div className="w-2/3">
          <Typography className="font-bold">Direccion del destinatario</Typography>
          <Controller
            name="destinationAddress"
            control={control}
            render={({ field }) => (
              <Input 
                {...field}
                className="w-full"
                status={errors.destinationAddress ? "error" : ""}
              />
            )}
          />
          {errors.destinationAddress && (
            <Typography.Text type="danger" className="text-sm">
              {errors.destinationAddress.message}
            </Typography.Text>
          )}
        </div>
      </div>

      <div className="flex flex-row w-full gap-5">
        <div className="w-full">
          <Typography className="font-bold">Departamento</Typography>
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <Input 
                {...field}
                className="w-full"
                status={errors.department ? "error" : ""}
              />
            )}
          />
          {errors.department && (
            <Typography.Text type="danger" className="text-sm">
              {errors.department.message}
            </Typography.Text>
          )}
        </div>
        <div className="w-full">
          <Typography className="font-bold">Municipio</Typography>
          <Controller
            name="province"
            control={control}
            render={({ field }) => (
              <Input 
                {...field}
                className="w-full"
                status={errors.province ? "error" : ""}
              />
            )}
          />
          {errors.province && (
            <Typography.Text type="danger" className="text-sm">
              {errors.province.message}
            </Typography.Text>
          )}
        </div>

      </div>

      <div className="w-full">
        <Typography className="font-bold">Referencia de dirección</Typography>
        <Controller
          name="addressReference"
          control={control}
          render={({ field }) => (
            <Input 
              {...field}
              className="w-full"
              status={errors.addressReference ? "error" : ""}
            />
          )}
        />
        {errors.addressReference && (
          <Typography.Text type="danger" className="text-sm">
            {errors.addressReference.message}
          </Typography.Text>
        )}
      </div>

      <div className="w-full">
        <Typography className="font-bold">Notas adicionales</Typography>
        <Controller
          name="additionalNotes"
          control={control}
          render={({ field }) => (
            <Input 
              {...field}
              className="w-full"
            />
          )}
        />
      </div>
    </div>
  );
}

export default CustomerInfoStep;
