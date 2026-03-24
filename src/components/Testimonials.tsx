import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Quote } from 'lucide-react';
import testimonials from '../data/testimonials.json';

const Testimonials = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate horizontal shift based on number of cards
  // We want to translate from 0% to a negative percentage that shows all cards
  // Total cards * card width + gap
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section 
      ref={targetRef} 
      className="relative h-[400vh] bg-background"
      id="testimonials"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Kind Words
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Collaborations that drive results. Here's what some of my partners have to say.
            </p>
          </motion.div>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-4 md:px-[10%]">
          {testimonials.map((testimonial) => (
            <div
                key={testimonial.id}
                className="group relative flex-shrink-0 w-[400px] md:w-[450px]"
            >
              {/* Neon Glow Card */}
              <div 
                className="relative h-full p-8 rounded-3xl border border-white/10 bg-muted/40 backdrop-blur-xl transition-all duration-300 group-hover:bg-muted/60"
                style={{ 
                    // @ts-expect-error: dynamic styles
                    '--accent-glow': testimonial.accentColor,
                    boxShadow: `0 0 20px -10px ${testimonial.accentColor}33`
                }}
              >
                {/* Decorative Accent Glow */}
                <div 
                  className="absolute -top-px -left-px right-px h-px bg-gradient-to-r from-transparent via-[var(--accent-glow)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <Quote 
                  className="w-10 h-10 mb-6 opacity-20 group-hover:opacity-100 transition-opacity duration-500" 
                  style={{ color: testimonial.accentColor }}
                />
                
                <p className="text-lg md:text-xl leading-relaxed mb-8 italic text-foreground/90">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 shrink-0">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} @ <span className="text-foreground/70">{testimonial.company}</span>
                    </p>
                  </div>
                </div>

                {/* Corner Accent */}
                <div 
                  className="absolute bottom-4 right-4 w-12 h-12 opacity-5 pointer-events-none"
                  style={{ 
                    background: `radial-gradient(circle at bottom right, ${testimonial.accentColor}, transparent 70%)` 
                  }}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Progress Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
                <motion.div 
                    key={i}
                    className="w-2 h-2 rounded-full bg-white/20"
                    style={{ 
                        scale: useTransform(scrollYProgress, [i/5, (i+1)/5], [1, 1.5]),
                        backgroundColor: useTransform(scrollYProgress, [i/5, (i+1)/5], ['rgba(255,255,255,0.2)', '#3b82f6'])
                    }}
                />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
