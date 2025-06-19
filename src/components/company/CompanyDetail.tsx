import React, { useState } from "react";
import type { CompanyDetail as CompanyDetailType } from "../../models/company";
import CompanyEdit from "./CompanyEdit";
import {
  formatWithHyphen,
  formatCurrency,
  formatBoolean,
} from "../../utils/formatter";

import "../../styles/components/CompanyDetail.css";
import "../../App.css";

interface Props {
  company: CompanyDetailType | null;
}

const CompanyDetail = ({ company }: Props) => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  if (!company) return <div>선택된 거래처가 없습니다.</div>;

  const contractPeriod = `${company.contract_start} ~ ${company.contract_end}`;

  //수정 버튼 클릭
  const handleEditClick = () => {
    setShowEditModal(true);
    //  여기서 수정 컴포넌트를 표시하거나 라우팅
  };

  return (
    <div>
      <div className="header-right">
        <button className="btn-edit" onClick={handleEditClick}>
          수정
        </button>
      </div>

      {/* {showEditModal && (
        <CompanyEdit
          company={company}
          onClose={() => setShowEditModal(false)}
        />
      )} */}

      <table className="company-detail">
        <tbody>
          <tr>
            <td>
              사업자등록번호<span>*</span>
            </td>
            <td colSpan={3}>{formatWithHyphen(company.brn, "biz")}</td>
          </tr>
          <tr>
            <td>
              주민등록번호<span>*</span>
            </td>
            <td>
              {formatWithHyphen(
                company.resident_registration_number,
                "personal"
              )}
            </td>
            <td>
              주민기재분<span>*</span>
            </td>
            <td>{formatBoolean(company.is_active)}</td>
          </tr>
          <tr>
            <td>
              대표자 성명<span>*</span>
            </td>
            <td>{company.ceo_name}</td>
            <td>
              종 사업장 번호<span>*</span>
            </td>
            <td>{company.sub_business_number}</td>
          </tr>
          <tr>
            <td>
              업종<span>*</span>
            </td>
            <td>{company.business_type}</td>
            <td>
              종목<span>*</span>
            </td>
            <td>{company.item}</td>
          </tr>
          <tr>
            <td>
              주소<span>*</span>
            </td>
            <td colSpan={3}>
              ({company.zipcode}) {company.address}
            </td>
          </tr>
          <tr>
            <td>연락처</td>
            <td>{formatWithHyphen(company.phone, "phone")}</td>
            <td>팩스번호</td>
            <td>{formatWithHyphen(company.fax, "phone")}</td>
          </tr>
          <tr>
            <td>담당(부서)사원</td>
            <td colSpan={3}>
              {company.department} / {company.manager}
            </td>
          </tr>
          <tr>
            <td>인쇄할거래처명</td>
            <td colSpan={3}>{company.printable_company_name}</td>
          </tr>
          <tr>
            <td>담보설정액</td>
            <td>{formatCurrency(company.guarantee_amount)}원</td>
            <td>여신한도액</td>
            <td>{formatCurrency(company.credit_limit)}원</td>
          </tr>
          <tr>
            <td>주류코드</td>
            <td colSpan={3}></td>
          </tr>
          <tr>
            <td>입금 계좌 번호</td>
            <td colSpan={3}>
              {company.bank} / {company.account_holder} /{" "}
              {company.account_number}
            </td>
          </tr>
          <tr>
            <td>업체담당자이메일</td>
            <td colSpan={3}>{company.email}</td>
          </tr>
          <tr>
            <td>거래처 분류명</td>
            <td colSpan={3}>
              {company.category1} / {company.category2}
            </td>
          </tr>
          <tr>
            <td>거래시작(종료)일</td>
            <td colSpan={3}>{contractPeriod}</td>
          </tr>
          <tr>
            <td>비고</td>
            <td colSpan={3}>{company.note || "-"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CompanyDetail;
