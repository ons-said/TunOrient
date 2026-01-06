import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    School,
    BookOpen,
    Users,
    LogOut,
    Menu,
    Building2,
    ShieldCheck
} from 'lucide-react';

const MinistryLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const navItems = [
        { path: '/ministry', label: 'Overview', icon: LayoutDashboard },
        { path: '/ministry/circulars', label: 'Circulars', icon: FileText },
        { path: '/ministry/universities', label: 'Universities', icon: School },
        { path: '/ministry/institutions', label: 'Institutions', icon: Building2 },
        { path: '/ministry/programs', label: 'Programs', icon: BookOpen },
        { path: '/ministry/students', label: 'Students', icon: Users },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-slate-800">
                        <div className="flex items-center space-x-2">
                            <div className="p-1.5 bg-red-600 rounded-lg">
                                <ShieldCheck className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold font-serif tracking-wide">Ministry</span>
                        </div>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Management</p>
                        {navItems.map((item) => {
                            const isCurrent = isActive(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 group ${isCurrent
                                        ? 'bg-red-600 text-white shadow-md'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                        }`}
                                >
                                    <item.icon className={`h-5 w-5 mr-3 flex-shrink-0 ${isCurrent ? 'text-white' : 'text-slate-400 group-hover:text-white'
                                        }`} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Admin Profile & Logout */}
                    <div className="p-4 border-t border-slate-800 bg-slate-900">
                        <div className="flex items-center mb-4 px-2">
                            <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold border border-slate-600">
                                <Building2 className="h-4 w-4" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-white">Ministry Admin</p>
                                <p className="text-xs text-slate-400">Super User</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
                        >
                            <LogOut className="h-5 w-5 mr-3" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="bg-white border-b border-slate-200 h-16 flex items-center px-4 lg:hidden">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 -ml-2 text-slate-500 hover:text-slate-700 rounded-md"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="ml-4 text-lg font-bold text-slate-900">Ministry Portal</span>
                </header>

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-100">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MinistryLayout;
