//time get function

function getTimeString(time) {
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = minute % 60;
  return `${hour} hour ${minute} minute ${remainingSecond} second ago `;
}

const removeClass = () => {
  const buttons = document.getElementsByClassName("btn-category");
  for(let btn of buttons){
    btn.classList.remove("active");
  }
}
// fetch and load a data

// create loadCategories
const loadCategories = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error))
};

const loadDetails =async (videoId) =>{
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.video);

};

const displayDetails =(video) =>{
  const detailContainer = document.getElementById('modal-content');

  detailContainer.innerHTML =`
    <img src="${video.thumbnail}"/>
    <p> ${video.description}</p>
  `;
  // way -- 01 
  // document.getElementById("showModalData").click();
  // way -- 02
  document.getElementById('customModal').showModal();
}
// create loadVideos
const loadVideos = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch(error => console.log(error))
};

const loadCategoriesVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {

      // all class remove 
      removeClass();

      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch(error => console.log(error))
}

const demo = {

  "category_id": "1003",
  "video_id": "aaaf",
  "thumbnail": "https://i.ibb.co/5LRQkKF/stick-and-stones.jpg",
  "title": "Sticks & Stones",
  "authors": [
    {
      "profile_picture": "https://i.ibb.co/rdTZrCM/dev.jpg",
      "profile_name": "Dave Chappelle",
      "verified": true
    }
  ],
  "others": {
    "views": "113K",
    "posted_date": ""
  },
  "description": "Dave Chappelle's 'Sticks & Stones' has garnered 113K views and remains a controversial yet highly engaging piece of stand-up comedy. Known for his fearless approach, Dave dives into a wide range of topics, delivering his unique perspective with wit and sharp humor. As a verified artist, Dave's comedy is raw, honest, and unapologetically funny."
}


// create displayVideos

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = " ";

  if (videos.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
      <div class=" min-h-[300px] flex flex-col gap-5 justify-center items-center">
      <img  src="assets/Icon.png"/>
      </div>
      <h2 class="text-center text-xl font-extrabold">
      No Content Here This Category
      </h2>

    `;
    return;
  }
  else {
    videoContainer.classList.add("grid");
  }
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact ";
    card.innerHTML = `
      <figure class="h-[200px] relative">
    <img class="h-full w-full object-cover"
      src= ${video.thumbnail} alt="thumbnail"/>
      ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black rounded text-sm p-1 text-white">${getTimeString(video.others.posted_date)}</span>`
      }
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
    <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}" />
    </div>
    <div>
    <h2 class="font-bold">${video.title}</h2>
    <div class="flex item-center gap-2">
    <p class="text-gray-400">${video.authors[0].profile_name}</p>
    ${video.authors[0].verified ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : " "}
    </div>
    <p> <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">Details</button></p>
    </div>
  </div>
      `;
    videoContainer.append(card);
  });
};


// create displayCategories 

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");

  categories.forEach((item) => {
    console.log(item);

    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `

    <button id="btn-${item.category_id}" onclick="loadCategoriesVideos(${item.category_id})" class = "btn btn-category">
      ${item.category}
    </button>
    
    `;

    // add button to categories container 

    categoryContainer.append(buttonContainer);
  });
};








loadCategories();
loadVideos();