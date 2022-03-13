var titlePage = document.querySelector('title').innerHTML.toString().toLowerCase();

fetch('/mratomgames/gamesdata.json')
.then((response) => response.json())
.then((database) => 
{    
    let titleName = titlePage.split(' - ');
    let gameName =  titleName[0].replace(' ', '-'); // mortal run, im king, etc
    let section =  titleName[1].replace(' ', '-'); // updates or credits
    
    let gameInfo = database[gameName];
    let webContent = gameInfo[section];

    let updatesWrapper = document.getElementById('updates');

    //add game name in official game name with text style!
    let official_name_style = document.getElementById("official-game-name");
    official_name_style.setAttribute("src", `/mratomgames/games/${gameName}/images/name-style.png`);
    
    //add game name in the portal!
    let game_name_title = document.getElementById("game-name");
    game_name_title.innerHTML = gameInfo.name

    // Load Updates Information
    if (section == 'updates')
    {
        //add updates content!
        function createUpdateData(updateData=document.createElement('div'), templateData={}) {
            updateData.innerHTML += `
                <h4 class='update-name'>${templateData.name}</h4>
                <h5 class='update-launch'>Launched on: ${templateData.launched}</h5>
                <h5 class='update-version'>Version: ${templateData.version}</h5>
            `
            updateData.classList.add('element_animated');
            updateData.classList.add('update-data-wrapper');

            let updateDetails = document.createElement('ul');
            updateDetails.classList.add('update-data');

            templateData.update_data.forEach((detail) => {
                updateDetails.innerHTML += `<li class='update-detail'>${detail}</li>`
            })

            updateData.appendChild(updateDetails);

            if (templateData.update_thumbnails.length > 0) {
            

                templateData.update_thumbnails.forEach((thumbailData) => {
                    updateData.innerHTML += `
                        <img src='${thumbailData.source}' alt=':c'>
                        <p class='thumbnail-name'>${thumbailData.name}<p>
                    `
                })
            }

            updatesWrapper.appendChild(updateData);
            return updateData;
        }
        let recentUpdate = webContent[0];        
        let recentUpdateDiv = document.createElement('div');
        recentUpdateDiv.setAttribute('id', 'current-update');
            recentUpdateDiv.innerHTML += `
            <h2>CURRENT UPDATE</h2>
        `
        createUpdateData(recentUpdateDiv, recentUpdate);

        for (let i=1; i < webContent.length; i++) 
        {
            let lastUpdateInfo = webContent[i];
            createUpdateData(undefined, lastUpdateInfo);
        }  
    } 

    // Load Crdits Information
    if (section == 'credits') 
    { 
        let credits = document.getElementById('credits-wrapper');
        webContent.forEach(function(helperData, helper_id){
            credits.innerHTML += `
                <div id="${helper_id}" class='helper-data element_animated'>
                    <img class='helper-avatar' src="${helperData.avatar}"/>

                    <div class='helper-details'>
                        <h3>${helperData.autor}</h3>
                        <h4>${helperData.role}</h4>
                        <ul class='helper-works'></ul>
                        <div class='helper-social-media'></div>
                    </div>
                </div>
            `
            let helperCredits = document.getElementById(helper_id);
            let works = helperCredits.querySelector('.helper-works');

            helperData.works.forEach(function(work){
                works.innerHTML += `<li>${work}</li>`
            })

            let social_media_wrap = helperCredits.querySelector('div .helper-social-media');
            helperData.social_media.forEach(function(social_network){
                let img_source = helperData.avatar;
                if (social_network.includes('youtube')) 
                {
                    img_source = "/mratomgames/icons/youtube.jpg";
                } else if(social_network.includes('twitter'))
                {
                    img_source = "/mratomgames/icons/twitter.png";
                } else if(social_network.includes('roblox'))
                {
                    img_source = "/mratomgames/icons/roblox.png";
                }
                
                social_media_wrap.innerHTML += `
                    <a href="${social_network}" target="_blank">
                        <img class="helper-social-network" src='${img_source}' alt='${img_source} not loaded! :c'/>
                    </a>`
            })
        })
    }
    // changging background!
    let gamePicture = gameInfo.pictures;
    let gameBackground = document.getElementById('game-thumnails');
    let picture_index = 0;
    let picture_intermission = 3000;

    function changeBackground() {
        picture_index++;

        if (picture_index == gamePicture.length) 
        {
            picture_index = 0;
        }
        gameBackground.style.backgroundImage = `url(${gamePicture[picture_index]})`
    }
    changeBackground() // first callback!
    setInterval(changeBackground, picture_intermission);
})

/*
{
'version':'',
'name':'',
'launched':'',
'update_data':[
    'New Water Terrain uptimized 🌊⛰️',
    'Images in Challenge System! 🖼️',
    'Spectecte mode [Beta] - bug fixed about lighting! 👁️‍🗨️'
],
'update_thumbnails':[
    {
        'name':'',
        'thumbnail_name':'' 
    }
]
}
*/