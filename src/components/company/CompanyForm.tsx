import React, { useState } from "react";
import {
  Company,
  CompanyType,
  CompanyFormData as CompanyFormDataType,
} from "../../models/company";
import { CompanyRegisterModal } from "../modals/CompanyRegist";

import "../../styles/common.css";
import "../../styles/components/CompanyForm.css";

interface CompanyFormProps {
  onCompanySelect: (companyCode: string) => void;
  onRegisterNew: (newCompany: CompanyFormDataType) => void; // 등록 함수
  clients: any[]; // 실시간 데이터
}

const CompanyForm: React.FC<CompanyFormProps> = ({
  onCompanySelect,
  onRegisterNew,
  clients,
}) => {
  const [selectedCode, setSelectedCode] = useState<string>("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // 실시간 업데이트됨
  const companies: Company[] = [...clients]
    .filter((item) => item && item.code) // 빈 데이터 제거
    .sort((a, b) => a.code.localeCompare(b.code))
    .map((item, index, array) => ({
      id: item.code || `temp-${index}`,
      no: array.length - index,
      code: item.code || `${index + 1}`.padStart(3, "0"),
      brn: item.brn || "",
      name: item.name || "이름없음",
      type: (item.type as CompanyType) || "매입",
    }));

  const handleRowClick = (company: Company) => {
    setSelectedCode(company.code);
    onCompanySelect(company.code);
  };

  // 유형별 배지 클래스
  const getTypeBadgeClass = (type: CompanyType): string => {
    switch (type) {
      case "매입":
        return "badge-purchase";
      case "매출":
        return "badge-sales";
      default:
        return "badge-both";
    }
  };

  // 등록 처리
  const handleSaveNewCompany = (newCompany: CompanyFormDataType) => {
    onRegisterNew(newCompany);
    setShowRegisterModal(false);
    alert("거래처가 등록되었습니다!");
  };

  return (
    <div className="company-form-container">
      {/* 등록 버튼 */}
      <div className="header-right">
        <button
          type="button"
          onClick={() => setShowRegisterModal(true)}
          className="btn-register">
          등록
        </button>
      </div>

      {/* 테이블 */}
      <div className="table-container">
        <table className="company-table">
          <thead>
            <tr>
              <th className="th-no">No</th>
              <th className="th-code">코드</th>
              <th className="th-name">거래처명</th>
              <th className="th-brn">등록번호</th>
              <th className="th-type">유형</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr
                key={`${company.code}-${index}`}
                className={selectedCode === company.code ? "selected" : ""}
                onClick={() => handleRowClick(company)}>
                <td className="td-no">{company.no}</td>
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

      {/* 등록 모달 */}
      <CompanyRegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSave={handleSaveNewCompany}
      />
    </div>
  );
};

export default CompanyForm;
