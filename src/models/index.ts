// src/models/index.ts

// 거래처 관련 타입들
export type {
  CompanyType,
  Company,
  CompanyDetail,
  CompanyFormData,
  CompanySearchParams,
  CompanyListResponse,
  BusinessStatus,
  BusinessStatusResponse,
  PostcodeSearchRequest,
  PostcodeResult,
  PostcodeSearchResponse,
} from "./company";

// 공통 타입들
export type {
  PageMode,
  ButtonType,
  ButtonSize,
  ModalProps,
  InputType,
  FormFieldProps,
  ApiResponse,
  TableColumn,
  Pagination,
  SearchParams,
  SiteMenu,
  MenuItem,
  ValidationRule,
  ValidationResult,
  LoadingState,
  ErrorState,
  SelectOption,
  CheckboxProps,
  ClickHandler,
  ChangeHandler,
  SubmitHandler,
} from "./common";
