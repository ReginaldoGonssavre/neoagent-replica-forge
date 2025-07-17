
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  Bot,
  Zap,
  Shield,
  Award,
  Globe,
  Users,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();

  const productLinks = [
    { name: "Agente IA", href: "/ai-agent" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "API Documentation", href: "/docs" },
    { name: "Integrações", href: "/integrations" },
    { name: "Automação", href: "/automation" },
    { name: "Analytics", href: "/analytics" }
  ];

  const companyLinks = [
    { name: "Sobre Nós", href: "/about" },
    { name: "Carreiras", href: "/careers" },
    { name: "Imprensa", href: "/press" },
    { name: "Investidores", href: "/investors" },
    { name: "Parceiros", href: "/partners" },
    { name: "Blog", href: "/blog" }
  ];

  const resourcesLinks = [
    { name: "Central de Ajuda", href: "/help" },
    { name: "Comunidade", href: "/community" },
    { name: "Webinars", href: "/webinars" },
    { name: "Estudos de Caso", href: "/case-studies" },
    { name: "Whitepapers", href: "/whitepapers" },
    { name: "Status do Sistema", href: "/status" }
  ];

  const legalLinks = [
    { name: "Termos de Uso", href: "/terms" },
    { name: "Política de Privacidade", href: "/privacy" },
    { name: "LGPD", href: "/lgpd" },
    { name: "Cookies", href: "/cookies" },
    { name: "SLA", href: "/sla" },
    { name: "Compliance", href: "/compliance" }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/company/ravian-quantumai", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/ravianquantumai", label: "Twitter" },
    { icon: Facebook, href: "https://facebook.com/ravianquantumai", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/ravianquantumai", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com/@ravianquantumai", label: "YouTube" }
  ];

  const features = [
    { icon: Bot, text: "IA Conversacional Avançada" },
    { icon: Shield, text: "Segurança Militar" },
    { icon: Zap, text: "Implementação em 5min" },
    { icon: Award, text: "99.9% Uptime SLA" }
  ];

  return (
    <footer className="bg-primary text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/20">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2 bg-white/20 text-white border-white/30">
              Newsletter Exclusiva
            </Badge>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Fique por dentro das inovações em IA
            </h3>
            
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Receba insights exclusivos, casos de uso avançados e as últimas atualizações 
              da plataforma diretamente no seu email.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Seu melhor email profissional"
                className="flex-1 bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:bg-white/20"
              />
              <Button 
                className="bg-white text-primary hover:bg-white/90 font-semibold px-6"
              >
                <Mail className="w-4 h-4 mr-2" />
                Inscrever
              </Button>
            </div>
            
            <p className="text-sm text-white/60 mt-4">
              15.000+ executivos já recebem • Sem spam garantido • Cancele quando quiser
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Ravian QuantumAI</h3>
                <p className="text-sm text-white/70">Inteligência Artificial Empresarial</p>
              </div>
            </div>
            
            <p className="text-white/80 mb-8 leading-relaxed">
              Líder global em soluções de IA empresarial, transformando processos 
              de negócios através de automação inteligente e tecnologia quântica real.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <feature.icon className="w-5 h-5 text-white/70" />
                  <span className="text-sm text-white/80">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white/70" />
                <span className="text-white/80">+55 11 3021-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white/70" />
                <span className="text-white/80">contato@ravianquantumai.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-white/70" />
                <span className="text-white/80">São Paulo, SP • Miami, FL • Londres, UK</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Produto</h4>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.href)}
                    className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    {link.name}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Recursos</h4>
            <ul className="space-y-3">
              {resourcesLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.href)}
                    className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Empresa</h4>
            <ul className="space-y-3 mb-8">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.href)}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold mb-6">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.href)}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Separator className="bg-white/20" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-white/70 text-sm">
              © 2024 Ravian QuantumAI. Todos os direitos reservados.
            </p>
            <p className="text-white/50 text-xs mt-1">
              CNPJ: 12.345.678/0001-90 • Razão Social: Ravian Tecnologia Ltda
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors group"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>

          {/* Certifications */}
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-white/10 text-white/80 border-white/20 text-xs">
              ISO 27001
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white/80 border-white/20 text-xs">
              SOC 2
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white/80 border-white/20 text-xs">
              LGPD
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  );
};
