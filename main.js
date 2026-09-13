const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const startbtn = document.getElementById('getStartedBtn');
const publishBtn = document.getElementById('publishBtn');

if (startbtn) {
    startbtn.addEventListener('click', () => {
        if (page1) page1.classList.add('hidden');
        if (page2) page2.classList.remove('hidden');
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

    const bookCard = document.createElement('article');
    bookCard.className = 'book-card';
    bookCard.id = uniqueId;
    bookCard.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
        <div class="comment-section">
            <h4>Comments</h4>
            <div class="comments-container" id="comments-${uniqueId}"></div>
            <textarea class="comment-input" placeholder="Write a comment..."></textarea>
            <button type="button">Post Comment</button>
        </div>
        <button type="button" class="delete-btn" onclick="deleteBook('${uniqueId}')">Delete</button>
    `;

    bookList.appendChild(bookCard);
    titleField.value = '';
    contentField.value = '';
}

function deleteBook(id) {
    const bookCard = document.getElementById(id);
    if (bookCard) {
        bookCard.remove();
    }
}