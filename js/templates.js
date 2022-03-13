let templates = {
    head: {
        head: 
        `
            <!-- Normal Text -->
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&family=IBM+Plex+Sans+KR:wght@300&display=swap" rel="stylesheet">

            <!-- Main titles -->
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@700&display=swap" rel="stylesheet">

            <link rel="stylesheet" href="/mratomgames/css/font.css">  
            <link rel="stylesheet" href="/mratomgames/css/normalize.css">  
            <link rel="stylesheet" href="/mratomgames/css/scrollanims.css">

            <link rel="shortcut icon" href="/mratomgames/icons/websitelogo.png">
        `
    },

    header: {
        head:
        `
        <link rel="stylesheet" href="/mratomgames/css/header.css">
        `,
        template_body: 
        `
        <div id="logo">
            <a href="/mratomgames/" id="mratomgames-header">
                <img src="/mratomgames/icons/websitelogo.png" alt="MrAtomLogo.png">
                <span>MrAtom Games</span>
            </a>
        </div>
        `
    },

    footer: {
        head:
        `
        <link rel="stylesheet" href="/mratomgames/css/footer.css">
        `,
        template_body: 
        `
        <div id="about" class="element_animated">
            <img id="mr-atom-avatar" src="https://tr.rbxcdn.com/276c956d58c948d316b0522f3971925c/150/150/AvatarHeadshot/Png" alt=":C">
            
            <div id="info">
                <h1>MrAtom_Official</h1>
                <h3>@MrAtom_Official</h3>
                <p id='message'>
                    Hello everyone! 👋, <br/>
                    This is my official web page where my games, their updates and more. Don't forget to follow us on our official pages! 💛
                </p>
            </div>
        </div>

        <div id="social-media-block" class="element_animated">
            <h1>Follow us!</h1>
            <div id="social-media">
                <a href="https://twitter.com/MrAtomOfficial1" target="_blank">
                    <img src="/mratomgames/icons/twitter.png" alt="Twitter Logo">
                </a>
                <a href="https://www.roblox.com/users/1658144627/profile" target="_blank" rel="noopener noreferrer">
                    <img src="/mratomgames/icons/roblox.png" alt="Roblox logo">
                </a>
            </div>
        </div>
        `
    },
}

let head = document.querySelector("head");
function setTemplate(templateName) 
{
    let templateData = templates[templateName];
    let headContent = head.innerHTML;
    head.innerHTML = ``;

    head.innerHTML = templateData.head;
    head.innerHTML += headContent;

    let elementToFill = document.querySelector(templateName);
    if (templateData.template_body && elementToFill)
    {
        elementToFill.innerHTML += templateData.template_body
    }
}

setTemplate("head") // default head settings: font, normalize, etc
setTemplate("footer") // footer template
setTemplate("header") // header template

let pageHeader = document.querySelector("header");
if (pageHeader) {
    // scrolling effect
    let lastYOffset = window.pageYOffset;
    window.addEventListener('scroll', function(){
        let displacement = window.pageYOffset;
        
        if(lastYOffset >= displacement){
            pageHeader.classList.add('header-hidden');
        } else {
            pageHeader.classList.remove('header-hidden');
        }

        if (displacement == 0) {
            setTimeout(function(){
                if(lastYOffset == 0) {
                    pageHeader.classList.remove('header-hidden');
                }
            }, 2000)
        }

        lastYOffset = displacement;
    })
}