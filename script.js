document.addEventListener("DOMContentLoaded", () => {
    const mus = document.getElementById('mus');
    mus.volume = 0.1;

    function startAudioWithInteraction() {
        if (mus) {
            mus.play().catch(err => {
                console.log("التشغيل فشل: تحتاج تفاعل المستخدم", err);
            });
        }

        document.removeEventListener('click', startAudioWithInteraction);
        document.removeEventListener('touchstart', startAudioWithInteraction);

        const beginBtn = document.getElementById("begin-meditation-btn");
        if (beginBtn) beginBtn.removeEventListener('click', startAudioWithInteraction);
    }

    document.addEventListener('click', startAudioWithInteraction);
    document.addEventListener('touchstart', startAudioWithInteraction);

    // لو زر "ابدأ" يظهر لاحقًا
    const interval = setInterval(() => {
        const beginBtn = document.getElementById("begin-meditation-btn");
        if (beginBtn) {
            beginBtn.addEventListener('click', startAudioWithInteraction);
            clearInterval(interval);
        }
    }, 100);

});



document.addEventListener("DOMContentLoaded", function () {
  initializeStarsBackground();    // تشغيل الخلفية النجومية
  showWelcomeSection();          // تشغيل قسم الترحيب
});

// ===== تهيئة خلفية النجوم =====
function initializeStarsBackground() {
    const starsContainer = document.getElementById('stars-background');
    const starCount = 50;
    const stars = [];
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        starsContainer.appendChild(star);
        stars.push({
            el: star,
            x: parseFloat(star.style.left),
            y: parseFloat(star.style.top),
            vx: (Math.random() - 0.5) * 0.05,
            vy: (Math.random() - 0.5) * 0.05,
            alpha: Math.random() * 0.5 + 0.3,
            delta: Math.random() * 0.05 + 0.02
        });
    }

    function animateStars() {
        for (const s of stars) {
            s.alpha += s.delta;
            if (s.alpha > 1 || s.alpha < 0.2) s.delta = -s.delta;

            s.x += s.vx;
            s.y += s.vy;

            if (s.x < 0) s.x = 100;
            if (s.x > 100) s.x = 0;
            if (s.y < 0) s.y = 100;
            if (s.y > 100) s.y = 0;

            s.el.style.left = s.x + '%';
            s.el.style.top = s.y + '%';
            s.el.style.opacity = s.alpha;
        }
        requestAnimationFrame(animateStars);
    }
    animateStars();
}

// ===== عرض قسم الترحيب =====
function showWelcomeSection() {
    const appTitle = document.getElementById("app-title");
    const appDescription = document.getElementById("app-description");
    const beginMeditationBtn = document.getElementById("begin-meditation-btn");
    const welcomeSection = document.getElementById("welcome-section");

    appTitle.style.opacity = 0;
    appDescription.style.opacity = 0;
    beginMeditationBtn.style.opacity = 0;

    setTimeout(() => {
        appTitle.style.transition = "opacity 1.5s";
        appTitle.style.opacity = 1;

        setTimeout(() => {
            appDescription.style.display = "block";
            appDescription.style.transition = "opacity 1.5s";
            appDescription.style.opacity = 1;

            setTimeout(() => {
                beginMeditationBtn.style.display = "inline-block";
                beginMeditationBtn.style.transition = "opacity 1.5s";
                beginMeditationBtn.style.opacity = 1;
            }, 1500);
        }, 1500);
    }, 2000);

    beginMeditationBtn.addEventListener("click", () => {
        welcomeSection.style.transition = "opacity 1s";
        welcomeSection.style.opacity = 0;
        setTimeout(() => {
            welcomeSection.style.display = "none";
            beginMeditationExperience();
        }, 1000);
    });
}

