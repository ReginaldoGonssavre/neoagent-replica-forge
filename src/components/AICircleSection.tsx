
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const AICircleSection = () => {
  const aiLayers = [
    {
      name: "Generative AI",
      items: ["Agents", "BigGAN", "Hallucination", "QLaRA", "Transfer Learning", "LLM", "GPT", "GANs"],
      color: "text-purple-400"
    },
    {
      name: "Deep Learning", 
      items: ["Generative Adversarial Networks (GAN)", "Recurrent Neural Networks (RNN)", "Autoencoders", "Epochs"],
      color: "text-cyan-400"
    },
    {
      name: "Neural Networks",
      items: ["Hopfield Networks", "Boltzmann Machine", "Multilayer Perceptrons", "Modular Neural Networks", "Reinforcement Learning"],
      color: "text-blue-400"
    },
    {
      name: "Machine Learning",
      items: ["K-Nearest Neighbors", "Principal Component Analysis (PCA)", "Anomaly Detection", "Random Forest", "K-Means Clustering"],
      color: "text-green-400"
    },
    {
      name: "Artificial Intelligence",
      items: ["Natural Language Processing (NLP)", "Speech Recognition", "Automated Programming", "Knowledge Representation", "Planning and Scheduling"],
      color: "text-teal-400"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            IA É MAIS QUE{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              CHATGPT
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore o ecossistema completo da inteligência artificial, desde machine learning básico até agentes generativos avançados
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Central AI Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">AI</span>
            </div>
          </div>

          {/* Concentric Circles */}
          <div className="space-y-8">
            {aiLayers.map((layer, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm p-6 hover:bg-white/20 transition-all">
                <div className="text-center mb-4">
                  <h3 className={`text-xl font-bold ${layer.color}`}>{layer.name}</h3>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {layer.items.map((item, itemIndex) => (
                    <Badge 
                      key={itemIndex} 
                      variant="outline" 
                      className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-white/10 rounded-full px-6 py-3 backdrop-blur-sm">
            <span className="text-cyan-400 font-semibold">🤖 Tecnologias Avançadas</span>
            <span className="text-gray-300">Além do conversacional tradicional</span>
          </div>
        </div>
      </div>
    </section>
  );
};
