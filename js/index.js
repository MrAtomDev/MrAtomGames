var distance = 600;

window.addEventListener('scroll', () => {
    var screenHeight = screen.height;
    if(screenHeight <= 1024) 
    {
        screenHeight = 100;
    }

    var elementsAnimated = document.querySelectorAll('.element_animated');

    elementsAnimated.forEach((element) => {
        let elementPosition = element.getBoundingClientRect().top;
        if (elementPosition <= distance) {
            element.classList.add('visible-animation');
        } else {
            element.classList.remove('visible-animation');
        }
    })
})

// Fill games information from database ONLY home page!
var titlePage = document.querySelector('title').innerHTML.toString().toLowerCase();
if(titlePage.includes('home') || titlePage.includes('404'))
{   
    fetch('gamesdata.json')
    .then((response) => response.json())
    .then((data) => 
    {
        if (titlePage.includes('home')) 
        {
            let mratomgames = Object.keys(data);
    
            for(let i=0; i < mratomgames.length; i++){
                let game = mratomgames[i];
                let gameInfo = data[game];
    
                let gameIcon = document.querySelector(`#${game} > img`);
                let gameName = document.querySelector(`#${game} > h1`);
                let gameDescription = document.querySelector(`#${game} > .description`);
    
                gameIcon.setAttribute('src', gameInfo.icon);
                gameName.innerHTML = gameInfo.name;
                gameDescription.innerHTML += gameInfo.description;
            }   
        }

        let pictures = [];  
        for (gameName in data) {
            let gameInfo = data[gameName];

            gameInfo.pictures.forEach((picturePath) => {
                pictures.push(picturePath);
            })
        }
        let body_background = document.querySelector("#main-background");
        let picture_index = 0;
        
        function changeBackground() {
            picture_index++;

            if (picture_index == pictures.length) 
            {
                picture_index = 0;
            }
            body_background.style.backgroundImage = `url(${pictures[picture_index]})`
        }

        changeBackground() // first callback!
        setInterval(changeBackground, 3000);
    })
}