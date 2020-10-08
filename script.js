const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show loader (hide quote)
function showLoadingSpinner() {
    console.log('loading')
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// show quote (hide loader)
function removeLoadingSpinner() {
    console.log('complete')
    if (!loader.hidden){
        console.log('what?')
        quoteContainer.hidden = false;
        loader.hidden = true;
    } 
}

// Get quote from API
async function getQuote() {
    showLoadingSpinner();
    //const proxyURL = 'https://cors-anywhere.herokuapp.com/'
    const proxyURL = 'https://glacial-hollows-44805.herokuapp.com/'
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch (proxyURL + apiURL);
        const data = await response.json();
        //console.log(data);
        if (data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // reduce font size for long quotes
        if (data.quoteText.length > 120){
            quoteText.classList.add('long-quote')
        } else {
            console.log('short quote')
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText
        // stop loader show quote
        removeLoadingSpinner();
    } catch (err) {
        getQuote();
        console.log('whooops, no quote', err)
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURL, '_blank'); // open window in a new tab!
}

// Event Listeners
newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);

console.log('start...')
getQuote();
