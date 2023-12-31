let globalData;

const loadingSpinner = document.getElementById('loading-spinner');

const searchBook = async (book_name) => {
    try {
        loadingSpinner.style.display = 'block'; // Show the loading spinner
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${book_name}`);
        const data = await response.json();
        
        const book_result = data.items.map((book_item) =>
            `
                <div onclick="getData('${book_item.id}')" id="admin_result_item" class="admin_result_item">
                    <img src="../assest/icons/admin/search/history.svg" alt="">
                    ${book_item.volumeInfo.title}
                </div>
            `
        ).join("");
        
            
            admin_result.innerHTML = book_result;
    } catch (error) {
        console.error(error);
    } finally {
        loadingSpinner.style.display = 'none'; // Hide the loading spinner
    }
}

const getData = async (bookId) => {
    try {
        loadingSpinner.style.display = 'block'; // Show the loading spinner
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        const data = await response.json();
        
        book_name_input.value = data.volumeInfo.title;
        book_author_input.value = data.volumeInfo.authors[0];
        book_img_input.value = data.volumeInfo.imageLinks?.thumbnail;
        book_description_textarea.value = removeTags(data.volumeInfo.description);
        admin_search_input.value = data.volumeInfo.title;
        globalData = data;
    } catch (error) {
        console.error(error);
    } finally {
        loadingSpinner.style.display = 'none'; // Hide the loading spinner
    }
}

add_book_type.addEventListener('click', function (e) {
    e.preventDefault();
    admin_book_overlay.classList.add("show");
});

function upperCase(str) {
    return str[0].toUpperCase() + str.slice(1);
}

add_type_button.addEventListener('click', function (e) {
    e.preventDefault();
    admin_dropdown_active_item.innerText = upperCase(type_input.value);
    admin_book_overlay.classList.remove("show");
});

admin_dropdown_active_item.addEventListener('click', function () {
    admin_dropdown_item_main.classList.toggle("active")
});
