import React from "react";

import type { CompanyDetail as CompanyDetailType } from "../../models/company";

interface Props {
  company: CompanyDetailType;
  onClose: () => void;
}

const CompanyEdit = ({ company, onClose }: Props) => {
  return (
    <div className="company-edit">
      <h3>거래처 정보 수정</h3>
      <p>사업자등록번호: {company.brn}</p>
      {/* 이후 form 입력 필드들 추가 예정 */}
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default CompanyEdit;
