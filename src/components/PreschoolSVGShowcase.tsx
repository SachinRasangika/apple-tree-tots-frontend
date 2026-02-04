import React from 'react';
import {
  AppleTreeSVG,
  BlocksSVG,
  BalloonsSVG,
  StarsSVG,
  CrayonsSVG,
  PlayingSVG,
  SchoolBusSVG,
  RainbowSVG,
  PuzzlePieceSVG,
  SunCloudSVG,
  PaletteSVG
} from './PreschoolSVGs';
import { AnimatedSection } from './AnimatedSection';

export function PreschoolSVGShowcase() {
  const svgItems = [
    {
      name: 'Apple Tree',
      component: <AppleTreeSVG size={120} />,
      description: 'Perfect for branding and tree-themed sections'
    },
    {
      name: 'Colorful Blocks',
      component: <BlocksSVG size={120} />,
      description: 'Great for learning activities and play sections'
    },
    {
      name: 'Balloons',
      component: <BalloonsSVG size={120} />,
      description: 'Ideal for celebration and party elements'
    },
    {
      name: 'Stars',
      component: <StarsSVG size={120} />,
      description: 'Perfect for decorative backgrounds and achievements'
    },
    {
      name: 'Crayons',
      component: <CrayonsSVG size={120} />,
      description: 'Excellent for creative arts and craft sections'
    },
    {
      name: 'Playing Children',
      component: <PlayingSVG size={120} />,
      description: 'Great for play and social development sections'
    },
    {
      name: 'School Bus',
      component: <SchoolBusSVG size={120} />,
      description: 'Perfect for transportation and pickup sections'
    },
    {
      name: 'Rainbow',
      component: <RainbowSVG size={120} />,
      description: 'Ideal for learning and optimistic messaging'
    },
    {
      name: 'Puzzle Piece',
      component: <PuzzlePieceSVG size={120} />,
      description: 'Great for problem-solving and curriculum areas'
    },
    {
      name: 'Sun & Cloud',
      component: <SunCloudSVG size={120} />,
      description: 'Perfect for outdoor learning and weather sections'
    },
    {
      name: 'Paint Palette',
      component: <PaletteSVG size={120} />,
      description: 'Excellent for art and creative expression'
    }
  ];

  return (
    <AnimatedSection className="py-20 bg-[#FAF7F1] block" animation="fade-in-up">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-xs tracking-[0.2em] uppercase text-[#5F8F9A] font-bold mb-4 block">
            Design Assets
          </span>
          <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-6">
            Preschool <span className="italic opacity-80">Design</span> Elements
          </h2>
          <p className="text-[#222222] font-light leading-relaxed text-sm max-w-2xl mx-auto">
            A collection of playful, preschool-themed SVG components ready to enhance your content sections.
          </p>
        </div>

        {/* SVG Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {svgItems.map((item, index) => (
            <div
              key={item.name}
              className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="bg-white rounded-lg p-8 flex flex-col items-center justify-center min-h-[300px] border border-[#5F8F9A]/10 hover:border-[#5F8F9A]/30 transition-all duration-300 hover:shadow-md">
                {/* SVG Container */}
                <div className="mb-6 flex items-center justify-center h-[140px] group-hover:scale-110 transition-transform duration-300">
                  {item.component}
                </div>

                {/* Text */}
                <h3 className="text-lg font-serif tracking-wide text-[#222222] mb-2 text-center">
                  {item.name}
                </h3>
                <p className="text-sm text-[#222222]/60 font-light text-center leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Usage Information */}
        <div className="mt-20 bg-[#FAF7F1] rounded-lg p-12 border border-[#5F8F9A]/10">
          <h3 className="text-2xl font-serif tracking-wide text-[#222222] mb-6">
            How to Use These SVGs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-bold tracking-widest uppercase text-[#5F8F9A] mb-3">
                Basic Import
              </h4>
              <pre className="bg-[#FAF7F1] p-4 rounded text-xs font-mono overflow-x-auto">
{`import { AppleTreeSVG } from './PreschoolSVGs'

<AppleTreeSVG size={80} />`}
              </pre>
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-widest uppercase text-[#5F8F9A] mb-3">
                With Styling
              </h4>
              <pre className="bg-[#FAF7F1] p-4 rounded text-xs font-mono overflow-x-auto">
{`<AppleTreeSVG 
  size={100}
  className="hover:opacity-80"
  color="#E77A6A"
/>`}
              </pre>
            </div>
          </div>

          <div className="mt-8 p-6 bg-[#FAF7F1] rounded-lg">
            <h4 className="text-sm font-bold tracking-widest uppercase text-[#5F8F9A] mb-3">
              Size and Customization
            </h4>
            <ul className="space-y-2 text-sm text-[#222222]/70 font-light">
              <li>• <strong>size</strong>: Adjust SVG dimensions in pixels (default: 80)</li>
              <li>• <strong>className</strong>: Add Tailwind or custom CSS classes</li>
              <li>• <strong>color</strong>: Some SVGs support color prop (AppleTreeSVG, etc.)</li>
              <li>• All SVGs use theme colors: #E77A6A, #7FB6C4, #F3C6A8, #5A9B7A, #9B7BA8</li>
            </ul>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
