
// fatch and load a data


// create loadCategories
const loadCategories = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error))
};

// create loadVideos
const loadVideos = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch(error => console.log(error))
};

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
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact ";
    card.innerHTML = `
      <figure>
    <img
      src= ${video.thumbnail} alt="thumbnail"/>
  </figure>
  <div class="card-body">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
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

    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;

    // add button to categories container 

    categoryContainer.append(button);
  });
};








loadCategories();
loadVideos();