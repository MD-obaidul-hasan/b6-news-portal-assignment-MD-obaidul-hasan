const dataSection = document.getElementById('data-section');
const searchResult = document.getElementById('search-result');
const modalDetails = document.getElementById('modal-section');

const loadAllcategories = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await response.json();
    return data;
}

const newsDetails = async (id) => {
    modalDetails.innerHTML = '';

    const response = await fetch(`https://openapi.programming-hero.com/api/news/${id}`);
    const data = await response.json();
    console.log(data?.data[0]);

    const div = document.createElement('div');
    modalDetails.innerHTML = `
    
    <figure><img src="${data?.data[0]?.image_url}" alt="car!"></figure>
    <div class="card-body">
        <h2 class="card-title">${data?.data[0]?.title}</h2>
        <p>${data?.data[0]?.details}</p>

        <div class="flex justify-between items-center mt-4">

            <div class="flex gap-3 items-center">
                <div class="avatar">
                    <div class="w-12 rounded-full">
                        <img src="${data?.data[0]?.author?.img}" />
                    </div>
                </div>
                <div>
                    <h2 class="text-xl font-bolded">${data?.data[0]?.author?.name ? data?.data[0]?.author?.name :
            'Unknow'}</h2>
                    <p>${data?.data[0]?.author?.published_date}</p>
                </div>
            </div>

            <div class="flex gap-2">
                <div class="w-8 h-8 block">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path
                            d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z" />
                    </svg>
                </div>
                <h2 class="text-xl">${data?.data[0].total_view ? data?.data[0].total_view : 'Unknow'}</h2>
            </div>
        </div>

        <div class="flex justify-between items-center mt-4">
            <div><h2 class="text-xl">Rating: ${data?.data[0]?.rating?.number}</h2></div>
            <div><span class="badge">${data?.data[0]?.rating?.badge}</span></div>
        </div>
    </div>
    `
    // modalDetails.appendChild(div);
}

const searchResultData = (length, category) => {
    searchResult.innerText = `${length} items found for category ${category}`
};

const renderCategories = async (id, name) => {
    dataSection.innerHTML = '';
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await response.json();
    console.log(data?.data);

    searchResultData(data?.data.length, name)

    data?.data?.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card lg:card-side bg-base-100 shadow-xl my-5';
        div.innerHTML = `
        <img class="p-3 rounded" src="${item.thumbnail_url}" alt="Movie">
                <div class="card-body p-10">
                    <h2 class="font-bold text-3xl">${item.title}</h2>
                    <p  class='text-xl'>${item?.details?.slice(0, 300)}...</p>

                    <div class="flex justify-between items-center mt-4">
                        <div class="flex gap-3 items-center">
                            <div class="avatar">
                                <div class="w-12 rounded-full">
                                    <img src="${item?.author?.img}" />
                                </div>
                            </div>
                            <div>
                                <h2 class="text-xl font-bolded">${item?.author?.name ? item?.author?.name : 'Unknow'}</h2>
                                <p>${item?.author?.published_date}</p>
                            </div>
                        </div>
                        <div class="flex gap-2">
                            <div class="w-8 h-8 block">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path
                                        d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z" />
                                </svg>
                            </div>
                            <h2 class="text-xl">${item.total_view ? item.total_view : 'Unknow'}</h2>
                        </div>
                        <div class="rating">
                            <h2 class="text-xl">Rating: ${item?.rating?.number}</h2>
                            <span class="badge">${item?.rating?.badge}</span>
                        </div>
                        <div class="card-actions justify-end">
                            <label for="my-modal-3" id='modal_${item._id}'  class="btn btn-primary modal-button">Watch</label>
                        </div>
                    </div>
                </div>
        `
        dataSection.appendChild(div);
    });

    data?.data?.forEach(item => {
        return document.getElementById(`modal_${item._id}`).addEventListener('click', () => {
            newsDetails(item?._id)
            console.log(item?._id);
        })
    });
}


const setAllmenu = async () => {
    const data = await loadAllcategories();
    const menu = document.getElementById("all-menu");
    for (const categories of data?.data?.news_category) {
        const li = document.createElement("li");
        li.innerHTML = `<a id="category_${categories.category_id}">${categories.category_name}</a>`;
        menu.appendChild(li);
    }

    data?.data?.news_category.forEach(item => {
        return document.getElementById(`category_${item.category_id}`).addEventListener('click', () => {
            renderCategories(item?.category_id, item?.category_name);
            console.log(item.category_id);
        })
    });
}

setAllmenu();
renderCategories('08', ' All News');