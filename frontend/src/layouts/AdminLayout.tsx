import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, Settings } from 'lucide-react';

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string) => {
        return location.pathname === path ? "bg-indigo-800 text-white" : "text-indigo-100 hover:bg-indigo-800 hover:text-white";
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-indigo-900 text-white flex-shrink-0 hidden md:flex flex-col">
                <div className="p-6 border-b border-indigo-800">
                    <div className="flex items-center space-x-3">
                        <Settings className="h-8 w-8 text-indigo-400" />
                        <span className="text-xl font-bold">Admin Panel</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    <Link
                        to="/admin"
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive('/admin')}`}
                    >
                        <LayoutDashboard className="h-5 w-5 mr-3" />
                        Overview
                    </Link>
                    <Link
                        to="/admin/users"
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive('/admin/users')}`}
                    >
                        <Users className="h-5 w-5 mr-3" />
                        User Management
                    </Link>
                </nav>

                <div className="p-4 border-t border-indigo-800">
                    <div className="flex items-center p-4 bg-indigo-800 rounded-lg mb-4">
                        <div className="ml-3">
                            <p className="text-sm font-medium text-white">Administrator</p>
                            <p className="text-xs text-indigo-300">admin@tunorient.tn</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-indigo-200 hover:text-white transition-colors"
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
