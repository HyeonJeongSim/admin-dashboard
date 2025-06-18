// src/models/common.ts

// 페이지 모드
export type PageMode = "list" | "create" | "edit" | "view";

// 버튼 타입
export type ButtonType = "primary" | "secondary" | "danger";

// 버튼 크기
export type ButtonSize = "small" | "medium" | "large";

// 모달 관련
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

// 입력 필드 타입
export type InputType =
  | "text"
  | "email"
  | "tel"
  | "number"
  | "password"
  | "date";

// 폼 필드 공통 속성
export interface FormFieldProps {
  label: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

// API 응답 공통 구조
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string>;
}

// 테이블 컬럼 정의
export interface TableColumn<T = any> {
  key: keyof T;
  title: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: any, record: T) => React.ReactNode;
}

// 페이지네이션
export interface Pagination {
  current: number;
  pageSize: number;
  total: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
}

// 검색 조건 기본 구조
export interface SearchParams {
  keyword?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// 메뉴 아이템 (실제 사이트 메뉴 구조)
export interface SiteMenu {
  id: number;
  title: string;
  level: number;
  parentId: number | null;
  icon?: string;
  disabled?: boolean;
  children?: SiteMenu[];
}

// 메뉴 아이템 (GNB에서 사용)
export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  path?: string;
  children?: MenuItem[];
  expanded?: boolean;
}

// 폼 검증 규칙
export interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  custom?: (value: string) => string | undefined;
}

// 폼 검증 결과
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// 로딩 상태
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

// 에러 상태
export interface ErrorState {
  hasError: boolean;
  message?: string;
  code?: string;
}

// 선택 가능한 옵션
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// 체크박스 관련
export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

// 이벤트 핸들러 타입들
export type ClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;
export type ChangeHandler = (
  event: React.ChangeEvent<HTMLInputElement>
) => void;
export type SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void;
