const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

console.log(quoteContainer);

let apiQuotes = [];

// Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  loading();
  // to pick a random quote from quote arrays
  let randomQuote = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[randomQuote];
  console.log(quote);

  // Check if Author Field is Blank and replace it with Unknown
  function fixAuthorName() {
    let fixedAuthor = quote.author.replace(', type.fit', '');
    if (fixedAuthor === 'type.fit') {
      fixedAuthor = 'Unknown Author';
    }
    return fixedAuthor;
  }
  authorText.textContent = fixAuthorName();

  // Check quote length to determine styling
  if (quote.text.length > 50) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Set Quote, Hide Loader

  quoteText.textContent = quote.text;
  complete();
}

// Get quotes From Api
async function getQuotes() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Handle error here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load

// complete();
getQuotes();
