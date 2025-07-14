import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  const footerSections = [
    {
      title: "Produto",
      links: [
        { name: "Características", href: "#" },
        { name: "Integrações", href: "#" },
        { name: "API", href: "#" },
        { name: "Documentação", href: "#" }
      ]
    },
    {
      title: "Empresa",
      links: [
        { name: "Sobre", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Carreiras", href: "#" },
        { name: "Imprensa", href: "#" }
      ]
    },
    {
      title: "Suporte",
      links: [
        { name: "Central de Ajuda", href: "#" },
        { name: "Contato", href: "#" },
        { name: "Status", href: "#" },
        { name: "Comunidade", href: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold">NeoAgent</span>
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              A plataforma de automação inteligente que transforma a maneira 
              como sua empresa gerencia processos e fluxos de trabalho.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/60 text-sm">
              © 2024 NeoAgent. Todos os direitos reservados.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Privacidade
              </a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Termos
              </a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};