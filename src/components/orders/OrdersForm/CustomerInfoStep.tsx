import React from "react";
import { Typography, Input, DatePicker } from "antd";

function CustomerInfoStep() {
  return (
    <div className="flex flex-col gap-3 h-full">
      <p className="font-bold text-xl">Completa los datos</p>

      <div className="flex flex-row w-full gap-5">
        <div className="w-2/3">
          <Typography className="font-bold">Direccion de recoleccion</Typography>
          <Input placeholder="Ingresa la direccion de recoleccion" className="w-full"></Input>
        </div>
        <div className="w-1/3">
          <Typography className="font-bold">Fecha programada</Typography>
          <DatePicker className="w-full"></DatePicker>
        </div>
      </div>

      <div className="flex flex-row w-full gap-5">
        <div className="w-full">
          <Typography className="font-bold">Nombres</Typography>
          <Input className="w-full"></Input>
        </div>
        <div className="w-full">
          <Typography className="font-bold">Apellidos</Typography>
          <Input className="w-full"></Input>
        </div>
        <div className="w-full">
          <Typography className="font-bold">Correo Electronico</Typography>
          <Input className="w-full"></Input>
        </div>
      </div>

      <div className="flex flex-row w-full gap-5">
        <div className="w-1/3">
          <Typography className="font-bold">Numero de Whatsapp</Typography>
          <Input className="w-full"></Input>
        </div>
        <div className="w-2/3">
          <Typography className="font-bold">Direccion del destinatario</Typography>
          <Input className="w-full"></Input>
        </div>
      </div>

      <div className="flex flex-row w-full gap-5">
      <div className="w-full">
          <Typography className="font-bold">Departamento</Typography>
          <Input className="w-full"></Input>
        </div>
        <div className="w-full">
          <Typography className="font-bold">Municipio</Typography>
          <Input className="w-full"></Input>
        </div>
        <div className="w-full">
          <Typography className="font-bold">Punto de referencia</Typography>
          <Input className="w-full"></Input>
        </div>
      </div>

      <div className="w-full">
          <Typography className="font-bold">Notas adicionales</Typography>
          <Input className="w-full"></Input>
        </div>
    </div>
  );
}

export default CustomerInfoStep;
