import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <a href="https://github.com/Team-H-BG/Election-Challange" target="_blank" rel="noopener noreferrer">
      <PageHeader title="🏗 Team H" subTitle="🖼 Election Challenge" style={{ cursor: "pointer" }} />
    </a>
  );
}
