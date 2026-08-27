import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Project Data
const projectsData = [
  {
    title: "B2B E-Commerce Portal",
    category: "Laravel Full-Stack Development",
    description: "Built a B2B e-commerce portal with customer authentication, product catalogs, enquiries, quotations, order management, customer accounts, and role-based access.",
    tags: ["Laravel", "PHP", "MySQL", "REST API"],
    status: "Featured",
    code: "PROJECT 01"
  },
  {
    title: "SaaS E-Commerce Platform",
    category: "Laravel SaaS Development",
    description: "Developed a scalable SaaS e-commerce platform with business-specific accounts, customer management, product workflows, order processing, and backend administration.",
    tags: ["Laravel", "PHP", "MySQL", "JavaScript"],
    status: "Featured",
    code: "PROJECT 02"
  },
  {
    title: "E-Commerce Customer Portal",
    category: "Laravel Full-Stack Development",
    description: "Developed a complete customer portal with product browsing, product details, customer profiles, enquiries, Buy Now functionality, order management, order status tracking, and backend integration.",
    tags: ["Laravel", "PHP", "MySQL", "REST API"],
    status: "Featured",
    code: "PROJECT 03"
  },
  {
    title: "REST API & Backend Integration",
    category: "Laravel Backend Development",
    description: "Designed and integrated REST APIs for products, customers, enquiries, orders, authentication, and third-party services with structured and scalable backend workflows.",
    tags: ["Laravel", "PHP", "REST API", "MySQL"],
    status: "Featured",
    code: "PROJECT 04"
  },
  {
    title: "WordPress Business Websites",
    category: "WordPress Development",
    description: "Developed responsive WordPress websites based on design requirements using Elementor and custom development, ensuring accurate layouts across desktop, tablet, and mobile devices.",
    tags: ["WordPress", "Elementor", "PHP", "CSS"],
    status: "Featured",
    code: "PROJECT 05"
  },
  {
    title: "Custom WordPress UI & Functionality",
    category: "WordPress Custom Development",
    description: "Built custom UI components, responsive sections, sliders, navigation systems, animations, and interactive functionality beyond standard Elementor and theme capabilities.",
    tags: ["WordPress", "Elementor", "JavaScript", "PHP", "CSS"],
    status: "Featured",
    code: "PROJECT 06"
  },
  {
    title: "Shopify E-Commerce Development",
    category: "Shopify Full-Stack Development",
    description: "Developed and customized Shopify e-commerce functionality across storefront and backend systems, including product flows, customer experiences, checkout-related features, and custom integrations.",
    tags: ["Shopify", "JavaScript", "Liquid", "REST API"],
    status: "Featured",
    code: "PROJECT 07"
  },
  {
    title: "Shopify API & Webhook Automation",
    category: "Shopify Backend Integration",
    description: "Implemented Shopify APIs and webhooks for order creation, order synchronization, product creation and updates, and automated communication between Shopify and backend applications.",
    tags: ["Shopify API", "Webhooks", "Laravel", "REST API"],
    status: "Featured",
    code: "PROJECT 08"
  }
];

