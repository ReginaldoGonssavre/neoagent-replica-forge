import { Card } from "@/components/ui/card";

export const Stats = () => {
  const stats = [
    {
      value: "87%",
      label: "Redução do tempo de criação",
      description: "Processos automatizados em minutos, não horas"
    },
    {
      value: "R$ 150k+",
      label: "Economia Anual",
      description: "Eliminação de processos manuais desnecessários"
    },
    {
      value: "70%",
      label: "Redução de erros",
      description: "Processos automatizados e padronizados"
    },
    {
      value: "300+",
      label: "Horas economizadas mensalmente",
      description: "Por meio de fluxos de trabalho inteligentes"
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            ROI real de empresas como a sua
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Veja o impacto mensurável que nossa plataforma proporcionou para empresas como a sua
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="p-8 text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0"
            >
              <div className="text-5xl md:text-6xl font-bold text-primary mb-4 animate-fade-in">
                {stat.value}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {stat.label}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {stat.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-primary/10 rounded-full px-6 py-3">
            <span className="text-primary font-semibold">📊 Estudos de caso</span>
            <span className="text-muted-foreground">Veja as histórias completas por trás desses resultados</span>
          </div>
        </div>
      </div>
    </section>
  );
};