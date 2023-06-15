
/* opening and closing the burger menu */
function openMenu() {
    document.body.classList += " menu--open"
}


function closeMenu() {
    document.body.classList.remove("menu--open")
}

// making our books a global variable so we dont await it everytime the page refreshes.
let books;


/* rendering books according to filters  */
async function renderBooks(filter) {
    const booksWrapper = document.querySelector(".books");

    booksWrapper.classList += ' books_loading';

    if (!books)
    {
      books = await getBooks();
    }
    
    booksWrapper.classList.remove('books_loading');

    // applying the filters by changing the way elements are sorted
    // inside the books variable which has the array with all the books.
    // for comparing the price sometimes there is no sale so we check if saleprice
    // is available OR original price and we compare according to what we have.
    // in the end if there is a sale price the user will pay the sale not the original price.
    // and the OR operator always takes the first variable if it exists. 
    if (filter === "LOW_TO_HIGH"){
        books.sort((a,b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
    } else if (filter === "HIGH_TO_LOW") {
        books.sort((a,b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
    } else if (filter === "RATING") {
        books.sort((a,b) => b.rating - a.rating);
    }

    const booksHtml = books.map((book) => {
        // every return saves the html of each book inside booksHtml
        // and everything gets joined together in the end
        return `
        <div class="book">
            <figure>
                <img src="./${book.url}" alt="">
            </figure>

            <h6>${book.title}</h6>
            <div class="book_rating">
                ${ratingHTML(book.rating)}
            </div>

            <div class="prices">

                ${findSale(book.originalPrice, book.salePrice)}
            </div>
        </div>
        `
    }).join("");
    // join is a function for arrays that joins everything to one string
    // this string will be passed into bookWrapper.innerHTML 
    // to view all the books

    booksWrapper.innerHTML = booksHtml;
    
}

// setTimeout makes the func renderBooks render lastly after
// everything else was rendered so we avoid errors that could occure becase they have't loaded yet
// because javascript always loads the fastest so we push it to the end after everything else loads
setTimeout(() => {
    renderBooks();
});


function filterBooks(event)
{
    renderBooks(event.target.value);
}

// this functions put the rating stars in a dynamic way according to the data of 
// each book inside the function getBooks
function ratingHTML(rating)
{
    let ratingHtml = "";
    for (let i =0; i < Math.floor(rating); i++)
    {
        ratingHtml += '<i class="fas fa-star"></i>';
    }

    if (!Number.isInteger(rating))
    {
        ratingHtml += '<i class="fas fa-star-half-alt"></i>';
    }

    return ratingHtml;
}

// this function checks if the book has a sale, if so
// we display the original price and the sale price.
// if not we display just the original price
function findSale(originalPrice, salePrice)
{
    if (salePrice === null)
    {
        return `
        <div class="current_price">
            <p>$${originalPrice.toFixed(2)}</p>
        </div>
        `
    } else {
        return `
        <div class="discount">
            <p>$${originalPrice.toFixed(2)}</p>
        </div>

        <div class="current_price">
            <p>$${salePrice.toFixed(2)}</p>
        </div>
        `
    }
}

// FAKE DATA for the books
// this returns an array with the data of the books that we want to display
// this function is changed from returning a regular array into returning a promise and 
// when the promise is resolved it will return the array as a response so we mock how an API
// works and we can implement a loading state until the data is fetched .
// also since we are fetching data this will change the renderBooks function to an async await function.
function getBooks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: "Crack the Coding Interview",
            url: "assets/crack the coding interview.png",
            originalPrice: 49.95,
            salePrice: 14.95,
            rating: 4.5,
          },
          {
            id: 2,
            title: "Atomic Habits",
            url: "assets/atomic habits.jpg",
            originalPrice: 39,
            salePrice: null,
            rating: 5,
          },
          {
            id: 3,
            title: "Deep Work",
            url: "assets/deep work.jpeg",
            originalPrice: 29,
            salePrice: 12,
            rating: 5,
          },
          {
            id: 4,
            title: "The 10X Rule",
            url: "assets/book-1.jpeg",
            originalPrice: 44,
            salePrice: null,
            rating: 4.5,
          },
          {
            id: 5,
            title: "Be Obsessed Or Be Average",
            url: "assets/book-2.jpeg",
            originalPrice: 32,
            salePrice: 17,
            rating: 3.5,
          },
          {
            id: 6,
            title: "Rich Dad Poor Dad",
            url: "assets/book-3.jpeg",
            originalPrice: 70,
            salePrice: 12.5,
            rating: 5,
          },
          {
            id: 7,
            title: "Cashflow Quadrant",
            url: "assets/book-4.jpeg",
            originalPrice: 11,
            salePrice: null,
            rating: 3.5,
          },
          {
            id: 8,
            title: "48 Laws of Power",
            url: "assets/book-5.jpeg",
            originalPrice: 38,
            salePrice: 17.95,
            rating: 4.5,
          },
          {
            id: 9,
            title: "The 5 Second Rule",
            url: "assets/book-6.jpeg",
            originalPrice: 35,
            salePrice: 14,
            rating: 4,
          },
          {
            id: 10,
            title: "Your Next Five Moves",
            url: "assets/book-7.jpg",
            originalPrice: 40,
            salePrice: null,
            rating: 2.5,
          },
          {
            id: 11,
            title: "Mastery",
            url: "assets/book-8.jpeg",
            originalPrice: 30,
            salePrice: 20,
            rating: 2,
          },
        ])
      }, 1000)
    })
}
  