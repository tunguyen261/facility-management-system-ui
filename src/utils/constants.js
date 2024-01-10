import styled from "styled-components";

const COOKIE_JWT = 'token';

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

const STATUS_TYPES = {
  HIDDEN: 0,
  ACTIVE: 1,
  ALL: 2,
};
const STATUS_REVIEW = {
  NOTREVIEW: 0,
  REVIEWED: 1,
  REVIEWING: 2,
  AUTOREVIEW: 3,
  ALL: 4,
};

const GENDER_TYPES = {
  ALL: 2,
  MALE: 1,
  FEMALE: 0,
};
const REVIEW_STATUS_TYPES = {
  NOREVIEW: 0,
  NOTYETREVIEW: 1,
  REVIEWING: 2,
  REVIEWED: 3,
  ALL: 4,
};

const GENDER_OPTIONS = [
  {
    value: true,
    label: 'Nam',
  },
  {
    value: false,
    label: 'Nữ',
  },
];
const REQUEST_STATUS_OPTIONS  = [
  { value: 1 , label: 'Chưa bắt đầu'},
  { value: 2 , label: 'Đang xử lý'},
  { value: 3 , label: 'Đã báo cáo'},
  { value: 4 , label: 'Đã hoàn thành'},
  { value: 5 , label: 'Đã hủy'},
  { value: 6 , label: 'Khác'},
]

const STATUS_OPTIONS = [
  {
    value: 2,
    label: 'Tất cả',
  },
  {
    value: 1,
    label: 'Kích hoạt',
  },
  {
    value: 0,
    label: 'Khóa',
  },
];

const SOURCE_TYPES = [
  {
    key: 1,
    label: 'Facebook',
    value: 1,
  },
  {
    key: 2,
    label: 'Zalo',
    value: 2,
  },
  {
    key: 3,
    label: 'Hotline',
    value: 3,
  },
  {
    key: 4,
    label: 'Tawk.to',
    value: 4,
  },
  {
    key: 5,
    label: 'Website',
    value: 5,
  },
  {
    key: 6,
    label: 'Instagram',
    value: 6,
  },
  {
    key: 7,
    label: 'Người giới thiệu',
    value: 7,
  },
  {
    key: 0,
    label: 'Khác',
    value: 0,
  },
];

const STATUS_STOCKS_IN = {
  ALL: 2,
  STOCKED: 1,
  NOTYETSTOCKED: 0,
};

const TYPE_NOTIFY = {
  MAIL: 'MAIL',
  ANNOUNCE: 'ANNOUNCE',
};

const OPTION_TYPE_GLOBAL = {
  AREA: 'AREA',
  DEPARTMENT: 'DEPARTMENT',
  BUSINESS: 'BUSINESS',
  CLUSTER: 'CLUSTER',
};

const BUDGET_CREATION = {
  ALL: 2,
  HAVE: 1,
  NOT_HAVE: 0,
};

const RETURN_CONDITION = {
  ALL: 2,
  ISRETURN: 1,
  ISEXCHANGE: 3,
};

const DEFAULT_PAGINATION = {
  items: [],
  itemsPerPage: 0,
  page: 0,
  totalItems: 0,
  totalPages: 0,
};

const LARGE_LIST_PARAMS = {
  is_active: 1,
  page: 1,
  itemsPerPage: 25,
};

const MEDIUM_LIST_PARAMS = {
  is_active: 1,
  page: 1,
  itemsPerPage: 10,
};

const SMALL_LIST_PARAMS = {
  is_active: 1,
  page: 1,
  itemsPerPage: 5,
};

const FORM_RULES = {
  phone: {
    required: 'Số điện thoại là bắt buộc',
    pattern: {
      value: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      message: 'Số điện thoại phải là số',
    },
  },
  email: {
    required: 'Email là bắt buộc',
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Email không hợp lệ',
    },
  },
  number: (message = 'Vui lòng chỉ nhập số') => ({
    pattern: {
      value: /^[0-9]+$/,
      message,
    },
  }),
  vietnameseName: (message = 'Tên không được chứa ký tự đặc biệt') => ({
    value:
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
    message,
  }),
};
const UnitOptions = [
  {
      id: 1,
      unit_name: 'Cái' ,
  },
  {
      id: 2,
      unit_name: 'Kilogram' 
  },
  {
      id: 3,
      unit_name: 'Lít' 
  },
  {
      id: 4,
      unit_name: 'Mét' 
  },
  {
      id: 5,
      unit_name: 'Mét vuông' 
  },

  {
      id: 6,
      unit_name: 'Giờ' 
  },{
      id: 7,
      unit_name: 'Bao' 
  },
  {
      id: 8,
      unit_name: 'Đôi' 
  },
  {
      id: 10,
      unit_name: 'Thùng' 
  },
  {
      id: 11,
      unit_name: 'Hộp' 
  },
//   {
//     id: 12,
//     unit_name: 'Chiếc' 
// },
]

