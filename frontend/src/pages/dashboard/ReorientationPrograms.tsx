import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { programsAPI, type Program } from '../../api/programs';
import {
    Search,
    MapPin,
    BookOpen,
    School,
    ChevronRight,
    Calculator,
    Info,
    ArrowLeft
} from 'lucide-react';

const ReorientationPrograms = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('All');
    const [selectedCity, setSelectedCity] = useState('All');
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                setLoading(true);
                const data = await programsAPI.getReorientationPrograms();
                if (data && data.length > 0) {
                    setPrograms(data);
                }
            } catch (error) {
                console.error('Failed to fetch programs', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []);

    const domains = ['All', ...new Set(programs.map(p => p.domain))];
    const cities = ['All', ...new Set(programs.map(p => p.city))];

    const filteredPrograms = useMemo(() => {
        return programs.filter(program => {
            const matchesSearch =
                program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                program.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
                program.code.includes(searchQuery);

            const matchesDomain = selectedDomain === 'All' || program.domain === selectedDomain;
            const matchesCity = selectedCity === 'All' || program.city === selectedCity;

            return matchesSearch && matchesDomain && matchesCity;
        });
    }, [searchQuery, selectedDomain, selectedCity, programs]);

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link to="/dashboard" className="inline-flex items-center text-slate-600 hover:text-blue-900 mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Dashboard
                </Link>

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 font-serif mb-3">
                        Programmes permettant la réorientation
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Liste des programmes universitaires qui acceptent les demandes de réorientation.
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 sticky top-4 z-40">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-6 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Rechercher par nom, établissement ou code..."
                                className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="md:col-span-3 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <BookOpen className="h-5 w-5 text-slate-400" />
                            </div>
                            <select
                                className="block w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                                value={selectedDomain}
                                onChange={(e) => setSelectedDomain(e.target.value)}
                            >
                                {domains.map(domain => (
                                    <option key={domain} value={domain}>{domain}</option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-3 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin className="h-5 w-5 text-slate-400" />
                            </div>
                            <select
                                className="block w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                            >
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
                        <p className="mt-4 text-slate-500">Chargement des programmes...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPrograms.length > 0 ? (
                            filteredPrograms.map(program => (
                                <div key={program.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
                                    {program.requiresTest && (
                                        <div className="absolute top-0 right-0 bg-amber-400 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-sm z-10">
                                            Filière à Test
                                        </div>
                                    )}

                                    <div className="p-6 flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                {program.type}
                                            </span>
                                            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded font-bold border border-slate-200">
                                                Code: {program.code}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif group-hover:text-blue-900 transition-colors leading-tight">
                                            {program.name}
                                        </h3>

                                        <div className="flex items-start text-sm text-slate-600 mb-4">
                                            <School className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-blue-500" />
                                            <span className="line-clamp-2">{program.institution}</span>
                                        </div>

                                        <div className="flex items-center text-sm text-slate-500 mb-4">
                                            <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                                            <span>{program.city} • {program.university}</span>
                                        </div>

                                        <div className="mb-4 bg-amber-50 rounded-lg p-3 border border-amber-100 text-xs">
                                            <div className="flex items-start mb-1">
                                                <Calculator className="h-3.5 w-3.5 mr-1.5 text-amber-600 mt-0.5" />
                                                <span className="text-amber-900 font-medium">Score: {program.formula}</span>
                                            </div>
                                            {program.conditions !== '-' && (
                                                <div className="flex items-start">
                                                    <Info className="h-3.5 w-3.5 mr-1.5 text-amber-600 mt-0.5" />
                                                    <span className="text-amber-800">{program.conditions}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-xl flex justify-between items-center group-hover:bg-blue-50/50 transition-colors">
                                        <span className="text-xs font-medium text-slate-500 truncate max-w-[60%]" title={program.domain}>{program.domain}</span>
                                        <button className="text-blue-900 font-semibold text-sm flex items-center hover:underline">
                                            Détails
                                            <ChevronRight className="h-4 w-4 ml-1" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <div className="inline-flex items-center justify-center p-4 bg-slate-100 rounded-full mb-4">
                                    <Search className="h-8 w-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-medium text-slate-900">Aucun programme trouvé</h3>
                                <p className="text-slate-500 mt-1">Aucun programme ne correspond à vos critères.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReorientationPrograms;
