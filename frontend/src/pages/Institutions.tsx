import { useState, useEffect } from 'react';
import { Building2, MapPin, Search, Loader2 } from 'lucide-react';
import { institutionsAPI } from '../api/institutions';
import type { Institution } from '../api/institutions';

const Institutions = () => {
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInstitutions = async () => {
            try {
                const data = await institutionsAPI.getAllInstitutions();
                setInstitutions(data);
                setIsVisible(true);
            } catch (err) {
                console.error("Failed to fetch institutions", err);
                setError("Failed to load institutions. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchInstitutions();
    }, []);

    // Helper to safely get string values for filtering
    const safeString = (str?: string) => (str || "").toLowerCase();

    const filtered = institutions.filter(inst =>
        inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        safeString(inst.university?.name).includes(searchTerm.toLowerCase()) ||
        safeString(inst.university?.region).includes(searchTerm.toLowerCase())
    );

    return (
        <div className={`min-h-screen bg-slate-50 font-sans transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-slate-900 font-serif">Academic Institutions</h1>
                    <p className="mt-2 text-slate-600">Explore the universities and institutes across Tunisia.</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Search */}
                <div className="relative mb-8 transform transition-all duration-500 translate-y-0 ease-out">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-shadow hover:shadow-md"
                        placeholder="Search by name, university, or region..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Error State */}
                {error && (
                    <div className="text-center py-12 text-red-600">
                        <p>{error}</p>
                    </div>
                )}

                {/* Loading State */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="h-8 w-8 text-blue-900 animate-spin" />
                    </div>
                ) : (
                    /* Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((inst, index) => (
                            <div
                                key={inst.id}
                                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                        <Building2 className="h-6 w-6 text-blue-700" />
                                    </div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                        Institution
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors line-clamp-2 min-h-[3.5rem]">
                                    {inst.name}
                                </h3>

                                <div className="flex flex-col space-y-1 text-slate-500 text-sm">
                                    {/* University Name */}
                                    {inst.university?.name && (
                                        <div className="text-sm font-medium text-slate-600">
                                            {inst.university.name}
                                        </div>
                                    )}

                                    {/* Region */}
                                    {inst.university?.region && (
                                        <div className="flex items-center text-xs text-slate-400">
                                            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                                            {inst.university.region}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!isLoading && !error && filtered.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-500">No institutions found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Institutions;
