// src/utils/formatter.ts

export const formatWithHyphen = (
  value: string,
  type: "biz" | "personal" | "phone"
) => {
  const cleaned = value.replace(/\D/g, "");

  switch (type) {
    case "biz":
      return cleaned.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3");
    case "personal":
      return cleaned.replace(/(\d{6})(\d{7})/, "$1-$2");
    case "phone":
      return cleaned.length === 11
        ? cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
        : cleaned.replace(/(\d{2,3})(\d{3,4})(\d{4})/, "$1-$2-$3");
    default:
      return value;
  }
};

export const formatCurrency = (
  value: string | number | null | undefined
): string => {
  if (value === null || value === undefined) {
    return "0";
  }

  // 모든 타입을 문자열로 변환
  const stringValue = String(value);

  // 숫자만 추출
  const digits = stringValue.replace(/\D/g, "");

  // 숫자로 변환 후 포맷팅
  const num = parseInt(digits, 10);
  return isNaN(num) ? "0" : num.toLocaleString();
};

export const formatBoolean = (value: boolean | string | number) => {
  return value === true || value === "1" || value === 1 ? "여" : "부";
};
