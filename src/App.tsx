import React, { useState, useEffect } from "react";
import { User, LogOut } from "lucide-react";

import GNB from "./layout/GNB";
import CompanyForm from "./components/company/CompanyForm";
import CompanyDetail from "./components/company/CompanyDetail";

import {
  CompanyDetail as CompanyDetailType,
  CompanyFormData as CompanyFormDataType,
} from "./models/company";

import menuData from "./data/tree.json";
import clientsData from "./data/clients.json";
import companiesData from "./data/companies.json";

import "./App.css";
import "./styles/common.css";
import "./styles/components/CompanyForm.css";

function App() {
  // 메뉴와 UI 상태 관리
  const [selectedMenuId, setSelectedMenuId] = useState<number>(14);
  const [showGNB, setShowGNB] = useState<boolean>(true);
  const [selectedClientCode, setSelectedClientCode] = useState<string | null>(
    null
  );
  const [mode, setMode] = useState<"view" | "edit">("view");

  // 데이터 상태 관리 (localStorage와 연동)
  const [clients, setClients] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);

  // 컴포넌트 마운트 시 데이터 초기화
  useEffect(() => {
    try {
      const savedClients = localStorage.getItem("clients");
      const savedCompanies = localStorage.getItem("companies");

      if (savedClients) {
        setClients(JSON.parse(savedClients));
      } else {
        setClients(clientsData);
        localStorage.setItem("clients", JSON.stringify(clientsData));
      }

      if (savedCompanies) {
        setCompanies(JSON.parse(savedCompanies));
      } else {
        setCompanies(companiesData);
        localStorage.setItem("companies", JSON.stringify(companiesData));
      }
    } catch (error) {
      setClients(clientsData);
      setCompanies(companiesData);
    }
  }, []);

  // 새 회사 등록 함수
  const addNewCompany = (newCompanyData: CompanyFormDataType) => {
    // 1. 새 코드 생성
    const existingCodes = clients
      .map((c) => parseInt(c.code))
      .filter((code) => !isNaN(code));

    const newCodeNumber =
      existingCodes.length > 0 ? Math.max(...existingCodes) + 1 : 1;
    const newCode = newCodeNumber.toString().padStart(3, "0"); // 001, 002, 003...

    // 2. 새 클라이언트 추가
    const newClient = {
      code: newCode,
      name: newCompanyData.name || "이름없음", // 기본값 설정
      type: newCompanyData.type || "매입",
      brn: newCompanyData.brn || "",
    };

    // 3. 새 회사 상세정보 추가
    const newCompany = {
      ...newCompanyData,
      id: companies.length + 1,
      code: newCode,
    };

    // 4. 상태 업데이트
    const newClients = [...clients, newClient];
    const newCompanies = [...companies, newCompany];

    setClients(newClients);
    setCompanies(newCompanies);

    // 5. localStorage 저장
    localStorage.setItem("clients", JSON.stringify(newClients));
    localStorage.setItem("companies", JSON.stringify(newCompanies));

    // 6. 등록된 회사 선택
    setSelectedClientCode(newCode);
    setMode("view");
  };

  // 메뉴 선택 핸들러
  const handleMenuSelect = (menuId: number) => {
    setSelectedMenuId(menuId);
    setMode("view");
    setSelectedClientCode(null);
  };

  // 회사 선택 핸들러
  const handleCompanySelect = (companyCode: string) => {
    setSelectedClientCode(companyCode);
    setMode("view");
  };

  // 수정 모드 핸들러들
  const handleEditClick = () => {
    setMode("edit");
  };

  const handleCancelEdit = () => {
    setMode("view");
  };

  // 수정 저장 핸들러
  const handleSaveEdit = (updatedCompany: CompanyFormDataType) => {
    if (!selectedClientCode) return;

    try {
      const updatedCompanies = companies.map((company, index) => {
        const companyCode = clients[index]?.code ?? "";
        if (companyCode === selectedClientCode) {
          return { ...company, ...updatedCompany, id: company.id };
        }
        return company;
      });

      const updatedClients = clients.map((client) => {
        if (client.code === selectedClientCode) {
          return {
            ...client,
            name: updatedCompany.name,
            type: updatedCompany.type,
          };
        }
        return client;
      });

      setClients(updatedClients);
      setCompanies(updatedCompanies);
      localStorage.setItem("clients", JSON.stringify(updatedClients));
      localStorage.setItem("companies", JSON.stringify(updatedCompanies));
    } catch (error) {
      console.error("데이터 저장 에러:", error);
    }

    setMode("view");
  };

  // 선택된 회사의 상세 정보 가져오기
  const getSelectedCompanyDetail = (): CompanyDetailType | null => {
    if (!selectedClientCode) return null;

    const mappedCompanies: (CompanyDetailType & { code: string })[] =
      companies.map((item, index) => ({
        ...item,
        id: index + 1,
        code: clients[index]?.code ?? "",
      }));

    return mappedCompanies.find((c) => c.code === selectedClientCode) || null;
  };

  // 메뉴 제목 가져오기
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

  // 메인 콘텐츠 렌더링
  const renderMainContent = () => {
    switch (selectedMenuId) {
      case 14:
        return (
          <div className="company-layout">
            <div className="company-form">
              <CompanyForm
                onCompanySelect={handleCompanySelect}
                onRegisterNew={addNewCompany}
                clients={clients}
              />
            </div>
            <div className="company-detail-wrap">
              <CompanyDetail
                company={getSelectedCompanyDetail()}
                mode={mode}
                onEditClick={handleEditClick}
                onCancelEdit={handleCancelEdit}
                onSaveEdit={handleSaveEdit}
              />
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
          <button className="top-bar-btn">
            <User size={16} />
            <span>마이페이지</span>
          </button>
          <button className="top-bar-btn">
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
