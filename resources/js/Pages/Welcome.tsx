import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Instagram, Facebook, Youtube, Coffee, Users, Gift, ShoppingBag, Cake, BookOpen, Home } from 'lucide-react';
import { Link } from '@inertiajs/react';

const NAV_LINKS = [
  { label: 'Conheça', href: '/experiencia-unica' },
  { label: 'Cardápio', href: '/cardapio-digital' },
  { label: 'Eventos', href: '/eventos' },
  { label: 'Bolos', href: '/bolos-especiais' },
  { label: 'Shop', href: 'https://shop.wecoffee.com.br', external: true },
  { label: 'Gift Card', href: '/gift-card' },
  { label: 'Contato', href: '/contato' },
];

const PRODUCT_CARDS = [
  { title: 'Bebidas', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80', href: '/cardapio-digital', icon: Coffee },
  { title: 'Doces', img: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80', href: '/cardapio-digital', icon: Cake },
  { title: 'Pães', img: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80', href: '/cardapio-digital', icon: BookOpen },
  { title: 'Eventos', img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80', href: '/eventos', icon: Users },
  { title: 'Gift Card', img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80', href: '/gift-card', icon: Gift },
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
          ? 'bg-white/95 shadow-lg backdrop-blur-md' 
          : 'bg-white/90 shadow-sm backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group" aria-label="Home">
            <img src="/logo-wecoffee.png" alt="Logo We Coffee" className="h-10 w-auto transition-transform duration-300 group-hover:scale-110" />
            <span className="font-serif text-2xl font-bold text-[#4E1F14] transition-colors duration-300 group-hover:text-[#D09290]">D'Amore</span>
          </Link>
          <nav className="hidden md:flex gap-8 items-center">
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
          <div className="fixed inset-0 z-50 bg-black/60 flex flex-col animate-fadeIn">
            <div className="bg-white shadow-md p-6 flex flex-col gap-6 animate-slideInRight">
              <div className="flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 group" aria-label="Home">
                  <img src="/logo-wecoffee.png" alt="Logo We Coffee" className="h-10 w-auto transition-transform duration-300 group-hover:scale-110" />
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
        <div className="relative z-10 text-center max-w-2xl mx-auto animate-fadeInUp">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#4E1F14] drop-shadow-lg mb-6 animate-slideInDown">
            Uma experiência única em cafeteria
          </h1>
          <p className="text-xl md:text-2xl text-[#4E1F14] mb-8 font-medium animate-slideInUp" style={{ animationDelay: '300ms' }}>
            Bebidas, doces, pães e momentos especiais. Sinta o aroma, prove o sabor, viva o We Coffee.
          </p>
          <a 
            href="/cardapio-digital" 
            className="inline-block px-8 py-4 rounded-full bg-[#D09290] text-white font-bold text-lg shadow-lg hover:bg-[#4E1F14] transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-bounceIn"
            style={{ animationDelay: '600ms' }}
          >
            Ver cardápio
          </a>
        </div>
      </section>

      {/* Produtos/Serviços com animação de entrada baseada no scroll */}
      <section className="py-16 bg-[#f8f6f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-[#4E1F14] mb-12">Nossos destaques</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {PRODUCT_CARDS.map((card, index) => (
              <AnimatedSection key={card.title} delay={index * 200}>
                <a 
                  href={card.href} 
                  className="group rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center transform hover:-translate-y-2"
                >
                  <div className="w-full h-48 bg-[#f8f6f2] flex items-center justify-center overflow-hidden">
                    <img 
                      src={card.img} 
                      alt={card.title} 
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="flex flex-col items-center gap-2">
                      <card.icon className="w-8 h-8 text-[#D09290] mb-2 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
                      <h3 className="font-serif text-xl font-bold text-[#4E1F14] transition-colors duration-300 group-hover:text-[#D09290]">{card.title}</h3>
                    </div>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Experiência com efeito de entrada baseado no scroll */}
      <section className="py-20 bg-[#4E1F14] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4E1F14] via-[#4E1F14]/90 to-[#4E1F14] animate-pulse"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Uma experiência única</h2>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="text-lg md:text-xl mb-8">
              Somos referência de cafeteria inovadora! Nossas unidades possuem um espaço com alto potencial de compartilhamento e a experiência presencial é incrível. Venha nos visitar e surpreenda-se!
            </p>
          </AnimatedSection>
          <AnimatedSection delay={400}>
            <a 
              href="/experiencia-unica" 
              className="inline-block px-8 py-4 rounded-full bg-[#D09290] text-white font-bold text-lg shadow-lg hover:bg-white hover:text-[#4E1F14] transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Conheça
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Galeria da Cafeteria com animação de entrada baseada no scroll */}
      <section className="py-20 bg-[#f8f6f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-[#4E1F14] mb-12">Nossa Cafeteria</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SlideInSection direction="left">
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-bold text-[#4E1F14] text-center">Interior</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((item, index) => (
                    <AnimatedSection key={item} delay={index * 150}>
                      <div className="rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-500">
                        <img 
                          src={`https://images.unsplash.com/photo-${1554118811 + item}?auto=format&fit=crop&w=600&q=80`}
                          alt={`Interior da cafeteria - vista ${item}`} 
                          className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((item, index) => (
                    <AnimatedSection key={item} delay={index * 150}>
                      <div className="rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-500">
                        <img 
                          src={`https://images.unsplash.com/photo-${1445116572 + item}?auto=format&fit=crop&w=600&q=80`}
                          alt={`Exterior da cafeteria - vista ${item}`} 
                          className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
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

      {/* Equipe com animação baseada no scroll */}
      <section className="py-20 bg-[#f8f6f2] text-center">
        <div className="max-w-3xl mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4E1F14] mb-6">Faça parte da nossa equipe</h2>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="text-lg md:text-xl mb-8 text-[#4E1F14]">
              Acreditamos que pessoas fazem a diferença! Venha fazer parte do nosso time. Todos os talentos são bem-vindos aqui, queremos te conhecer.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={400}>
            <a 
              href="/contato" 
              className="inline-block px-8 py-4 rounded-full bg-[#D09290] text-white font-bold text-lg shadow-lg hover:bg-[#4E1F14] transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Junte-se a nós
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Rodapé com animação baseada no scroll */}
      <footer className="bg-[#4E1F14] text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <AnimatedSection>
            <div className="flex items-center gap-2 group">
              <img src="/logo-wecoffee.png" alt="Logo We Coffee" className="h-8 w-auto transition-transform duration-300 group-hover:scale-110" />
              <span className="font-serif text-xl font-bold transition-colors duration-300 group-hover:text-[#D09290]">D'Amore</span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <nav className="flex gap-6 flex-wrap justify-center">
              {NAV_LINKS.map((link, index) => (
                link.external ? (
                  <a 
                    key={link.label} 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-[#D09290] transition-all duration-300 transform hover:scale-110"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    className="hover:text-[#D09290] transition-all duration-300 transform hover:scale-110"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </nav>
          </AnimatedSection>
          <AnimatedSection delay={400}>
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
          </AnimatedSection>
        </div>
        <AnimatedSection delay={600}>
          <div className="mt-8 text-center text-sm text-[#D09290]">
            © {new Date().getFullYear()} D'Amore — Todos os direitos reservados.
          </div>
        </AnimatedSection>
      </footer>
    </div>
  );
}
