
import { Link } from 'react-router-dom';

const Guide = () => {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">

            {/* Inspirational Header */}
            <header className="pt-24 pb-16 px-6 max-w-5xl mx-auto border-b border-slate-100 text-center md:text-left">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 font-bold tracking-widest uppercase text-xs mb-6">
                    Start Here
                </span>
                <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 leading-tight tracking-tight font-serif">
                    Your Path to <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Success Starts Now</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-500 max-w-2xl font-light leading-relaxed">
                    Follow these simple steps to discover the university programs perfectly matched to your potential.
                </p>
            </header>

            <div className="max-w-3xl mx-auto px-6 py-16">
                <div className="space-y-0">

                    {/* Step 01 */}
                    <div className="group relative border-l-2 border-slate-100 pl-12 pb-24 last:border-0 hover:border-blue-200 transition-colors duration-500">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-slate-200 group-hover:border-blue-600 group-hover:scale-125 transition-all duration-500"></div>

                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 mb-4">
                            <span className="text-sm font-bold text-slate-300 group-hover:text-blue-600 transition-colors duration-500">01</span>
                            <h2 className="text-3xl font-bold text-slate-900 font-serif">Create Your Profile</h2>
                        </div>

                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            Join the TunOrient community. It takes less than a minute to create your secure account. This is your personal dashboard where all your possibilities live.
                        </p>

                        <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                            <p className="text-blue-800 font-medium italic">
                                "The first step towards getting somewhere is to decide you're not going to stay where you are."
                            </p>
                        </div>
                    </div>

                    {/* Step 02 */}
                    <div className="group relative border-l-2 border-slate-100 pl-12 pb-24 last:border-0 hover:border-blue-200 transition-colors duration-500">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-slate-200 group-hover:border-blue-600 group-hover:scale-125 transition-all duration-500"></div>

                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 mb-4">
                            <span className="text-sm font-bold text-slate-300 group-hover:text-blue-600 transition-colors duration-500">02</span>
                            <h2 className="text-3xl font-bold text-slate-900 font-serif">Enter Your Grades</h2>
                        </div>

                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            Input your Baccalaureate section and your grades. Don't worry about calculating complex formulas—our system handles the math for you automatically.
                        </p>

                        <ul className="space-y-3 text-slate-500">
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                Supports all Bac sections (Math, Eco, Science, etc.)
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                Takes regional bonuses (Tanfil) into account
                            </li>
                        </ul>
                    </div>

                    {/* Step 03 */}
                    <div className="group relative border-l-2 border-slate-100 pl-12 pb-24 last:border-0 hover:border-blue-200 transition-colors duration-500">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-slate-200 group-hover:border-blue-600 group-hover:scale-125 transition-all duration-500"></div>

                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 mb-4">
                            <span className="text-sm font-bold text-slate-300 group-hover:text-blue-600 transition-colors duration-500">03</span>
                            <h2 className="text-3xl font-bold text-slate-900 font-serif">Get Matched</h2>
                        </div>

                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            Click "Generate" and watch the magic happen. We analyze thousands of programs to find the ones where you have the best chance of acceptance.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <div className="font-bold text-green-600 mb-1">Safe</div>
                                <div className="text-xs text-slate-500">High Chance</div>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <div className="font-bold text-blue-600 mb-1">Target</div>
                                <div className="text-xs text-slate-500">Good Match</div>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <div className="font-bold text-amber-600 mb-1">Dream</div>
                                <div className="text-xs text-slate-500">Ambitious</div>
                            </div>
                        </div>
                    </div>

                    {/* Step 04 */}
                    <div className="group relative pl-12 pt-2">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-blue-100 shadow-xl animate-pulse"></div>
                        {/* Trail fade out */}
                        <div className="absolute -left-[1px] -top-12 h-12 border-l-2 border-slate-100"></div>

                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 mb-6">
                            <span className="text-sm font-bold text-blue-600">04</span>
                            <h2 className="text-3xl font-bold text-slate-900 font-serif">Start Your Journey</h2>
                        </div>

                        <p className="text-xl text-slate-900 mb-8 font-medium leading-relaxed">
                            Ready to find your future university?
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/register" className="inline-flex justify-center items-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1">
                                Create Free Account
                            </Link>
                            <Link to="/programs" className="inline-flex justify-center items-center px-8 py-4 text-lg font-bold text-slate-600 transition-all duration-300 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300">
                                Browse Programs
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Guide;
