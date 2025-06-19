// src/types/company.ts

// 거래처 유형 (clients.json 기준)
export type CompanyType = "매입" | "매출" | "동시";

// 거래처 기본 정보 (목록에서 보여지는 정보 - clients.json 기준)
export interface Company {
  id: string;
  no: number; // 순번 (UI용)
  code: string; // 코드 (C001, C002 등)
  brn: string; // 등록번호
  name: string; // 거래처명
  type: CompanyType; // 유형 (매입/매출/동시)
  selected?: boolean; // 체크박스 선택 상태
}

// 거래처 상세 정보 (companies.json 기준)
export interface CompanyDetail {
  // 기본 정보
  id: number;
  brn: string; // 사업자등록번호
  resident_registration_number: string; // 주민등록번호
  ceo_name: string; // 대표자명
  sub_business_number: number; // 종사업장번호

  // 업종/업태 정보
  business_type: string; // 업종
  item: string; // 업태(종목)

  // 주소 정보
  zipcode: string; // 우편번호
  address: string; // 주소

  // 연락처 정보
  phone: string; // 전화번호
  fax: string; // 팩스번호
  email: string; // 이메일

  // 회사 정보
  department: string; // 부서
  manager: string; // 담당자
  printable_company_name: string; // 출력용 회사명

  // 금융 정보
  guarantee_amount: string; // 보증금액
  credit_limit: string; // 여신한도
  bank: string; // 은행명
  account_holder: string; // 계좌주
  account_number: string; // 계좌번호

  // 분류 정보
  category1: string; // 업종 분류1
  category2: string; // 업종 분류2

  // 계약 정보
  contract_start: string; // 계약 시작일
  contract_end: string; // 계약 종료일

  // 기타
  note: string; // 비고
  is_active: boolean; // 주민기재분

  // 상품 정보 (선택적)
  product_code?: string; // 상품코드
  product_name?: string; // 상품명
}

// 거래처 폼 데이터 (등록/수정시 사용)
export interface CompanyFormData {
  // 필수 정보
  code: string; // 코드*
  brn: string; // 사업자등록번호*
  name: string; // 거래처명*
  type: CompanyType; // 유형*

  // 기본 정보
  resident_registration_number?: string;
  ceo_name?: string;
  sub_business_number?: number;

  // 업종/업태 정보
  business_type?: string;
  item?: string;

  // 주소 정보
  zipcode?: string;
  address?: string;

  // 연락처 정보
  phone?: string;
  fax?: string;
  email?: string;

  // 회사 정보
  department?: string;
  manager?: string;
  printable_company_name?: string;

  // 금융 정보
  guarantee_amount?: string;
  credit_limit?: string;
  bank?: string;
  account_holder?: string;
  account_number?: string;

  // 분류 정보
  category1?: string;
  category2?: string;

  // 계약 정보
  contract_start?: string;
  contract_end?: string;

  // 기타
  note?: string;
  is_active?: boolean;

  // 상품 정보
  product_code?: string;
  product_name?: string;
}

// 사업자등록상태조회 관련 (brn.json 기준)
export interface BusinessStatus {
  brn: string; // 사업자등록번호
  status: string; // 상태 (부가가치세 일반과세자, 휴업 상태, 폐업자 등)
}

// export interface BusinessStatusRequest {
//   brn: string; // 사업자등록번호
//   ceo_name?: string; // 대표자명
//   open_date?: string; // 개업일자
// }

export interface BusinessStatusResponse {
  success: boolean; // 조회 성공 여부
  data?: BusinessStatus; // 조회 결과
  message?: string; // 실패시 메시지
}

// 우편번호 검색 관련
export interface PostcodeSearchRequest {
  keyword: string; // 검색 키워드 (도로명, 지번 등)
}

export interface PostcodeResult {
  zipCode: string; // 우편번호
  address: string; // 기본 주소
  roadAddress: string; // 도로명 주소
  jibunAddress: string; // 지번 주소
  detailAddress?: string; // 상세 주소 (사용자 입력)
}

export interface PostcodeSearchResponse {
  results: PostcodeResult[];
  total: number;
}
