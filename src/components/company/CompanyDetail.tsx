import React, { useRef } from "react"; // useRef 추가
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
  mode?: "view" | "edit";
  onEditClick?: () => void;
  onCancelEdit?: () => void;
  onSaveEdit?: (updatedCompany: any) => void;
}

const CompanyDetail = ({
  company,
  mode = "view",
  onEditClick,
  onCancelEdit,
  onSaveEdit,
}: Props) => {
  // CompanyEdit 컴포넌트의 ref를 생성 (수정된 데이터를 가져오기 위해)
  const companyEditRef = useRef<any>(null);

  if (!company) return <div></div>;

  const contractPeriod = `${company.contract_start} ~ ${company.contract_end}`;

  // 수정 버튼 클릭
  const handleEditClick = () => {
    onEditClick?.();
  };

  // 수정 취소
  const handleCancelEdit = () => {
    onCancelEdit?.();
  };

  // 저장 처리 - 수정된 데이터를 가져와서 전달
  const handleSaveEdit = () => {
    // CompanyEdit의 ref를 통해 현재 수정된 formData를 가져옴
    const currentFormData = companyEditRef.current?.getCurrentFormData();

    if (currentFormData) {
      console.log("수정된 회사 정보:", currentFormData);
      onSaveEdit?.(currentFormData); // 수정된 데이터를 전달
    } else {
      console.error("수정된 데이터를 가져올 수 없습니다.");
    }
  };

  return (
    <div>
      <div className="header-right">
        {mode === "view" ? (
          <button className="btn-edit" onClick={handleEditClick}>
            수정
          </button>
        ) : (
          <>
            <button className="btn-cancel" onClick={handleCancelEdit}>
              취소
            </button>
            <button
              className="btn-save"
              onClick={handleSaveEdit} // 수정된 handleSaveEdit 함수 사용
            >
              저장
            </button>
          </>
        )}
      </div>

      {mode === "edit" ? (
        <CompanyEdit
          ref={companyEditRef} // ref 연결
          company={company}
          onCancel={handleCancelEdit}
          onSave={handleSaveEdit}
        />
      ) : (
        <div className="company-detail-form">
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
                <td>{formatBoolean(company.resident_type)}</td>
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
                <td colSpan={3}>
                  {company.product_code} / {company.product_name}
                </td>
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
              <tr>
                <td>사용여부</td>
                <td colSpan={3}>{formatBoolean(company.is_active)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompanyDetail;
