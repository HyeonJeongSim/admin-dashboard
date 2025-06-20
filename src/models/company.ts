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
  id: number;
  brn: string; // 사업자등록번호
  resident_registration_number: string; // 주민등록번호
  ceo_name: string; // 대표자명
  sub_business_number: number; // 종사업장번호
  code?: string;

  business_type: string; // 업종
  item: string; // 종목

  zipcode: string; // 우편번호
  address: string; // 주소

  phone: string; // 전화번호
  fax: string; // 팩스번호
  email: string; // 이메일

  department: string; // 부서
  manager: string; // 담당자
  printable_company_name: string; // 출력용 회사명

  guarantee_amount: string; // 담보설정액
  credit_limit: string; // 여신한도액
  bank: string; // 은행명
  account_holder: string; // 계좌주
  account_number: string; // 계좌번호

  category1: string; // 업종 분류1
  category2: string; // 업종 분류2

  contract_start: string; // 계약 시작일
  contract_end: string; // 계약 종료일

  note: string; // 비고
  is_active: boolean; //사용여부
  resident_type: boolean; // 주민기재분

  product_code?: string; // 주류코드
  product_name?: string;
}

// 거래처 폼 데이터 (등록/수정시 사용)
export interface CompanyFormData {
  code: string; // 코드
  brn: string; // 사업자등록번호
  name: string; // 거래처명
  type: CompanyType; // 유형

  resident_registration_number?: string;
  ceo_name?: string;
  sub_business_number?: number;

  business_type?: string;
  item?: string;

  zipcode?: string;
  address?: string;

  phone?: string;
  fax?: string;
  email?: string;

  department?: string;
  manager?: string;
  printable_company_name?: string;

  guarantee_amount?: string;
  credit_limit?: string;
  bank?: string;
  account_holder?: string;
  account_number?: string;

  category1?: string;
  category2?: string;

  contract_start?: string;
  contract_end?: string;

  note?: string;
  is_active?: boolean;
  resident_type: boolean;

  product_code?: string;
  product_name?: string;
}

// 우편번호 검색 관련

export interface PostcodeResult {
  zipCode: string; // 우편번호
  address: string; // 기본 주소
  roadAddress: string; // 도로명 주소
  jibunAddress: string; // 지번 주소
  detailAddress?: string; // 상세 주소 (사용자 입력)
}
