import React from 'react';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Ceritanya login sukses, langsung panggil fungsi masuk ke dashboard
    onLogin();
  };

  return (
    <div className="min-h-screen flex bg-white">
      
      {/* Kiri: Bagian Artistik (Image/Branding) */}
      <div className="hidden lg:flex w-1/2 bg-emerald-900 relative overflow-hidden justify-center items-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900 to-black opacity-60"></div>
        
        <div className="relative z-10 text-center px-10">
            <div className="mb-6 flex justify-center">
                <div className="bg-emerald-500/20 p-4 rounded-2xl backdrop-blur-sm border border-emerald-500/30">
                    <Sparkles className="h-12 w-12 text-emerald-400" />
                </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Manage Finances Smarter</h1>
            <p className="text-emerald-100 text-lg max-w-md mx-auto">
                Join thousands of users who trust FinSight AI to track expenses, scan receipts, and grow their savings automatically.
            </p>
        </div>
      </div>

      {/* Kanan: Form Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Welcome Back!</h2>
                <p className="text-gray-500 mt-2">Please enter your details.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
                {/* Email Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input 
                            type="email" 
                            defaultValue="haris@example.com" // Auto-fill biar klien ga capek ngetik
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                            placeholder="Enter your email"
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input 
                            type="password" 
                            defaultValue="password123" // Auto-fill juga
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                {/* Tombol Login */}
                <button 
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                    Sign In <ArrowRight className="h-5 w-5" />
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-500">
                Don't have an account? <span className="text-emerald-600 font-medium cursor-pointer hover:underline">Create free account</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;