const Projects = () => {
  const containerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);
  const mobileCarouselRef = useRef(null);
  const projectCursorDotRef = useRef(null);
  const projectCursorRingRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);

  const handleMobileScroll = (event) => {
    const carousel = event.currentTarget;
    const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    mobileCardsRef.current.forEach((card, index) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - carouselCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    mobileCardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.to(card, {
        scale: index === closestIndex ? 1 : 0.92,
        opacity: index === closestIndex ? 1 : 0.5,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });

    setActiveProject(closestIndex);
  };

  const scrollToProject = (index) => {
    const carousel = mobileCarouselRef.current;
    const card = mobileCardsRef.current[index];
    if (!carousel || !card) return;

    carousel.scrollTo({
      left: card.offsetLeft - (carousel.clientWidth - card.offsetWidth) / 2,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const projectCursorDot = projectCursorDotRef.current;
    const projectCursorRing = projectCursorRingRef.current;
    const projectCards = [...cardsRef.current, ...mobileCardsRef.current].filter(Boolean);

    const xToDot = gsap.quickTo(projectCursorDot, "x", { duration: 0.05, ease: "power2.out" });
    const yToDot = gsap.quickTo(projectCursorDot, "y", { duration: 0.05, ease: "power2.out" });
    const xToRing = gsap.quickTo(projectCursorRing, "x", { duration: 0.15, ease: "power3.out" });
    const yToRing = gsap.quickTo(projectCursorRing, "y", { duration: 0.15, ease: "power3.out" });

    gsap.set([projectCursorDot, projectCursorRing], {
      scale: 0.5,
      opacity: 0,
      transformOrigin: "50% 50%"
    });

    const moveProjectCursor = (event) => {
      xToDot(event.clientX - 6);
      yToDot(event.clientY - 6);
      xToRing(event.clientX - 24);
      yToRing(event.clientY - 24);
    };

    const showProjectCursor = () => {
      gsap.to([projectCursorDot, projectCursorRing], {
        opacity: 1,
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    const hideProjectCursor = () => {
      gsap.to([projectCursorDot, projectCursorRing], {
        opacity: 0,
        scale: 0.5,
        duration: 0.2,
        ease: "power2.inOut"
      });
    };

    projectCards.forEach((card) => {
      card.addEventListener('mouseenter', showProjectCursor);
      card.addEventListener('mousemove', moveProjectCursor);
      card.addEventListener('mouseleave', hideProjectCursor);
    });

    let ctx = gsap.context(() => {
      // Set initial origins (Centered in viewport)
      gsap.set([folderBackRef.current, folderFrontRef.current], { 
        xPercent: -50, 
        yPercent: -50 
      });
      gsap.set(folderFrontRef.current, { transformOrigin: "bottom center" });
      
      const getGridPos = (index) => {
        let row, col;
        if (index < 3) { row = 0; col = index; }
        else if (index === 3) { row = 1; col = 0; }
        else if (index === 4) { row = 1; col = 2; }
        else { row = 2; col = index - 5; }
        return { row, col };
      };

      cardsRef.current.forEach((card) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0,
        });
      });

      let mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        let { isDesktop, isMobile } = context.conditions;

        if (isDesktop) {
          let floatTween;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 50%", 
              end: "bottom 50%",
              toggleActions: "play reverse play reverse",
              onEnter: () => { if (floatTween) floatTween.kill(); },
              onEnterBack: () => { if (floatTween) floatTween.kill(); },
              onLeave: () => { if (floatTween) floatTween.kill(); },
              onLeaveBack: () => { if (floatTween) floatTween.kill(); }
            },
            onComplete: () => {
              floatTween = gsap.to(cardsRef.current, {
                y: "+=12",
                rotation: "+=1",
                duration: 3.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                stagger: { amount: 1.5, from: "random" }
              });
            }
          });

          // 1. Folder opens with smooth rotation
          tl.to(folderFrontRef.current, {
            rotationX: -130,
            duration: 1.2,
            ease: "power3.inOut"
          });

          // 2. Cards rise up collectively
          tl.to(cardsRef.current, {
            y: -140,
            scale: 0.9,
            zIndex: 70,
            duration: 0.6,
            stagger: 0.04,
            ease: "back.out(1.2)"
          }, "-=0.6");

          // 3. Cards spread into a clean project grid layout
          tl.to(cardsRef.current, {
            x: (i) => {
              const w = Math.max(...cardsRef.current.map(c => c?.offsetWidth || 0)) || 360;
              const gap = 40;
              const { col } = getGridPos(i);
              return (col - 1) * (w + gap);
            },
            y: (i) => {
              const h = Math.max(...cardsRef.current.map(c => c?.offsetHeight || 0)) || 240;
              const gap = 40;
              const { row } = getGridPos(i);
              return (row - 1) * (h + gap);
            },
            rotation: () => gsap.utils.random(-3, 3),
            scale: 1,
            duration: 1.4,
            stagger: { amount: 0.4, from: "center" },
            ease: "expo.out"
          }, "-=0.2");
        }

        if (isMobile) {
          const cardW = window.innerWidth * 0.8;
          const gap = 20;
          
          mobileCardsRef.current.forEach((card, i) => {
            gsap.set(card, {
              x: -(i * (cardW + gap)), 
              y: 0,
              scale: 0.4,
              opacity: 0,
              rotation: gsap.utils.random(-15, 15)
            });
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
            }
          });

          tl.to(folderFrontRef.current, {
            rotationX: -130,
            duration: 0.8,
            ease: "power3.inOut"
          });

          tl.to(mobileCardsRef.current, {
            y: -100,
            opacity: 1,
            scale: 0.85,
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out(1.2)"
          }, "-=0.4");

          tl.to(mobileCardsRef.current, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: (i) => i === 0 ? 1 : 0.92,
            opacity: (i) => i === 0 ? 1 : 0.5,
            duration: 0.8,
            stagger: 0.08,
            ease: "expo.out",
            onComplete: () => {
              if (mobileCarouselRef.current) {
                mobileCarouselRef.current.style.overflowX = 'auto';
                mobileCarouselRef.current.style.pointerEvents = 'auto';
              }
            }
          }, "-=0.2");
        }
      });
    }, containerRef);

    return () => {
      projectCards.forEach((card) => {
        card.removeEventListener('mouseenter', showProjectCursor);
        card.removeEventListener('mousemove', moveProjectCursor);
        card.removeEventListener('mouseleave', hideProjectCursor);
      });
      ctx.revert();
    };
  }, []);

  return (
    <section id="projects" ref={containerRef} className="bg-[#0b0b0b] min-h-[100svh] md:min-h-[170vh] relative font-sans overflow-x-clip text-white w-full flex items-center justify-center py-24 md:py-40 select-none">
      
      {/* Background Project Title Watermark */}
      <div className="absolute top-10 left-0 w-full flex items-start justify-center pointer-events-none z-0">
        <h1 className="text-[14vw] sm:text-[17vw] md:text-[20vw] font-black text-white/[0.03] tracking-tighter leading-none whitespace-nowrap uppercase">
          PROJECTS
        </h1>
      </div>

      {/* Ambient Crimson Glow behind folder */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] bg-red-600/15 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Main Perspective Container */}
      <div id="projects-showcase" className="mt-12 relative w-full max-w-7xl h-full flex items-center justify-center perspective-[2000px] z-10">
        
        {/* Origin Container */}
        <div className="relative w-0 h-0 transform-style-3d">
          
          {/* Folder Back */}
          <div 
            ref={folderBackRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video bg-[#141414] rounded-[24px] border border-red-600/40 shadow-[0_20px_50px_rgba(229,9,20,0.25)] flex items-center justify-center"
            style={{ zIndex: 5 }}
          >
            <div className="absolute -top-6 left-6 w-32 h-8 bg-[#1f1f1f] rounded-t-xl border-t border-red-600/30" />
            <div className="relative z-10 text-red-600 font-mono font-black text-2xl tracking-widest uppercase opacity-60">
              PROJECT_ARCHIVE
            </div>
          </div>

          {/* Desktop Project Cards */}
          {projectsData.map((project, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="hidden md:block absolute w-[80vw] md:w-[33vw] max-w-[380px] aspect-[16/10] will-change-transform"
              style={{ zIndex: 10 + i }}
            >
              <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414]/95 backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-all duration-500 group hover:scale-[1.04] hover:border-red-600 hover:shadow-[0_35px_80px_rgba(229,9,20,0.35)] hover:-translate-y-2 relative z-10 p-7 flex flex-col justify-between">
                
                {/* Top Card Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-2.5 py-1 rounded border border-red-600/20">
                    {project.code}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-red-400 font-bold">{project.status}</span>
                    <span className="text-[10px] font-mono border border-white/30 px-1 text-white/70">WEB</span>
                  </div>
                </div>

                {/* Middle Title & Description */}
                <div className="space-y-2 my-auto">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-white/40">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono text-white/70 bg-white/5 px-2 py-0.5 rounded group-hover:border-red-600/30 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Red Glowing Corner Accent */}
                <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-red-600 group-hover:shadow-[0_0_15px_#E50914] transition-all" />
              </div>
            </div>
          ))}

          {/* Folder Front Flap */}
          <div 
            ref={folderFrontRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video pointer-events-none will-change-transform"
            style={{ zIndex: 60 }}
          >
            <div className="absolute bottom-0 w-full h-[85%] bg-[#1c1c1c] rounded-b-[24px] rounded-t-md shadow-[0_-5px_20px_rgba(0,0,0,0.8)] flex flex-col justify-end p-6 border-t border-red-600/40">
              <div className="w-20 h-1.5 bg-white/20 rounded-full mx-auto mb-2" />
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Swipeable Carousel */}
      <div className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-[100]">
        <div 
          ref={mobileCarouselRef}
          onScroll={handleMobileScroll}
          className="w-screen h-auto py-12 flex items-center gap-6 px-[12.5vw] pointer-events-none snap-x snap-mandatory overflow-x-hidden hide-scrollbar touch-pan-x"
        >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        {projectsData.map((project, i) => (
          <div 
            key={`mob-${i}`}
            ref={el => mobileCardsRef.current[i] = el}
            className="shrink-0 w-[78vw] aspect-[16/11] snap-center will-change-transform relative z-10"
          >
            <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414] p-6 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest text-red-500 bg-red-600/10 px-2 py-0.5 rounded">
                  {project.code}
                </span>
                <span className="text-xs font-mono text-red-400 font-bold">{project.status}</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white">{project.title}</h3>
                <p className="text-xs text-white/70 font-light line-clamp-2">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-1 pt-2 border-t border-white/10">
                {project.tags.slice(0, 3).map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono text-white/60 bg-white/5 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        </div>
        <div className="flex items-center justify-center gap-2 -mt-6" aria-label="Project slides">
          {projectsData.map((project, index) => (
            <button
              key={`project-dot-${index}`}
              type="button"
              onClick={() => scrollToProject(index)}
              aria-label={`Show ${project.title}`}
              aria-current={activeProject === index ? 'true' : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeProject === index
                  ? 'w-6 bg-red-600 shadow-[0_0_10px_rgba(229,9,20,0.8)]'
                  : 'w-1.5 bg-white/25'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Project-card-only custom cursor */}
      <div
        ref={projectCursorDotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-3 h-3 bg-red-600 rounded-full shadow-[0_0_15px_#E50914]"
      />
      <div
        ref={projectCursorRingRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-12 h-12 border border-red-600/60 rounded-full backdrop-blur-[1px]"
      />

    </section>
  );
};

export default Projects;
