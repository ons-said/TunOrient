import { Link } from 'react-router-dom';

const DashboardHome = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Welcome Back!</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/dashboard/circulars" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 block hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Check ministry circulars</h3>
                    <p className="text-slate-600">Check the latest updates from the ministry.</p>
                </Link>

                <Link to="/programs" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 block hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Explorez les programmes universitaires</h3>
                    <p className="text-slate-600">Consultez tous les programmes disponibles.</p>
                </Link>

                <Link to="/dashboard/recommendation" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 block hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">My Wishlist</h3>
                    <p className="text-slate-600">Get advice on your university choices.</p>
                </Link>

                <Link to="/dashboard/reorientation-programs" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 block hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Programs that allow reorientation</h3>
                    <p className="text-slate-600">Browse programs eligible for reorientation.</p>
                </Link>
            </div>
        </div>
    );
};

export default DashboardHome;
