
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame(){
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeindex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeindex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    textNode.options.forEach(option => {
        if (showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option){
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1, 
        text: 'Welcome to fog.',
        options: [
            {
                text: 'Start.',
                setState: {light: true, match: true, latern: true},
                nextText: 2
            }
        ]
    },

    {
      id: 2,
      text: 'You wake up in a forest; there is a fog. You have seen fog for years, you have memorized the routes to navigate. You are surrounded by the laterns, a match, and back ups you have obtained for your normal journey. You are currently lying down.',
        options: [
            {
                text: 'Get up.',
                nextText: 3
            }

        ]
    },

	{

		id: 3,
		text: 'You get up and light up your latern. You begin walking towards your normal direction, when you see someone familiar. A close friend of yours. You rarely see them here. They seem lost with no light. Do you help?',
        	options: [
			{
                text: 'Immediately help your friend.',
                requiredState: (currentState) => currentState.match,
                setState: {light: true, match: false, latern: true},
                nextText: 4
            },

            {
                text: 'Ask your friend where they are going.',
                setState: {light: true, match: true, latern: true},
                nextText: 5
            }

	        ]
	}
]
startGame()