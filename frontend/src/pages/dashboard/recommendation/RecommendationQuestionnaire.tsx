import { useState } from 'react';
import { ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { recommendationsAPI, type RecommendationQuestionnaire as QuestionnaireData } from '../../../api/recommendations';
import { authAPI } from '../../../api/auth';

const RecommendationQuestionnaire = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState<QuestionnaireData>({
        formule_globale: 0,
        interests: [],
        preferred_fields: [],
        preferred_regions: [],
        study_style: 'practical'
    });

    const availableInterests = ["Coding", "Design", "Medical", "Engineering", "Business", "Law", "Languages", "Sports", "Psychology", "Environment"];

    const handleInterestToggle = (interest: string) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const user = await authAPI.getCurrentUser();
            const results = await recommendationsAPI.generate(user.id, formData);
            // Navigate to results page with the data
            navigate('/dashboard/recommendation/results', { state: { results } });
        } catch (error) {
            console.error("Failed to generate recommendations", error);
            // Ideally show a toast error here
        } finally {
            setIsLoading(false);
        }
    };

    const isStep1Valid = formData.formule_globale > 0;
    // We can add more validation for step 2 if needed

    return (
        <div className="max-w-3xl mx-auto pt-8 pb-16">
            {/* Progress Bar */}
            <div className="mb-10 px-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Step {step} of 2
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                        {step === 1 ? 'Academic Profile' : 'Preferences'}
                    </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-600 transition-all duration-500 ease-out"
                        style={{ width: `${(step / 2) * 100}%` }}
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mx-4 md:mx-0">
                {/* Step 1: Academic Info */}
                {step === 1 && (
                    <div className="p-8 animate-fade-in">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">
                            Academic Profile
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-base font-medium text-slate-700 mb-2">
                                    What is your "Formule Globale" score?
                                </label>
                                <p className="text-sm text-slate-500 mb-4">
                                    This is calculated based on your Baccalaureate grades. If you're unsure, enter your average grade (Moyenne Bac).
                                </p>
                                <div className="relative max-w-xs">
                                    <input
                                        type="number"
                                        min="0" max="200"
                                        step="0.01"
                                        placeholder="e.g. 145.5"
                                        className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg p-3 pr-12"
                                        value={formData.formule_globale || ''}
                                        onChange={e => setFormData({ ...formData, formule_globale: parseFloat(e.target.value) })}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <span className="text-slate-400 font-medium">FG</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={() => setStep(2)}
                                disabled={!isStep1Valid}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Next: Preferences
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Preferences */}
                {step === 2 && (
                    <div className="p-8 animate-fade-in">
                        <button
                            onClick={() => setStep(1)}
                            className="flex items-center text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Step 1
                        </button>

                        <h2 className="text-2xl font-bold text-slate-900 mb-6">
                            Your Goals & Interests
                        </h2>

                        <div className="space-y-8">
                            {/* Interests */}
                            <div>
                                <label className="block text-base font-medium text-slate-800 mb-3">
                                    Which topics interest you most?
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {availableInterests.map(interest => {
                                        const isSelected = formData.interests.includes(interest);
                                        return (
                                            <button
                                                key={interest}
                                                onClick={() => handleInterestToggle(interest)}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${isSelected
                                                    ? 'bg-blue-50 border-blue-200 text-blue-700 ring-1 ring-blue-500'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                                                    }`}
                                            >
                                                {interest}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Preferred Fields */}
                            <div>
                                <label className="block text-base font-medium text-slate-800 mb-3">
                                    Desired Fields of Study
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        "Sciences Exactes et Technologies",
                                        "Sciences de la Santé",
                                        "Sciences Economiques et Gestion",
                                        "Lettres et Langues",
                                        "Arts et Métiers",
                                        "Sciences Juridiques",
                                        "Architecture",
                                        "Sport"
                                    ].map(field => (
                                        <label key={field} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${formData.preferred_fields.includes(field)
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-slate-200 hover:border-slate-300'
                                            }`}>
                                            <div className={`flex-shrink-0 h-5 w-5 rounded border flex items-center justify-center mr-3 ${formData.preferred_fields.includes(field)
                                                ? 'bg-blue-600 border-blue-600'
                                                : 'border-slate-300 bg-white'
                                                }`}>
                                                {formData.preferred_fields.includes(field) && <span className="h-3.5 w-3.5 text-white block bg-blue-500 rounded-full" />}
                                            </div>
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={formData.preferred_fields.includes(field)}
                                                onChange={(e) => {
                                                    const newFields = e.target.checked
                                                        ? [...formData.preferred_fields, field]
                                                        : formData.preferred_fields.filter(f => f !== field);
                                                    setFormData({ ...formData, preferred_fields: newFields });
                                                }}
                                            />
                                            <span className={`text-sm ${formData.preferred_fields.includes(field) ? 'text-blue-900 font-medium' : 'text-slate-700'}`}>
                                                {field}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Preferred Regions */}
                            <div>
                                <label className="block text-base font-medium text-slate-800 mb-3">
                                    Where would you like to study?
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {['Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Sousse', 'Sfax', 'Monastir', 'Nabeul'].map(region => (
                                        <label key={region} className={`inline-flex items-center px-3 py-1.5 rounded-md border cursor-pointer transition-all text-sm ${formData.preferred_regions.includes(region)
                                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                            }`}>
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={formData.preferred_regions.includes(region)}
                                                onChange={(e) => {
                                                    const newRegions = e.target.checked
                                                        ? [...formData.preferred_regions, region]
                                                        : formData.preferred_regions.filter(r => r !== region);
                                                    setFormData({ ...formData, preferred_regions: newRegions });
                                                }}
                                            />
                                            <span>{region}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Study Style */}
                            <div>
                                <label className="block text-base font-medium text-slate-800 mb-3">
                                    Preferred Learning Style
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {[
                                        { id: 'theoretical', label: 'Theoretical', desc: 'Focus on research & concepts' },
                                        { id: 'practical', label: 'Practical', desc: 'Hands-on & labs' },
                                        { id: 'mixed', label: 'Balanced', desc: 'Mix of both' }
                                    ].map((style) => (
                                        <label
                                            key={style.id}
                                            className={`relative flex flex-col p-4 cursor-pointer rounded-xl border-2 transition-all ${formData.study_style === style.id
                                                ? 'border-blue-600 bg-blue-50/50'
                                                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="study_style"
                                                value={style.id}
                                                checked={formData.study_style === style.id}
                                                onChange={(e) => setFormData({ ...formData, study_style: e.target.value })}
                                                className="sr-only"
                                            />
                                            <span className={`font-semibold mb-1 ${formData.study_style === style.id ? 'text-blue-900' : 'text-slate-900'}`}>{style.label}</span>
                                            <span className="text-xs text-slate-500">{style.desc}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex justify-end">
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="inline-flex items-center px-8 py-3.5 border border-transparent text-base font-bold rounded-xl shadow-lg shadow-blue-900/20 text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:cursor-not-allowed transition-all transform active:scale-95"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                                        Analyzing Profiles...
                                    </>
                                ) : (
                                    <>
                                        Get Recommendations
                                        <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecommendationQuestionnaire;
