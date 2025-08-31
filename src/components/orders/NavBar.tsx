"use client";
import { Image, Button } from "antd";
import { Plus, History } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedSection, setSelectedSection] = useState("create");

  // Using current pathName to chage the selected button dinamically 
  useEffect(() => {
    if (pathname.includes("/create-order")) {
      setSelectedSection("create");
    } else if (pathname.includes("/history")) {
      setSelectedSection("history");
    }
  }, [pathname]);

  // Handle the redirects depending in the button clicked
  const handleButtonClick = (key: string) => {
    setSelectedSection(key);
    console.log('Selected button:', key);
      if (key === "create") {
      router.push("/create-order");
    } else if (key === "history") {
      router.push("/history");
    }
  };

  return (
    <div className="m-10 flex flex-col gap-10">
      <Image
        src="https://goboxful.com/el-salvador/wp-content/uploads/sites/3/2025/06/2800.webp"
        preview={false}
      />
      <div className="flex flex-col gap-2">
        <Button
          type={selectedSection === "create" ? "primary" : "default"}
          icon={<Plus />}
          onClick={() => handleButtonClick("create")}
          size="large"
          style={{
            backgroundColor: selectedSection === "create" ? undefined : '#d1d5db',
            borderColor: selectedSection === "create" ? undefined : '#d1d5db',
            textAlign: 'left',
            justifyContent: 'flex-start',
            height: '48px',
          }}
        >
          Crear orden
        </Button>
        <Button
          type={selectedSection === "history" ? "primary" : "default"}
          icon={<History />}
          onClick={() => handleButtonClick("history")}
          size="large"
          style={{
            backgroundColor: selectedSection === "history" ? undefined : '#d1d5db',
            borderColor: selectedSection === "history" ? undefined : '#d1d5db',
            textAlign: 'left',
            justifyContent: 'flex-start',
            height: '48px',
          }}
        >
          Historial
        </Button>
      </div>
    </div>
  );
}

export default NavBar;
