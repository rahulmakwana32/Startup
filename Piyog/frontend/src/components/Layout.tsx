import { Outlet, Link } from 'react-router-dom';
import { ShoppingBag, Activity, Menu } from 'lucide-react';

const Layout = () => {
    return (
        <div className="min-h-screen bg-pilates-50 flex flex-col">
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-pilates-200">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold text-pilates-900 tracking-tight">
                        Piyog
                    </Link>

                    <nav className="hidden md:flex items-center gap-8 text-pilates-700 font-medium">
                        <Link to="/schedule" className="hover:text-pilates-900 transition-colors">Class Schedule</Link>
                        <Link to="/shop" className="hover:text-pilates-900 transition-colors">Shop</Link>
                        <Link to="/dashboard" className="hover:text-pilates-900 transition-colors flex items-center gap-2">
                            <Activity className="w-4 h-4" /> Virtual HQ
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-pilates-100 rounded-full transition-colors relative">
                            <ShoppingBag className="w-5 h-5 text-pilates-800" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <button className="md:hidden p-2">
                            <Menu className="w-6 h-6 text-pilates-800" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <Outlet />
            </main>

            <footer className="bg-pilates-900 text-pilates-100 py-12">
                <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Piyog</h3>
                        <p className="text-pilates-300">Redefining Pilates across India with AI-driven wellness.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Explore</h4>
                        <ul className="space-y-2 text-pilates-300">
                            <li><Link to="/schedule">Classes</Link></li>
                            <li><Link to="/shop">Equipment</Link></li>
                            <li><Link to="/shop">Athleisure</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Company</h4>
                        <ul className="space-y-2 text-pilates-300">
                            <li><Link to="/about">Our Story</Link></li>
                            <li><Link to="/careers">Careers</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Connect</h4>
                        <div className="flex gap-4">
                            {/* Social icons placeholder */}
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-4 mt-8 pt-8 border-t border-pilates-800 text-center text-pilates-500 text-sm">
                    © {new Date().getFullYear()} Piyog. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
