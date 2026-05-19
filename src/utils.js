export const generateId = () => {
  return Math.random().toString(36).substring(2, 10);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const sanitizeHTML = (str) => {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const generateAIText = (keywordsArray) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const keys = keywordsArray.map(k => k.toLowerCase());
      
      const isFunny = keys.includes('funny');
      const isHeartfelt = keys.includes('heartfelt');
      const isProfessional = keys.includes('professional');
      const isShort = keys.includes('short');
      const isLong = keys.includes('long');
      const isFormal = keys.includes('formal');
      const isSarcastic = keys.includes('sarcastic');
      const isPoetic = keys.includes('poetic');
      const isInspiring = keys.includes('inspiring');
      const isCasual = keys.includes('casual');
      const isGrateful = keys.includes('grateful');
      const isSad = keys.includes('sad');
      const isExcited = keys.includes('excited');
      const isWitty = keys.includes('witty');
      
      let text = '';

      if (isSarcastic && isFunny) {
        text = "Oh great, you're leaving. Now I actually have to do my own work instead of taking credit for yours. Thanks a lot. (Just kidding, we'll miss you!)";
      } else if (isWitty) {
        text = "They say you don't know what you've got until it's gone. Well, you're not gone yet and I already miss the way you make the printer work magically.";
      } else if (isPoetic) {
        text = "Like a ship sailing to new horizons, may your journey be filled with calm seas and gentle breezes. Your legacy here will remain anchored in our hearts.";
      } else if (isInspiring) {
        text = "Never forget how capable and brilliant you are. You've inspired us all to aim higher, and I have no doubt you will achieve absolute greatness in your next chapter.";
      } else if (isGrateful) {
        text = "I am so immensely grateful for everything you've done. Your patience, your guidance, and your friendship have meant the world to me.";
      } else if (isSad) {
        text = "It breaks my heart to see you go. This place just won't be the same without your bright energy and constant support.";
      } else if (isExcited) {
        text = "I am SO incredibly excited for you! This new opportunity sounds absolutely amazing and you are going to crush it!";
      } else if (isFunny) {
        text = "I was going to write something really touching and emotional, but then I remembered you're the reason I drink so much coffee. Just kidding! Please don't forget us when you're famous!";
      } else if (isHeartfelt) {
        text = "It's hard to put into words how much your presence has meant to this team. You've brought so much warmth and dedication to everything you've touched.";
      } else if (isProfessional || isFormal) {
        text = "It has been a profound privilege working with you. Your professionalism, strategic thinking, and dedication to excellence have set a high standard for all of us.";
      } else if (isCasual) {
        text = "Hey! It's been awesome working together. Definitely going to miss having you around the office. Keep in touch!";
      } else {
        text = "Thank you for being such an incredible part of the team. We will miss you!";
      }

      const customKeys = keys.filter(k => !['funny', 'heartfelt', 'professional', 'short', 'long', 'formal', 'sarcastic', 'poetic', 'inspiring', 'casual', 'grateful', 'sad', 'excited', 'witty', 'memories', 'inside joke'].includes(k));
      if (customKeys.length > 0) {
        text += ` Especially when it comes to ${customKeys.join(' and ')}.`;
      }

      if (keys.includes('memories') && !isShort) {
        text += " I'll never forget all the great times we shared, especially during those crazy late-night projects.";
      }
      if (keys.includes('inside joke') && !isShort) {
        text += " (And don't worry, your secret about the breakroom coffee machine is completely safe with me!)";
      }
      if (isLong && !isShort) {
        text += " Working alongside you has truly been one of the highlights of my career. I've learned so much from your approach to problem-solving and your unwavering positivity. No matter where life takes you, I hope you look back on your time here fondly. Wishing you the absolute best in all your future endeavors. You are going to do amazing things!";
      }
      
      resolve(text);
    }, 800);
  });
};

export const generateAIImageUrl = async (prompt) => {
  const encodedPrompt = encodeURIComponent(prompt.trim());
  const randomSeed = Math.floor(Math.random() * 1000000);
  // Use the standard high-speed pollinations.ai endpoint
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?nologo=true&seed=${randomSeed}`;
};

// Extremely robust, highly relevant curated gallery system
const IMAGE_DATABASE = {
  farewell: [
    'https://images.unsplash.com/photo-1460570081702-8c17b88bb194?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1506869640319-ce1a18b90b17?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1484807352052-23338990c6c6?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1494178270175-e96de2971df9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80'
  ],
  birthday: [
    'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1530103862676-de8892b12a15?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?auto=format&fit=crop&w=600&q=80'
  ],
  party: [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1472653431158-6364773b2a56?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=600&q=80'
  ],
  office: [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80'
  ],
  flowers: [
    'https://images.unsplash.com/photo-1490750967868-88cb44cb2753?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1457089328109-e5d9f4e8b3e1?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1563241527-3004b7be023b?auto=format&fit=crop&w=600&q=80'
  ],
  funny: [
    'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80', // Cat with glasses
    'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=600&q=80', // Pug
    'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=600&q=80', // Cat looking funny
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80' // Dog with tongue out
  ],
  default: [
    'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=600&q=80', // Sunset
    'https://images.unsplash.com/photo-1506744626753-1fa44df14dd5?auto=format&fit=crop&w=600&q=80', // Mountains
    'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80', // Sparklers
    'https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?auto=format&fit=crop&w=600&q=80' // Confetti
  ]
};

export const getPublicImages = (term) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const search = term.toLowerCase();
      let matchedImages = [];
      
      if (search.includes('birthday') || search.includes('cake')) {
        matchedImages = IMAGE_DATABASE.birthday;
      } else if (search.includes('farewell') || search.includes('leave') || search.includes('bye')) {
        matchedImages = IMAGE_DATABASE.farewell;
      } else if (search.includes('party') || search.includes('celebrat')) {
        matchedImages = IMAGE_DATABASE.party;
      } else if (search.includes('work') || search.includes('office') || search.includes('colleague')) {
        matchedImages = IMAGE_DATABASE.office;
      } else if (search.includes('flower') || search.includes('bouquet')) {
        matchedImages = IMAGE_DATABASE.flowers;
      } else if (search.includes('funny') || search.includes('dog') || search.includes('cat') || search.includes('pet')) {
        matchedImages = IMAGE_DATABASE.funny;
      } else {
        matchedImages = IMAGE_DATABASE.default;
      }
      
      // Shuffle the results so it doesn't always look the exact same
      const shuffled = [...matchedImages].sort(() => 0.5 - Math.random());
      resolve(shuffled.slice(0, 4));
    }, 300);
  });
};
