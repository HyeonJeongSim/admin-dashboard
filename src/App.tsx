import React, { useState } from "react";
import { User, LogOut } from "lucide-react";

import GNB from "./layout/GNB";
import CompanyForm from "./components/company/CompanyForm";
import CompanyDetail from "./components/company/CompanyDetail";

import { CompanyDetail as CompanyDetailType } from "./models/company";

import menuData from "./data/tree.json";
import clients from "./data/clients.json";
import companies from "./data/companies.json";

import "./App.css";
import "./styles/common.css";
import "./styles/components/CompanyForm.css";

function App() {
  const [selectedMenuId, setSelectedMenuId] = useState<number>(14);
  const [showGNB, setShowGNB] = useState<boolean>(true);
  const [selectedClientCode, setSelectedClientCode] = useState<string | null>(
    null
  );

  const handleMenuSelect = (menuId: number) => {
    setSelectedMenuId(menuId);
  };

  // CompanyForm에서 선택된 client의 "code"를 기준으로 저장
  const handleCompanySelect = (companyCode: string) => {
    setSelectedClientCode(companyCode);
  };

  // companies.json에서 code가 같은 항목을 찾음
  const getSelectedCompanyDetail = (): CompanyDetailType | null => {
    if (!selectedClientCode) return null;

    // companies.json에는 code가 없으므로 미리 매핑
    const mappedCompanies: (CompanyDetailType & { code: string })[] =
      companies.map((item, index) => ({
        ...item,
        id: index + 1,
        code: clients[index]?.code ?? "", // ✅ clients.json에서 같은 index의 code 매핑
      }));

    const found =
      mappedCompanies.find((c) => c.code === selectedClientCode) || null;
    return found;
  };

  const getMenuTitle = (menuId: number): string => {
    const findMenu = (menus: any[]): string => {
      for (const menu of menus) {
        if (menu.id === menuId) return menu.title;
        if (menu.children) {
          const found = findMenu(menu.children);
          if (found) return found;
        }
      }
      return "";
    };

    return findMenu(menuData) || "관리자 대시보드";
  };

  const renderMainContent = () => {
    switch (selectedMenuId) {
      case 14:
        return (
          <div className="company-layout">
            <div className="company-form">
              <CompanyForm onCompanySelect={handleCompanySelect} />
            </div>
            <div className="company-detail">
              <CompanyDetail company={getSelectedCompanyDetail()} />
            </div>
          </div>
        );
      default:
        return <div></div>;
    }
  };

  return (
    <div className="app-container">
      <div className="top-bar">
        <h2 className="content-title">{getMenuTitle(selectedMenuId)}</h2>
        <div className="top-bar-actions">
          <button
            className="top-bar-btn"
            onClick={() => console.log("마이페이지 클릭")}>
            <User size={16} />
            <span>마이페이지</span>
          </button>
          <button
            className="top-bar-btn"
            onClick={() => console.log("로그아웃 클릭")}>
            <LogOut size={16} />
            <span>로그아웃</span>
          </button>
        </div>
      </div>

      <div className="app-layout">
        <GNB
          isOpen={showGNB}
          onClose={() => setShowGNB(false)}
          onMenuSelect={handleMenuSelect}
          selectedMenuId={selectedMenuId}
        />

        <div className="main-content-wrapper">
          <div className="main-content">
            <div className="content-card">{renderMainContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
