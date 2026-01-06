import { Link } from 'react-router-dom';
import { GraduationCap, Building2, BookOpen, ArrowRight } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden font-serif selection:bg-blue-900 selection:text-white">
      {/* Navbar - Clean & Professional */}
      <nav className="fixed w-full z-50 transition-all duration-300 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="p-2 bg-blue-900 rounded-lg group-hover:bg-blue-800 transition-colors shadow-sm">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                TunOrient
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/programs">Programs</NavLink>
              <NavLink to="/institutions">Institutions</NavLink>
              <NavLink to="/guide">Guide</NavLink>
              <div className="flex items-center space-x-4 pl-4 border-l border-slate-200">
                <Link to="/login" className="text-slate-600 hover:text-blue-900 font-semibold transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-900 text-white px-6 py-2.5 rounded-md font-medium hover:bg-blue-800 transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-white border-b border-slate-200">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-800 font-medium text-sm mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
            Admissions for 2026 are now open
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight leading-tight font-serif">
            Design Your <br />
            <span className="text-blue-900">
              Future Today
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-sans">
            The official orientation platform for Tunisian students.
            Data-driven recommendations tailored to your academic profile.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5 font-sans">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-blue-900 rounded-md hover:bg-blue-800 hover:shadow-xl active:scale-100"
            >
              Start Orientation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/programs"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-700 transition-all duration-300 bg-white border border-slate-300 rounded-md hover:bg-slate-50 hover:border-blue-300 hover:text-blue-900 active:scale-95"
            >
              Explore Catalog
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-200">
            <StatItem number="50+" label="Universities" />
            <StatItem number="1,200+" label="Programs" />
            <StatItem number="15k+" label="Students" />
            <StatItem number="98%" label="Satisfaction" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm text-blue-900 font-bold tracking-widest uppercase">Why Choose TunOrient</h2>
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-slate-900 sm:text-4xl font-serif">
              Comprehensive Academic Guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard
              icon={<BookOpen className="h-8 w-8 text-blue-900" />}
              title="Smart Matching"
              description="Our advanced algorithm analyzes your grades to suggest the most suitable academic paths."
            />
            <FeatureCard
              icon={<Building2 className="h-8 w-8 text-blue-900" />}
              title="Institutional Data"
              description="Access official, up-to-date information on every university, faculty, and institute in Tunisia."
            />
            <FeatureCard
              icon={<GraduationCap className="h-8 w-8 text-blue-900" />}
              title="Career Mapping"
              description="Understand career paths, job market trends, and future opportunities for each degree."
            />
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 font-serif">How it works</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              <Step number="01" title="Create Profile" desc="Sign up and enter your baccalaureate grades." />
              <Step number="02" title="Get Matched" desc="Receive personalized program recommendations." />
              <Step number="03" title="Apply" desc="Follow the official procedure to secure your spot." />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <GraduationCap className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold text-white font-serif">TunOrient</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Ministry of Higher Education and Scientific Research.
              <br />Making orientation accessible to all.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Platform</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Programs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Universities</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Login</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Resources</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Student Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Orientation Book</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Contact</h4>
            <p className="text-sm text-slate-400">Tunis, Tunisia</p>
            <p className="text-sm text-slate-400">support@tunorient.tn</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} TunOrient. Ministry of Higher Education.
        </div>
      </footer>
    </div>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="text-slate-600 hover:text-blue-900 font-medium transition-colors relative group font-sans">
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-900 transition-all group-hover:w-full"></span>
  </Link>
);

const StatItem = ({ number, label }: { number: string; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-3xl md:text-4xl font-bold text-blue-900 mb-2 font-serif">{number}</span>
    <span className="text-sm font-medium text-slate-500 uppercase tracking-wider font-sans">{label}</span>
  </div>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="p-8 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-200 transition-all duration-300 group">
    <div className="bg-white p-4 rounded-md w-fit shadow-sm mb-6 border border-slate-100">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-4 font-serif">{title}</h3>
    <p className="text-slate-600 leading-relaxed font-sans">{description}</p>
  </div>
);

const Step = ({ number, title, desc }: { number: string; title: string; desc: string }) => (
  <div className="relative p-8 bg-white rounded-lg border border-slate-200">
    <div className="text-5xl font-black text-slate-100 absolute top-4 right-6 select-none font-serif">{number}</div>
    <h3 className="text-xl font-bold text-slate-900 mb-2 relative z-10 font-serif">{title}</h3>
    <p className="text-slate-600 relative z-10 font-sans">{desc}</p>
  </div>
);

export default Landing;
