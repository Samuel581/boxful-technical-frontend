"use client";
import { Image, Menu } from "antd";
import { Plus, TextSearch } from "lucide-react";
import React, { useState } from "react";

function NavBar() {
  const [selectedSection, setSelectedSection] = useState("create");
  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedSection(key);
    console.log('Selected menu item:', key);
  };
  const menuItems = [
    {
      key: 'create',
      icon: <span className="flex justify-center items-center"><Plus/></span>,
      label: 'Crear orden',
    },
    {
      key: 'profile',
      icon: <span className="flex justify-center items-center"><TextSearch/></span>,
      label: 'Profile',
    },
  ];
  return (
    <div className="m-10 flex flex-col gap-10">
      <Image
        src="https://goboxful.com/el-salvador/wp-content/uploads/sites/3/2025/06/2800.webp"
        preview={false}
      />
      <Menu
        mode="vertical"
        selectedKeys={[selectedSection]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{
            height: '100%',
            borderRight: 0,
            backgroundColor: '#d1d5db',
          }}
      />
    </div>
  );
}

export default NavBar;
