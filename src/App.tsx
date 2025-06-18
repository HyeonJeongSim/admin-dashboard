import React, { useState } from "react";
import GNB from "./components/layout/GNB";
// import Header from "./components/layout/Header";
import menuData from "./data/tree.json";
import "./App.css";

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
      <GNB
        isOpen={showGNB}
        onClose={() => setShowGNB(false)}
        onMenuSelect={handleMenuSelect}
        selectedMenuId={selectedMenuId}
      />

      <div className="main-content-wrapper">
        {/* <Header title={getMenuTitle(selectedMenuId)} /> */}

        <div className="main-content">
          <div className="content-card">
            <h2 className="content-title">{getMenuTitle(selectedMenuId)}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
