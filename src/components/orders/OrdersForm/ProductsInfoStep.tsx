import React from "react";
import { Row, Col, Form, Input, Typography, Button } from "antd";
import { Plus, Trash2 } from "lucide-react";
import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import { OrderFormValues } from "@/lib/schemas/order";

function ProductsInfoStep() {
  const { control, formState: { errors } } = useFormContext<OrderFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products"
  });

  const addProduct = () => {
    append({
      name: '',
      weight: 0,
      length: 0,
      height: 0,
      width: 0,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-xl">Agrega tus productos</p>
      
      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <Typography className="font-bold">Producto {index + 1}</Typography>
            {fields.length > 1 && (
              <Button 
                type="text" 
                danger 
                icon={<Trash2 size={16} />}
                onClick={() => remove(index)}
              >
                Eliminar
              </Button>
            )}
          </div>
          
          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <Typography className="font-bold">Contenido</Typography>
              <Controller
                name={`products.${index}.name`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Descripción del producto"
                    className="w-full"
                    status={errors.products?.[index]?.name ? "error" : ""}
                  />
                )}
              />
              {errors.products?.[index]?.name && (
                <Typography.Text type="danger" className="text-sm">
                  {errors.products[index]?.name?.message}
                </Typography.Text>
              )}
            </div>
            
            <div className="w-24">
              <Typography className="font-bold">Largo (cm)</Typography>
              <Controller
                name={`products.${index}.length`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="0"
                    className="w-full"
                    status={errors.products?.[index]?.length ? "error" : ""}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                )}
              />
              {errors.products?.[index]?.length && (
                <Typography.Text type="danger" className="text-sm">
                  {errors.products[index]?.length?.message}
                </Typography.Text>
              )}
            </div>
            
            <div className="w-24">
              <Typography className="font-bold">Alto (cm)</Typography>
              <Controller
                name={`products.${index}.height`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="0"
                    className="w-full"
                    status={errors.products?.[index]?.height ? "error" : ""}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                )}
              />
              {errors.products?.[index]?.height && (
                <Typography.Text type="danger" className="text-sm">
                  {errors.products[index]?.height?.message}
                </Typography.Text>
              )}
            </div>
            
            <div className="w-24">
              <Typography className="font-bold">Ancho (cm)</Typography>
              <Controller
                name={`products.${index}.width`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="0"
                    className="w-full"
                    status={errors.products?.[index]?.width ? "error" : ""}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                )}
              />
              {errors.products?.[index]?.width && (
                <Typography.Text type="danger" className="text-sm">
                  {errors.products[index]?.width?.message}
                </Typography.Text>
              )}
            </div>
            
            <div className="w-24">
              <Typography className="font-bold">Peso (lbs)</Typography>
              <Controller
                name={`products.${index}.weight`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="0"
                    className="w-full"
                    status={errors.products?.[index]?.weight ? "error" : ""}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                )}
              />
              {errors.products?.[index]?.weight && (
                <Typography.Text type="danger" className="text-sm">
                  {errors.products[index]?.weight?.message}
                </Typography.Text>
              )}
            </div>
          </div>
        </div>
      ))}
      
      <div className="flex justify-end mt-4">
        <Button 
          type="dashed" 
          onClick={addProduct}
          icon={<Plus />}
        >
          Agregar Producto
        </Button>
      </div>
      
      {errors.products && (
        <Typography.Text type="danger" className="text-sm">
          {errors.products.message}
        </Typography.Text>
      )}
    </div>
  );
}

export default ProductsInfoStep;
