const loadLessons = ()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all') //promise of response
    .then(res=> res.json()) // promise of json data
    .then(json => displayLessons(json.data));

}

const removeActive = ()=>{

  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn)=> btn.classList.remove("active"));
};
const loadLevelWord = (id)=>{
    const url =`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res=> res.json())
    .then(json => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`)
      clickBtn.classList.add('active')
       displayLevelWord(json.data)
    }

    )
    
    
}

const loadWordDetail= async(id)=>{
  const url = `https://openapi.programming-hero.com/api/word/${id}`
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetail(details.data)
}

const displayWordDetail = (word)=>{
  console.log(word);
  
}
const displayLevelWord = (words)=>{
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = '';

  if(words.length == 0){
     wordContainer.innerHTML = `
      <div class="text-center col-span-full">
        <img src="./assets/alert-error.png" class="mx-auto" alt="">
        <p class="font-bangla text-[#79716B] text-[15px] font-medium my-4">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bangla font-medium text-4xl">নেক্সট Lesson এ যান</h2>
      </div>
     `
  }

//   {
//     "id": 80,
//     "level": 1,
//     "word": "Run",
//     "meaning": "দৌড়ানো",
//     "pronunciation": "রান"
// }
  
  for(let word of words){
    console.log(word);

    const card = document.createElement("div")
    card.innerHTML = `
    <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি" }"</div>

        <div class="flex justify-between items-center">
          <button onClick="loadWordDetail(${word.id})" class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `
    wordContainer.append(card)
    }
}

const displayLessons = (lessons)=>{
  // 1. Get the container and empty
  const levContainer = document.getElementById("level-container");
  levContainer.innerHTML = '';

  for (let lesson of lessons){
    console.log(lesson);
    
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
    <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
    </button>
    `

    levContainer.append(btnDiv)
  }
}

loadLessons();