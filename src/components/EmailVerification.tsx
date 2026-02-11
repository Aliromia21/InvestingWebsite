import { useState, useEffect } from 'react';
import { TrendingUp, Mail, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';

interface EmailVerificationProps {
  email: string;
  onVerified: () => void;
  onResend: () => void;
}

export function EmailVerification({ email, onVerified, onResend }: EmailVerificationProps) {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleVerify = () => {
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsVerifying(true);
    setError('');

    setTimeout(() => {
      setIsVerified(true);
      setIsVerifying(false);
      
      setTimeout(() => {
        onVerified();
      }, 2000);
    }, 1500);
  };

  const handleResendCode = () => {
    if (!canResend) return;
    
    setCanResend(false);
    setCountdown(60);
    setCode('');
    setError('');
    onResend();
    
    alert('A new verification code has been sent to your email!');
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
            <h2 className="text-white mb-2">Email Verified!</h2>
            <p className="text-blue-200 mb-6">
              Your email has been successfully verified. Redirecting to dashboard...
            </p>
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <span className="text-white text-xl">InvestPro</span>
          </div>

          {/* Email Icon */}
          <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-blue-400" />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-white mb-2">Verify Your Email</h2>
            <p className="text-blue-200 mb-2">
              We've sent a 6-digit verification code to
            </p>
            <p className="text-white">{email}</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-blue-200 text-sm mb-3 block text-center">
                Enter Verification Code
              </label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={code}
                  onChange={(value) => {
                    setCode(value);
                    setError('');
                  }}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="bg-white/10 border-white/20 text-white" />
                    <InputOTPSlot index={1} className="bg-white/10 border-white/20 text-white" />
                    <InputOTPSlot index={2} className="bg-white/10 border-white/20 text-white" />
                    <InputOTPSlot index={3} className="bg-white/10 border-white/20 text-white" />
                    <InputOTPSlot index={4} className="bg-white/10 border-white/20 text-white" />
                    <InputOTPSlot index={5} className="bg-white/10 border-white/20 text-white" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
            </div>

            <Button
              onClick={handleVerify}
              disabled={code.length !== 6 || isVerifying}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 py-6"
            >
              {isVerifying ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </span>
              ) : (
                'Verify Email'
              )}
            </Button>

            <div className="text-center">
              <p className="text-blue-200 text-sm mb-2">Didn't receive the code?</p>
              <button
                onClick={handleResendCode}
                disabled={!canResend}
                className={`text-sm ${
                  canResend
                    ? 'text-blue-400 hover:text-blue-300 cursor-pointer'
                    : 'text-blue-400/50 cursor-not-allowed'
                } transition-colors`}
              >
                {canResend ? 'Resend Code' : `Resend in ${countdown}s`}
              </button>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <p className="text-blue-200 text-sm text-center">
            💡 Check your spam folder if you don't see the email
          </p>
        </div>
      </div>
    </div>
  );
}