// ===== بداية تجربة التأمل والتنفس =====
function beginMeditationExperience() {
    const meditationSection = document.getElementById('meditation-section');
    meditationSection.style.display = 'flex';

    const breathingVisualizer = document.getElementById('breathing-visualizer');
    const breathingInstructions = document.getElementById('breathing-instructions');
    const inhaleSound = document.getElementById('inhale-sound');
    inhaleSound.volume = 1;
    const exhaleSound = document.getElementById('exhale-sound');
    exhaleSound.volume = 1;

    // عبارات التأمل داخل الدائرة
    const meditationPhrases = [
        " شهيق ببطء",
        " زفير بهدوء",
        "كل نفس هو بداية جديدة",
        "تحرر من كل ضغوطك",
        "املأ لحظتك بالسلام الداخلي",
        "دع عقلك يهدأ.",
        "الشهيق بوعي",
        "استقبل الطاقة الإيجابية",
    ];

    const introductoryMessages = [
        { id: 'intro-msg-1', duration: 3500, gap: 1500 },
        { id: 'intro-msg-2', duration: 4000, gap: 1500 },
        { id: 'intro-msg-3', duration: 4000, gap: 1500 },
        { id: 'intro-msg-4', duration: 4900, gap: 1500 },
        { id: 'intro-msg-5', duration: 4000, gap: 1500 },
        { id: 'intro-msg-6', duration: 4000, gap: 1500 },
      /*  { id: 'intro-msg-7', duration: 2000, gap: 800 },
        { id: 'intro-msg-8', duration: 1500, gap: 500 },
        { id: 'intro-msg-9', duration: 1000, gap: 0 }*/
    ];

    let minScale = 0.5;
    let maxScale = 1.3;
    let completedCycles = 0;
    const maxCycles = 5;

    // ===== تهيئة المرئي للتنفس =====
    function initializeBreathingVisualizer(fromStart = true) {
        breathingVisualizer.style.display = 'block';
        breathingVisualizer.style.opacity = 1;
        let initialScale = fromStart ? 0.01 : minScale;
        let targetScale = minScale;
        let duration = 15;
        let startTime = performance.now();

        function animateGrowth() {
            let now = performance.now();
            let t = (now - startTime) / 1000;
            if (t > duration) t = duration;
            let progress = t / duration;
            let scale = initialScale + (targetScale - initialScale) * Math.pow(progress, 1.5);
            breathingVisualizer.style.transform = `translate(-50%, -50%) scale(${scale})`;

            if (t < duration) requestAnimationFrame(animateGrowth);
            else displayIntroductoryMessages();
        }
        animateGrowth();
    }

    // ===== عرض الرسائل التمهيدية =====
    function displayIntroductoryMessages() {
        let currentIndex = 0;

        function showNextMessage() {
            if (currentIndex > 0) {
                const prevMessage = document.getElementById(introductoryMessages[currentIndex - 1].id);
                prevMessage.classList.remove('show');
                prevMessage.classList.add('hide');
            }

            if (currentIndex < introductoryMessages.length) {
                const currentMessage = document.getElementById(introductoryMessages[currentIndex].id);
                currentMessage.classList.remove('hide');
                currentMessage.classList.add('show');

                setTimeout(() => {
                    currentMessage.classList.remove('show');
                    currentMessage.classList.add('hide');

                    setTimeout(() => {
                        currentIndex++;
                        showNextMessage();
                    }, introductoryMessages[currentIndex].gap);
                }, introductoryMessages[currentIndex].duration);
            } else {
                // بعد انتهاء الرسائل التمهيدية، نظهر العد التنازلي داخل الدائرة
                showCountdownInsideCircle();
            }
        }

        showNextMessage();
    }

    // ===== عرض العد التنازلي داخل الدائرة =====
    function showCountdownInsideCircle() {
        const countdownMessages = [
            { id: 'intro-msg-7', duration: 1500, gap: 800 },
            { id: 'intro-msg-8', duration: 1500, gap: 800 },
            { id: 'intro-msg-9', duration: 1500, gap: 800 }
        ];

        let currentIndex = 0;

        function showNextCountdown() {
            if (currentIndex > 0) {
                const prevMessage = document.getElementById(countdownMessages[currentIndex - 1].id);
                prevMessage.classList.remove('show');
                prevMessage.classList.add('hide');
            }

            if (currentIndex < countdownMessages.length) {
                const currentMessage = document.getElementById(countdownMessages[currentIndex].id);
                currentMessage.classList.remove('hide');
                currentMessage.classList.add('show');

                setTimeout(() => {
                    currentMessage.classList.remove('show');
                    currentMessage.classList.add('hide');

                    setTimeout(() => {
                        currentIndex++;
                        showNextCountdown();
                    }, countdownMessages[currentIndex].gap);
                }, countdownMessages[currentIndex].duration);
            } else {
                // بعد انتهاء العد التنازلي، نبدأ التنفس
                beginInhalePhase();
            }
        }

        showNextCountdown();
    }

    // ===== مرحلة الشهيق =====
    function beginInhalePhase() {
        if (completedCycles >= maxCycles) {
            completeMeditationSession();
            return;
        }

        // إظهار النص داخل الدائرة مع بداية الحركة
        breathingInstructions.textContent = meditationPhrases[completedCycles * 2] || "";
        breathingInstructions.classList.remove('hide', 'exhale');
        breathingInstructions.classList.add('show');
        
        inhaleSound.currentTime = 0;
        inhaleSound.play();

        let startScale = minScale;
        let endScale = maxScale;
        let duration = inhaleSound.duration || 3.2;
        let startTime = performance.now();

        // إضافة تأثير الشهيق بعد ظهور النص
        setTimeout(() => {
            breathingInstructions.classList.add('inhale');
        }, 500);

        function animateInhale() {
            let now = performance.now();
            let t = (now - startTime) / 1000;
            let progress = Math.min(t / duration, 1);
            let scale = startScale + (endScale - startScale) * progress;
            breathingVisualizer.style.transform = `translate(-50%, -50%) scale(${scale})`;
            if (progress < 1) requestAnimationFrame(animateInhale);
        }
        animateInhale();

        inhaleSound.onended = () => {
            // إخفاء النص عند انتهاء الحركة
            breathingInstructions.classList.remove('inhale', 'show');
            breathingInstructions.classList.add('hide');
            setTimeout(() => { beginExhalePhase(endScale); }, 2000);
        };
    }

    // ===== مرحلة الزفير =====
    function beginExhalePhase(currentScale) {
        // إظهار النص داخل الدائرة مع بداية الحركة
        breathingInstructions.textContent = meditationPhrases[completedCycles * 2 + 1] || "";
        breathingInstructions.classList.remove('hide', 'inhale');
        breathingInstructions.classList.add('show');
        
        exhaleSound.currentTime = 0;
        exhaleSound.play();

        let startScale = currentScale;
        let endScale = minScale;
        let duration = exhaleSound.duration || 4.3;
        let startTime = performance.now();

        // إضافة تأثير الزفير بعد ظهور النص
        setTimeout(() => {
            breathingInstructions.classList.add('exhale');
        }, 500);

        function animateExhale() {
            let now = performance.now();
            let t = (now - startTime) / 1000;
            let progress = Math.min(t / duration, 1);
            let scale = startScale + (endScale - startScale) * progress;
            breathingVisualizer.style.transform = `translate(-50%, -50%) scale(${scale})`;
            if (progress < 1) requestAnimationFrame(animateExhale);
        }
        animateExhale();

        exhaleSound.onended = () => {
            // إخفاء النص عند انتهاء الحركة
            breathingInstructions.classList.remove('exhale', 'show');
            breathingInstructions.classList.add('hide');
            completedCycles++;
            setTimeout(beginInhalePhase, 2000);
        };
    }

    // ===== إنهاء جلسة التأمل مع رسائل الإتمام =====
    function completeMeditationSession() {
        const breathingVisualizer = document.getElementById('breathing-visualizer');
        const minScale = 0.5;
        const pauseDuration = 3000;
        const shrinkDuration = 15000;

        // التأكد من حجم المرئي قبل الفاصل
        breathingVisualizer.style.transform = `translate(-50%, -50%) scale(${minScale})`;
        breathingVisualizer.style.display = 'block';

        // بداية عرض رسائل الإتمام
        displayCompletionMessages();

        // إظهار قسم الخاتمة قبل اختفاء الدائرة بثانيتين
        setTimeout(() => {
            showCompletionSection();
        }, pauseDuration + shrinkDuration - 2000);

        // الفاصل قبل انكماش المرئي
        setTimeout(() => {
            const startTime = performance.now();
            const endScale = 0;

            function animateShrink(now) {
                now = now || performance.now();
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / shrinkDuration, 1);
                const scale = minScale + (endScale - minScale) * progress;
                breathingVisualizer.style.transform = `translate(-50%, -50%) scale(${scale})`;

                if (progress < 1) {
                    requestAnimationFrame(animateShrink);
                } else {
                    breathingVisualizer.style.display = 'none';
                }
            }

            requestAnimationFrame(animateShrink);
        }, pauseDuration);
    }

    // ===== عرض رسائل الإتمام =====
    function displayCompletionMessages() {
        const completionMessages = [
            { id: 'completion-msg-1', duration: 5000 },
            { id: 'completion-msg-2', duration: 5000 },
            { id: 'completion-msg-3', duration: 5000 }
        ];

        let currentIndex = 0;

        function showNextCompletionMessage() {
            // إخفاء الرسالة السابقة
            if (currentIndex > 0) {
                const prevMessage = document.getElementById(completionMessages[currentIndex - 1].id);
                prevMessage.classList.remove('show');
            }

            // عرض الرسالة الحالية
            if (currentIndex < completionMessages.length) {
                const currentMessage = document.getElementById(completionMessages[currentIndex].id);
                currentMessage.classList.add('show');

                setTimeout(() => {
                    currentIndex++;
                    showNextCompletionMessage();
                }, completionMessages[currentIndex].duration);
            }
        }

        showNextCompletionMessage();
    }

    // ===== عرض قسم الخاتمة والإنجاز =====
    function showCompletionSection() {
        // إخفاء جميع رسائل الإتمام أولاً
        const completionMessageIds = ['completion-msg-1', 'completion-msg-2', 'completion-msg-3'];
        completionMessageIds.forEach(id => {
            const message = document.getElementById(id);
            message.classList.remove('show');
            message.style.opacity = 0;
        });

        // إظهار قسم الخاتمة وكل عناصره مع بعض
        setTimeout(() => {
            const completionSection = document.getElementById('completion-section');
            const userFeedbackPrompt = document.getElementById('user-feedback-prompt');
            const socialSharingArea = document.getElementById('social-sharing-area');
            const developerSignature = document.querySelector('.developer-signature');

            // يبان القسم
            completionSection.style.opacity = 1;
            socialSharingArea.style.pointerEvents = 'auto';

            // بنفس التوقيت تظهر باقي العناصر
            userFeedbackPrompt.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
            userFeedbackPrompt.style.transform = 'translateY(0)';
            userFeedbackPrompt.style.opacity = 1;

            socialSharingArea.style.display = 'block';
            socialSharingArea.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
            socialSharingArea.style.opacity = 1;
            socialSharingArea.style.transform = 'translateY(0)';
            socialSharingArea.style.pointerEvents = 'auto';
            const buttons = socialSharingArea.querySelectorAll('button, a');
            buttons.forEach(btn => btn.style.pointerEvents = 'auto');

            developerSignature.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
            developerSignature.style.opacity = 1;
            developerSignature.style.transform = 'translateY(0)';

        }, 1000); // القسم يطلع بعد ثانية وحدة
    }

    initializeBreathingVisualizer();
}