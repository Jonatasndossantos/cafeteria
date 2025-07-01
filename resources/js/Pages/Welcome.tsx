import React, { useState, useEffect, useRef } from 'react';

import { Menu, X, Instagram, Facebook, Youtube, Coffee, Users, Gift, ShoppingBag, Cake, BookOpen, Home, Leaf, Sandwich } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}
import cafe from '@/Pages/media/cafe.jpg';
import camomila from '@/Pages/media/camomila.jpg';
import chescake from '@/Pages/media/chescake.jpg';
import sanduiche from '@/Pages/media/sanduiche.jpg';
import imagem from '@/Pages/media/espresso-damore.png'
import exterior1 from '@/Pages/media/exterior1.jpeg';
import exterior2 from '@/Pages/media/exterior2.jpeg';
import exterior3 from '@/Pages/media/exterior3.jpeg';
import exterior4 from '@/Pages/media/exterior4.jpeg';
import interior1 from '@/Pages/media/interior1.jpeg';
import interior2 from '@/Pages/media/interior2.jpeg';
import interior3 from '@/Pages/media/interior3.jpeg';
import interior4 from '@/Pages/media/interior4.jpeg';

const NAV_LINKS: NavLink[] = [
  { label: 'Login', href: '/login', external: false },
];

const PRODUCT_CARDS = [
  { title: 'Cafés', img: cafe, icon: Coffee },
  { title: 'Chás', img: camomila, icon: Leaf },
  { title: 'Salgados', img: sanduiche, icon: Sandwich },
  { title: 'Doces', img: chescake, icon: Cake },
];

const SOCIALS = [
  { icon: Instagram },
  { icon: Facebook },
  { icon: Youtube },
];

// Hook para animações de scroll com Intersection Observer
const useScrollAnimation = (threshold = 0.1, rootMargin = '0px 0px -50px 0px') => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
};

