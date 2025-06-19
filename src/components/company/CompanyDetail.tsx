import type { CompanyDetail as CompanyDetailType } from "../../models/company";
import {
  formatWithHyphen,
  formatCurrency,
  formatBoolean,
} from "../../utils/formatter";

interface Props {
  company: CompanyDetailType | null;
}

const CompanyDetail = ({ company }: Props) => {
  if (!company) return <div>선택된 거래처가 없습니다.</div>;

  const contractPeriod = `${company.contract_start} ~ ${company.contract_end}`;

  return (
    <table className="company-detail">
      <tbody>
        <tr>
          <td>사업자등록번호</td>
          <td>{formatWithHyphen(company.brn, "biz")}</td>
          <td>주민등록번호</td>
          <td>
            {formatWithHyphen(company.resident_registration_number, "personal")}
          </td>
        </tr>
        <tr>
          <td>대표자 성명</td>
          <td>{company.ceo_name}</td>
          <td>종 사업장 번호</td>
          <td>{company.sub_business_number}</td>
        </tr>
        <tr>
          <td>업종</td>
          <td>{company.business_type}</td>
          <td>종목</td>
          <td>{company.item}</td>
        </tr>
        <tr>
          <td>주소</td>
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
          <td>이메일</td>
          <td>{company.email}</td>
          <td>담당자</td>
          <td>
            {company.department} / {company.manager}
          </td>
        </tr>
        <tr>
          <td>인쇄거래처명</td>
          <td>{company.printable_company_name}</td>
          <td>여신한도</td>
          <td>{formatCurrency(company.credit_limit)}원</td>
        </tr>
        <tr>
          <td>보증금액</td>
          <td>{formatCurrency(company.guarantee_amount)}원</td>
          <td>은행정보</td>
          <td>
            {company.bank} / {company.account_holder} / {company.account_number}
          </td>
        </tr>
        <tr>
          <td>업종분류</td>
          <td>
            {company.category1} / {company.category2}
          </td>
          <td>계약 기간</td>
          <td>{contractPeriod}</td>
        </tr>
        <tr>
          <td>활성화 여부</td>
          <td>{formatBoolean(company.is_active)}</td>
          <td>비고</td>
          <td>{company.note || "-"}</td>
        </tr>
        {company.product_code && company.product_name && (
          <tr>
            <td>상품코드</td>
            <td>{company.product_code}</td>
            <td>상품명</td>
            <td>{company.product_name}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CompanyDetail;
