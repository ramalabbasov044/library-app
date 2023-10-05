let globalData;
let searchBook = (book_name) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${book_name}`)
        .then((res) => res.json())
        .then((data) => {
            let book_result = data.items.map((book_item) =>
                `
                    <div data-book-id='${book_item.id}' onclick="getData('${book_item.id}')" id="admin_result_item" class="admin_result_item">
                        <img src="../assest/icons/admin/search/history.svg" alt="">
                        ${book_item.volumeInfo.title}
                    </div>
                `
            ).join("");
        admin_result.innerHTML = book_result;
    });
}

let getData = (bookId) => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
    .then((res) => res.json())
    .then((data) => {
        book_name_input.value = data.volumeInfo.title
        book_author_input.value = data.volumeInfo.authors[0]
        book_img_input.value = data.volumeInfo.imageLinks?.thumbnail
        book_description_textarea.value = data.volumeInfo.description
        admin_search_input.value = data.volumeInfo.title
        globalData = data
    });
}

add_book_type.addEventListener('click',function(e){
    e.preventDefault()
    admin_book_overlay.classList.add("show")
})

add_type_button.addEventListener('click',function(e){
    e.preventDefault()
    admin_dropdown_active_item.innerText = type_input.value
    admin_book_overlay.classList.remove("show")
})