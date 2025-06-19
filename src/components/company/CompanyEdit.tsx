import React, { useEffect, useState } from "react";
import type { CompanyFormData, CompanyDetail } from "../../models/company";
import companiesData from "../../data/companies.json";
import "../../styles/components/CompanyDetail.css";

interface Props {
  company: CompanyFormData;
  onClose: () => void;
}

interface CompanyEditProps {
  code: string;
  onSave: (updated: CompanyFormData) => void;
}

const formatWithHyphen = (
  value: string,
  type: "biz" | "personal" | "phone"
) => {
  const digits = value.replace(/\D/g, "");
  if (type === "biz")
    return digits.replace(/^(\d{3})(\d{2})(\d{5})$/, "$1-$2-$3");
  if (type === "personal") return digits.replace(/^(\d{6})(\d{7})$/, "$1-$2");
  return digits.replace(/^(0\d{1,2})(\d{3,4})(\d{4})$/, "$1-$2-$3");
};

const formatCurrency = (value: string) => {
  const num = parseInt(value.replace(/,/g, ""), 10);
  return isNaN(num) ? "" : num.toLocaleString();
};

const CompanyEdit: React.FC<CompanyEditProps> = ({ code, onSave }) => {
  const [company, setCompany] = useState<CompanyFormData | null>(null);

  useEffect(() => {
    const found = (companiesData as unknown as CompanyDetail[]).find(
      (c) => c.brn === code
    );
    if (found)
      setCompany({
        ...found,
        code: "",
        name: "",
        type: "매입",
      });
  }, [code]);

  const handleChange = (field: keyof CompanyFormData, value: any) => {
    if (!company) return;
    setCompany({ ...company, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (company) onSave(company);
  };

  if (!company) return <div>로딩 중...</div>;

  return (
    <form className="company-detail-form" onSubmit={handleSubmit}>
      <table className="company-detail">
        <tbody>
          <tr>
            <td>사업자등록번호*</td>
            <td colSpan={3}>
              <input
                value={formatWithHyphen(company.brn || "", "biz")}
                onChange={(e) => handleChange("brn", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>주민등록번호*</td>
            <td>
              <input
                value={formatWithHyphen(
                  company.resident_registration_number || "",
                  "personal"
                )}
                onChange={(e) =>
                  handleChange("resident_registration_number", e.target.value)
                }
              />
            </td>
            <td>주민기재분*</td>
            <td>
              <select
                value={company.is_active ? "1" : "0"}
                onChange={(e) =>
                  handleChange("is_active", e.target.value === "1")
                }>
                <option value="1">예</option>
                <option value="0">아니오</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>대표자 성명*</td>
            <td>
              <input
                value={company.ceo_name || ""}
                onChange={(e) => handleChange("ceo_name", e.target.value)}
              />
            </td>
            <td>종 사업장 번호*</td>
            <td>
              <input
                type="number"
                value={company.sub_business_number || ""}
                onChange={(e) =>
                  handleChange("sub_business_number", Number(e.target.value))
                }
              />
            </td>
          </tr>
          <tr>
            <td>업종*</td>
            <td>
              <input
                value={company.business_type || ""}
                onChange={(e) => handleChange("business_type", e.target.value)}
              />
            </td>
            <td>종목*</td>
            <td>
              <input
                value={company.item || ""}
                onChange={(e) => handleChange("item", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>주소*</td>
            <td colSpan={3}>
              ({company.zipcode}) {company.address}
            </td>
          </tr>
          <tr>
            <td>연락처</td>
            <td>
              <input
                value={formatWithHyphen(company.phone || "", "phone")}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </td>
            <td>팩스번호</td>
            <td>
              <input
                value={formatWithHyphen(company.fax || "", "phone")}
                onChange={(e) => handleChange("fax", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>담당(부서)사원</td>
            <td colSpan={3}>
              {company.department} / {company.manager}
            </td>
          </tr>
          <tr>
            <td>인쇄할거래처명</td>
            <td colSpan={3}>
              <input
                value={company.printable_company_name || ""}
                onChange={(e) =>
                  handleChange("printable_company_name", e.target.value)
                }
              />
            </td>
          </tr>
          <tr>
            <td>담보설정액</td>
            <td>
              <input
                value={formatCurrency(company.guarantee_amount || "")}
                onChange={(e) =>
                  handleChange("guarantee_amount", e.target.value)
                }
              />
              원
            </td>
            <td>여신한도액</td>
            <td>
              <input
                value={formatCurrency(company.credit_limit || "")}
                onChange={(e) => handleChange("credit_limit", e.target.value)}
              />
              원
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
            <td colSpan={3}>
              <input
                value={company.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>거래처 분류명</td>
            <td colSpan={3}>
              {company.category1} / {company.category2}
            </td>
          </tr>
          <tr>
            <td>거래시작(종료)일</td>
            <td colSpan={3}>
              {company.contract_start} ~ {company.contract_end}
            </td>
          </tr>
          <tr>
            <td>비고</td>
            <td colSpan={3}>
              <textarea
                value={company.note || ""}
                onChange={(e) => handleChange("note", e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="form-actions">
        <button type="submit">저장</button>
      </div>
    </form>
  );
};

export default CompanyEdit;
