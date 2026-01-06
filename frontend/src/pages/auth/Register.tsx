import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import {
    GraduationCap,
    User,
    Mail,
    Lock,
    School,
    MapPin,
    Calendar
} from 'lucide-react';

type Role = 'student' | 'ministry' | 'admin';

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const role: Role = 'student';
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        // Student specific fields
        academicLevel: '',
        bacSection: '',
        bacAverage: '',
        bacYear: '',
        governorate: '',
        // Ministry/Admin specific
        department: '', // hypothetical field for ministry
        adminCode: ''   // hypothetical field for admin
    });

    const [showSection, setShowSection] = useState(false);
    const [showAverage, setShowAverage] = useState(false);

    // Update visibility based on academic level logic
    useEffect(() => {
        const level = formData.academicLevel;

        // Logic from user request:
        // 1ère & 2ème: No section, No average
        // 3ème: Section OK, No average
        // 4ème & Étudiant: All OK

        if (['1ère année secondaire', '2ème année secondaire'].includes(level)) {
            setShowSection(false);
            setShowAverage(false);
        } else if (level === '3ème année secondaire') {
            setShowSection(true);
            setShowAverage(false);
        } else if (['4ème année secondaire', 'étudiant (réorientation)'].includes(level)) {
            setShowSection(true);
            setShowAverage(true);
        } else {
            // Default hidden if no level selected
            setShowSection(false);
            setShowAverage(false);
        }
    }, [formData.academicLevel]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            await authAPI.register({
                email: formData.email,
                password: formData.password,
                role: role,
                academic_level: formData.academicLevel,
                bac_section: formData.bacSection,
                bac_average: formData.bacAverage ? parseFloat(formData.bacAverage) : undefined,
                bac_year: formData.bacYear ? parseInt(formData.bacYear) : undefined,
                governorate: formData.governorate
            });

            // Redirect or show success
            navigate('/login');
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.detail || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link to="/" className="flex justify-center items-center space-x-2 mb-6 group">
                    <div className="p-2 bg-blue-900 rounded-lg shadow-sm group-hover:bg-blue-800 transition-colors">
                        <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                    <span className="text-3xl font-bold text-slate-900 font-serif">TunOrient</span>
                </Link>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 font-serif">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Sign in
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-200">

                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {/* Role selector removed - defaults to Student */}

                    <form className="space-y-6" onSubmit={handleSubmit}>

                        {/* Common Fields */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">Full Name</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        required
                                        className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                        placeholder="John Doe"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-span-2">
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email address</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Student Specific Fields */}
                        {role === 'student' && (
                            <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 space-y-4 animate-fade-in-up">
                                <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-2 flex items-center">
                                    <School className="w-4 h-4 mr-2" />
                                    Academic Profile
                                </h3>

                                <div>
                                    <label htmlFor="academicLevel" className="block text-sm font-medium text-slate-700">Academic Level</label>
                                    <select
                                        id="academicLevel"
                                        name="academicLevel"
                                        required
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                        value={formData.academicLevel}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Level</option>
                                        <option value="1ère année secondaire">1ère année secondaire</option>
                                        <option value="2ème année secondaire">2ème année secondaire</option>
                                        <option value="3ème année secondaire">3ème année secondaire</option>
                                        <option value="4ème année secondaire">4ème année secondaire</option>
                                        <option value="étudiant (réorientation)">Étudiant (réorientation)</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {showSection && (
                                        <div>
                                            <label htmlFor="bacSection" className="block text-sm font-medium text-slate-700">Bac Section</label>
                                            <select
                                                id="bacSection"
                                                name="bacSection"
                                                required={showSection}
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                                value={formData.bacSection}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Section</option>
                                                <option value="Mathématiques">Mathématiques</option>
                                                <option value="Sciences Expérimentales">Sciences Expérimentales</option>
                                                <option value="Economie et Gestion">Economie et Gestion</option>
                                                <option value="Lettres">Lettres</option>
                                                <option value="Technique">Technique</option>
                                                <option value="Informatique">Informatique</option>
                                                <option value="Sport">Sport</option>
                                            </select>
                                        </div>
                                    )}

                                    {showAverage && (
                                        <div>
                                            <label htmlFor="bacAverage" className="block text-sm font-medium text-slate-700">Bac Average (If you have not yet taken the national baccalaureate exam, please enter your average grade for the year.)</label>
                                            <div className="mt-1 relative rounded-md shadow-sm">
                                                <input
                                                    id="bacAverage"
                                                    name="bacAverage"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    max="20"
                                                    required={showAverage}
                                                    className="block w-full pl-3 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    placeholder="e.g. 14.50"
                                                    value={formData.bacAverage}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="governorate" className="block text-sm font-medium text-slate-700">Governorate</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <MapPin className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <select
                                                id="governorate"
                                                name="governorate"
                                                className="block w-full pl-10 pr-10 py-2 border border-slate-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                value={formData.governorate}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Governorate</option>
                                                <option value="Tunis">Tunis</option>
                                                <option value="Ariana">Ariana</option>
                                                <option value="Ben Arous">Ben Arous</option>
                                                <option value="Manouba">Manouba</option>
                                                <option value="Nabeul">Nabeul</option>
                                                <option value="Zaghouan">Zaghouan</option>
                                                <option value="Bizerte">Bizerte</option>
                                                <option value="Béja">Béja</option>
                                                <option value="Jendouba">Jendouba</option>
                                                <option value="Kef">Kef</option>
                                                <option value="Siliana">Siliana</option>
                                                <option value="Kairouan">Kairouan</option>
                                                <option value="Kasserine">Kasserine</option>
                                                <option value="Sidi Bouzid">Sidi Bouzid</option>
                                                <option value="Sousse">Sousse</option>
                                                <option value="Monastir">Monastir</option>
                                                <option value="Mahdia">Mahdia</option>
                                                <option value="Sfax">Sfax</option>
                                                <option value="Gabès">Gabès</option>
                                                <option value="Medenine">Medenine</option>
                                                <option value="Tataouine">Tataouine</option>
                                                <option value="Gafsa">Gafsa</option>
                                                <option value="Tozeur">Tozeur</option>
                                                <option value="Kebili">Kebili</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="bacYear" className="block text-sm font-medium text-slate-700">Bac Year (Optional)</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Calendar className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <input
                                                id="bacYear"
                                                name="bacYear"
                                                type="number"
                                                min="1990"
                                                max="2030"
                                                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                placeholder="Year"
                                                value={formData.bacYear}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Passwords */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div className="col-span-1">
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-span-1">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">Confirm Password</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md hover:shadow-lg active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        Create Account
                                        <span className="absolute right-0 inset-y-0 flex items-center pr-3">

                                        </span>
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="text-center mt-4">
                            <span className="text-sm text-slate-600">
                                Already have an account?{' '}
                            </span>
                            <Link to="/login" className="font-medium text-blue-900 hover:text-blue-700 transition-colors">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
