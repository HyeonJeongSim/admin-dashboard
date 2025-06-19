import React, { useState } from "react";
import { Company, CompanyType } from "../../models/company";
import clientsData from "../../data/clients.json";

import "../../styles/components/CompanyForm.css";
import "../../styles/common.css";

const CompanyForm = () => {
  // 체크된 항목들의 코드를 저장하는 배열
  const [checkedCodes, setCheckedCodes] = useState<string[]>([]);
  // 선택된 행의 코드
  const [selectedCode, setSelectedCode] = useState<string>("");
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);

  // clients.json 데이터를 Company 타입으로 변환 (id와 no 추가)
  const companies: Company[] = clientsData.map((item, index) => ({
    id: item.code, // code를 id로 사용
    no: index + 1, // 순번은 index + 1
    code: item.code,
    brn: item.brn,
    name: item.name,
    type: item.type as CompanyType,
  }));

  // 전체 선택/해제
  const toggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedCodes(companies.map((c) => c.code));
    } else {
      setCheckedCodes([]);
    }
  };

  // 개별 선택/해제
  const toggleItem = (code: string) => {
    if (checkedCodes.includes(code)) {
      setCheckedCodes(checkedCodes.filter((c) => c !== code));
    } else {
      setCheckedCodes([...checkedCodes, code]);
    }
  };

  // 유형별 배지 클래스
  const getTypeBadgeClass = (type: CompanyType): string => {
    switch (type) {
      case "매입":
        return "badge-purchase";
      case "매출":
        return "badge-sales";
      default:
        return "badge-both"; // 동시
    }
  };

  // 등록 버튼 클릭
  const handleRegisterClick = () => {
    setShowRegisterModal(true);
    // 나중에 여기서 등록 컴포넌트를 표시하거나 라우팅
  };

  return (
    <div className="company-form-container">
      {/* 상단 헤더 영역 */}
      <div className="header-right">
        <button className="btn-register" onClick={handleRegisterClick}>
          등록
        </button>
      </div>

      {/* 테이블 영역 */}
      <div className="table-container">
        <table className="company-table">
          <thead>
            <tr>
              <th className="th-no">No</th>
              <th className="th-checkbox">
                <input
                  type="checkbox"
                  checked={
                    checkedCodes.length === companies.length &&
                    companies.length > 0
                  }
                  onChange={toggleAll}
                />
              </th>
              <th className="th-code">코드</th>
              <th className="th-name">거래처명</th>
              <th className="th-brn">등록번호</th>
              <th className="th-type">유형</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr
                key={company.code}
                className={selectedCode === company.code ? "selected" : ""}
                onClick={() => setSelectedCode(company.code)}>
                <td className="td-no">{company.no}</td>
                <td className="td-checkbox">
                  <input
                    type="checkbox"
                    checked={checkedCodes.includes(company.code)}
                    onChange={() => toggleItem(company.code)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
                <td className="td-code">{company.code}</td>
                <td className="td-name">{company.name}</td>
                <td className="td-brn">{company.brn}</td>
                <td className="td-type">
                  <span
                    className={`type-badge ${getTypeBadgeClass(company.type)}`}>
                    {company.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 등록 모달 컴포넌트를 여기에 추가 */}
      {showRegisterModal && (
        <div style={{ display: "none" }}>
          {/* <CompanyRegisterModal onClose={() => setShowRegisterModal(false)} /> */}
        </div>
      )}
    </div>
  );
};
export default CompanyForm;
