import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";
import { GoogleGenAI } from "@google/genai";
import { Video, Upload, Play, RefreshCw, Download, Film, Sparkles } from "lucide-react";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function VideoGen() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateVideo = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      let operation = await ai.models.generateVideos({
        model: "veo-3.1-fast-generate-preview",
        prompt: prompt,
        image: selectedImage ? {
          imageBytes: selectedImage.split(",")[1],
          mimeType: "image/png"
        } : undefined,
        config: {
          numberOfVideos: 1,
          resolution: "1080p",
          aspectRatio: "16:9"
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(downloadLink, {
          method: "GET",
          headers: {
            "x-goog-api-key": process.env.GEMINI_API_KEY || "",
          },
        });
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      }
    } catch (error) {
      console.error("Video Gen Error:", error);
      alert("Failed to generate video. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="video" className="py-24 bg-black text-white min-h-screen flex flex-col items-center">
      <div className="max-w-6xl w-full px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10"
          >
            <Film className="text-white w-8 h-8" />
          </motion.div>
          <h2 className="text-white font-serif text-4xl uppercase tracking-widest mb-4 italic">Cinematic Motion</h2>
          <p className="text-white/40 font-sans text-sm tracking-widest uppercase">Animate your visions with Veo</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Controls */}
          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">Reference Image (Optional)</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-video border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-white/30 transition-all overflow-hidden relative group"
                >
                  {selectedImage ? (
                    <>
                      <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <RefreshCw className="w-8 h-8 text-white" />
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-white/20 mb-4" />
                      <span className="text-xs text-white/40 uppercase tracking-widest">Upload Starting Frame</span>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">Motion Prompt</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the motion: 'The waves of Lake Baikal gently lapping against the shore, with the lighthouse beam sweeping across the water...'"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-all min-h-[120px] resize-none"
                />
              </div>

              <button 
                onClick={generateVideo}
                disabled={isGenerating || !prompt.trim()}
                className="w-full bg-white text-black py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-white/90 transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
                <span className="text-sm uppercase font-bold tracking-widest">
                  {isGenerating ? "Animating..." : "Generate Motion"}
                </span>
              </button>
            </div>
          </div>

          {/* Result */}
          <div className="relative aspect-video bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {videoUrl ? (
                <motion.div 
                  key="video"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full relative group"
                >
                  <video 
                    src={videoUrl} 
                    controls 
                    autoPlay 
                    loop 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a 
                      href={videoUrl} 
                      download="baikal-motion.mp4"
                      className="p-3 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-black transition-colors"
                    >
                      <Download className="w-5 h-5" />
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center text-white/10"
                >
                  <Video className="w-20 h-20 mb-4 stroke-[1px]" />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Awaiting Cinematic Sequence</span>
                </motion.div>
              )}
            </AnimatePresence>

            {isGenerating && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-10 text-center px-12">
                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-6" />
                <div className="space-y-2">
                  <h3 className="text-lg font-serif italic">Synthesizing Temporal Frames</h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">This may take a few minutes. Perfection requires time.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
