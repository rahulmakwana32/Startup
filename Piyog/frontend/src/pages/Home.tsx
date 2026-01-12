import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/exercise.png"
                        alt="PiYog Studio Session"
                        className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-pilates-50/90 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-bold text-pilates-900 leading-tight">
                            Balance Body.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pilates-600 to-pilates-900">
                                Elevate Mind.
                            </span>
                        </h1>
                        <p className="text-xl text-pilates-700 max-w-lg">
                            Experience the fusion of traditional Pilates and modern technology.
                            Precision equipment, AI-guided scheduling, and sustainable athleisure.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Link to="/schedule" className="px-8 py-4 bg-pilates-900 text-white rounded-full font-medium hover:bg-pilates-800 transition-all flex items-center gap-2 group">
                                Book a Class <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/dashboard" className="px-8 py-4 bg-white text-pilates-900 border border-pilates-200 rounded-full font-medium hover:bg-pilates-50 transition-all flex items-center gap-2">
                                <Play className="w-4 h-4 fill-current" /> See How We Run
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy / About */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h2 className="text-3xl font-bold text-pilates-900 mb-6">The Piyog Ecosystem</h2>
                    <p className="text-lg text-pilates-600 leading-relaxed">
                        We aren't just a studio. We are a vertically integrated wellness brand managed by a
                        sophisticated team of AI agents. From sourcing the finest materials for our reformers
                        to optimizing your class schedule, technology empowers our serenity.
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-pilates-50">
                <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
                    {[
                        { title: "Digital Studio", desc: "Seamless class booking and progress tracking.", img: "/exercise.png" },
                        { title: "Precision Hardware", desc: "Locally engineered, professional-grade reformers.", img: "/reformer.png" },
                        { title: "Technical Apparel", desc: "Athleisure designed for movement and climate.", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop" }
                    ].map((item, i) => (
                        <div key={i} className="group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md transition-all">
                            <div className="h-64 overflow-hidden">
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-pilates-900 mb-2">{item.title}</h3>
                                <p className="text-pilates-600">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