// Componente para animações de entrada
const AnimatedSection = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.1, '0px 0px -100px 0px');

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Componente para animações de entrada com slide
const SlideInSection = ({ children, direction = 'left', className = '', delay = 0 }: {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  className?: string;
  delay?: number;
}) => {
  const { ref, isVisible } = useScrollAnimation(0.1, '0px 0px -100px 0px');

  const getTransform = () => {
    switch (direction) {
      case 'left': return 'translate-x-0';
      case 'right': return 'translate-x-0';
      case 'up': return 'translate-y-0';
      case 'down': return 'translate-y-0';
      default: return 'translate-x-0';
    }
  };

  const getInitialTransform = () => {
    switch (direction) {
      case 'left': return '-translate-x-20';
      case 'right': return 'translate-x-20';
      case 'up': return '-translate-y-20';
      case 'down': return 'translate-y-20';
      default: return '-translate-x-20';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? `opacity-100 ${getTransform()}`
          : `opacity-0 ${getInitialTransform()}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function Welcome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efeito de scroll para o header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll para links internos
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f6f2] font-sans scroll-smooth">
      {/* Header com efeito de scroll */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'shadow-lg backdrop-blur-md bg-white/95'
          : 'shadow-sm backdrop-blur-md bg-white/90'
      }`}>
        <div className="flex justify-between items-center px-4 mx-auto max-w-7xl h-20 sm:px-8">
          <Link href="/" className="flex gap-2 items-center group" aria-label="Home">
            <img src={imagem} alt="Logo Espresso D'Amore" className="w-12 h-12 rounded-full bg-[#f8f6f2] p-1 transition-transform duration-300 group-hover:scale-110" />
            <span className="font-serif text-2xl font-bold text-[#4E1F14] transition-colors duration-300 group-hover:text-[#D09290]">D'Amore</span>
          </Link>
          <nav className="hidden gap-8 items-center md:flex">
            {NAV_LINKS.map((link, index) => (
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4E1F14] hover:text-[#D09290] font-medium transition-all duration-300 relative group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D09290] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[#4E1F14] hover:text-[#D09290] font-medium transition-all duration-300 relative group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D09290] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )
            ))}
          </nav>
          <button
            className="md:hidden p-2 transition-all duration-300 hover:bg-[#D09290]/10 rounded-lg"
            aria-label="Abrir menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-7 h-7 text-[#4E1F14] transition-transform duration-300 hover:rotate-90" />
          </button>
        </div>
        {/* Mobile menu com animação */}
        {mobileMenuOpen && (
          <div className="flex fixed inset-0 z-50 flex-col bg-black/60 animate-fadeIn">
            <div className="flex flex-col gap-6 p-6 bg-white shadow-md animate-slideInRight">
              <div className="flex justify-between items-center">
                <Link href="/" className="flex gap-2 items-center group" aria-label="Home">
                  <img src={imagem} alt="Logo Espresso D'Amore" className="w-12 h-12 rounded-full bg-[#f8f6f2] p-1 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-serif text-2xl font-bold text-[#4E1F14] transition-colors duration-300 group-hover:text-[#D09290]">D'Amore</span>
                </Link>
                <button
                  className="p-2 transition-all duration-300 hover:bg-[#D09290]/10 rounded-lg"
                  aria-label="Fechar menu"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="w-7 h-7 text-[#4E1F14] transition-transform duration-300 hover:rotate-90" />
                </button>
              </div>
              <nav className="flex flex-col gap-4">
                {NAV_LINKS.map((link, index) => (
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4E1F14] hover:text-[#D09290] font-medium text-lg transition-all duration-300 transform hover:translate-x-2"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-[#4E1F14] hover:text-[#D09290] font-medium text-lg transition-all duration-300 transform hover:translate-x-2"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {link.label}
                    </Link>
                  )
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero Banner com parallax */}
      <section className="relative flex items-center justify-center min-h-[60vh] pt-24 pb-16 bg-[#f8f6f2] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
            alt="Cafeteria Banner"
            className="w-full h-full object-cover object-center opacity-60 transform scale-110 transition-transform duration-[20s] hover:scale-100"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f6f2]/80 to-[#4E1F14]/60" />
        <div className="relative z-10 mx-auto max-w-2xl text-center animate-fadeInUp">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#4E1F14] drop-shadow-lg mb-6 animate-slideInDown">
            Uma experiência única em cafeteria
          </h1>
          <p className="text-xl md:text-2xl text-[#4E1F14] mb-8 font-medium animate-slideInUp" style={{ animationDelay: '300ms' }}>
            Bebidas, doces, pães e momentos especiais. Sinta o aroma, prove o sabor, viva D'Amore.
          </p>
       
        </div>
      </section>

      {/* Produtos/Serviços com animação de entrada baseada no scroll */}
      <section className="py-16 bg-[#f8f6f2]">
        <div className="px-4 mx-auto max-w-7xl sm:px-8">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-[#4E1F14] mb-12">Nossos destaques</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 justify-center max-w-4xl mx-auto">
            {PRODUCT_CARDS.map((card, index) => (
              <AnimatedSection key={card.title} delay={index * 200}>
                <div
                  className="flex overflow-hidden flex-col items-center text-center bg-white rounded-2xl shadow-lg transition-all duration-500 transform group hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className="w-full h-48 bg-[#f8f6f2] flex items-center justify-center overflow-hidden">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col flex-1 justify-between p-6">
                    <div className="flex flex-col gap-2 items-center">
                      <card.icon className="w-8 h-8 text-[#D09290] mb-2 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
                      <h3 className="font-serif text-xl font-bold text-[#4E1F14] transition-colors duration-300 group-hover:text-[#D09290]">{card.title}</h3>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Experiência com efeito de entrada baseado no scroll */}
      <section className="py-20 bg-[#4E1F14] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4E1F14] via-[#4E1F14]/90 to-[#4E1F14] animate-pulse"></div>
        <div className="relative z-10 px-4 mx-auto max-w-3xl">
          <AnimatedSection>
            <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl">Uma experiência única</h2>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="mb-8 text-lg md:text-xl">
              Somos referência de cafeteria inovadora! Nossas unidades possuem um espaço com alto potencial de compartilhamento e a experiência presencial é incrível. Venha nos visitar e surpreenda-se!
            </p>
          </AnimatedSection>
         
        </div>
      </section>

      {/* Galeria da Cafeteria com animação de entrada baseada no scroll */}
      <section className="py-20 bg-[#f8f6f2]">
        <div className="px-4 mx-auto max-w-7xl sm:px-8">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-[#4E1F14] mb-12">Nossa Cafeteria</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <SlideInSection direction="left">
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-bold text-[#4E1F14] text-center">Interior</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[interior1, interior2, interior3, interior4].map((img, index) => (
                    <AnimatedSection key={index} delay={index * 150}>
                      <div className="overflow-hidden rounded-2xl shadow-lg transition-all duration-500 transform hover:scale-105">
                        <img
                          src={img}
                          alt={`Interior da cafeteria - vista ${index + 1}`}
                          className="object-cover w-full h-64 transition-transform duration-700 hover:scale-110"
                        />
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </SlideInSection>
            <SlideInSection direction="right">
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-bold text-[#4E1F14] text-center">Exterior</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[exterior1, exterior2, exterior3, exterior4].map((img, index) => (
                    <AnimatedSection key={index} delay={index * 150}>
                      <div className="overflow-hidden rounded-2xl shadow-lg transition-all duration-500 transform hover:scale-105">
                        <img
                          src={img}
                          alt={`Exterior da cafeteria - vista ${index + 1}`}
                          className="object-cover w-full h-64 transition-transform duration-700 hover:scale-110"
                        />
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </SlideInSection>
          </div>
        </div>
      </section>

  

      {/* Rodapé com animação baseada no scroll */}
      <footer className="bg-[#4E1F14] text-white py-12 mt-auto">
        <div className="flex flex-col gap-8 justify-between items-center px-4 mx-auto max-w-7xl sm:px-8 md:flex-row">
          <div className="flex gap-2 items-center group">
            <img src={imagem} alt="Logo Espresso D'Amore" className="w-10 h-10 rounded-full bg-[#f8f6f2] p-1 transition-transform duration-300 group-hover:scale-110" />
            <span className="font-serif text-xl font-bold transition-colors duration-300 group-hover:text-[#D09290]">D'Amore</span>
          </div>
         
          <div className="flex gap-4">
            {SOCIALS.map(({ icon: Icon }, index) => (
              <a
                key={index}
                href="#"
                aria-label="Social media"
                className="hover:text-[#D09290] transition-all duration-300 transform hover:scale-125 hover:rotate-12"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-white">
          © {new Date().getFullYear()} D'Amore — Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
