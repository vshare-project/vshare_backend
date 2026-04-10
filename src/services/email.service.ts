import { AppError } from '@/utils/appError';

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

// ─── Helper nội bộ gửi email qua Brevo REST API ───────────────────────────────
const sendMail = async (options: {
  to: string;
  subject: string;
  html: string;
}) => {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new AppError('BREVO_API_KEY chưa được cấu hình', 500);

  const payload = {
    sender: {
      email: process.env.BREVO_SENDER_EMAIL || 'no-reply@vshare.vn',
      name: process.env.BREVO_SENDER_NAME || 'VShare',
    },
    to: [{ email: options.to }],
    subject: options.subject,
    htmlContent: options.html,
  };

  const response = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    console.error('❌ Brevo API error:', errorBody);
    throw new AppError('Không thể gửi email, vui lòng thử lại sau', 500);
  }
};

// ─── Kiểm tra kết nối khi khởi động (optional) ────────────────────────────────
export const verifyMailTransporter = async () => {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn('⚠️  BREVO_API_KEY chưa được cấu hình, email sẽ không hoạt động');
    return;
  }
  try {
    const res = await fetch('https://api.brevo.com/v3/account', {
      headers: { 'api-key': apiKey, 'Accept': 'application/json' },
    });
    if (res.ok) {
      const data: any = await res.json();
      console.log(`✅ Brevo connected — account: ${data?.email ?? 'OK'}`);
    } else {
      console.error('❌ Brevo API key không hợp lệ, status:', res.status);
    }
  } catch (error) {
    console.error('❌ Brevo connection failed:', error);
  }
};

// ─── 1. Email xác thực tài khoản ──────────────────────────────────────────────
export const sendVerificationEmail = async (to: string, token: string) => {
  const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #16a34a;">🛵 Xác thực tài khoản VShare</h2>
      <p>Chào mừng bạn đến với VShare — dịch vụ cho thuê xe nội đô!</p>
      <p>Nhấn vào nút bên dưới để xác thực địa chỉ email của bạn:</p>
      <a href="${verifyUrl}"
         style="display: inline-block; background-color: #16a34a; color: #fff;
                padding: 12px 24px; border-radius: 6px; text-decoration: none;
                font-weight: bold; margin: 16px 0;">
        Xác thực Email
      </a>
      <p style="color: #6b7280; font-size: 14px;">
        Liên kết này có hiệu lực trong <strong>24 giờ</strong>.<br/>
        Nếu bạn không đăng ký tài khoản, hãy bỏ qua email này.
      </p>
      <hr style="border-color: #e5e7eb;" />
      <p style="color: #9ca3af; font-size: 12px;">VShare — Cho thuê xe nội đô</p>
    </div>
  `;

  await sendMail({ to, subject: '✅ Xác thực tài khoản VShare', html });
};

// ─── 2. Email đặt lại mật khẩu ────────────────────────────────────────────────
export const sendPasswordResetEmail = async (to: string, token: string) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #dc2626;">🔐 Đặt lại mật khẩu VShare</h2>
      <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
      <p>Nhấn vào nút bên dưới để tạo mật khẩu mới:</p>
      <a href="${resetUrl}"
         style="display: inline-block; background-color: #dc2626; color: #fff;
                padding: 12px 24px; border-radius: 6px; text-decoration: none;
                font-weight: bold; margin: 16px 0;">
        Đặt lại mật khẩu
      </a>
      <p style="color: #6b7280; font-size: 14px;">
        Liên kết này có hiệu lực trong <strong>10 phút</strong>.<br/>
        Nếu bạn không yêu cầu, hãy bỏ qua email này.
      </p>
      <hr style="border-color: #e5e7eb;" />
      <p style="color: #9ca3af; font-size: 12px;">VShare — Cho thuê xe nội đô</p>
    </div>
  `;

  await sendMail({ to, subject: '🔑 Đặt lại mật khẩu VShare', html });
};

// ─── 3. Email xác nhận đặt xe ─────────────────────────────────────────────────
export const sendBookingConfirmEmail = async (options: {
  to: string;
  customerName: string;
  vehicleName: string;
  startTime: string;
  endTime: string;
  stationName: string;
  totalPrice: number;
}) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #16a34a;">🛵 Xác nhận đặt xe VShare</h2>
      <p>Xin chào <strong>${options.customerName}</strong>,</p>
      <p>Đơn đặt xe của bạn đã được xác nhận thành công!</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr style="background-color: #f9fafb;">
          <td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold;">Xe</td>
          <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${options.vehicleName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold;">Trạm</td>
          <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${options.stationName}</td>
        </tr>
        <tr style="background-color: #f9fafb;">
          <td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold;">Bắt đầu</td>
          <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${options.startTime}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold;">Kết thúc</td>
          <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${options.endTime}</td>
        </tr>
        <tr style="background-color: #f0fdf4;">
          <td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: bold;">Tổng tiền</td>
          <td style="padding: 8px 12px; border: 1px solid #e5e7eb; color: #16a34a; font-weight: bold;">
            ${options.totalPrice.toLocaleString('vi-VN')} đ
          </td>
        </tr>
      </table>
      <hr style="border-color: #e5e7eb;" />
      <p style="color: #9ca3af; font-size: 12px;">VShare — Cho thuê xe nội đô</p>
    </div>
  `;

  await sendMail({ to: options.to, subject: '🛵 Đặt xe thành công - VShare', html });
};
