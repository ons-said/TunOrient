import { Compass, ArrowRight, BrainCircuit, Target, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecommendationIntro = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <div className="text-center space-y-4 mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                    <Compass className="h-8 w-8 text-blue-700" />
                </div>
                <h1 className="text-4xl font-bold text-slate-900 font-serif">
                    Discover Your Perfect Path
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Our AI-powered advisor analyzes your academic profile, interests, and learning style to recommend the university programs where you'll thrive.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                    {
                        icon: BrainCircuit,
                        title: "Smart Analysis",
                        desc: "Advanced algorithms match your grades directly to university acceptance criteria."
                    },
                    {
                        icon: Target,
                        title: "Tailored to You",
                        desc: "We consider your unique interests and preferred learning style, not just numbers."
                    },
                    {
                        icon: Sparkles,
                        title: "Future Ready",
                        desc: "Discover programs with high employability and alignment with your career goals."
                    }
                ].map((feature, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 text-indigo-600">
                            <feature.icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex justify-center">
                <Link
                    to="/dashboard/recommendation/quiz"
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-blue-900 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 hover:bg-blue-800 hover:shadow-lg transform hover:-translate-y-1"
                >
                    Start Your Assessment
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute -inset-3 rounded-full bg-blue-400 opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-200" />
                </Link>
            </div>

            <p className="text-center text-sm text-slate-400 mt-6">
                Takes about 2 minutes to complete • No commitment required
            </p>
        </div>
    );
};

export default RecommendationIntro;
