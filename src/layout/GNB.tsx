//GNB 화면

import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  X,
  FileText,
  Settings,
  BookOpen,
  FileBarChart,
  TrendingUp,
  Building,
  Shield,
  Briefcase,
  Menu,
} from "lucide-react";
import menuData from "../data/tree.json";
import "../styles/components/GNB.css";
import "../styles/common.css";

interface GNBProps {
  isOpen?: boolean;
  onClose?: () => void;
  onMenuSelect?: (menuId: number) => void;
  selectedMenuId?: number;
}

const GNB: React.FC<GNBProps> = ({
  isOpen = true,
  onClose,
  onMenuSelect,
  selectedMenuId = 14,
}) => {
  const [expandedMenus, setExpandedMenus] = useState<Set<number>>(
    new Set([12])
  );

  // 선택된 1뎁스 메뉴를 추적하는 상태 추가
  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredParentId, setHoveredParentId] = useState<number | null>(null);

  // 메뉴 아이콘 매핑 함수
  const getMenuIcon = (menuId: number) => {
    const iconMap: Record<number, React.ReactNode> = {
      1: <FileText />,
      12: <Settings />,
      20: <BookOpen />,
      27: <FileBarChart />,
      34: <TrendingUp />,
      45: <Building />,
      50: <Shield />,
      55: <Briefcase />,
    };
    return iconMap[menuId] || null;
  };

  // 메뉴 토글 함수
  const toggleMenu = (menuId: number) => {
    const newExpanded = new Set(expandedMenus);
    if (newExpanded.has(menuId)) {
      newExpanded.delete(menuId);
    } else {
      newExpanded.add(menuId);
    }
    setExpandedMenus(newExpanded);
  };

  // 선택된 메뉴 ID로부터 부모 메뉴 ID 찾기
  const findParentMenuId = (menuId: number, menus: any[]): number | null => {
    for (const menu of menus) {
      if (menu.id === menuId && menu.level === 1) {
        return menu.id; // 1뎁스 메뉴인 경우 자기 자신 반환
      }
      if (menu.children) {
        for (const child of menu.children) {
          if (child.id === menuId) {
            return menu.id; // 부모 메뉴 ID 반환
          }
        }
      }
    }
    return null;
  };

  // selectedMenuId가 변경될 때 부모 메뉴 ID 업데이트
  useEffect(() => {
    const parentId = findParentMenuId(selectedMenuId || 14, menuData);
    setSelectedParentId(parentId);
  }, [selectedMenuId]);

  // GNB 메뉴 선택 처리 함수
  const handleMenuSelect = (menu: any) => {
    // 1뎁스든 2뎁스든 모두 선택 가능
    if (onMenuSelect) {
      onMenuSelect(menu.id);
    }

    // 1뎁스 메뉴인 경우
    if (menu.level === 1) {
      setSelectedParentId(menu.id);

      // 펼쳐진 상태에서만 토글
      if (!isCollapsed && menu.children?.length > 0) {
        toggleMenu(menu.id);
      }
    }
  };

  // GNB 접기/펼치기 토글
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setHoveredParentId(null); // 접기/펼칠 때 호버 상태 초기화
  };

  // 플로팅 메뉴 관련 상태 및 함수
  const handleParentHover = (menuId: number) => {
    if (isCollapsed) {
      setHoveredParentId(menuId);
    }
  };

  const handleFloatingMenuEnter = () => {
    // 플로팅 메뉴에 마우스가 들어가면 유지
  };

  const handleFloatingMenuLeave = () => {
    setHoveredParentId(null);
  };

  // 메뉴 아이템 렌더링 함수
  const renderMenuItem = (menu: any) => {
    const hasChildren = menu.children && menu.children.length > 0;
    const isExpanded = expandedMenus.has(menu.id);
    const isSelected = selectedMenuId === menu.id;
    const isParent = menu.level === 1;
    const isSelectedParent = selectedParentId === menu.id; // 선택된 부모인지 확인

    // 클래스 이름 조합
    const menuItemClasses = [
      "gnb-menu-item",
      isParent ? "parent" : "child",
      isSelected ? "selected" : "",
      isSelectedParent ? "selected-parent" : "", // 선택된 부모 클래스 추가
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div key={menu.id}>
        <div
          className={menuItemClasses}
          onClick={() => handleMenuSelect(menu)}
          onMouseEnter={() => handleParentHover(menu.id)}>
          {isParent ? (
            <>
              <div className="menu-content">
                <span className="menu-icon">{getMenuIcon(menu.id)}</span>
                {!isCollapsed && (
                  <span className="menu-text">{menu.title}</span>
                )}
              </div>
              {!isCollapsed && hasChildren && (
                <span className="arrow">
                  {isExpanded ? <ChevronUp /> : <ChevronDown />}
                </span>
              )}
            </>
          ) : (
            <span className="childText">{menu.title}</span>
          )}

          {/* 접힌 상태에서 호버시 나타나는 플로팅 메뉴 */}
          {isCollapsed &&
            isParent &&
            hoveredParentId === menu.id &&
            hasChildren && (
              <div
                className="floating-menu"
                onMouseEnter={handleFloatingMenuEnter}
                onMouseLeave={handleFloatingMenuLeave}>
                <div className="floating-menu-title">{menu.title}</div>
                <div className="floating-menu-items">
                  {menu.children?.map((child: any) => (
                    <div
                      key={child.id}
                      className={`floating-menu-item ${
                        selectedMenuId === child.id ? "selected" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuSelect(child);
                      }}>
                      {child.title}
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* 하위 메뉴 렌더링 */}
        {!isCollapsed && hasChildren && isExpanded && (
          <div className="childList">
            {menu.children?.map((child: any) => renderMenuItem(child))}
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`gnb-container ${isCollapsed ? "collapsed" : ""}`}>
      <div className="gnb-header">
        {!isCollapsed ? (
          // 펼친 상태: 제목과 X 버튼
          <>
            <h1 className="gnb-title">전체 메뉴</h1>
            <button className="gnb-close-button" onClick={toggleCollapse}>
              <X />
            </button>
          </>
        ) : (
          // 접힌 상태: 햄버거 메뉴만
          <button className="gnb-toggle-button" onClick={toggleCollapse}>
            <Menu />
          </button>
        )}
      </div>

      {/* 메뉴 리스트 */}
      <div className="gnb-menu-list">
        {menuData.map((menu: any) => renderMenuItem(menu))}
      </div>
    </div>
  );
};

export default GNB;
