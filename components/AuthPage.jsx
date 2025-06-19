'use client';

import { useState, useEffect } from "react"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Zap,
  ArrowRight,
  Github,
  Chrome,
  CheckCircle,
  Shield,
  Star,
  Sparkles,
  Quote,
  TrendingUp,
  Users,
  Award,
} from "lucide-react"
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import crypto from "crypto";
const SECRET_KEY = process.env.NEXT_PUBLIC_ROLE_KEY;

const hashRole = (role, salt) => {
	return crypto
		.createHmac("sha256", SECRET_KEY)
		.update(role + salt)
		.digest("hex");
};
export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const router = useRouter();

    const features = [
        { icon: CheckCircle, text: "AI-Powered Interview Practice", description: "Practice with real interview questions" },
        { icon: Shield, text: "Secure & Private Platform", description: "Your data is safe and encrypted" },
        { icon: Star, text: "Personalized Feedback", description: "Get detailed insights on your performance" },
        { icon: Zap, text: "Instant Results", description: "Immediate feedback and scoring" }
    ];

    

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        // Simulate API call
        if(isSignUp) {
            if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
                toast.error("Please fill all the fields");
                setIsLoading(false);
                return;
            }
            if( !/\S+@\S+\.\S+/.test(formData.email)) {
                toast.error("Please enter a valid email address");
                setIsLoading(false);
                return;
            }
            if (formData.password.length < 8) {
                toast.error("Password must be at least 8 characters long");
                setIsLoading(false);
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                toast.error("Passwords do not match");
                setIsLoading(false);
                return;
            }
            try {
                const res = await fetch('/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password
                    }),
                });
                const data = await res.json();
                if (res.ok) {
                    // toast.success("Account created successfully!");
                    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                    setIsSignUp(false);
                } else {
                    toast.error(data.error || "Something went wrong");
                }
                localStorage.setItem("user", JSON.stringify(data));
                const salt = crypto.randomBytes(16).toString("hex");
                const hashedRole = await hashRole("user", salt);
                Cookies.remove("salt");
                Cookies.remove("role");
                Cookies.set("salt", salt, { expires: 7 }); // Set salt cookie for 7 days
                Cookies.set("role", hashedRole, { expires: 7 }); // Set role cookie for 7 days
                router.push("/");
                toast.success("Account created successfully!");
            }
            catch(error){
                console.error("Error during signup:", error);
                toast.error("An error occurred while creating your account. Please try again.");
            }
            finally {
                setIsLoading(false);
            }
        }
        else{
            if (!formData.email || !formData.password) {
                toast.error("Please fill all the fields");
                setIsLoading(false);
                return;
            }
            if( !/\S+@\S+\.\S+/.test(formData.email)) {
                toast.error("Please enter a valid email address");
                setIsLoading(false);
                return;
            }
            try {
                const res = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    }),
                });
                if (res.ok) {
                    const data = await res.json();
                    localStorage.setItem("user", JSON.stringify(data));
                    const salt = crypto.randomBytes(16).toString("hex");
                    Cookies.remove("salt");
                    Cookies.remove("role");
                    const hashedRole = await hashRole("user", salt);
                    Cookies.set("salt", salt, { expires: 7 }); // Set salt cookie for 7 days
                    Cookies.set("role", hashedRole, { expires: 7 }); // Set role cookie for 7 days
                    router.push("/");
                    toast.success("Logged in successfully!");
                } else {
                    toast.error(data.error || "Something went wrong");
                }
            }
            catch(error){
                console.error("Error during login:", error);
                toast.error("An error occurred while logging in. Please try again.");
            }
        }
        
        setIsLoading(false);
        
    };

    const toggleAuthMode = () => {
        setIsSignUp(!isSignUp);
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        setShowPassword(false);
        setShowConfirmPassword(false);
    };

    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex overflow-hidden relative">
            
            {/* Animated Background */}
            <div className="absolute inset-0">
                {/* Subtle geometric patterns */}
                {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillrule="evenodd"%3E%3Cg fill="%23ffffff" fillopacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div> */}
                
                {/* Floating elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                
                {/* Interactive cursor effect */}
                <div 
                    className="absolute w-96 h-96 bg-gradient-radial from-white/5 to-transparent rounded-full blur-2xl pointer-events-none transition-all duration-300"
                    style={{ 
                        left: mousePosition.x - 192, 
                        top: mousePosition.y - 192,
                        transform: 'translate(0, 0)'
                    }}
                ></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto flex min-h-screen">
                
                {/* Left Side - Auth Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
                    <div className="w-full max-w-md">
                        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                            
                            {/* Form Header */}
                            <div className="mb-8">
                                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
                                    <Sparkles className="w-4 h-4 text-white animate-pulse" />
                                    <span className="text-white font-medium">Get Started Today</span>
                                </div>
                                
                                <h1 className="text-4xl font-bold text-white mb-3">
                                    {isSignUp ? 'Create Account' : 'Welcome Back'}
                                </h1>
                                <p className="text-gray-400 text-lg">
                                    {isSignUp 
                                        ? 'Join thousands of successful candidates' 
                                        : 'Sign in to continue your interview prep'
                                    }
                                </p>
                            </div>

                            {/* Social Login */}
                            {/* <div className="space-y-3 mb-6">
                                <button className="w-full flex items-center justify-center space-x-3 bg-white text-black py-3 px-4 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                    <Chrome className="w-5 h-5" />
                                    <span>Continue with Google</span>
                                </button>
                                <button className="w-full flex items-center justify-center space-x-3 bg-gray-800 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 border border-gray-700">
                                    <Github className="w-5 h-5" />
                                    <span>Continue with GitHub</span>
                                </button>
                            </div> */}

                            {/* Divider */}
                            {/* <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-30 border-t border-gray-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-transparent text-gray-500">Or continue with email</span>
                                </div>
                                <div className="absolute flex justify-end inset-2">
                                    <div className="w-29 border-t border-gray-700"></div>
                                </div>
                            </div> */}

                            {/* Form */}
                            <div className="space-y-5">
                                
                                {/* Name Field (Sign Up Only) */}
                                <div className={`transform transition-all duration-500 ${isSignUp ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                            required={isSignUp}
                                        />
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                        required
                                    />
                                </div>

                                {/* Password Field */}
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors duration-300"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>

                                {/* Confirm Password Field (Sign Up Only) */}
                                <div className={`transform transition-all duration-500 ${isSignUp ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                            required={isSignUp}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors duration-300"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me / Forgot Password */}
                                {!isSignUp && (
                                    <div className="flex items-center justify-between">
                                        {/* <label className="flex items-center space-x-2 cursor-pointer">
                                            <input type="checkbox" className="rounded border-gray-600 text-white focus:ring-white bg-white/5" />
                                            <span className="text-sm text-gray-400">Remember me</span>
                                        </label> */}
                                        {/* <a href="#" className="text-sm text-white hover:text-gray-300 transition-colors duration-300">
                                            Forgot password?
                                        </a> */}
                                    </div>
                                )}

                                {/* Terms (Sign Up Only) */}
                                {/* {isSignUp && (
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" className="rounded border-gray-600 text-white focus:ring-white bg-white/5" required />
                                        <span className="text-sm text-gray-400">
                                            I agree to the <a href="#" className="text-white hover:text-gray-300">Terms of Service</a> and <a href="#" className="text-white hover:text-gray-300">Privacy Policy</a>
                                        </span>
                                    </div>
                                )} */}

                                {/* Submit Button */}
                                <button
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className="w-full group relative px-8 py-4 bg-white text-black text-lg font-bold rounded-xl shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-300 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <div className="absolute inset-0 bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative flex items-center justify-center space-x-2">
                                        {isLoading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                            </>
                                        )}
                                    </span>
                                </button>
                            </div>

                            {/* Toggle Auth Mode */}
                            <div className="text-center mt-6">
                                <p className="text-gray-400">
                                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                                    <button
                                        onClick={toggleAuthMode}
                                        className="text-white hover:text-gray-300 font-semibold transition-colors duration-300 hover:underline"
                                    >
                                        {isSignUp ? 'Sign In' : 'Sign Up'}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Design & Content */}
                <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 relative">
                    <div className="w-full max-w-lg space-y-8">
                        
                        {/* Main Branding */}
                        <div className="text-center space-y-4">
                            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                                <Zap className="w-10 h-10 text-black" />
                            </div>
                            <h2 className="text-4xl font-bold text-white">InterviewAce</h2>
                            <p className="text-xl text-gray-400">Master your next interview with AI-powered practice</p>
                        </div>

                        

                        {/* Features */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white mb-6">Why Choose Us?</h3>
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start space-x-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                                    <div className="flex-shrink-0">
                                        <feature.icon className="w-6 h-6 text-white mt-1" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">{feature.text}</h4>
                                        <p className="text-gray-400 text-sm">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        

                        {/* Decorative Elements */}
                        <div className="absolute top-10 right-10 w-32 h-32 border border-white/10 rounded-full"></div>
                        <div className="absolute bottom-10 left-10 w-24 h-24 border border-white/10 rounded-full"></div>
                        <div className="absolute top-1/2 right-0 w-16 h-16 bg-white/5 rounded-full blur-xl"></div>
                    </div>
                </div>
            </div>

            {/* Mobile Features (visible on small screens) */}
            <div className="lg:hidden absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <div className="grid grid-cols-2 gap-3">
                    {features.slice(0, 2).map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                            <feature.icon className="w-5 h-5 text-white flex-shrink-0" />
                            <span className="text-white text-sm font-medium">{feature.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}
