import React from 'react';
import {
  BunnySVG,
  DuckSVG,
  ButterflySVG,
  CatSVG,
  HeartSVG,
  MoonSVG,
  FlowerSVG,
  Number1SVG,
  CloudSVG,
  BadgeSVG,
  TrophySVG,
  CheckmarkCircleSVG,
  WavyLineSVG,
  DotsPatternSVG,
  RainbowArcSVG,
  ScribbleSVG,
  BookSVG,
  PencilSVG,
  GiftSVG
} from './PreschoolCreativeElements';
import { AnimatedSection } from './AnimatedSection';

interface ElementCategory {
  name: string;
  description: string;
  items: {
    name: string;
    component: React.ReactNode;
    description: string;
    useCase: string;
  }[];
}

export function PreschoolCreativeShowcase() {
  const categories: ElementCategory[] = [
    {
      name: 'Friendly Animals',
      description: 'Cute, child-friendly animal characters perfect for engaging content',
      items: [
        {
          name: 'Bunny',
          component: <BunnySVG size={100} />,
          description: 'Gentle bunny with floppy ears',
          useCase: 'Easter themes, spring activities, gentle messaging'
        },
        {
          name: 'Duck',
          component: <DuckSVG size={100} />,
          description: 'Happy yellow duck',
          useCase: 'Water play, bathing, fun activities'
        },
        {
          name: 'Butterfly',
          component: <ButterflySVG size={100} />,
          description: 'Colorful butterfly with spots',
          useCase: 'Transformation themes, nature, growth'
        },
        {
          name: 'Cat',
          component: <CatSVG size={100} />,
          description: 'Playful cat with whiskers',
          useCase: 'Pet themes, comfort, companionship'
        }
      ]
    },
    {
      name: 'Learning Shapes & Numbers',
      description: 'Shapes and educational elements for academic content',
      items: [
        {
          name: 'Heart',
          component: <HeartSVG size={100} />,
          description: 'Warm, friendly heart shape',
          useCase: 'Emotions, kindness, feelings discussions'
        },
        {
          name: 'Flower',
          component: <FlowerSVG size={100} />,
          description: 'Colorful flower with leaves',
          useCase: 'Garden themes, seasons, nature activities'
        },
        {
          name: 'Cloud',
          component: <CloudSVG size={100} />,
          description: 'Fluffy cloud shape',
          useCase: 'Weather, dreams, imagination themes'
        },
        {
          name: 'Number 1',
          component: <Number1SVG size={100} />,
          description: 'Learning number one',
          useCase: 'Math lessons, counting activities'
        }
      ]
    },
    {
      name: 'Achievement & Rewards',
      description: 'Recognition elements for celebrating accomplishments',
      items: [
        {
          name: 'Achievement Badge',
          component: <BadgeSVG size={100} />,
          description: 'Ribbon-style achievement badge',
          useCase: 'Accomplishments, milestones, success'
        },
        {
          name: 'Trophy',
          component: <TrophySVG size={100} />,
          description: 'Golden trophy cup',
          useCase: 'Winners, achievements, celebration'
        },
        {
          name: 'Checkmark Circle',
          component: <CheckmarkCircleSVG size={100} />,
          description: 'Green checkmark in circle',
          useCase: 'Completion, approval, success states'
        },
        {
          name: 'Gift',
          component: <GiftSVG size={100} />,
          description: 'Wrapped present box',
          useCase: 'Rewards, special occasions, surprises'
        }
      ]
    },
    {
      name: 'Decorative & Patterns',
      description: 'Design elements for borders, backgrounds, and decorations',
      items: [
        {
          name: 'Wavy Line',
          component: <WavyLineSVG size={100} />,
          description: 'Playful wavy divider',
          useCase: 'Section separators, borders, flowing designs'
        },
        {
          name: 'Dots Pattern',
          component: <DotsPatternSVG size={100} />,
          description: 'Grid of colorful dots',
          useCase: 'Background patterns, grid layouts'
        },
        {
          name: 'Rainbow Arc',
          component: <RainbowArcSVG size={100} />,
          description: 'Colorful rainbow arcs',
          useCase: 'Hope, joy, optimism, backgrounds'
        },
        {
          name: 'Scribble',
          component: <ScribbleSVG size={100} />,
          description: 'Hand-drawn scribble effect',
          useCase: 'Highlights, emphasis, artistic touch'
        }
      ]
    },
    {
      name: 'Learning & Activities',
      description: 'Elements representing education and creative play',
      items: [
        {
          name: 'Book',
          component: <BookSVG size={100} />,
          description: 'Open book with pages',
          useCase: 'Reading, stories, learning time'
        },
        {
          name: 'Pencil',
          component: <PencilSVG size={100} />,
          description: 'Yellow pencil with eraser',
          useCase: 'Writing, creativity, arts & crafts'
        },
        {
          name: 'Moon',
          component: <MoonSVG size={100} />,
          description: 'Crescent moon with stars',
          useCase: 'Bedtime, dreams, nighttime stories'
        }
      ]
    }
  ];

  return (
    <AnimatedSection className="py-20 bg-[#FAF7F1] block" animation="fade-in-up">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="text-xs tracking-[0.2em] uppercase text-[#5F8F9A] font-bold mb-4 block">
            Extended Design Library
          </span>
          <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-6">
            Creative <span className="italic opacity-80">Preschool</span> Elements
          </h2>
          <p className="text-[#222222] font-light leading-relaxed text-sm max-w-2xl mx-auto">
            A comprehensive collection of playful characters, shapes, achievement elements, and decorative components designed to create a joyful, engaging preschool experience.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-24">
          {categories.map((category, catIndex) => (
            <div
              key={category.name}
              className="opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
              style={{ animationDelay: `${catIndex * 100}ms` }}
            >
              {/* Category Header */}
              <div className="mb-12">
                <h3 className="text-2xl font-serif tracking-wide text-[#222222] mb-2">
                  {category.name}
                </h3>
                <p className="text-[#222222]/60 text-sm font-light">
                  {category.description}
                </p>
                <div className="h-1 w-16 bg-[#5F8F9A] mt-4 rounded-full" />
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={item.name}
                    className="group bg-white rounded-lg p-8 border border-[#5F8F9A]/10 hover:border-[#5F8F9A]/30 hover:shadow-lg transition-all duration-300 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                    style={{ animationDelay: `${catIndex * 100 + itemIndex * 50}ms` }}
                  >
                    {/* SVG */}
                    <div className="mb-6 flex items-center justify-center h-[140px] group-hover:scale-110 transition-transform duration-300">
                      {item.component}
                    </div>

                    {/* Info */}
                    <h4 className="text-lg font-serif tracking-wide text-[#222222] mb-2 text-center">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#222222]/70 text-center mb-4 font-light">
                      {item.description}
                    </p>

                    {/* Use Case Badge */}
                    <div className="pt-4 border-t border-[#5F8F9A]/10">
                      <p className="text-[10px] text-[#5F8F9A] font-bold tracking-widest uppercase mb-1">
                        Perfect For:
                      </p>
                      <p className="text-xs text-[#222222]/60 font-light">
                        {item.useCase}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Integration Guide */}
        <div className="mt-24 bg-[#FAF7F1] rounded-lg p-12 border border-[#5F8F9A]/10">
          <h3 className="text-2xl font-serif tracking-wide text-[#222222] mb-8">
            Integration Ideas
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-[#FAF7F1] rounded-lg">
              <h4 className="text-sm font-bold tracking-widest uppercase text-[#5F8F9A] mb-3">
                Hero Sections
              </h4>
              <p className="text-sm text-[#222222]/70 font-light leading-relaxed">
                Use animals and decorative elements as floating accents in hero sections to create a warm, welcoming first impression.
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F1] rounded-lg">
              <h4 className="text-sm font-bold tracking-widest uppercase text-[#5F8F9A] mb-3">
                Achievement Systems
              </h4>
              <p className="text-sm text-[#222222]/70 font-light leading-relaxed">
                Implement badges, trophies, and checkmarks in parent dashboards to track child progress and celebrate milestones.
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F1] rounded-lg">
              <h4 className="text-sm font-bold tracking-widest uppercase text-[#5F8F9A] mb-3">
                Section Dividers
              </h4>
              <p className="text-sm text-[#222222]/70 font-light leading-relaxed">
                Use wavy lines, dots patterns, and rainbow arcs as playful dividers between content sections.
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F1] rounded-lg">
              <h4 className="text-sm font-bold tracking-widest uppercase text-[#5F8F9A] mb-3">
                Activity Cards
              </h4>
              <p className="text-sm text-[#222222]/70 font-light leading-relaxed">
                Pair animals with activity descriptions for engaging curriculum overviews and program highlights.
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F1] rounded-lg">
              <h4 className="text-sm font-bold tracking-widest uppercase text-[#5F8F9A] mb-3">
                Learning Content
              </h4>
              <p className="text-sm text-[#222222]/70 font-light leading-relaxed">
                Incorporate shapes, flowers, and numbers into educational content to make learning visually engaging.
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F1] rounded-lg">
              <h4 className="text-sm font-bold tracking-widest uppercase text-[#5F8F9A] mb-3">
                Background Patterns
              </h4>
              <p className="text-sm text-[#222222]/70 font-light leading-relaxed">
                Apply dots patterns and scribbles as subtle background textures to add visual interest without distraction.
              </p>
            </div>
          </div>

          {/* Code Usage */}
          <div className="mt-8 pt-8 border-t border-[#5F8F9A]/10">
            <h4 className="text-sm font-bold tracking-widest uppercase text-[#5F8F9A] mb-4">
              Quick Usage
            </h4>
            <pre className="bg-[#FAF7F1] p-6 rounded-lg text-xs font-mono overflow-x-auto">
{`// Import the creative elements
import {
  BunnySVG,
  ButterflySVG,
  BadgeSVG,
  TrophySVG,
  RainbowArcSVG
} from './PreschoolCreativeElements'

// Use in your components
<BunnySVG size={100} />
<ButterflySVG size={80} />
<BadgeSVG size={120} />
<TrophySVG size={100} />
<RainbowArcSVG size={150} />

// Customize with className and color props
<FlowerSVG size={100} className="hover:rotate-12" />`}
            </pre>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
