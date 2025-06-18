import React, { useState } from "react";
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
} from "lucide-react";
import menuData from "../../data/tree.json";
import "../../styles/components/GNB.css";

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

  const toggleMenu = (menuId: number) => {
    const newExpanded = new Set(expandedMenus);
    if (newExpanded.has(menuId)) {
      newExpanded.delete(menuId);
    } else {
      newExpanded.add(menuId);
    }
    setExpandedMenus(newExpanded);
  };

  const handleMenuSelect = (menu: any) => {
    if (menu.children && menu.children.length > 0) {
      toggleMenu(menu.id);
    } else {
      if (onMenuSelect) {
        onMenuSelect(menu.id);
      }
    }
  };

  const renderMenuItem = (menu: any) => {
    const hasChildren = menu.children && menu.children.length > 0;
    const isExpanded = expandedMenus.has(menu.id);
    const isSelected = selectedMenuId === menu.id;
    const isParent = menu.level === 1;

    const menuItemClasses = [
      "gnb-menu-item",
      isParent ? "parent" : "child",
      isSelected ? "selected" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div key={menu.id}>
        <div className={menuItemClasses} onClick={() => handleMenuSelect(menu)}>
          {!hasChildren && menu.level > 1}
          {menu.level === 1 && <span>{getMenuIcon(menu.id)}</span>}
          <span className="childText">{menu.title}</span>
          {hasChildren && (
            <span className="arrow">
              {isExpanded ? <ChevronUp /> : <ChevronDown />}
            </span>
          )}
        </div>

        {hasChildren && isExpanded && (
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
    <div className="gnb-container">
      <div className="gnb-header">
        <h1 className="gnb-title">전체 메뉴</h1>
        {onClose && (
          <button className="gnb-close-button" onClick={onClose}>
            <X />
          </button>
        )}
      </div>

      <div className="gnb-menu-list">
        {menuData.map((menu: any) => renderMenuItem(menu))}
      </div>
    </div>
  );
};

export default GNB;
