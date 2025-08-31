'use client'
import React, { useState } from "react";
import {
  Table,
  Button,
  DatePicker,
  Space,
  Typography,
  Card,
  message,
  Badge,
  Tag,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useQuery } from "@tanstack/react-query";
import { ordersService } from "@/services/orders.service";
import type { Order } from "@/types/order";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;
const { Title } = Typography;
type OrderWithKey = Omit<Order, 'userId'> & { key: string };

function HistoryTable() {
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null
  );

  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: ordersService.getAll,
    refetchOnWindowFocus: false,
  });

  const filteredOrders = React.useMemo(() => {
    if (!dateRange || !orders.length) return orders;
    
    const [startDate, endDate] = dateRange;
    return orders.filter((order) => {
      const orderDate = dayjs(order.scheduledDate);
      return orderDate.isAfter(startDate.startOf('day')) && 
             orderDate.isBefore(endDate.endOf('day'));
    });
  }, [orders, dateRange]);

  const tableData: OrderWithKey[] = filteredOrders.map((order) => ({
    ...order,
    key: order.id,
  }));

  const generateCSV = () => {
    if (!filteredOrders.length) {
      message.warning('No hay órdenes para exportar');
      return;
    }

    const headers = [
      'No. de orden',
      'Nombre',
      'Apellidos', 
      'Email',
      'Teléfono',
      'Dirección de recolección',
      'Dirección de destino',
      'Departamento',
      'Municipio',
      'Fecha programada',
      'Productos',
      'Notas adicionales'
    ];

    const csvData = filteredOrders.map(order => [
      order.id,
      order.destinationFirstName,
      order.destinationLastName,
      order.destinationEmail,
      order.destinationPhone,
      order.collectionAddress,
      order.destinationAddress,
      order.department,
      order.province,
      dayjs(order.scheduledDate).format('DD/MM/YYYY'),
      order.products.map(p => `${p.name} (${p.weight}lbs, ${p.length}x${p.height}x${p.width}cm)`).join('; '),
      order.additionalNotes || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `ordenes_${dayjs().format('YYYY-MM-DD')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    message.success('Archivo CSV descargado exitosamente');
  };

  const columns: ColumnsType<OrderWithKey> = [
    {
      title: 'No. de orden',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (id: string) => (
        <span className="font-mono text-sm">{id.slice(-8).toUpperCase()}</span>
      ),
    },
    {
      title: 'Nombre',
      dataIndex: 'destinationFirstName',
      key: 'firstName',
      width: 150,
    },
    {
      title: 'Apellidos', 
      dataIndex: 'destinationLastName',
      key: 'lastName',
      width: 150,
    },
    {
      title: 'Departamento',
      dataIndex: 'department',
      key: 'department',
      width: 150,
    },
    {
      title: 'Municipio',
      dataIndex: 'province', 
      key: 'province',
      width: 150,
    },
    {
      title: 'Paquetes en orden',
      dataIndex: 'products',
      key: 'productsCount',
      width: 140,
      align: 'center',
      render: (products: Order['products']) => (
        <Tag color="blue">{products.length}</Tag>
      ),
    },
    {
      title: 'Fecha programada',
      dataIndex: 'scheduledDate',
      key: 'scheduledDate',
      width: 150,
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
      sorter: (a, b) => dayjs(a.scheduledDate).unix() - dayjs(b.scheduledDate).unix(),
      defaultSortOrder: 'descend',
    },
  ];

  const expandedRowRender = (record: OrderWithKey) => {
    const productColumns = [
      { title: 'Producto', dataIndex: 'name', key: 'name' },
      { title: 'Peso (lbs)', dataIndex: 'weight', key: 'weight' },
      { title: 'Dimensiones (cm)', key: 'dimensions', 
        render: (_: any, product: Order['products'][0]) => 
          `${product.length} × ${product.height} × ${product.width}` 
      },
    ];

    return (
      <div className="p-4 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="font-semibold mb-2">Información de contacto</h4>
            <p><strong>Email:</strong> {record.destinationEmail}</p>
            <p><strong>Teléfono:</strong> {record.destinationPhone}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Direcciones</h4>
            <p><strong>Recolección:</strong> {record.collectionAddress}</p>
            <p><strong>Destino:</strong> {record.destinationAddress}</p>
            <p><strong>Referencia:</strong> {record.addressReference}</p>
          </div>
        </div>
        
        {record.additionalNotes && (
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Notas adicionales</h4>
            <p className="text-gray-600">{record.additionalNotes}</p>
          </div>
        )}

        <div>
          <h4 className="font-semibold mb-2">Productos ({record.products.length})</h4>
          <Table 
            columns={productColumns}
            dataSource={record.products.map((product, index) => ({ ...product, key: index }))}
            pagination={false}
            size="small"
          />
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-red-600">Error al cargar las órdenes</p>
        </div>
      </Card>
    );
  }




  return (
    <div className="p-6">
      <Card>
        <div className="mb-6">
          <Title level={2} className="mb-4">Historial de Órdenes</Title>
          
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <Space wrap>
              <RangePicker
                placeholder={['Desde', 'Hasta']}
                format="DD/MM/YYYY"
                value={dateRange}
                onChange={(dates) => {
                  if (dates && dates[0] && dates[1]) {
                    setDateRange([dates[0], dates[1]]);
                  } else {
                    setDateRange(null);
                  }
                }}
              />
              <Button 
                type="primary"
                onClick={() => setDateRange(null)}
                disabled={!dateRange}
              >
                Limpiar filtros
              </Button>
            </Space>
            
            <Button 
              type="default"
              onClick={generateCSV}
              disabled={!filteredOrders.length}
            >
              Descargar Órdenes
            </Button>
          </div>

          <div className="mb-4">
            <Badge 
              count={filteredOrders.length} 
              showZero
              color="blue"
            />
            <span className="ml-2 text-gray-600">
              {filteredOrders.length === 1 ? 'orden encontrada' : 'órdenes encontradas'}
            </span>
          </div>
        </div>

        <Table<OrderWithKey>
          columns={columns}
          dataSource={tableData}
          loading={isLoading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} de ${total} órdenes`,
          }}
          expandable={{
            expandedRowRender,
            rowExpandable: () => true,
          }}
          scroll={{ x: 1000 }}
          locale={{
            emptyText: 'No hay órdenes para mostrar'
          }}
        />
      </Card>
    </div>
  );
}

export default HistoryTable;
