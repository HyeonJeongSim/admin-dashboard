// 거래처 등록-신규 등록 화면

import React, { useState } from "react";
import { CompanyFormData as CompanyFormDataType } from "../../models/company";
import PostcodeModal from "./PostcodeModal";
import { PostcodeResult } from "../../models/company";
import "../../styles/common.css";
import "../../styles/components/CompanyDetail.css";
import "../../styles/components/CompanyEdit.css";
import "../../styles/components/Modal.css";

const formatWithHyphen = (
  value: string,
  type: "biz" | "personal" | "phone"
) => {
  const digits = value.replace(/\D/g, "");
  if (type === "biz") {
    return digits.replace(/^(\d{3})(\d{2})(\d{5})$/, "$1-$2-$3");
  }
  if (type === "personal") {
    return digits.replace(/^(\d{6})(\d{7})$/, "$1-$2");
  }
  return digits.replace(/^(0\d{1,2})(\d{3,4})(\d{4})$/, "$1-$2-$3");
};

const formatCurrency = (value: string) => {
  const num = parseInt(value.replace(/,/g, ""), 10);
  return isNaN(num) ? "" : num.toLocaleString();
};

const CompanyRegist: React.FC<{
  onCancel: () => void;
  onSave: (newCompany: CompanyFormDataType) => void;
}> = ({ onCancel, onSave }) => {
  const [formData, setFormData] = useState<CompanyFormDataType>({
    code: "",
    name: "",
    type: "매입",
    brn: "",
    resident_registration_number: "",
    resident_type: true,
    ceo_name: "",
    sub_business_number: undefined,
    business_type: "",
    item: "",
    zipcode: "",
    address: "",
    phone: "",
    fax: "",
    department: "",
    manager: "",
    printable_company_name: "",
    guarantee_amount: "",
    credit_limit: "",
    product_code: "",
    product_name: "",
    bank: "",
    account_holder: "",
    account_number: "",
    email: "",
    category1: "",
    category2: "",
    contract_start: "",
    contract_end: "",
    note: "",
    is_active: true,
  });
  const [isPostcodeModalOpen, setIsPostcodeModalOpen] = useState(false);

  const handleChange = (field: keyof CompanyFormDataType, value: any) => {
    setFormData({ ...formData, [field]: value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  const handlePostcodeComplete = (data: PostcodeResult) => {
    setFormData({
      ...formData,
      zipcode: data.zipCode,
      address: data.address,
    });
    setIsPostcodeModalOpen(false);
  };
  const handlePostcodeModalClose = () => setIsPostcodeModalOpen(false);

  return (
    <>
      <form className="company-detail-form" onSubmit={handleSubmit}>
        <table className="company-detail">
          <tbody>
            <tr>
              <td>
                사업자등록번호<span>*</span>
              </td>
              <td colSpan={3}>
                <div className="input-with-button">
                  <input
                    value={formatWithHyphen(formData.brn || "", "biz")}
                    onChange={(e) => handleChange("brn", e.target.value)}
                    placeholder="사업자등록번호를 입력하세요"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      console.log("사업자등록상태조회 모달 호출 로직 필요")
                    }
                    className="btn-search">
                    사업자등록상태조회
                  </button>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                주민등록번호<span>*</span>
              </td>
              <td>
                <input
                  value={formatWithHyphen(
                    formData.resident_registration_number || "",
                    "personal"
                  )}
                  onChange={(e) =>
                    handleChange("resident_registration_number", e.target.value)
                  }
                  placeholder="주민등록번호를 입력하세요"
                />
              </td>
              <td>
                주민기재분<span>*</span>
              </td>
              <td>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="resident_type"
                      value="true"
                      checked={formData.resident_type === true}
                      onChange={() => handleChange("resident_type", true)}
                    />
                    여
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="resident_type"
                      value="false"
                      checked={formData.resident_type === false}
                      onChange={() => handleChange("resident_type", false)}
                    />
                    부
                  </label>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                대표자 성명<span>*</span>
              </td>
              <td>
                <input
                  value={formData.ceo_name || ""}
                  onChange={(e) => handleChange("ceo_name", e.target.value)}
                  placeholder="대표자 성명을 입력하세요"
                />
              </td>
              <td>
                종 사업장 번호<span>*</span>
              </td>
              <td>
                <input
                  value={formData.sub_business_number || ""}
                  onChange={(e) =>
                    handleChange("sub_business_number", Number(e.target.value))
                  }
                  placeholder="종사업장 번호를 입력하세요"
                />
              </td>
            </tr>

            <tr>
              <td>
                업종<span>*</span>
              </td>
              <td>
                <input
                  value={formData.business_type || ""}
                  onChange={(e) =>
                    handleChange("business_type", e.target.value)
                  }
                  placeholder="업종을 입력하세요"
                />
              </td>
              <td>
                종목<span>*</span>
              </td>
              <td>
                <input
                  value={formData.item || ""}
                  onChange={(e) => handleChange("item", e.target.value)}
                  placeholder="종목을 입력하세요"
                />
              </td>
            </tr>

            <tr>
              <td>
                주소<span>*</span>
              </td>
              <td colSpan={3}>
                <div className="address-group">
                  <div className="zipcode-row">
                    <input
                      value={formData.zipcode || ""}
                      placeholder="우편번호"
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={() => setIsPostcodeModalOpen(true)}
                      className="btn-search">
                      우편번호 검색
                    </button>
                  </div>
                  <input
                    value={formData.address || ""}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="주소를 입력하세요 (상세주소 가능)"
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
                  placeholder="연락처를 입력하세요"
                />
              </td>
              <td>팩스번호</td>
              <td>
                <input
                  value={formatWithHyphen(formData.fax || "", "phone")}
                  onChange={(e) => handleChange("fax", e.target.value)}
                  placeholder="팩스번호를 입력하세요"
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
                      onChange={(e) =>
                        handleChange("department", e.target.value)
                      }
                      placeholder="부서명을 입력하세요"
                    />
                  </div>
                  <div className="department-row">
                    <span>담당자</span>
                    <input
                      value={formData.manager || ""}
                      onChange={(e) => handleChange("manager", e.target.value)}
                      placeholder="담당자명을 입력하세요"
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
                  placeholder="인쇄할 거래처명을 입력하세요"
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
                  placeholder="담보설정액"
                />{" "}
                원
              </td>
              <td>여신한도액</td>
              <td>
                <input
                  value={formatCurrency(formData.credit_limit || "")}
                  onChange={(e) => handleChange("credit_limit", e.target.value)}
                  placeholder="여신한도액"
                />{" "}
                원
              </td>
            </tr>

            <tr>
              <td>주류코드</td>
              <td colSpan={3}>
                <div className="liquor-code-group">
                  <input
                    value={formData.product_code || ""}
                    onChange={(e) =>
                      handleChange("product_code", e.target.value)
                    }
                    placeholder="주류코드"
                  />
                  <input
                    value={formData.product_name || ""}
                    onChange={(e) =>
                      handleChange("product_name", e.target.value)
                    }
                    placeholder="주류명"
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
                  placeholder="이메일을 입력하세요"
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
                  placeholder="비고사항을 입력하세요"
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
                      name="is_active"
                      value="true"
                      checked={formData.is_active === true}
                      onChange={() => handleChange("is_active", true)}
                    />
                    여
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="is_active"
                      value="false"
                      checked={formData.is_active === false}
                      onChange={() => handleChange("is_active", false)}
                    />
                    부
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="button-group">
          <button type="button" onClick={onCancel} className="btn-cancel">
            취소
          </button>
          <button type="submit" className="btn-save">
            저장
          </button>
        </div>
      </form>

      <PostcodeModal
        isOpen={isPostcodeModalOpen}
        onClose={handlePostcodeModalClose}
        onComplete={handlePostcodeComplete}
      />
    </>
  );
};

export const CompanyRegisterModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (newCompany: CompanyFormDataType) => void;
}> = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  const handleSave = (newCompany: CompanyFormDataType) => {
    onSave(newCompany);
    onClose();
  };
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className="modal-overlay" onClick={handleBackgroundClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h2>거래처 신규등록</h2>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <CompanyRegist onCancel={onClose} onSave={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default CompanyRegist;