const MOVABLE_OPTION = [
  {
    value: true,
    name: 'Có thể'
  },
  {
    value: false,
    name: 'Không thể'
  },
]

const REQUEST_STATUS = {
  NotStart : 1,
  InProgress  : 2,
  Reported : 3,
  Done : 4,
  Cancelled : 5,
  Others : 6
}

const Label = styled.p`
  display: inline-block;
  padding: 3px 7px;
  line-height: normal !important;
  font-size: 13px;
  background: var(--whiteColor);
  color: ${(props) => (props.color)};
  border: 1px solid  ${(props) => (props.color)};
  border-radius: 3px;
`

const ASSET_STATUS = {
  Operational  : 1,
  Inactive   : 2,
  Maintenance  : 3,
  Repair  : 4,
  NeedInspection  : 5,
  Replacement  : 6,
  Transportation : 7,
  Damaged :8,
  Others : 9 
}

const ASSET_STATUS_OPTIONS = [
  {
    value: ASSET_STATUS.Operational,
    label: 'Hoạt động bình thường'
  },
  {
    value: ASSET_STATUS.Inactive,
    label: 'Không thể sử dụng'
  },
  // {
  //   value: ASSET_STATUS.Maintenance  ,
  //   label: 'Đang bảo dưỡng'
  // },
  // {
  //   value: ASSET_STATUS.Repair ,
  //   label: 'Đang sửa chữa'
  // },
  // {
  //   value: ASSET_STATUS.Replacement  ,
  //   label: 'Đang chờ thay thế'
  // },
  // {
  //   value: ASSET_STATUS.Transportation ,
  //   label: 'Đang được điều chuyển'
  // },
  {
    value: ASSET_STATUS.Damaged ,
    label: 'Hư hại'
  },
  {
    value: ASSET_STATUS.Others ,
    label: 'Khác'
  },
]

const PRIORRITY = {
  Highest : 1,
  High : 2,
  Medium: 3,
  Low: 4,
  Lowest: 5
}

const PRIORRITY_OPTIONS = [
  {
    value: PRIORRITY.Highest,
    name: 'Cao nhất',
    label: 'Cao nhất',
  },
  {
    value: PRIORRITY.High,
    name: 'Cao',
    label: 'Cao',
  },
  {
    value: PRIORRITY.Medium,
    name: 'Trung bình',
    label: 'Trung bình',
  },
  {
    value: PRIORRITY.Low,
    name: 'Thấp',
    label: 'Thấp'
  },
  {
    value: PRIORRITY.Lowest,
    name: 'Thấp nhất',
    label: 'Thấp nhất'
  },
]

const RENTED_OPTIONS = [
  {
    value: true,
    label: 'Có',
  },
  {
    value: false,
    label: 'Không',
  }
]

const INDENTIFY_OPTIONS = [
  {
    value: true,
    label: 'Có',
  },
  {
    value: false,
    label: 'Không',
  }
]


export {
  query,
  // formatter,
  COOKIE_JWT,
  STATUS_TYPES,
  STATUS_OPTIONS,
  GENDER_TYPES,
  STATUS_REVIEW,
  REVIEW_STATUS_TYPES,
  GENDER_OPTIONS,
  STATUS_STOCKS_IN,
  TYPE_NOTIFY,
  BUDGET_CREATION,
  RETURN_CONDITION,
  SOURCE_TYPES,
  SMALL_LIST_PARAMS,
  MEDIUM_LIST_PARAMS,
  LARGE_LIST_PARAMS,
  FORM_RULES,
  DEFAULT_PAGINATION,
  UnitOptions,
  MOVABLE_OPTION,
  REQUEST_STATUS,
  REQUEST_STATUS_OPTIONS,
  Label,
  ASSET_STATUS_OPTIONS,
  ASSET_STATUS,
  PRIORRITY,
  PRIORRITY_OPTIONS,
  RENTED_OPTIONS,
  INDENTIFY_OPTIONS,
};
