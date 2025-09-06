const loadLessons = ()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all') //promise of response
    .then(res=> res.json()) // promise of json data
    .then(json => displayLessons(json.data));

}

const loadLevelWord = (id)=>{
    const url =`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res=> res.json())
    .then(json => displayLevelWord(json.data))
    
    
}

const displayLevelWord = (words)=>{
  const wordContainer = document.getElementById("word-container");
//   wordContainer.innerHTML = '';
  
  for(let word of words){
    console.log(word);

    const card = document.createElement("div")
    card.innerHTML = `
     <p>Cat</p>
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
    <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
    <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
    </button>
    `

    levContainer.append(btnDiv)
  }
}

loadLessons();