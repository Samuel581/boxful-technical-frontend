'use client'
import React, { useState } from 'react';
import { Button, message, Steps, theme, Alert } from 'antd';
import CustomerInfoStep from './CustomerInfoStep';
import ProductsInfoStep from './ProductsInfoStep';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type OrderFormValues, orderSchema } from '@/lib/schemas/order';
import { useMutation } from '@tanstack/react-query';
import { ordersService } from '@/services/orders.service';


const steps = [
  {
    title: 'First',
    content: <CustomerInfoStep/>,
  },
  {
    title: 'Second',
    content: <ProductsInfoStep/>,
  },
];

const NewOrderForm: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const methods = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      collectionAddress: '',
      destinationAddress: '',
      destinationFirstName: '',
      destinationLastName: '',
      destinationEmail: '',
      destinationPhone: '',
      department: '',
      province: '',
      addressReference: '',
      additionalNotes: '',
      scheduledDate: undefined,
      products: [
        {
          name: '',
          weight: 0,
          length: 0,
          height: 0,
          width: 0,
        }
      ],
    },
    mode: 'onChange',
  });

  const { handleSubmit, trigger, formState: { errors } } = methods;

  const { mutate: createOrder, isPending, error } = useMutation({
    mutationKey: ['createOrder'],
    mutationFn: async (data: OrderFormValues) => {
      // Logger for debug purposes
      console.log('[Order] Creating order with data:', data);
      // Create using service method
      return ordersService.create({
        ...data,
        scheduledDate: data.scheduledDate.toISOString(),
      });
    },
    onSuccess: (result) => {
      console.log('[Order] Order created successfully:', result);
      message.success('¡Pedido creado exitosamente!');
      router.push('/history'); // Redirect to orders history
    },
    onError: (err) => {
      console.error('[Order] Error creating order:', err);
      message.error('Error al crear el pedido');
    },
  })

  const next = async () => {
    // Validate current step before proceeding
    let fieldsToValidate: (keyof OrderFormValues)[] = [];
    
    if (current === 0) {
      // Customer info step validation
      fieldsToValidate = [
        'collectionAddress',
        'destinationAddress', 
        'destinationFirstName',
        'destinationLastName',
        'destinationEmail',
        'destinationPhone',
        'department',
        'province',
        'addressReference',
        'scheduledDate'
      ];
    } else if (current === 1) {
      // Products step validation
      fieldsToValidate = ['products'];
    }

    const isValid = await trigger(fieldsToValidate);
    
    if (isValid) {
      setCurrent(current + 1);
    } else {
      message.error('Por favor completa todos los campos requeridos');
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onSubmit = (data: OrderFormValues) => {
    console.log('[Order] Final submission:', data);
    createOrder(data);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const getServerError = (): string | null => {
    if (error) {
      if (error && typeof error === 'object' && 'message' in error) {
        return error.message as string;
      }
      return 'Error al crear el pedido';
    }
    return null;
  };

  const serverError = !isPending ? getServerError() : null;

  const contentStyle: React.CSSProperties = {
    minHeight: '400px',
    padding: '24px',
    backgroundColor: 'white',
    borderRadius: token.borderRadiusLG,
    border: `1px solid ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <FormProvider {...methods}>
      <div>
        <Steps current={current} items={items} />
        
        {/* Server Error */}
        {serverError && (
          <Alert 
            type="error" 
            showIcon 
            message={serverError} 
            style={{ marginTop: 16 }}
          />
        )}

        <div style={contentStyle}>
          {steps[current].content}
        </div>

        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              Siguiente
            </Button>
          )}
          
          {current === steps.length - 1 && (
            <Button 
              type="primary" 
              onClick={handleSubmit(onSubmit)}
              loading={isPending}
            >
              Crear Pedido
            </Button>
          )}
          
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={prev}>
              Anterior
            </Button>
          )}
        </div>
      </div>
    </FormProvider>
  );
};

export default NewOrderForm;