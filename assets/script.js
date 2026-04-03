// Initialize Icons
lucide.createIcons();

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-gray-900', 'shadow-lg');
        navbar.classList.remove('bg-transparent', 'py-4');
        navbar.classList.add('py-2');
    } else {
        navbar.classList.remove('bg-gray-900', 'shadow-lg');
        navbar.classList.add('bg-transparent', 'py-4');
        navbar.classList.remove('py-2');
    }
});

// Mobile Menu Toggle
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
const mobileLinks = menu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.add('hidden');
    });
});

// Dynamic BMI Calculator Logic
const bmiForm = document.getElementById('bmi-form');
const bmiResult = document.getElementById('bmi-result');
const bmiValueDisplay = document.getElementById('bmi-value');
const bmiCategoryDisplay = document.getElementById('bmi-category');

if (bmiForm) {
    bmiForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent page reload
        
        const heightCm = parseFloat(document.getElementById('height').value);
        const weightKg = parseFloat(document.getElementById('weight').value);

        if (heightCm > 0 && weightKg > 0) {
            // Calculate BMI: weight (kg) / (height (m) * height (m))
            const heightM = heightCm / 100;
            const bmi = (weightKg / (heightM * heightM)).toFixed(1);
            
            bmiValueDisplay.textContent = bmi;
            bmiResult.classList.remove('hidden');

            // Determine Category and styling
            let category = '';
            let colorClass = '';

            if (bmi < 18.5) {
                category = 'Underweight - Time to bulk up!';
                colorClass = 'text-blue-400';
                bmiResult.className = 'mt-6 p-6 rounded-xl text-center bg-blue-900/30 border border-blue-500/50';
            } else if (bmi >= 18.5 && bmi <= 24.9) {
                category = 'Normal Weight - Great job, keep it up!';
                colorClass = 'text-green-400';
                bmiResult.className = 'mt-6 p-6 rounded-xl text-center bg-green-900/30 border border-green-500/50';
            } else if (bmi >= 25 && bmi <= 29.9) {
                category = 'Overweight - Let\'s hit the cardio!';
                colorClass = 'text-yellow-400';
                bmiResult.className = 'mt-6 p-6 rounded-xl text-center bg-yellow-900/30 border border-yellow-500/50';
            } else {
                category = 'Obese - We are here to help you transform.';
                colorClass = 'text-red-400';
                bmiResult.className = 'mt-6 p-6 rounded-xl text-center bg-red-900/30 border border-red-500/50';
            }

            bmiCategoryDisplay.textContent = category;
            bmiCategoryDisplay.className = `text-lg font-medium mt-2 ${colorClass}`;
        }
    });
}

// Intersection Observer for Scroll Animations
const fadeElements = document.querySelectorAll('.fade-up');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => observer.observe(el));

// AI Coach Logic (Simulation)
const generateAiBtn = document.getElementById('generate-ai-btn');
const aiOutputContainer = document.getElementById('ai-output-container');
const aiTypingStatus = document.getElementById('ai-typing-status');
const aiResult = document.getElementById('ai-result');
const aiGoal = document.getElementById('ai-goal');
const aiLevel = document.getElementById('ai-level');

const workoutDatabase = {
    'muscle': {
        'beginner': "Day 1: Full Body (Squats, Bench Press, Rows)\nDay 2: Rest\nDay 3: Full Body (Deadlifts, Overhead Press, Pull-downs)\nDay 4: Rest\nDay 5: Full Body (Lunges, Incline Press, Curls)",
        'advanced': "Day 1: Chest & Triceps (Heavy Push)\nDay 2: Back & Biceps (Heavy Pull)\nDay 3: Legs (Quads focus)\nDay 4: Shoulders & Abs\nDay 5: Legs (Hamstrings focus)"
    },
    'fat-loss': {
        'beginner': "Day 1: 30min Brisk Walk + Light Dumbbell Circuit\nDay 2: Rest\nDay 3: 20min HIIT + Core\nDay 4: Active Recovery (Yoga)\nDay 5: Full Body Circuit",
        'advanced': "Day 1: Heavy Compound Lifts + 15min Sprints\nDay 2: 45min LISS Cardio\nDay 3: HIIT Circuit (Kettlebells)\nDay 4: Plyometrics & Core\nDay 5: MetCon Workout"
    }
};

if(generateAiBtn) {
    generateAiBtn.addEventListener('click', () => {
        // UI States
        aiOutputContainer.classList.remove('hidden');
        aiTypingStatus.classList.remove('hidden');
        aiResult.textContent = "";
        aiResult.classList.remove('typing-cursor');
        
        // Add Glow Effect
        generateAiBtn.classList.add('ai-glow');

        // Simulate AI Processing Time
        setTimeout(() => {
            aiTypingStatus.classList.add('hidden');
            generateAiBtn.classList.remove('ai-glow');
            aiResult.classList.add('typing-cursor');

            // Get Plan based on selection
            const goal = aiGoal.value;
            const level = aiLevel.value;
            
            let selectedPlan = "";
            if (workoutDatabase[goal] && workoutDatabase[goal][level]) {
                selectedPlan = workoutDatabase[goal][level];
            } else {
                selectedPlan = `Personalized ${level} plan for ${goal.replace('-', ' ')}:\n\nDay 1: Upper Body Focus\nDay 2: Lower Body Focus\nDay 3: Active Recovery\nDay 4: High Intensity Intervals\nDay 5: Full Body Power`;
            }

            const responseText = `[SYSTEM: Plan Generated Successfully]\n\n${selectedPlan}\n\n*Tip: Stay hydrated and ensure adequate protein intake.*`;

            // Typewriter Effect
            let i = 0;
            function typeWriter() {
                if (i < responseText.length) {
                    aiResult.textContent += responseText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 20); // Typing speed
                } else {
                    aiResult.classList.remove('typing-cursor');
                    lucide.createIcons(); // Refresh icons if any were typed
                }
            }
            typeWriter();

        }, 1500); // 1.5s simulated thinking time
    });
}