// Define the TranslationDictionary type directly to avoid circular import
type TranslationDictionary = {
  [key: string]: string | TranslationDictionary;
};

// Dictionary tiếng Việt
export const vi: TranslationDictionary = {
  common: {
    welcome: 'Chào mừng bạn!',
    loading: 'Đang tải...',
    error: 'Đã xảy ra lỗi',
    success: 'Thành công',
    confirm: 'Xác nhận',
    cancel: 'Hủy',
    save: 'Lưu',
    edit: 'Sửa',
    delete: 'Xóa',
    back: 'Quay lại',
    next: 'Tiếp theo',
    previous: 'Trước',
    close: 'Đóng',
    search: 'Tìm kiếm',
    filter: 'Lọc',
    sort: 'Sắp xếp',
    clear: 'Xóa',
    reset: 'Đặt lại',
    submit: 'Gửi',
    yes: 'Có',
    no: 'Không',
  },
  auth: {
    login: {
      title: 'Đăng nhập',
      subtitle: 'Truy cập vào hệ thống',
      username: 'Tên đăng nhập',
      password: 'Mật khẩu',
      remember: 'Ghi nhớ đăng nhập',
      forgot: 'Quên mật khẩu?',
      submit: 'Đăng nhập',
      loading: 'Đang đăng nhập...',
      success: 'Đăng nhập thành công! Xin chào {{name}}',
      noAccount: 'Chưa có tài khoản?',
      signup: 'Đăng ký',
      testAccount: 'Tài khoản kiểm thử',
      quickLogin: 'Đăng nhập nhanh với tài khoản này',
      welcomeBack: 'Chào mừng trở lại',
      welcomeMessage: 'Đăng nhập vào tài khoản của bạn để tiếp tục từ nơi bạn đã dừng lại.',
      passwordStrength: 'Độ mạnh mật khẩu',
      passwordWeak: 'Yếu',
      passwordMedium: 'Trung bình',
      passwordStrong: 'Mạnh',
      showPassword: 'Hiện mật khẩu',
      hidePassword: 'Ẩn mật khẩu',
      formReady: 'Thông tin đã hợp lệ, bạn có thể đăng nhập',
    },
    validation: {
      required: '{{field}} là bắt buộc',
      minLength: '{{field}} phải có ít nhất {{length}} ký tự',
      invalidCredentials: 'Tên đăng nhập hoặc mật khẩu không chính xác',
      checkUsername: 'Vui lòng kiểm tra lại username và password',
      ensureCorrectInfo: 'Đảm bảo bạn đang sử dụng thông tin đăng nhập chính xác',
      apiUnavailable: 'Nếu vẫn gặp lỗi, có thể do API DummyJSON tạm thời không khả dụng',
    },
    errors: {
      serverError: 'Lỗi máy chủ ({{status}}): {{message}}',
      connectionError: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại',
    },
  },
  dashboard: {
    title: 'Bảng điều khiển',
    welcome: 'Xin chào!',
    loggedInAs: 'Bạn đã đăng nhập với tên',
    logout: 'Đăng xuất',
    profile: {
      title: 'Thông tin cá nhân',
      username: 'Tên đăng nhập',
      name: 'Họ tên',
      email: 'Email',
      noInfo: 'Không có thông tin người dùng',
    },
  },
  languageSwitcher: {
    title: 'Ngôn ngữ',
    vi: 'Tiếng Việt',
    en: 'Tiếng Anh',
  },
};
