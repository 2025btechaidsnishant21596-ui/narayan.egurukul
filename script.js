document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const spans = menuToggle ? menuToggle.querySelectorAll('span') : [];

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            if (navLinks) navLinks.classList.toggle('active');

            // Animate Hamburger (Sync with CSS)
            const isActive = menuToggle.classList.contains('active');
            if (spans.length >= 3) {
                if (isActive) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (menuToggle && menuToggle.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    if (navLinks) navLinks.classList.remove('active');
                    if (spans.length >= 3) {
                        spans[0].style.transform = 'none';
                        spans[1].style.opacity = '1';
                        spans[2].style.transform = 'none';
                    }
                }

                const offset = 80; // Navbar height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update active link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Filter logic for Study Material page
    const filterBtn = document.getElementById('filterBtn');
    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            const branch = document.getElementById('branchFilter').value;
            const cards = document.querySelectorAll('.branch-card');
            let visible = 0;
            cards.forEach(c => {
                const show = branch === 'all' || c.dataset.branch === branch;
                c.style.display = show ? '' : 'none';
                if (show) visible++;
            });

            const filterCount = document.getElementById('filterCount');
            const branchCount = document.getElementById('branchCount');
            if (filterCount) filterCount.textContent = `Showing ${visible} branch${visible !== 1 ? 'es' : ''}`;
            if (branchCount) branchCount.textContent = `${visible} branch${visible !== 1 ? 'es' : ''} available`;
        });
    }

    // Apply observer to all reveal elements
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // ==========================================================================
    // 🤖 AI GURU PREMIUM CHATBOX CONTROLLER & INJECTION
    // ==========================================================================

    // 1. HTML Markup Dynamically Injected
    const chatContainer = document.createElement('div');
    chatContainer.id = 'ai-guru-root';
    chatContainer.innerHTML = `
        <div class="ai-guru-fab" id="ai-guru-fab" title="Chat with AI Guru">
            <i class="ri-robot-2-fill"></i>
        </div>
        
        <div class="ai-guru-chat-panel" id="ai-guru-chat-panel">
            <div class="chat-panel-header">
                <div class="chat-header-identity">
                    <div class="chat-avatar-wrapper">
                        <i class="ri-robot-2-fill"></i>
                        <span class="chat-status-dot" id="chat-status-dot"></span>
                    </div>
                    <div class="chat-header-info">
                        <h4>AI Guru</h4>
                        <p id="chat-status-text">Academic Assistant • Online</p>
                    </div>
                </div>
                <div class="chat-header-controls">
                    <button class="chat-ctrl-btn" id="ai-sound-toggle" title="Toggle Sound">
                        <i class="ri-volume-up-fill"></i>
                    </button>
                    <button class="chat-ctrl-btn" id="ai-close-btn" title="Minimize Chat">
                        <i class="ri-close-line"></i>
                    </button>
                </div>
            </div>
            
            <div class="chat-panel-messages" id="ai-chat-messages">
                <div class="chat-msg-wrapper ai">
                    <div class="chat-bubble">
                        Hello! I am <strong>AI Guru</strong>, your virtual academic mentor. 🎓 I am here to help you navigate study materials, batches, admissions, and more at Narayan e-Gurukul. What are you looking to excel in today?
                    </div>
                    <div class="chat-msg-meta">AI Guru • Just now</div>
                </div>
            </div>
            
            <div class="chat-suggestions-container" id="ai-suggestions-container">
                <div class="suggestion-chip">Explore B.Tech Notes</div>
                <div class="suggestion-chip">B.Tech 1st Year Launch</div>
                <div class="suggestion-chip">Sanfort Pre-School Inquiry</div>
                <div class="suggestion-chip">Download Mobile App</div>
            </div>
            
            <div class="chat-panel-input-bar">
                <input type="text" id="ai-chat-input" placeholder="Type your academic question..." autocomplete="off">
                <button class="chat-send-btn" id="ai-send-btn" title="Send Message">
                    <i class="ri-send-plane-2-fill"></i>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(chatContainer);

    // 2. DOM Elements Selection
    const fab = document.getElementById('ai-guru-fab');
    const chatPanel = document.getElementById('ai-guru-chat-panel');
    const closeBtn = document.getElementById('ai-close-btn');
    const soundToggle = document.getElementById('ai-sound-toggle');
    const messagesBox = document.getElementById('ai-chat-messages');
    const chatInput = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-send-btn');
    const suggestionsContainer = document.getElementById('ai-suggestions-container');
    const statusDot = document.getElementById('chat-status-dot');
    const statusText = document.getElementById('chat-status-text');

    // 3. Audio & UI State Management
    let isSoundMuted = localStorage.getItem('aiGuruMuted') === 'true';
    updateSoundIcon();

    // Web Audio Synthesizer
    function playSynthesizedSound(type) {
        if (isSoundMuted) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            
            if (type === 'open') {
                // Ascending double chime
                const now = ctx.currentTime;
                
                const osc1 = ctx.createOscillator();
                const gain1 = ctx.createGain();
                osc1.type = 'sine';
                osc1.frequency.setValueAtTime(523.25, now); // C5
                gain1.gain.setValueAtTime(0.08, now);
                gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc1.connect(gain1);
                gain1.connect(ctx.destination);
                osc1.start(now);
                osc1.stop(now + 0.12);
                
                const osc2 = ctx.createOscillator();
                const gain2 = ctx.createGain();
                osc2.type = 'sine';
                osc2.frequency.setValueAtTime(659.25, now + 0.08); // E5
                gain2.gain.setValueAtTime(0.08, now + 0.08);
                gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
                osc2.connect(gain2);
                gain2.connect(ctx.destination);
                osc2.start(now + 0.08);
                osc2.stop(now + 0.28);
            } 
            else if (type === 'send') {
                // Brief frequency swoosh/click
                const now = ctx.currentTime;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(300, now + 0.06);
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.07);
            }
            else if (type === 'receive') {
                // Warm notification double chime
                const now = ctx.currentTime;
                
                const osc1 = ctx.createOscillator();
                const gain1 = ctx.createGain();
                osc1.type = 'sine';
                osc1.frequency.setValueAtTime(587.33, now); // D5
                gain1.gain.setValueAtTime(0.08, now);
                gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
                osc1.connect(gain1);
                gain1.connect(ctx.destination);
                osc1.start(now);
                osc1.stop(now + 0.15);
                
                const osc2 = ctx.createOscillator();
                const gain2 = ctx.createGain();
                osc2.type = 'sine';
                osc2.frequency.setValueAtTime(880.00, now + 0.1); // A5
                gain2.gain.setValueAtTime(0.08, now + 0.1);
                gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                osc2.connect(gain2);
                gain2.connect(ctx.destination);
                osc2.start(now + 0.1);
                osc2.stop(now + 0.32);
            }
            else if (type === 'click') {
                // Ultra-short click/pop
                const now = ctx.currentTime;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1200, now);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.03);
            }
        } catch (e) {
            console.warn('Web Audio synthesis failed or blocked by autoplay policy:', e);
        }
    }

    function updateSoundIcon() {
        if (isSoundMuted) {
            soundToggle.innerHTML = '<i class="ri-volume-mute-fill"></i>';
            soundToggle.title = 'Unmute Sounds';
        } else {
            soundToggle.innerHTML = '<i class="ri-volume-up-fill"></i>';
            soundToggle.title = 'Mute Sounds';
        }
    }

    function toggleSound(e) {
        e.stopPropagation();
        isSoundMuted = !isSoundMuted;
        localStorage.setItem('aiGuruMuted', isSoundMuted);
        updateSoundIcon();
        if (!isSoundMuted) {
            playSynthesizedSound('click');
        }
    }

    // Toggle Chat visibility
    function toggleChat() {
        const isActive = chatPanel.classList.toggle('active');
        if (isActive) {
            playSynthesizedSound('open');
            setTimeout(() => chatInput.focus(), 300);
        } else {
            playSynthesizedSound('click');
        }
    }

    fab.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);
    soundToggle.addEventListener('click', toggleSound);

    // Dynamic Suggestion Click
    suggestionsContainer.addEventListener('click', (e) => {
        const chip = e.target.closest('.suggestion-chip');
        if (chip) {
            const queryText = chip.textContent;
            playSynthesizedSound('click');
            submitMessage(queryText);
        }
    });

    // Send controls
    sendBtn.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (text) submitMessage(text);
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const text = chatInput.value.trim();
            if (text) submitMessage(text);
        }
    });

    // Append Message to view
    function appendMessage(sender, text, isAIGenerated = false) {
        const msgWrapper = document.createElement('div');
        msgWrapper.className = `chat-msg-wrapper ${sender}`;
        
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        
        // Support standard markdown bold elements, newlines
        let formattedText = text
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        bubble.innerHTML = formattedText;
        msgWrapper.appendChild(bubble);

        // Meta info
        const meta = document.createElement('div');
        meta.className = 'chat-msg-meta';
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        meta.innerHTML = `${sender === 'user' ? 'You' : 'AI Guru'} • ${timeStr}`;
        msgWrapper.appendChild(meta);

        // Feedback loop for AI responses
        if (sender === 'ai' && isAIGenerated) {
            const feedback = document.createElement('div');
            feedback.className = 'chat-feedback-row';
            feedback.innerHTML = `
                <button class="chat-feedback-btn thumbs-up" title="Helpful"><i class="ri-thumb-up-line"></i></button>
                <button class="chat-feedback-btn thumbs-down" title="Not Helpful"><i class="ri-thumb-down-line"></i></button>
            `;
            
            // Set up rating feedback micro-interactions
            feedback.addEventListener('click', (e) => {
                const btn = e.target.closest('.chat-feedback-btn');
                if (btn) {
                    playSynthesizedSound('click');
                    feedback.querySelectorAll('.chat-feedback-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    btn.style.transform = 'scale(1.2)';
                    setTimeout(() => btn.style.transform = 'none', 150);
                    // Disable row to prevent multiple changes
                    feedback.style.pointerEvents = 'none';
                    feedback.style.opacity = '0.7';
                }
            });
            msgWrapper.appendChild(feedback);
        }

        messagesBox.appendChild(msgWrapper);
        messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    // Append Typing Indicator
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'chat-msg-wrapper ai typing-wrapper';
        indicator.innerHTML = `
            <div class="chat-bubble typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        messagesBox.appendChild(indicator);
        messagesBox.scrollTop = messagesBox.scrollHeight;
        return indicator;
    }

    // Submit Message logic
    function submitMessage(text) {
        // Clear input
        chatInput.value = '';
        
        // Append user query
        appendMessage('user', text);
        playSynthesizedSound('send');
        
        // Render typing indicator
        const typingEl = showTypingIndicator();

        // Query the Smart Dual-Mode Fail-Safe Engine
        getChatResponse(text)
            .then(res => {
                // Remove indicator
                typingEl.remove();
                
                // Append AI reply
                appendMessage('ai', res.response, true);
                playSynthesizedSound('receive');
                
                // Update Suggestion Chips
                updateSuggestionChips(res.suggestions);
            })
            .catch(err => {
                console.error("Chat engine critical resolution error:", err);
                typingEl.remove();
                appendMessage('ai', "I apologize, but I am experiencing an internal routing hiccup. Please try again soon!");
            });
    }

    // Update suggestions chips helper
    function updateSuggestionChips(chips) {
        suggestionsContainer.innerHTML = '';
        if (chips && chips.length > 0) {
            chips.forEach(c => {
                const div = document.createElement('div');
                div.className = 'suggestion-chip';
                div.textContent = c;
                suggestionsContainer.appendChild(div);
            });
            suggestionsContainer.style.display = 'flex';
        } else {
            suggestionsContainer.style.display = 'none';
        }
    }

    // Smart Dual-Mode Resolver: Server API with Offline Client-Side Fallback
    function getChatResponse(message) {
        return fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error status: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Restore online status badges if we were offline
            statusDot.style.background = '#10b981'; // Green
            statusDot.style.animation = 'statusPulse 1.8s ease-in-out infinite';
            statusText.textContent = 'Academic Assistant • Online';
            return data;
        })
        .catch(err => {
            // Fallback engaged!
            console.warn("🔔 Narayan e-Gurukul Fail-Safe Chatbox engaged! Switching to Local Matching Engine.", err);
            
            // Switch UI dot to amber/orange pulsing indicator to show offline-fail-safe mode!
            statusDot.style.background = '#f59e0b'; // Amber
            statusDot.style.animation = 'statusPulse 1.2s ease-in-out infinite';
            statusText.textContent = 'Academic Assistant • Fail-Safe Mode';
            
            return new Promise((resolve) => {
                // Simulate network delay for realistic visual typing states
                setTimeout(() => {
                    const localResult = getLocalChatResponse(message);
                    resolve(localResult);
                }, 800);
            });
        });
    }

    // Fail-Safe Offline Client-Side Matcher
    function getLocalChatResponse(message) {
        const query = message.toLowerCase().trim();
        let reply = "";
        let suggestions = [];

        if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('greetings')) {
            reply = "Hello there! I am **AI Guru** (Fail-Safe Local Mode active). 🎓 I am running directly in your browser because our backend server is temporarily resting. I can still answer all your queries about engineering notes, pre-school, and timelines!";
            suggestions = ["Explore B.Tech Notes", "When is the launch?", "Sanfort Pre-School Inquiry", "Tell me about AIML"];
        } 
        else if (query.includes('launch') || query.includes('when') || query.includes('date') || query.includes('toolkit') || query.includes('august')) {
            reply = "The ultimate **B.Tech 1st Year Complete Toolkit** launches in **Mid-August**! 🚀 It will feature hand-written notes, 10+ years solved papers, viva guides, and step-by-step experiment instructions. We have 1,200+ students waiting already!";
            suggestions = ["How to join waitlist?", "Explore B.Tech Notes", "Tell me about CSE AIML"];
        }
        else if (query.includes('waitlist') || query.includes('join') || query.includes('sign up') || query.includes('notify')) {
            reply = "To join the priority launch list, scroll to the bottom of the current page and submit your email in our **'Stay Updated'** box, or use the homepage message contact form. We'll alert you first thing on launch day!";
            suggestions = ["Explore B.Tech Notes", "What study notes do you have?"];
        }
        else if (query.includes('material') || query.includes('note') || query.includes('pyq') || query.includes('book') || query.includes('study') || query.includes('paper') || query.includes('viva')) {
            reply = "We offer **100% Free** academic resources including high-quality hand-written notes, solved Previous Year Questions (PYQs) for core streams, viva banks, and visual maps to ensure you bag a 9+ CGPA!";
            suggestions = ["Explore Our Batches", "Download Mobile App", "When is the launch?"];
        }
        else if (query.includes('batch') || query.includes('course') || query.includes('branch') || query.includes('specialization') || query.includes('cse') || query.includes('aiml') || query.includes('aids') || query.includes('core')) {
            reply = "Narayan e-Gurukul caters to the following key specialized tracks: \n\n" +
                    "• **Core B.Tech:** Mechanical, electrical, civil base papers.\n" +
                    "• **CSE AIDS:** Artifical Intelligence & Data Science curated resources.\n" +
                    "• **CSE AIML:** Artificial Intelligence & Machine Learning notes.\n\n" +
                    "Use our navigation bar to jump directly into the 'Our Batch' page!";
            suggestions = ["Tell me about CSE AIML", "Tell me about CSE AIDS", "Tell me about Core B.Tech"];
        }
        else if (query.includes('school') || query.includes('preschool') || query.includes('sanfort') || query.includes('admission') || query.includes('franchise') || query.includes('child') || query.includes('inquiry')) {
            reply = "We host pre-school admissions and inquiries for **Sanfort Pre-School (Hanumangarh)**! 🏫 When the server is online, forms on the 'My School' page sync straight to SQLite. Right now, because we're offline, our system auto-saves inquiry submissions to your **Browser LocalStorage Cache** so you never lose data!";
            suggestions = ["How does SQLite database work?", "View Admin Dashboard"];
        }
        else if (query.includes('database') || query.includes('sqlite') || query.includes('json') || query.includes('fail-safe') || query.includes('dashboard') || query.includes('admin')) {
            reply = "Narayan e-Gurukul operates a multi-layered DB hierarchy: Primary SQLite, Secondary JSON, and Tertiary Browser LocalStorage backup. When the backend is offline, forms seamlessly switch to browser cache storage. Truly indestructible design!";
            suggestions = ["Submit a Test Inquiry", "How to contact support?"];
        }
        else if (query.includes('app') || query.includes('download') || query.includes('android') || query.includes('ios') || query.includes('mobile') || query.includes('play store')) {
            reply = "Our customized **Narayan e-Gurukul Mobile App** is coming soon to the Google Play Store and iOS App Store. Access offline lectures, notes, and interactive test series directly from your phone!";
            suggestions = ["When is B.Tech 1st Year launching?", "How to contact support?"];
        }
        else if (query.includes('contact') || query.includes('support') || query.includes('email') || query.includes('address') || query.includes('location') || query.includes('help')) {
            reply = "Connect with us anytime: \n\n" +
                    "📧 **Email:** nishant.sanfort@gmail.com\n" +
                    "📍 **Location:** Hanumangarh, Rajasthan (335512)\n\n" +
                    "Or use the Contact Form on the Home page to draft a message!";
            suggestions = ["Go to Contact Form", "Explore B.Tech Notes"];
        }
        else if (query.includes('author') || query.includes('creator') || query.includes('developer') || query.includes('built') || query.includes('nishant')) {
            reply = "This portal was fully designed and built by **Nishant Saini**! 💻 It combines clean Outfit modern typography, high-performance node server backends, and modular responsive grids.";
            suggestions = ["Send message to Nishant", "Tell me more about the mission"];
        }
        else if (query.includes('thank') || query.includes('thanks') || query.includes('awesome') || query.includes('great')) {
            reply = "Anytime! 👍 I am glad I could assist in offline fail-safe mode. Let me know if you have other questions about Narayan e-Gurukul!";
            suggestions = ["Explore Study Materials", "Go to homepage"];
        }
        else {
            reply = "That's an interesting inquiry! 💡 As **AI Guru** in local offline mode, I recommend checking out our specializations (CSE AIML/AIDS) or reading about the upcoming B.Tech 1st Year Complete Toolkit launch in Mid-August. Let me know what else I can cover!";
            suggestions = ["Explore B.Tech Notes", "When is the launch?", "Sanfort Pre-School Admission", "How to contact support?"];
        }

        return {
            response: reply,
            suggestions: suggestions
        };
    }

    // ==========================================================================
    // 📩 FORM SUBMISSIONS CONTROLLER
    // ==========================================================================

    // 1. Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('contactSubmitBtn');
            const originalBtnText = submitBtn.innerHTML;

            // Get data
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;

            // UI Feedback
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="ri-loader-4-line ai-spin"></i> Sending...';

            try {
                const response = await fetch('/api/inquiries', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'General Inquiry',
                        name,
                        email,
                        message
                    })
                });

                if (response.ok) {
                    submitBtn.innerHTML = '<i class="ri-checkbox-circle-line"></i> Sent Successfully!';
                    submitBtn.style.background = '#10b981';
                    contactForm.reset();
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.style.background = '';
                    }, 3000);
                } else {
                    throw new Error('Failed to send inquiry');
                }
            } catch (err) {
                console.error(err);
                submitBtn.innerHTML = '<i class="ri-error-warning-line"></i> Failed to send';
                submitBtn.style.background = '#ef4444';
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.background = '';
                }, 3000);
            }
        });
    }

    // 2. Newsletter Form Handler
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('newsletterEmail');
            const submitBtn = newsletterForm.querySelector('button');
            const originalIcon = submitBtn.innerHTML;

            const email = emailInput.value;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="ri-loader-4-line ai-spin"></i>';

            try {
                const response = await fetch('/api/inquiries', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'Newsletter Subscription',
                        name: 'Subscriber',
                        email: email,
                        message: 'Wants to stay updated via newsletter.'
                    })
                });

                if (response.ok) {
                    submitBtn.innerHTML = '<i class="ri-check-line"></i>';
                    submitBtn.style.background = '#10b981';
                    emailInput.value = '';
                    emailInput.placeholder = 'Thanks for joining!';
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalIcon;
                        submitBtn.style.background = '';
                        emailInput.placeholder = 'Your email';
                    }, 3000);
                } else {
                    throw new Error('Subscription failed');
                }
            } catch (err) {
                console.error(err);
                submitBtn.innerHTML = '<i class="ri-close-line"></i>';
                submitBtn.style.background = '#ef4444';
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalIcon;
                    submitBtn.style.background = '';
                }, 3000);
            }
        });
    }
});

