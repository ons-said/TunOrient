import { useLocation, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Award, TrendingUp, AlertCircle } from 'lucide-react';
import type { Recommendation } from '../../../api/recommendations';

const RecommendationResults = () => {
    const location = useLocation();
    const results = location.state?.results as Recommendation[] | undefined;

    if (!results) {
        return <Navigate to="/dashboard/recommendation" replace />;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <Link
                        to="/dashboard/recommendation"
                        className="text-sm text-slate-500 hover:text-blue-900 flex items-center mb-2 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Advisor
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 font-serif">
                        Your Personal Plan
                    </h1>
                </div>
                <div className="hidden sm:block">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Analysis Complete
                    </span>
                </div>
            </div>

            <div className="bg-blue-900 rounded-2xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-800 rounded-full opacity-50 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-600 rounded-full opacity-50 blur-3xl"></div>

                <div className="relative z-10">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4">We found {results.length} programs for you</h2>
                    <p className="text-blue-100 max-w-2xl text-lg leading-relaxed">
                        Based on your academic performance and interests, these programs offer the highest probability of success and satisfaction.
                    </p>
                </div>
            </div>

            <div className="grid gap-6">
                {results.map((rec, index) => (
                    <div key={rec.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
                        <div className="p-6 sm:px-8 flex flex-col sm:flex-row gap-6">
                            {/* Match Score */}
                            <div className="flex-shrink-0 flex sm:flex-col items-center justify-between sm:justify-start gap-4 sm:w-32 border-b sm:border-b-0 sm:border-r border-slate-100 pb-4 sm:pb-0 sm:pr-6">
                                <div className="text-center">
                                    <span className="block text-3xl font-bold text-blue-900">{rec.fit_score}%</span>
                                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Match</span>
                                </div>
                                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${rec.likelihood === 'High' ? 'bg-green-100 text-green-800' :
                                    rec.likelihood === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                    {rec.likelihood} Chance
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                                        {rec.program?.name || `Program #${rec.program_id}`}
                                    </h3>
                                    {index === 0 && (
                                        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded flex items-center">
                                            <Award className="w-3 h-3 mr-1" /> Top Pick
                                        </span>
                                    )}
                                </div>

                                <div className="text-sm font-medium text-blue-600 mb-2">
                                    {rec.program?.institution?.name} {rec.program?.institution?.university?.name && `• ${rec.program.institution.university.name}`}
                                </div>

                                <p className="text-slate-600 mb-4 line-clamp-2">
                                    {rec.decision || "A great match based on your profile."}
                                </p>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                                    {rec.program?.field && (
                                        <div className="flex items-center bg-slate-100 px-2 py-1 rounded">
                                            <TrendingUp className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                                            <span>{rec.program.field}</span>
                                        </div>
                                    )}
                                    {rec.program?.institution?.university?.region && (
                                        <div className="flex items-center bg-slate-100 px-2 py-1 rounded">
                                            <span>{rec.program.institution.university.region}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action */}
                            <div className="flex items-center justify-end sm:justify-center">
                                <Link to={`/programs/${rec.program_id}`} className="text-blue-600 font-medium hover:text-blue-800 text-sm whitespace-nowrap">
                                    View Details &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}

                {results.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                        <p className="text-slate-500 mb-4">No recommendations found matching your exact criteria.</p>
                        <Link to="/dashboard/recommendation/quiz" className="text-blue-600 font-medium hover:underline">
                            Try adjusting your preferences
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecommendationResults;
