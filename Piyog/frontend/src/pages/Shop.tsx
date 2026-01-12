const Shop = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-pilates-900 mb-8">Shop</h1>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-pilates-200">
                    <img src="/reformer.png" alt="PiYog Reformer" className="w-full h-auto rounded-lg mb-6" />
                    <h2 className="text-2xl font-bold text-pilates-900">The PiYog Reformer Pro</h2>
                    <p className="text-pilates-600 mt-2">Hand-crafted sustainable wood frame with precision engineering.</p>
                    <div className="mt-6 flex justify-between items-center">
                        <span className="text-xl font-bold text-pilates-900">$2,499</span>
                        <button className="px-6 py-2 bg-pilates-900 text-white rounded-full hover:bg-pilates-800 transition-colors">Pre-order</button>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-pilates-200 opacity-75">
                    <div className="h-64 bg-pilates-50 rounded-lg flex items-center justify-center mb-6">
                        <span className="text-pilates-400">Apparel Coming Soon</span>
                    </div>
                    <h2 className="text-2xl font-bold text-pilates-900">Performance Collection</h2>
                    <p className="text-pilates-600 mt-2">Engineered for movement.</p>
                </div>
            </div>
        </div>
    )
}
export default Shop;
