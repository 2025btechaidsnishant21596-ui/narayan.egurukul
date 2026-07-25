import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ThumbsUp, 
  ThumbsDown,
  MessageSquare
} from 'lucide-react';
import { ChatMessage } from '../types';

export const AIGuruChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! I am **AI Guru**, your virtual academic mentor. 🎓 I am here to help you navigate study materials, batches, admissions, and more at Narayan e-Gurukul. What are you looking to excel in today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'Explore B.Tech Notes',
        'When is B.Tech 1st Year Toolkit launching?',
        'Sanfort Pre-School Inquiry',
        'Tell me about CSE AIML'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Call server AI endpoint or intelligent client-side matching engine
    setTimeout(async () => {
      let replyText = "";
      let nextSuggestions: string[] = [];

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: queryText })
        });
        if (res.ok) {
          const data = await res.json();
          replyText = data.response;
          nextSuggestions = data.suggestions || [];
        } else {
          throw new Error('Fallback required');
        }
      } catch (e) {
        // Fallback responses
        const q = queryText.toLowerCase();
        if (q.includes('launch') || q.includes('when') || q.includes('date')) {
          replyText = "The **B.Tech 1st Year Complete Toolkit** is launching in **Mid-August**! 🚀 It will feature hand-written notes, 10+ years solved papers, viva guides, and step-by-step experiment instructions.";
          nextSuggestions = ["Explore Free Notes", "Tell me about CSE AIML", "Sanfort Pre-School"];
        } else if (q.includes('note') || q.includes('pyq') || q.includes('study') || q.includes('b.tech')) {
          replyText = "We offer **100% Free** academic resources including hand-written notes, solved Previous Year Questions (PYQs) for core streams, viva banks, and visual maps!";
          nextSuggestions = ["View B.Tech Core", "View CSE AIDS", "View CSE AIML"];
        } else if (q.includes('school') || q.includes('sanfort') || q.includes('admission')) {
          replyText = "Sanfort Pre-School (Hanumangarh) offers Play Group, Nursery, LKG, and UKG programs with a U.K. EYFS curriculum. Inquiries submitted sync directly to our system!";
          nextSuggestions = ["Go to My School", "Submit Admission Inquiry"];
        } else {
          replyText = `Thank you for your question about **"${queryText}"**! 💡 As **AI Guru**, I recommend exploring our B.Tech Specializations (CSE AIML, CSE AIDS) or checking out our upcoming B.Tech 1st Year Academic Toolkit launching in Mid-August.`;
          nextSuggestions = ["Explore B.Tech Notes", "Sanfort Admission", "Contact Support"];
        }
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: nextSuggestions
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[1500] w-12 h-12 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all border border-zinc-700 group"
        title="Chat with AI Guru"
      >
        <Bot className="w-5 h-5 text-zinc-100 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
      </button>

      {/* Floating Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-22 right-6 z-[1500] w-full max-w-sm sm:max-w-md bg-white border border-zinc-200 shadow-xl rounded-2xl overflow-hidden flex flex-col h-[500px] animate-slideUp">
          {/* Header */}
          <div className="p-3.5 bg-zinc-900 text-white flex items-center justify-between border-b border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-zinc-800 border border-zinc-700/80 rounded-lg flex items-center justify-center text-zinc-100">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1">
                  AI Guru
                  <Sparkles className="w-3 h-3 text-zinc-300" />
                </h4>
                <p className="text-[10px] text-zinc-400 font-normal">
                  Academic Assistant • Online
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-zinc-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <div
                  className={`p-3 rounded-xl text-xs leading-relaxed font-normal ${
                    msg.sender === 'user'
                      ? 'bg-zinc-900 text-white rounded-br-none shadow-2xs'
                      : 'bg-white border border-zinc-200 text-zinc-900 rounded-bl-none shadow-2xs'
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: msg.text
                      .replace(/\n/g, '<br/>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  }}
                />
                <span className="text-[9px] text-zinc-400 mt-1 font-medium px-1">
                  {msg.timestamp}
                </span>

                {/* Suggestions Chips */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(sug)}
                        className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium text-[10px] rounded-lg border border-zinc-200 transition-colors"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="mr-auto p-3 bg-white border border-zinc-200 rounded-xl text-xs text-zinc-500 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full animate-ping" />
                AI Guru is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-zinc-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask AI Guru a question..."
              className="flex-1 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-900 outline-none focus:border-zinc-900 focus:bg-white transition-all"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg transition-all shrink-0 shadow-2xs"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
