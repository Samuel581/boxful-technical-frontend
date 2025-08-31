'use client';

import React from 'react';
import { Input, Typography, Button, Alert } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type LoginFormValues, loginSchema } from '@/lib/schemas/auth';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';

const { Text } = Typography;

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get('next') || '/create-order';

  // 1) RHF + Zod: form state & validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  });

  // 2) Mutation: calls our Next API via authService
  const { mutate, isPending, error, data } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (values: LoginFormValues) => {
      console.log('[Login] mutate() called with values:', values);
      return authService.login({
        email: values.email,
        password: values.password,
      });
    },
    onSuccess: (res) => {
      console.log('[Login] mutation success payload:', res);
      console.log('[Login] res.user:', res.user);
      console.log('[Login] next path:', next);
      
      // The API returns { user: User | null } on success
      // If we reach onSuccess, the login was successful
      if (res.ok) {
        console.log('[Login] redirecting to:', next);
        router.replace(next);
      } else {
        console.log('[Login] no user in response, not redirecting');
      }
     },
    onError: (err) => {
      // Network/throw cases
      console.error('[Login] mutation error:', err);
    },
  });

  // 3) Submit handler (validates first, then calls mutate)
  const onSubmit = (values: LoginFormValues) => {
    console.log('[Login] handleSubmit -> onSubmit with:', values);
    mutate(values);
  };

  
  const getServerError = (): string | null => {
    // If there's an error from the mutation (thrown error)
    if (error) {
      // Check if error has a message property
      if (error && typeof error === 'object' && 'message' in error) {
        return error.message as string;
      }
      return 'Error al iniciar sesión';
    }
    
    // If there's data but it indicates failure (response with ok: false)
    if (data && 'ok' in data && !data.ok) {
      return (data as any).message || 'Error al iniciar sesión';
    }
    
    return null;
  };

  // 4) Derive a server error message to show in UI (invalid creds, etc.)
  const serverError = !isPending ? getServerError() : null;

  return (
    <div className="flex flex-col gap-2 m-10 max-w-md">
      <p className="text-2xl font-bold">Bienvenido</p>
      <p className="text-gray-500">Por favor ingresa tus credenciales</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 space-y-4"
      >
        {/* Email */}
        <div>
          <Text strong>Correo electrónico</Text>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Digita tu correo"
                className="w-full"
                type="email"
                autoComplete="email"
                onChange={(e) => {
                  // Extra log to ensure events fire
                  console.log('[Login] email onChange:', e.target.value);
                  field.onChange(e);
                }}
              />
            )}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
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
                placeholder="Digita tu contraseña"
                className="w-full"
                autoComplete="current-password"
                onChange={(e) => {
                  console.log('[Login] password onChange:', e.target.value);
                  field.onChange(e);
                }}
              />
            )}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Backend errors */}
        {serverError && <Alert type="error" showIcon message={serverError} />}

        {/* Submit */}
        <Button
          htmlType="submit"
          type="primary"
          className="mt-2"
          loading={isPending}
          block
        >
          Iniciar sesión
        </Button>

        {/* Small footer */}
        <div className="flex flex-row gap-3 mt-4">
          <p>¿Necesitas una cuenta?</p>
          <p className="font-bold">Regístrate acá</p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
