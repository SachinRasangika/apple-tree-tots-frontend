import React, { useState, lazy, Component } from 'react';
import { Footer } from '../components';
import { DarkModeProvider } from '../../context/DarkModeContext';
import { Button, Input, TextArea, Select, Card, FeatureCard, ImageCard, Accordion, AccordionItem, SectionHeader, PageHeader, Badge, Label, IconWrapper, ProgressIndicator, Divider } from '../../components/ui';
import { Heart, Star, Zap, Users, Calendar, Mail, Phone, MapPin } from 'lucide-react';
export function DesignSystemPage() {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [currentStep, setCurrentStep] = useState(2);
  return <DarkModeProvider isDark={true}>
    <div className="min-h-screen bg-[#1a3a3a] text-white selection:bg-[#2d5555] selection:text-white">
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="px-4 max-w-[1400px] mx-auto mb-32">
          <PageHeader label="Design System" title="Component Library" subtitle="A comprehensive design system showcasing all components, typography, colors, and patterns used throughout the Apple Tree Tots website." />
        </section>

        {/* Typography Section */}
        <section className="px-4 max-w-[1400px] mx-auto mb-32 border-t border-white/10 pt-20">
          <SectionHeader label="Typography" title="Font Families & Scales" subtitle="Our typography system uses Playfair Display for headings and Inter for body text, creating a sophisticated and readable hierarchy." />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Serif - Headings */}
            <Card variant="bordered" padding="lg">
              <div className="mb-8">
                <Badge variant="solid" size="sm" className="mb-4">
                  Playfair Display
                </Badge>
                <p className="text-xs text-gray-400 tracking-wide">
                  Serif • Headings & Display Text
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-gray-500 block mb-2">
                    7XL / 72px
                  </span>
                  <h1 className="text-7xl font-serif tracking-widest uppercase">
                    Display
                  </h1>
                </div>
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-gray-500 block mb-2">
                    4XL / 36px
                  </span>
                  <h2 className="text-4xl font-serif tracking-widest uppercase">
                    Heading One
                  </h2>
                </div>
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-gray-500 block mb-2">
                    3XL / 30px
                  </span>
                  <h3 className="text-3xl font-serif tracking-widest uppercase">
                    Heading Two
                  </h3>
                </div>
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-gray-500 block mb-2">
                    2XL / 24px
                  </span>
                  <h4 className="text-2xl font-serif tracking-wide">
                    Heading Three
                  </h4>
                </div>
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-gray-500 block mb-2">
                    XL / 20px
                  </span>
                  <h5 className="text-xl font-serif tracking-wide">
                    Heading Four
                  </h5>
                </div>
              </div>
            </Card>

            {/* Sans - Body */}
            <Card variant="bordered" padding="lg">
              <div className="mb-8">
                <Badge variant="solid" size="sm" className="mb-4">
                  Inter
                </Badge>
                <p className="text-xs text-gray-400 tracking-wide">
                  Sans-serif • Body Text & UI
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-gray-500 block mb-2">
                    BASE / 16px • Regular
                  </span>
                  <p className="text-base font-light">
                    The quick brown fox jumps over the lazy dog. Professional
                    early childhood education in Ahangama.
                  </p>
                </div>
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-gray-500 block mb-2">
                    SM / 14px • Light
                  </span>
                  <p className="text-sm font-light">
                    The quick brown fox jumps over the lazy dog. Professional
                    early childhood education in Ahangama.
                  </p>
                </div>
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-gray-500 block mb-2">
                    XS / 12px • Medium
                  </span>
                  <p className="text-xs font-medium tracking-wide">
                    The quick brown fox jumps over the lazy dog. Professional
                    early childhood education.
                  </p>
                </div>
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-gray-500 block mb-2">
                    XS / 12px • Uppercase • Tracking Widest
                  </span>
                  <p className="text-xs tracking-widest uppercase">
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Color Palette */}
        <section className="px-4 max-w-[1400px] mx-auto mb-32 border-t border-white/10 pt-20">
          <SectionHeader label="Colors" title="Color Palette" subtitle="Our sophisticated color system built around deep teal tones, creating a professional and calming aesthetic." />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Primary */}
            <Card variant="bordered" padding="md">
              <div className="aspect-square bg-[#1a3a3a] rounded-sm mb-4 border border-white/10"></div>
              <h4 className="text-sm font-serif tracking-wide mb-2">Primary</h4>
              <p className="text-xs text-gray-400 font-mono">#1a3a3a</p>
              <p className="text-[10px] text-gray-500 mt-1">Main background</p>
            </Card>

            {/* Secondary */}
            <Card variant="bordered" padding="md">
              <div className="aspect-square bg-[#2d5555] rounded-sm mb-4 border border-white/10"></div>
              <h4 className="text-sm font-serif tracking-wide mb-2">
                Secondary
              </h4>
              <p className="text-xs text-gray-400 font-mono">#2d5555</p>
              <p className="text-[10px] text-gray-500 mt-1">Accents & icons</p>
            </Card>

            {/* Accent */}
            <Card variant="bordered" padding="md">
              <div className="aspect-square bg-[#152e2e] rounded-sm mb-4 border border-white/10"></div>
              <h4 className="text-sm font-serif tracking-wide mb-2">Dark</h4>
              <p className="text-xs text-gray-400 font-mono">#152e2e</p>
              <p className="text-[10px] text-gray-500 mt-1">
                Alternate sections
              </p>
            </Card>

            {/* Neutral */}
            <Card variant="bordered" padding="md">
              <div className="aspect-square bg-[#d4d4c8] rounded-sm mb-4 border border-white/10"></div>
              <h4 className="text-sm font-serif tracking-wide mb-2">Neutral</h4>
              <p className="text-xs text-gray-400 font-mono">#d4d4c8</p>
              <p className="text-[10px] text-gray-500 mt-1">Light sections</p>
            </Card>

            {/* White */}
            <Card variant="bordered" padding="md">
              <div className="aspect-square bg-white rounded-sm mb-4 border border-white/10"></div>
              <h4 className="text-sm font-serif tracking-wide mb-2">White</h4>
              <p className="text-xs text-gray-400 font-mono">#ffffff</p>
              <p className="text-[10px] text-gray-500 mt-1">Text & borders</p>
            </Card>

            {/* Gray 300 */}
            <Card variant="bordered" padding="md">
              <div className="aspect-square bg-gray-300 rounded-sm mb-4 border border-white/10"></div>
              <h4 className="text-sm font-serif tracking-wide mb-2">
                Gray 300
              </h4>
              <p className="text-xs text-gray-400 font-mono">#d1d5db</p>
              <p className="text-[10px] text-gray-500 mt-1">Secondary text</p>
            </Card>

            {/* Gray 400 */}
            <Card variant="bordered" padding="md">
              <div className="aspect-square bg-gray-400 rounded-sm mb-4 border border-white/10"></div>
              <h4 className="text-sm font-serif tracking-wide mb-2">
                Gray 400
              </h4>
              <p className="text-xs text-gray-400 font-mono">#9ca3af</p>
              <p className="text-[10px] text-gray-500 mt-1">Muted text</p>
            </Card>

            {/* Gray 500 */}
            <Card variant="bordered" padding="md">
              <div className="aspect-square bg-gray-500 rounded-sm mb-4 border border-white/10"></div>
              <h4 className="text-sm font-serif tracking-wide mb-2">
                Gray 500
              </h4>
              <p className="text-xs text-gray-400 font-mono">#6b7280</p>
              <p className="text-[10px] text-gray-500 mt-1">Disabled text</p>
            </Card>
          </div>
        </section>

        {/* Buttons */}
        <section className="px-4 max-w-[1400px] mx-auto mb-32 border-t border-white/10 pt-20">
          <SectionHeader label="Buttons" title="Button Components" subtitle="Interactive button components with multiple variants and sizes for different use cases." />

          <div className="space-y-12">
            {/* Variants */}
            <Card variant="bordered" padding="lg">
              <h3 className="text-lg font-serif tracking-wide mb-6">
                Variants
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="md">
                  Primary Button
                </Button>
                <Button variant="outline" size="md">
                  Outline Button
                </Button>
                <Button variant="text" size="md">
                  Text Button
                </Button>
              </div>
            </Card>

            {/* Sizes */}
            <Card variant="bordered" padding="lg">
              <h3 className="text-lg font-serif tracking-wide mb-6">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="outline" size="sm">
                  Small
                </Button>
                <Button variant="outline" size="md">
                  Medium
                </Button>
                <Button variant="outline" size="lg">
                  Large
                </Button>
              </div>
            </Card>

            {/* States */}
            <Card variant="bordered" padding="lg">
              <h3 className="text-lg font-serif tracking-wide mb-6">States</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="md">
                  Default
                </Button>
                <Button variant="primary" size="md" disabled>
                  Disabled
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Form Inputs */}
        <section className="px-4 max-w-[1400px] mx-auto mb-32 border-t border-white/10 pt-20">
          <SectionHeader label="Form Inputs" title="Input Components" subtitle="Form input components with labels, validation states, and helper text." />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card variant="bordered" padding="lg">
              <h3 className="text-lg font-serif tracking-wide mb-6">
                Text Inputs
              </h3>
              <div className="space-y-6">
                <Input label="Email Address" type="email" placeholder="your@email.com" value={inputValue} onChange={e => setInputValue(e.target.value)} required />
                <Input label="Phone Number" type="tel" placeholder="+94 XX XXX XXXX" helperText="Enter your mobile number" />
                <Input label="Password" type="password" placeholder="Enter password" error="Password must be at least 8 characters" />
              </div>
            </Card>

            <Card variant="bordered" padding="lg">
              <h3 className="text-lg font-serif tracking-wide mb-6">
                Select & TextArea
              </h3>
              <div className="space-y-6">
                <Select label="Program Selection" value={selectValue} onChange={e => setSelectValue(e.target.value)} required options={[{
                value: '',
                label: 'Select a program'
              }, {
                value: 'toddler',
                label: 'Toddler Programs (Ages 1.5-3)'
              }, {
                value: 'casa',
                label: 'CASA Programs (Ages 3-6)'
              }]} />
                <TextArea label="Message" rows={4} placeholder="Enter your message here..." helperText="Maximum 500 characters" />
              </div>
            </Card>
          </div>
        </section>

        {/* Cards */}
        <section className="px-4 max-w-[1400px] mx-auto mb-32 border-t border-white/10 pt-20">
          <SectionHeader label="Cards" title="Card Components" subtitle="Versatile card components for organizing and displaying content with multiple variants." />

          <div className="space-y-8">
            {/* Card Variants */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card variant="default" padding="md">
                <h4 className="text-sm font-serif tracking-wide mb-2">
                  Default
                </h4>
                <p className="text-xs text-gray-400">
                  Standard card with subtle background
                </p>
              </Card>

              <Card variant="bordered" padding="md">
                <h4 className="text-sm font-serif tracking-wide mb-2">
                  Bordered
                </h4>
                <p className="text-xs text-gray-400">
                  Card with border, no background
                </p>
              </Card>

              <Card variant="elevated" padding="md">
                <h4 className="text-sm font-serif tracking-wide mb-2">
                  Elevated
                </h4>
                <p className="text-xs text-gray-400">
                  Card with shadow elevation
                </p>
              </Card>

              <Card variant="glass" padding="md">
                <h4 className="text-sm font-serif tracking-wide mb-2">Glass</h4>
                <p className="text-xs text-gray-400">
                  Card with backdrop blur effect
                </p>
              </Card>
            </div>

            {/* Feature Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard icon={<Heart size={24} />} title="Feature Card" description="A specialized card component with an icon, title, and description. Perfect for showcasing features or services." />

              <FeatureCard icon={<Star size={24} />} title="With Hover Effect" description="Cards can include hover effects for interactive elements, creating engaging user experiences." />
            </div>

            {/* Image Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ImageCard image="https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800&auto=format&fit=crop" alt="Example" title="Image Card" subtitle="Landscape" aspectRatio="landscape" />
              <ImageCard image="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800&auto=format&fit=crop" alt="Example" title="Image Card" subtitle="Portrait" aspectRatio="portrait" />
              <ImageCard image="https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800&auto=format&fit=crop" alt="Example" title="Image Card" subtitle="Square" aspectRatio="square" />
            </div>
          </div>
        </section>

        {/* Accordion */}
        <section className="px-4 max-w-[1400px] mx-auto mb-32 border-t border-white/10 pt-20">
          <SectionHeader label="Accordion" title="Collapsible Content" subtitle="Accordion components for organizing expandable content sections, perfect for FAQs and detailed information." />

          <div className="max-w-3xl mx-auto">
            <Accordion>
              <AccordionItem title="What is an accordion component?" defaultOpen>
                <p>
                  An accordion is a vertically stacked list of items where each
                  item can be expanded or collapsed to reveal additional
                  content. It's commonly used for FAQs, documentation, and
                  organizing large amounts of information in a compact space.
                </p>
              </AccordionItem>
              <AccordionItem title="How do I use this component?">
                <p>
                  Import the Accordion and AccordionItem components, then wrap
                  your content in AccordionItem components. Each item can have a
                  title and children content that will be revealed when
                  expanded.
                </p>
              </AccordionItem>
              <AccordionItem title="Can I have multiple items open at once?">
                <p>
                  Yes! Each accordion item manages its own state independently,
                  so multiple items can be open simultaneously. You can also set
                  defaultOpen on specific items to have them expanded by
                  default.
                </p>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Badges & Labels */}
        <section className="px-4 max-w-[1400px] mx-auto mb-32 border-t border-white/10 pt-20">
          <SectionHeader label="Badges & Labels" title="Small Components" subtitle="Compact components for tags, labels, and status indicators." />

          <div className="space-y-8">
            {/* Badges */}
            <Card variant="bordered" padding="lg">
              <h3 className="text-lg font-serif tracking-wide mb-6">Badges</h3>
              <div className="flex flex-wrap gap-4">
                <Badge variant="default" size="sm">
                  Default
                </Badge>
                <Badge variant="outline" size="sm">
                  Outline
                </Badge>
                <Badge variant="solid" size="sm">
                  Solid
                </Badge>
                <Badge variant="default" size="md">
                  Medium
                </Badge>
                <Badge variant="default" size="lg">
                  Large
                </Badge>
              </div>
            </Card>

            {/* Labels */}
            <Card variant="bordered" padding="lg">
              <h3 className="text-lg font-serif tracking-wide mb-6">Labels</h3>
              <div className="flex flex-wrap gap-6">
                <Label icon={<Users size={12} />}>Ages 2-5</Label>
                <Label icon={<Calendar size={12} />}>Mon - Fri</Label>
                <Label icon={<MapPin size={12} />}>Ahangama</Label>
                <Label icon={<Mail size={12} />}>Contact Us</Label>
              </div>
            </Card>
          </div>
        </section>

        {/* Icon Wrapper */}
        <section className="px-4 max-w-[1400px] mx-auto mb-32 border-t border-white/10 pt-20">
          <SectionHeader label="Icons" title="Icon Wrapper" subtitle="Consistent icon containers with multiple styles and sizes." />

          <div className="space-y-8">
            {/* Variants */}
            <Card variant="bordered" padding="lg">
              <h3 className="text-lg font-serif tracking-wide mb-6">
                Variants
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <IconWrapper icon={<Heart size={24} />} variant="circle" />
                <IconWrapper icon={<Star size={24} />} variant="square" />
                <IconWrapper icon={<Zap size={24} />} variant="none" />
              </div>
            </Card>

            {/* Sizes */}
            <Card variant="bordered" padding="lg">
              <h3 className="text-lg font-serif tracking-wide mb-6">Sizes</h3>
              <div className="flex flex-wrap items-center gap-6">
                <IconWrapper icon={<Heart size={16} />} size="sm" />
                <IconWrapper icon={<Heart size={20} />} size="md" />
                <IconWrapper icon={<Heart size={24} />} size="lg" />
                <IconWrapper icon={<Heart size={32} />} size="xl" />
              </div>
            </Card>
          </div>
        </section>

        {/* Progress Indicator */}
        <section className="px-4 max-w-[1400px] mx-auto mb-32 border-t border-white/10 pt-20">
          <SectionHeader label="Progress" title="Progress Indicator" subtitle="Multi-step progress visualization for forms and processes." />

          <Card variant="bordered" padding="lg">
            <div className="mb-8">
              <ProgressIndicator steps={[{
              label: 'Step 1'
            }, {
              label: 'Step 2'
            }, {
              label: 'Step 3'
            }, {
              label: 'Step 4'
            }]} currentStep={currentStep} />
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="outline" size="sm" onClick={() => setCurrentStep(Math.max(1, currentStep - 1))} disabled={currentStep === 1}>
                Previous
              </Button>
              <Button variant="primary" size="sm" onClick={() => setCurrentStep(Math.min(4, currentStep + 1))} disabled={currentStep === 4}>
                Next
              </Button>
            </div>
          </Card>
        </section>

        {/* Dividers */}
        <section className="px-4 max-w-[1400px] mx-auto mb-32 border-t border-white/10 pt-20">
          <SectionHeader label="Dividers" title="Divider Components" subtitle="Horizontal and vertical dividers with optional labels for content separation." />

          <div className="space-y-8">
            <Card variant="bordered" padding="lg">
              <h3 className="text-lg font-serif tracking-wide mb-6">
                Horizontal Divider
              </h3>
              <Divider orientation="horizontal" />
            </Card>

            <Card variant="bordered" padding="lg">
              <h3 className="text-lg font-serif tracking-wide mb-6">
                Divider with Label
              </h3>
              <Divider label="Or Continue With" />
            </Card>

            <Card variant="bordered" padding="lg">
              <h3 className="text-lg font-serif tracking-wide mb-6">
                Vertical Divider
              </h3>
              <div className="flex items-center gap-4 h-32">
                <div className="flex-1 bg-[#2d5555]/10 h-full flex items-center justify-center">
                  <span className="text-sm">Content Left</span>
                </div>
                <Divider orientation="vertical" />
                <div className="flex-1 bg-[#2d5555]/10 h-full flex items-center justify-center">
                  <span className="text-sm">Content Right</span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Spacing System */}
        <section className="px-4 max-w-[1400px] mx-auto mb-32 border-t border-white/10 pt-20">
          <SectionHeader label="Spacing" title="Spacing Scale" subtitle="Consistent spacing system based on a 4px base unit for layout and component spacing." />

          <Card variant="bordered" padding="lg">
            <div className="space-y-4">
              {[{
              name: 'space-1',
              value: '4px',
              class: 'w-1'
            }, {
              name: 'space-2',
              value: '8px',
              class: 'w-2'
            }, {
              name: 'space-3',
              value: '12px',
              class: 'w-3'
            }, {
              name: 'space-4',
              value: '16px',
              class: 'w-4'
            }, {
              name: 'space-6',
              value: '24px',
              class: 'w-6'
            }, {
              name: 'space-8',
              value: '32px',
              class: 'w-8'
            }, {
              name: 'space-12',
              value: '48px',
              class: 'w-12'
            }, {
              name: 'space-16',
              value: '64px',
              class: 'w-16'
            }, {
              name: 'space-20',
              value: '80px',
              class: 'w-20'
            }].map(space => <div key={space.name} className="flex items-center gap-4">
                  <div className="w-32">
                    <span className="text-xs font-mono text-gray-400">
                      {space.name}
                    </span>
                  </div>
                  <div className="w-16">
                    <span className="text-xs text-gray-500">{space.value}</span>
                  </div>
                  <div className={`${space.class} h-8 bg-[#2d5555]`}></div>
                </div>)}
            </div>
          </Card>
        </section>

        {/* Animation Patterns */}
        <section className="px-4 max-w-[1400px] mx-auto mb-32 border-t border-white/10 pt-20">
          <SectionHeader label="Animations" title="Animation Patterns" subtitle="Smooth, purposeful animations that enhance user experience without overwhelming." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="bordered" padding="lg">
              <h3 className="text-lg font-serif tracking-wide mb-4">Fade In</h3>
              <p className="text-xs text-gray-400 mb-6">
                Gentle opacity transition for content reveal
              </p>
              <div className="opacity-0 animate-[fadeIn_1s_ease-out_forwards] bg-[#2d5555]/20 p-6 text-center">
                <span className="text-sm">Fading in...</span>
              </div>
            </Card>

            <Card variant="bordered" padding="lg">
              <h3 className="text-lg font-serif tracking-wide mb-4">
                Fade In Up
              </h3>
              <p className="text-xs text-gray-400 mb-6">
                Upward motion with fade for dynamic entrance
              </p>
              <div className="opacity-0 animate-[fadeInUp_1s_ease-out_forwards] bg-[#2d5555]/20 p-6 text-center">
                <span className="text-sm">Sliding up...</span>
              </div>
            </Card>
          </div>

          <Card variant="bordered" padding="lg" className="mt-8">
            <h3 className="text-lg font-serif tracking-wide mb-4">
              Staggered Animation
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Sequential animation delays for list items
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[0, 150, 300].map((delay, index) => <div key={index} className="opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] bg-[#2d5555]/20 p-6 text-center" style={{
              animationDelay: `${delay}ms`
            }}>
                  <span className="text-sm">Item {index + 1}</span>
                </div>)}
            </div>
          </Card>
        </section>

        {/* Usage Guidelines */}
        <section className="px-4 max-w-[1400px] mx-auto mb-20">
          <SectionHeader label="Guidelines" title="Usage & Best Practices" subtitle="Guidelines for implementing the design system consistently across the application." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="glass" padding="lg">
              <h3 className="text-lg font-serif tracking-wide mb-4">
                Component Import
              </h3>
              <div className="bg-black/20 p-4 rounded-sm font-mono text-xs mb-4">
                <code className="text-gray-300">
                  import &#123; Button, Card, Input &#125; from
                  './components/ui'
                </code>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                All components are exported from a central index file for easy
                importing. Use named imports to keep your bundle size optimized.
              </p>
            </Card>

            <Card variant="glass" padding="lg">
              <h3 className="text-lg font-serif tracking-wide mb-4">
                Accessibility
              </h3>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>• Semantic HTML elements throughout</li>
                <li>• ARIA labels where appropriate</li>
                <li>• Keyboard navigation support</li>
                <li>• Focus visible states on all interactive elements</li>
                <li>• Color contrast ratios meet WCAG AA standards</li>
              </ul>
            </Card>

            <Card variant="glass" padding="lg">
              <h3 className="text-lg font-serif tracking-wide mb-4">
                Responsive Design
              </h3>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>• Mobile-first approach</li>
                <li>• Breakpoints: sm (640px), md (768px), lg (1024px)</li>
                <li>• Flexible layouts with grid and flexbox</li>
                <li>• Touch-friendly interactive elements</li>
              </ul>
            </Card>

            <Card variant="glass" padding="lg">
              <h3 className="text-lg font-serif tracking-wide mb-4">
                Performance
              </h3>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>• Optimized animations with CSS transforms</li>
                <li>• Lazy loading for images</li>
                <li>• Minimal re-renders with React best practices</li>
                <li>• Tree-shakeable component exports</li>
              </ul>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  </DarkModeProvider>;
}
