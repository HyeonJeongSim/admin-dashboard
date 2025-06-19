import React, { useState } from "react";
import GNB from "./components/layout/GNB";
// import Header from "./components/layout/Header";
import menuData from "./data/tree.json";
import "./App.css";
import { User, LogOut } from "lucide-react";

function App() {
  const [selectedMenuId, setSelectedMenuId] = useState<number>(14);
  const [showGNB, setShowGNB] = useState<boolean>(true);

  const handleMenuSelect = (menuId: number) => {
    setSelectedMenuId(menuId);
    console.log("선택된 메뉴 ID:", menuId);
  };

  const getMenuTitle = (menuId: number): string => {
    const findMenu = (menus: any[]): string => {
      for (const menu of menus) {
        if (menu.id === menuId) {
          return menu.title;
        }
        if (menu.children) {
          const found = findMenu(menu.children);
          if (found) return found;
        }
      }
      return "";
    };

    return findMenu(menuData) || "관리자 대시보드";
  };

  return (
    <div className="app-container">
      {/* 상단 고정 버튼 영역 */}
      <div className="top-bar">
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

      {/* 메인 레이아웃 */}
      <div className="app-layout">
        <GNB
          isOpen={showGNB}
          onClose={() => setShowGNB(false)}
          onMenuSelect={handleMenuSelect}
          selectedMenuId={selectedMenuId}
        />

        <div className="main-content-wrapper">
          <div className="main-content">
            <div className="content-card">
              <h2 className="content-title">{getMenuTitle(selectedMenuId)}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
