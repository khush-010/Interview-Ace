"use client";
import React, { useState, useRef, useEffect } from 'react';
import { X, Mail, Shield, Sparkles } from 'lucide-react';

export default function EmailVerificationModal ({ email, isOpen = true, onClose = () => {}, onSubmit = () => {} }){
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const inputRefs = useRef([]);

  // Function to mask email
  const maskEmail = (email) => {
    const [username, domain] = email.split('@');
    if (username.length <= 4) {
      return `${username.charAt(0)}${'*'.repeat(username.length - 1)}@${domain}`;
    }
    return `${username.substring(0, 4)}${'*'.repeat(username.length - 4)}@${domain}`;
  };

  // Mouse tracking for interactive cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    if (isOpen) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen]);

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    const newOtp = [...otp];
    
    for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
      newOtp[i] = pastedData[i];
    }
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  // Handle submit
  const handleSubmit = () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      onSubmit(otpString);
    }
  };

  // Handle resend
  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    // Add your resend logic here
  };

  // Set up refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  // Auto-focus first input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Animated Background Effects */}
      <div className="absolute inset-0">
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Interactive cursor effect */}
        <div 
          className="absolute w-96 h-96 bg-gradient-radial from-white/3 to-transparent rounded-full blur-2xl pointer-events-none transition-all duration-300"
          style={{ 
            left: mousePosition.x - 192, 
            top: mousePosition.y - 192,
            transform: 'translate(0, 0)'
          }}
        ></div>
      </div>

      <div className="relative z-10 bg-white/5 backdrop-blur-xl rounded-3xl max-w-md w-full p-8 border border-white/10 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Verify Email</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-300 p-2 hover:bg-white/10 rounded-xl"
          >
            <X size={20} />
          </button>
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
          <Sparkles className="w-4 h-4 text-white animate-pulse" />
          <span className="text-white font-medium">Almost There!</span>
        </div>

        {/* Message */}
        <div className="mb-8 text-center">
          <p className="text-gray-400 mb-3 text-lg">
            We've sent a verification code to
          </p>
          <div className="flex items-center justify-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3">
            <Mail className="w-5 h-5 text-white" />
            <p className="font-medium text-white text-lg">
              {maskEmail(email)}
            </p>
          </div>
        </div>

        {/* OTP Input Fields */}
        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-xl font-bold bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
              autoComplete="off"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={otp.join('').length !== 6}
          className="w-full group relative px-8 py-4 bg-white text-black text-lg font-bold rounded-xl shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          <div className="absolute inset-0 bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative flex items-center justify-center space-x-2">
            <span>Verify Email</span>
            <Shield className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </span>
        </button>

        {/* Resend Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 mb-2">
            Didn't receive the code?
          </p>
          <button
            type="button"
            onClick={handleResend}
            className="text-white hover:text-gray-300 font-semibold transition-colors duration-300 hover:underline px-4 py-2 rounded-xl hover:bg-white/5"
          >
            Resend Verification Code
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-16 w-16 h-16 border border-white/5 rounded-full"></div>
        <div className="absolute bottom-4 left-16 w-12 h-12 border border-white/5 rounded-full"></div>
        <div className="absolute top-1/2 right-2 w-8 h-8 bg-white/3 rounded-full blur-xl"></div>
      </div>
    </div>
  );
};

// Demo component to show the modal in action
