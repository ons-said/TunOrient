import { useState, useEffect } from 'react';
import { FileText, Calendar, Download, Search } from 'lucide-react';
import { circularsAPI, type Circular } from '../../api/circulars';

const Circulars = () => {
    const [circulars, setCirculars] = useState<Circular[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchCirculars = async () => {
            try {
                const data = await circularsAPI.getAll();
                setCirculars(data);
            } catch (error) {
                console.error("Failed to fetch circulars", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCirculars();
    }, []);

    const filteredCirculars = circulars.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-serif">Official Circulars</h1>
                    <p className="text-slate-600">Latest updates from the Ministry of Higher Education.</p>
                </div>
                <div className="relative w-full sm:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search circulars..."
                        className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredCirculars.length > 0 ? (
                        filteredCirculars.map((circular) => (
                            <div key={circular.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {circular.academic_year || '2024-2025'}
                                            </span>
                                            <span className="text-xs text-slate-500 flex items-center">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                {new Date(circular.publication_date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-900 transition-colors">
                                            {circular.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm line-clamp-2">
                                            {circular.description || "No description available."}
                                        </p>
                                    </div>
                                    <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors">
                                        <Download className="h-4 w-4 mr-2" />
                                        Download PDF
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                            <FileText className="mx-auto h-12 w-12 text-slate-400" />
                            <h3 className="mt-2 text-sm font-medium text-slate-900">No circulars found</h3>
                            <p className="mt-1 text-sm text-slate-500">Check back later for new updates.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Circulars;
