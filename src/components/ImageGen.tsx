import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { ImageIcon, Sparkles, Download, RefreshCw, Wand2 } from "lucide-react";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function ImageGen() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-image-preview",
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K"
          }
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          setGeneratedImage(`data:image/png;base64,${base64Data}`);
          break;
        }
      }
    } catch (error) {
      console.error("Image Gen Error:", error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-white text-black min-h-screen flex flex-col items-center">
      <div className="max-w-6xl w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Control Panel */}
        <div className="flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl font-serif italic">02</span>
              <div className="h-px bg-black flex-1" />
            </div>
            <h2 className="text-7xl font-serif uppercase leading-none tracking-tighter mb-6">
              Visual<br />
              <span className="italic font-light">Imagination</span>
            </h2>
            <p className="text-black/60 text-sm tracking-widest uppercase max-w-md">
              Use AI to visualize your Baikal dreams. From frozen waves to summer sunsets, describe it and see it.
            </p>
          </motion.div>

          <div className="space-y-6">
            <div className="relative">
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe a scene: 'A crystal clear ice cave on Lake Baikal with golden sunset light filtering through...'"
                className="w-full bg-black/5 border-2 border-black p-6 text-lg font-serif placeholder:text-black/20 focus:outline-none focus:bg-white transition-all min-h-[150px] resize-none"
              />
              <div className="absolute bottom-4 right-4 flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-black/40">
                <Sparkles className="w-3 h-3" />
                Powered by Gemini 3.1
              </div>
            </div>

            <button 
              onClick={generateImage}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-black text-white py-6 flex items-center justify-center gap-4 hover:bg-black/90 transition-all disabled:opacity-50 group"
            >
              {isGenerating ? (
                <RefreshCw className="w-6 h-6 animate-spin" />
              ) : (
                <Wand2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              )}
              <span className="text-xl uppercase font-serif tracking-widest">
                {isGenerating ? "Visualizing..." : "Generate Vision"}
              </span>
            </button>
          </div>
        </div>

        {/* Display Area */}
        <div className="relative aspect-square bg-black/5 border-2 border-black flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {generatedImage ? (
              <motion.div 
                key="image"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full h-full relative group"
              >
                <img 
                  src={generatedImage} 
                  alt="Generated Vision" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                  <a 
                    href={generatedImage} 
                    download="baikal-vision.png"
                    className="p-4 bg-white rounded-full text-black hover:scale-110 transition-transform"
                  >
                    <Download className="w-6 h-6" />
                  </a>
                  <button 
                    onClick={() => setGeneratedImage(null)}
                    className="p-4 bg-white rounded-full text-black hover:scale-110 transition-transform"
                  >
                    <RefreshCw className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center text-black/20"
              >
                <ImageIcon className="w-24 h-24 mb-6 stroke-[1px]" />
                <span className="text-xs uppercase tracking-[0.3em] font-bold">Awaiting Inspiration</span>
              </motion.div>
            )}
          </AnimatePresence>

          {isGenerating && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
              <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mb-4" />
              <span className="text-xs uppercase tracking-widest font-bold animate-pulse">Processing Neural Pathways</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
