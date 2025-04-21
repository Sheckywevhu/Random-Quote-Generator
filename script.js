// DOM Elements
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote');
const tweetBtn = document.getElementById('tweet-quote');

// Fallback quotes array
const fallbackQuotes = [
    {
        content: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        content: "Life is what happens when you're busy making other plans.",
        author: "John Lennon"
    },
    {
        content: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        content: "Be the change that you wish to see in the world.",
        author: "Mahatma Gandhi"
    },
    {
        content: "In the middle of every difficulty lies opportunity.",
        author: "Albert Einstein"
    }
];

// Function to get a random quote from the fallback array
function getRandomFallbackQuote() {
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    return fallbackQuotes[randomIndex];
}

// Function to fetch a random quote
async function getQuote() {
    try {
        // Show loading state
        quoteText.textContent = 'Loading...';
        quoteAuthor.textContent = '- Loading';
        
        // Try to fetch from API first
        const response = await fetch('https://api.quotable.io/random');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Update the quote text and author
        quoteText.textContent = data.content;
        quoteAuthor.textContent = `- ${data.author}`;
        
        // Update tweet button with current quote
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${data.content}" - ${data.author}`)}`;
        tweetBtn.setAttribute('href', tweetUrl);
    } catch (error) {
        console.error('Error fetching quote:', error);
        
        // Use fallback quote if API fails
        const fallbackQuote = getRandomFallbackQuote();
        quoteText.textContent = fallbackQuote.content;
        quoteAuthor.textContent = `- ${fallbackQuote.author}`;
        
        // Update tweet button with fallback quote
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${fallbackQuote.content}" - ${fallbackQuote.author}`)}`;
        tweetBtn.setAttribute('href', tweetUrl);
    }
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);

// Initial quote load
getQuote(); 