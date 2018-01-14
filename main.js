document.getElementById("myForm").addEventListener('submit', saveBookmark);

function reload(){
    window.location.href = "index.html";
}

function saveBookmark(e){
    e.preventDefault();

    let siteName = document.getElementById('webName').value;
    let siteUrl = document.getElementById('siteurl').value;

    let bookmark = {
        name: siteName,
        url: siteUrl
    }
    
    if(localStorage.getItem("bookmarks") === null){

        let bookmarks = [];

        bookmarks.push(bookmark);

        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }else{
        let bookmarkss = JSON.parse(localStorage.getItem("bookmarks"));

        bookmarkss.push(bookmark);

        localStorage.setItem("bookmarks", JSON.stringify(bookmarkss));

    }
    swal("Very Nice!", "Bookmark Added!", "success");
    document.getElementById("myForm").reset();
}

function fetchBookmark(){
    let theBookmarked = JSON.parse(localStorage.getItem("bookmarks"));

    let bookmarkDiv = document.getElementById('bookmark-list');
    for(var i=0; i < theBookmarked.length; i++ ){
        var name = theBookmarked[i].name;
        var url = theBookmarked[i].url;

        bookmarkDiv.innerHTML += `
        
         <div class="card text-primary bg-link mb-3 " style="max-width: 30rem; ">

                    <div class="card-body">
                        <h4 class="card-title">`+ name+`</h4>
                        <a  class="btn btn-outline-primary" href="`+
                        url+`" target="_blank">Visit</a>
                        <button type="button" class="btn btn-outline-danger" onclick="deleteBookmark(`+
                        i +`)">Remove</button>

                    </div>

                </div>
        
        `;

    }
}
function deleteBookmark(id){
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    for (var i = 0; i < bookmarks.length; i++) {
        if(i == id){
            bookmarks.splice(id,1);
        }
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  
    swal("Very Nice!", "Bookmark Deleted!", "success");
}