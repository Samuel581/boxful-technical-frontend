import React from "react";
import { Row, Col, Form, Input, Typography, Button } from "antd";
import { Plus } from "lucide-react";
function ProductsInfoStep() {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-xl">Agrega tus productos</p>
      <div className="flex flex-row gap-10 justify-evenly">
        <div className="flex flex-row w-2/5">
          <div>
            <Typography className="font-bold">
              Largo
            </Typography>
            <Input
              placeholder="Ingresa la direccion de recoleccion"
              className="w-full"
            ></Input>
          </div>
          <div>
            <Typography className="font-bold">
              Alto
            </Typography>
            <Input
              placeholder="Ingresa la direccion de recoleccion"
              className="w-full"
            ></Input>
          </div>
          <div>
            <Typography className="font-bold">
              Ancho
            </Typography>
            <Input
              placeholder="Ingresa la direccion de recoleccion"
              className="w-full"
            ></Input>
          </div>
        </div>
        <div className="w-1/5">
            <Typography className="font-bold">
              Peso en libras
            </Typography>
            <Input
              placeholder="Ingresa la direccion de recoleccion"
              className="w-full"
            ></Input>
          </div>
          <div className="w-2/5">
            <Typography className="font-bold">
              Contenido
            </Typography>
            <Input
              placeholder="Ingresa la direccion de recoleccion"
              className="w-full"
            ></Input>
          </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button className="w-1/6">Agregar <Plus/></Button>
      </div>
    </div>
  );
}

export default ProductsInfoStep;
