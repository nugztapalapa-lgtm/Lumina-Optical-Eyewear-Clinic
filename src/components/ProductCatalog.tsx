import React, { useState, useMemo } from 'react';
import { FrameProduct, FrameShape, FrameColor } from '../types/optical';
import { FEATURED_FRAMES } from '../data/mockOpticalData';
import { GlassesFrameSvg } from './GlassesFrameSvg';
import { Search, ArrowUpDown } from 'lucide-react';

interface ProductCatalogProps {
  onSelectProduct: (product: FrameProduct, preselectedColor?: FrameColor) => void;
  onOpenPdTool: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProduct,
  onOpenPdTool,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [materialFilter, setMaterialFilter] = useState<'all' | 'titanium' | 'acetate'>('all');
  const [shapeFilter, setShapeFilter] = useState<'all' | FrameShape>('all');
  const [faceShapeFilter, setFaceShapeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'weight'>('featured');

  // Track active color per frame card
  const [selectedCardColors, setSelectedCardColors] = useState<Record<string, number>>({});

  const handleCardColorChange = (frameId: string, colorIndex: number) => {
    setSelectedCardColors((prev) => ({ ...prev, [frameId]: colorIndex }));
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return FEATURED_FRAMES.filter((product) => {
      // Search
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.material.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // Material
      if (materialFilter === 'titanium' && !product.material.includes('Titanium')) return false;
      if (materialFilter === 'acetate' && !product.material.includes('Acetate')) return false;

      // Shape
      if (shapeFilter !== 'all' && product.shape !== shapeFilter) return false;

      // Face Shape
      if (
        faceShapeFilter !== 'all' &&
        !product.suitableFaceShapes.includes(faceShapeFilter as any) &&
        !product.suitableFaceShapes.includes('All')
      ) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      if (sortBy === 'weight') return a.weightGrams - b.weightGrams;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchQuery, materialFilter, shapeFilter, faceShapeFilter, sortBy]);

  return (
    <section id="collection" className="py-16 md:py-24 bg-stone-100/60 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 dark:border-stone-800 pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-teal-800 dark:text-teal-400 font-semibold">
              The Eyewear Atelier
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-900 dark:text-stone-100 tracking-tight">
              Prescription Frames & Precision Optics
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-xl">
              Each frame is calibrated for optical centering and crafted to withstand years of daily use. 
              All prescription orders include anti-reflective coating and verified Pupillary Distance alignment.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPdTool}
              className="px-4 py-2 text-xs font-medium text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Measure Pupillary Distance (PD)
            </button>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search by frame name, shape or material..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg text-stone-900 dark:text-stone-100 focus:border-teal-700 focus:outline-none placeholder:text-stone-400 dark:placeholder:text-stone-500"
              />
            </div>

            {/* Material Segmented Filter */}
            <div className="flex items-center gap-1 p-1 bg-stone-200/70 dark:bg-stone-800 rounded-lg self-start md:self-auto overflow-x-auto">
              <button
                onClick={() => setMaterialFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  materialFilter === 'all'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                All Materials
              </button>
              <button
                onClick={() => setMaterialFilter('titanium')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  materialFilter === 'titanium'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                Japanese Titanium
              </button>
              <button
                onClick={() => setMaterialFilter('acetate')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  materialFilter === 'acetate'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                Italian Acetate
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400 self-end md:self-auto">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
              <span className="font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 py-1.5 px-2.5 rounded-lg text-xs focus:outline-none focus:border-teal-700 cursor-pointer"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="weight">Featherlight Weight</option>
              </select>
            </div>
          </div>

          {/* Secondary Sub-filters: Shape & Face Shape */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-stone-600 dark:text-stone-400">
            <span className="font-medium mr-1 text-stone-700 dark:text-stone-300">Silhouette:</span>
            {(['all', 'round', 'square', 'cat-eye', 'aviator', 'geometric'] as (FrameShape | 'all')[]).map(
              (shape) => (
                <button
                  key={shape}
                  onClick={() => setShapeFilter(shape)}
                  className={`px-2.5 py-1 rounded-md capitalize transition-colors cursor-pointer ${
                    shapeFilter === shape
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold'
                      : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  {shape}
                </button>
              )
            )}

            <span className="font-medium ml-3 mr-1 text-stone-700 dark:text-stone-300">Face Fit:</span>
            {['all', 'Round', 'Square', 'Oval', 'Heart'].map((face) => (
              <button
                key={face}
                onClick={() => setFaceShapeFilter(face)}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  faceShapeFilter === face
                    ? 'bg-teal-900 dark:bg-teal-700 text-white font-medium'
                    : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                }`}
              >
                {face === 'all' ? 'All Faces' : `${face} Face`}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid: 3-column desktop, 2-column tablet */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white dark:bg-stone-900 rounded-xl p-12 text-center border border-stone-200 dark:border-stone-800 space-y-3">
            <p className="text-base text-stone-700 dark:text-stone-200 font-medium">No frames matched your selected filters.</p>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Try resetting your search query or choosing "All Materials".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setMaterialFilter('all');
                setShapeFilter('all');
                setFaceShapeFilter('all');
              }}
              className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 dark:bg-teal-800 rounded-lg hover:bg-stone-800 dark:hover:bg-teal-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProducts.map((product) => {
              const activeColorIdx = selectedCardColors[product.id] ?? 0;
              const activeColor = product.colors[activeColorIdx] || product.colors[0];

              return (
                <article
                  key={product.id}
                  className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group"
                >
                  {/* Card Image Area */}
                  <div className="relative pt-6 pb-6 px-6 bg-gradient-to-b from-stone-50 to-stone-100/60 dark:from-stone-950 dark:to-stone-900/80 border-b border-stone-100 dark:border-stone-800 flex items-center justify-center min-h-[220px]">
                    <div className="w-full max-w-[280px]">
                      <GlassesFrameSvg
                        shape={product.shape}
                        color={activeColor}
                        className="w-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Subtle status tag if applicable */}
                    {product.isNew && (
                      <span className="absolute top-3 left-3 text-[11px] font-medium tracking-wide text-teal-800 dark:text-teal-300 bg-teal-50/90 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 px-2 py-0.5 rounded">
                        New Release
                      </span>
                    )}
                  </div>

                  {/* Card Content & Metadata */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      {/* Quiet Unboxed Metadata */}
                      <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                        <span className="font-medium text-stone-600 dark:text-stone-300">{product.material}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums font-mono">
                          {product.dimensions.lensWidth}-{product.dimensions.bridgeWidth}-
                          {product.dimensions.templeLength}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{product.weightGrams}g</span>
                      </div>

                      <div className="flex items-baseline justify-between pt-0.5">
                        <h3 className="text-lg font-serif font-semibold text-stone-900 dark:text-stone-100 group-hover:text-teal-900 dark:group-hover:text-teal-400 transition-colors">
                          {product.name}
                        </h3>
                        <div className="text-right">
                          <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
                            ${product.basePrice}
                          </span>
                          <span className="text-[11px] text-stone-400 dark:text-stone-500 block -mt-0.5">with Rx lenses</span>
                        </div>
                      </div>

                      <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Color Swatches and Action */}
                    <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-stone-800">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-stone-500 dark:text-stone-400 truncate max-w-[170px]">
                          {activeColor.name}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {product.colors.map((color, cIdx) => (
                            <button
                              key={color.id}
                              onClick={() => handleCardColorChange(product.id, cIdx)}
                              aria-label={`Select ${color.name}`}
                              className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                                activeColorIdx === cIdx
                                  ? 'border-teal-700 dark:border-teal-400 scale-110 shadow-xs ring-1 ring-teal-600'
                                  : 'border-stone-300 dark:border-stone-700 hover:scale-105'
                              }`}
                              style={{
                                background: color.secondaryHex
                                  ? `linear-gradient(135deg, ${color.hex} 0%, ${color.secondaryHex} 100%)`
                                  : color.hex,
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Buy / Configure Button */}
                      <button
                        onClick={() => onSelectProduct(product, activeColor)}
                        className="w-full py-2.5 px-3 text-xs font-semibold text-stone-900 dark:text-stone-100 bg-stone-100 dark:bg-stone-800 hover:bg-stone-900 hover:text-white dark:hover:bg-teal-800 dark:hover:text-white rounded-lg transition-colors cursor-pointer text-center"
                      >
                        Customize Prescription Lenses
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
