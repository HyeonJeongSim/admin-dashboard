import React, { useEffect, useState } from "react";
import type { CompanyFormData, CompanyDetail } from "../../models/company";
import "../../styles/components/CompanyDetail.css";
import "../../styles/components/CompanyEdit.css";

interface CompanyEditProps {
  company: CompanyDetail | null;
  onCancel: () => void;
  onSave: (updatedCompany: CompanyFormData) => void;
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

const CompanyEdit: React.FC<CompanyEditProps> = ({
  company,
  onCancel,
  onSave,
}) => {
  const [formData, setFormData] = useState<CompanyFormData | null>(null);

  useEffect(() => {
    if (company) {
      setFormData({
        ...company,
        code: company.code ?? "",
        name: company.ceo_name ?? "",
        type: "매입", // 필요 시 변경
      });
    }
  }, [company]);

  if (!formData) return <div></div>;

  const handleChange = (field: keyof CompanyFormData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) onSave(formData);
  };

  // 버튼 핸들러들 (실제 기능 없음)
  const handleBusinessRegistrationCheck = () => {
    console.log("사업자등록상태조회 클릭");
  };

  const handleZipcodeSearch = () => {
    console.log("우편번호 검색 클릭");
  };

  return (
    <form className="company-detail-form" onSubmit={handleSubmit}>
      <table className="company-detail">
        <tbody>
          <tr>
            <td>사업자등록번호*</td>
            <td colSpan={3}>
              <div className="input-with-button">
                <input
                  value={formatWithHyphen(formData.brn || "", "biz")}
                  onChange={(e) => handleChange("brn", e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleBusinessRegistrationCheck}
                  className="btn-search">
                  사업자등록상태조회
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>주민등록번호*</td>
            <td>
              <input
                value={formatWithHyphen(
                  formData.resident_registration_number || "",
                  "personal"
                )}
                onChange={(e) =>
                  handleChange("resident_registration_number", e.target.value)
                }
              />
            </td>
            <td>주민기재분*</td>
            <td>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="is_active"
                    value="true"
                    checked={formData.is_active === true}
                    onChange={(e) => handleChange("is_active", true)}
                  />
                  부
                </label>
                <label>
                  <input
                    type="radio"
                    name="is_active"
                    value="false"
                    checked={formData.is_active === false}
                    onChange={(e) => handleChange("is_active", false)}
                  />
                  여
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td>대표자 성명*</td>
            <td>
              <input
                value={formData.ceo_name || ""}
                onChange={(e) => handleChange("ceo_name", e.target.value)}
              />
            </td>
            <td>종 사업장 번호*</td>
            <td>
              <input
                type="text"
                value={formData.sub_business_number || ""}
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
                value={formData.business_type || ""}
                onChange={(e) => handleChange("business_type", e.target.value)}
              />
            </td>
            <td>종목*</td>
            <td>
              <input
                value={formData.item || ""}
                onChange={(e) => handleChange("item", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>주소*</td>
            <td colSpan={3}>
              <div className="address-group">
                <div className="zipcode-row">
                  <input
                    value={formData.zipcode || ""}
                    onChange={(e) => handleChange("zipcode", e.target.value)}
                    placeholder="우편번호"
                  />
                  <button
                    type="button"
                    onClick={handleZipcodeSearch}
                    className="btn-search">
                    우편번호 검색
                  </button>
                </div>
                <input
                  value={formData.address || ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="주소를 입력하세요"
                  className="address-input"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>연락처</td>
            <td>
              <input
                value={formatWithHyphen(formData.phone || "", "phone")}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </td>
            <td>팩스번호</td>
            <td>
              <input
                value={formatWithHyphen(formData.fax || "", "phone")}
                onChange={(e) => handleChange("fax", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>담당(부서)사원</td>
            <td colSpan={3}>
              <div className="department-group">
                <div className="department-row">
                  <span>부서명</span>
                  <input
                    value={formData.department || ""}
                    onChange={(e) => handleChange("department", e.target.value)}
                    placeholder="부서명"
                  />
                </div>
                <div className="department-row">
                  <span>담당자</span>
                  <input
                    value={formData.manager || ""}
                    onChange={(e) => handleChange("manager", e.target.value)}
                    placeholder="담당자명"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>인쇄할거래처명</td>
            <td colSpan={3}>
              <input
                value={formData.printable_company_name || ""}
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
                value={formatCurrency(formData.guarantee_amount || "")}
                onChange={(e) =>
                  handleChange("guarantee_amount", e.target.value)
                }
              />
              원
            </td>
            <td>여신한도액</td>
            <td>
              <input
                value={formatCurrency(formData.credit_limit || "")}
                onChange={(e) => handleChange("credit_limit", e.target.value)}
              />
              원
            </td>
          </tr>
          <tr>
            <td>주류코드</td>
            <td colSpan={3}>
              <div className="liquor-code-group">
                <input
                  value=""
                  onChange={(e) => console.log("주류코드1:", e.target.value)}
                  placeholder="주류코드 1"
                />
                <input
                  value=""
                  onChange={(e) => console.log("주류코드2:", e.target.value)}
                  placeholder="주류코드 2"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>입금 계좌 번호</td>
            <td colSpan={3}>
              <div className="account-group">
                <div className="account-row">
                  <span>은행</span>
                  <input
                    value={formData.bank || ""}
                    onChange={(e) => handleChange("bank", e.target.value)}
                    placeholder="은행명"
                  />
                </div>
                <div className="account-row">
                  <span>예금주</span>
                  <input
                    value={formData.account_holder || ""}
                    onChange={(e) =>
                      handleChange("account_holder", e.target.value)
                    }
                    placeholder="예금주명"
                  />
                  <span>계좌번호</span>
                  <input
                    value={formData.account_number || ""}
                    onChange={(e) =>
                      handleChange("account_number", e.target.value)
                    }
                    placeholder="계좌번호"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>업체담당자이메일</td>
            <td colSpan={3}>
              <input
                value={formData.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>거래처 분류명</td>
            <td colSpan={3}>
              <div className="category-group">
                <input
                  value={formData.category1 || ""}
                  onChange={(e) => handleChange("category1", e.target.value)}
                  placeholder="분류명 1"
                />
                <input
                  value={formData.category2 || ""}
                  onChange={(e) => handleChange("category2", e.target.value)}
                  placeholder="분류명 2"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>거래시작(종료)일</td>
            <td colSpan={3}>
              <div className="date-group">
                <div className="date-row">
                  <span>시작일</span>
                  <input
                    type="date"
                    value={formData.contract_start || ""}
                    onChange={(e) =>
                      handleChange("contract_start", e.target.value)
                    }
                  />
                  <span>종료일</span>
                  <input
                    type="date"
                    value={formData.contract_end || ""}
                    onChange={(e) =>
                      handleChange("contract_end", e.target.value)
                    }
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>비고</td>
            <td colSpan={3}>
              <textarea
                value={formData.note || ""}
                onChange={(e) => handleChange("note", e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>사용여부</td>
            <td colSpan={3}>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="usage_status"
                    value="true"
                    onChange={(e) => console.log("사용여부:", true)}
                  />
                  부
                </label>
                <label>
                  <input
                    type="radio"
                    name="usage_status"
                    value="false"
                    onChange={(e) => console.log("사용여부:", false)}
                  />
                  여
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default CompanyEdit;
