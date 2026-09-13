const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const startbtn = document.getElementById('getStartedBtn');
const publishBtn = document.getElementById('publishBtn');

const STORAGE_KEY = 'bookBeeBooks';

if (startbtn) {
    startbtn.addEventListener('click', () => {
        if (page1) page1.classList.add('hidden');
        if (page2) page2.classList.remove('hidden');
        loadBooksFromStorage();
    });
}

if (publishBtn) {
    publishBtn.addEventListener('click', publishBook);
}

function publishBook() {
    const titleField = document.getElementById('new-book-Title');
    const contentField = document.getElementById('new-book-content');
    const bookList = document.getElementById('book-list');

    if (!titleField || !contentField || !bookList) return;

    const title = titleField.value.trim();
    const content = contentField.value.trim();

    if (!title || !content) {
        alert('Please fill in both the title and content fields.');
        return;
    }

    const uniqueId = 'book-' + Date.now();

    const bookData = {
        id: uniqueId,
        title: title,
        content: content,
        comments: []
    };

    // Save to local storage
    saveBookToStorage(bookData);

    // Render the book card
    renderBookCard(bookData, bookList);

    titleField.value = '';
    contentField.value = '';
}

function renderBookCard(bookData, bookList) {
    const bookCard = document.createElement('article');
    bookCard.className = 'book-card';
    bookCard.id = bookData.id;
    bookCard.innerHTML = `
        <h3>${bookData.title}</h3>
        <p>${bookData.content}</p>
        <div class="comment-section">
            <h4>Comments</h4>
            <div class="comments-container" id="comments-${bookData.id}"></div>
            <textarea class="comment-input" placeholder="Write a comment..."></textarea>
            <button type="button" class="post-comment-btn">Post Comment</button>
        </div>
        <button type="button" class="delete-btn">Delete</button>
    `;

    // Add event listeners
    const postCommentBtn = bookCard.querySelector('.post-comment-btn');
    const commentInput = bookCard.querySelector('.comment-input');
    const deleteBtn = bookCard.querySelector('.delete-btn');

    postCommentBtn.addEventListener('click', () => {
        addComment(bookData.id, commentInput);
    });

    deleteBtn.addEventListener('click', () => {
        deleteBook(bookData.id);
    });

    // Render existing comments
    const commentsContainer = bookCard.querySelector(`#comments-${bookData.id}`);
    bookData.comments.forEach(comment => {
        const commentEl = document.createElement('div');
        commentEl.className = 'comment';
        commentEl.textContent = comment;
        commentsContainer.appendChild(commentEl);
    });

    bookList.appendChild(bookCard);
}

function saveBookToStorage(bookData) {
    const books = getStoredBooks();
    books.push(bookData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function getStoredBooks() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

function loadBooksFromStorage() {
    const bookList = document.getElementById('book-list');
    if (!bookList) return;

    bookList.innerHTML = '';
    const books = getStoredBooks();
    books.forEach(bookData => {
        renderBookCard(bookData, bookList);
    });
}

function deleteBook(id) {
    const bookCard = document.getElementById(id);
    if (bookCard) {
        bookCard.remove();
    }

    // Remove from local storage
    let books = getStoredBooks();
    books = books.filter(book => book.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function addComment(bookId, commentInput) {
    const comment = commentInput.value.trim();
    
    if (!comment) {
        alert('Please write a comment.');
        return;
    }

    // Update local storage
    let books = getStoredBooks();
    const book = books.find(b => b.id === bookId);
    if (book) {
        book.comments.push(comment);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    }

    // Update UI
    const commentsContainer = document.getElementById(`comments-${bookId}`);
    const commentEl = document.createElement('div');
    commentEl.className = 'comment';
    commentEl.textContent = comment;
    commentsContainer.appendChild(commentEl);

    commentInput.value = '';
}
