import nodemailer from 'nodemailer';
import { AppError } from '@/utils/appError';

// ─── Tạo transporter dùng Gmail SMTP + App Password  ──────
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,    // Gmail address, VD: ridex.app@gmail.com
    pass: process.env.EMAIL_PASS,    // App Password (16 ký tự, không phải mật khẩu Gmail)
  },
});

// ─── Kiểm tra kết nối khi khởi động (optional, dùng khi dev) ────────────────
export const verifyMailTransporter = async () => {
  try {
    await transporter.verify();
    console.log('✅ Mail transporter connected successfully');
  } catch (error) {
    console.error('❌ Mail transporter connection failed:', error);
  }
};

// ─── Helper nội bộ gửi email ─────────────────────────────────────────────────
const sendMail = async (options: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    await transporter.sendMail({
      from: `"RideX App" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  } catch (error) {
    throw new AppError('Không thể gửi email, vui lòng thử lại sau', 500);
  }
};

// ─── 1. Email xác thực tài khoản (Verify Email) ─────────────────────────────
export const sendVerificationEmail = async (to: string, token: string) => {
  const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2563eb;">🚴 Xác thực tài khoản RideX</h2>
      <p>Chào mừng bạn đến với RideX!</p>
      <p>Nhấn vào nút bên dưới để xác thực địa chỉ email của bạn:</p>
      <a href="${verifyUrl}"
         style="display: inline-block; background-color: #2563eb; color: #fff;
                padding: 12px 24px; border-radius: 6px; text-decoration: none;
                font-weight: bold; margin: 16px 0;">
        Xác thực Email
      </a>
      <p style="color: #6b7280; font-size: 14px;">
        Liên kết này có hiệu lực trong <strong>24 giờ</strong>.<br/>
        Nếu bạn không đăng ký tài khoản, hãy bỏ qua email này.
      </p>
      <hr style="border-color: #e5e7eb;" />
      <p style="color: #9ca3af; font-size: 12px;">RideX — Dịch vụ xe đạp chia sẻ</p>
    </div>
  `;

  await sendMail({
    to,
    subject: '✅ Xác thực tài khoản RideX',
    html,
  });
};

// ─── 2. Email đặt lại mật khẩu (Forgot Password) ────────────────────────────
export const sendPasswordResetEmail = async (to: string, token: string) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #dc2626;">🔐 Đặt lại mật khẩu RideX</h2>
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
        Nếu bạn không yêu cầu, hãy bỏ qua email này. Mật khẩu của bạn sẽ không bị thay đổi.
      </p>
      <hr style="border-color: #e5e7eb;" />
      <p style="color: #9ca3af; font-size: 12px;">RideX — Dịch vụ xe đạp chia sẻ</p>
    </div>
  `;

  await sendMail({
    to,
    subject: '🔑 Đặt lại mật khẩu RideX',
    html,
  });
};
