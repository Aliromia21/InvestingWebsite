import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { EmailVerification } from './components/EmailVerification';
import { IdentityVerification } from './components/IdentityVerification';
import { ForgotPassword } from './components/ForgotPassword';

type Page =
  | 'landing'
  | 'login'
  | 'signup'
  | 'email-verification'
  | 'identity-verification'
  | 'forgot-password';

export default function LandingPageApp() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [userEmail, setUserEmail] = useState('demo@example.com');

  const handleSignup = (email: string) => {
    setUserEmail(email);
    setCurrentPage('email-verification');
  };

  const handleEmailVerified = () => {
    setCurrentPage('identity-verification');
  };

  const handleIdentityVerified = () => {
   
    alert('Verification complete! In the full app, you would be redirected to the Customer Dashboard.');
  };

  const handleResendCode = () => {
    console.log('Resending verification code to:', userEmail);
  };

  if (currentPage === 'landing') {
    return <LandingPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'login') {
    return <LoginPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'signup') {
    return <SignupPage onSignup={handleSignup} onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'email-verification') {
    return (
      <EmailVerification
        email={userEmail}
        onVerified={handleEmailVerified}
        onResend={handleResendCode}
      />
    );
  }

  if (currentPage === 'identity-verification') {
    return (
      <IdentityVerification
        email={userEmail}
        onVerified={handleIdentityVerified}
      />
    );
  }

  if (currentPage === 'forgot-password') {
    return <ForgotPassword onNavigate={setCurrentPage} />;
  }

  return null;
}
