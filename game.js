const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const backElement = document.getElementById('back')

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
	    },
    {
      id: 4,
      text: 'You immediately rush over to your friend and give them a match. You tell them...',
      options: [
        {
          text: 'Where in the hell do you think you were doing?',
          nextText: 5
        },
        {
        text: 'Are you good to go this way?',
        nextText: 6
        }
      
      ]
  },

  {
    id: 5,
    text: '"I was trying to get out of this stupid fog. I magically woke up here. Usually, I am never here. I do not know where I am, or how to get out."',
    options:[
      {
        text: 'Do you have a light source to lead yourself out at least?',
        requiredState: (currentState) => currentState.match,
        nextText: 6
      },
      {
        text: 'Do you need someone to come with?',
        nextText: 7
      } 
    ]
  },
 {
    id: 6,
    text: '"No. I have no light source. I am legit lost."',
    options:[
      {
        text: 'Do you want one?',
        requiredState: (currentState) => currentState.match,
        nextText: 8
      },
      {
        text: 'Do you need someone to come with?',
        nextText: 7
      } 
    ]
  },

   {
    id: 7,
    text: 'You give your friend clear directions. They are confused. You lead them out of the fog, and they thank you for your journey. You trail your way back and you find yourself at the same tree. It is starting to get dark, but the area is dim. Do you light up your latern?',
    options:[
      {
        text: 'Yes.',
        setState:{latern: false},
        nextText: 9
      },
      {
        text: 'No.',
        nextText: 8
      } 
    ]
  },   {
    id: 8,
    text: 'You trust in the sky as your light. You come across a new face, yeah... You are definitely sure you have never seen this girl before. Do you introduce yourself?',
    options:[
      {
        text: 'Yes.',
        nextText: 10
      },
      {
        text: '... You already know where this going...',
        nextText: 10
      } 
    ]
  },
  {
    id: 9,
    text: 'You trust in your light. As you take a couple of steps forward, you are met with a new face. They hold out a hand to protect their eyes from your bright light in your hand. \n"Hello...?" They say with a small voice.',
    options:[
      {
        text: 'I have never seen you here before.',
        nextText: 10
      },
      {
        text: 'Who are you?',
        nextText: 11
      } 
    ]
  },

  {
    id: 10,
    text: 'You promptly introduce yourself. Was it in the best way? No. Not at all. But you at least got her attention. \n "Hello!" She waves her arms, and starts coming towards you.',
    options:[
      {
        text: 'Hello... Who are you?',
        nextText: 11
      },

      {
        text: 'Wow, you are stunning. Wait, I am so sorry, Hel-',
        nextText: 12
      },


      {
        text: 'What are you doing here? Why did you come?',
        nextText: 13
      } 
    ]
  },
  {
    id: 11,
    text: "She smiles, well, I don't think giving out my name to a stranger would be of any use. I just need help leaving this place.",
    options:[
      {
        text: 'Sounds... sus.',
        nextText: 13
      },

      {
        text: "That's fine. You need directions you said?",
        nextText: 14
      } 
    ]
  },

  {
    id: 12,
    text: "Her face flushes, 't-thank you... but I need to leave this place. Can you please show me a way out?'",
    options:[
      {
        text: 'Sure.',
        nextText: 14
      },

    ]
  },
  {
    id: 13,
    text: "She becomes noticably uncomfortable. 'Listen. I'm lost. I don't know where I'm going. Do you know a way out or not?'",
    options:[
      {
        text: 'Yeah... I do.',
        nextText: 14
      },

      {
        text: "I've never seen you before though. How did you...?",
        nextText: 15
      } 
    ]
  },
  {
    id: 14,
    text: "You help the new unidentifable face with getting out of the fog. At first, the walk through the exit is quiet. But, the conversation starts to get light. You even chuckle a bit. And go about your day. However; the new girl says something before leaving, 'I hope to see you again! Thank you!'",
    options:[
      {
        text: "You probably won't! No problem!",
        nextText: 16
      },

      {
        text: "Smile and wave.",
        nextText: 17
      } 
    ]
  },
  {
    id: 15,
    text: "'I don't know how I got here!' She yells at you, making you go back in surprise. She stands back, 'I'm sorry, but I just want to leave this fog... I don't know where I am...'",
    options:[
      {
        text: "No, I'm sorry. I shouldn't have made you uncomfortable.",
        nextText: 14
      },

      {
        text: "That's fine. You need directions you said?",
        nextText: 14
      } 
    ]
  },

  {
    id: 16,
    text: "She laughs, 'If you say so!' She then goes off out of the fog.",
    options:[
      {
        text: 'Next.',
        setState: {latern: false},
        nextText: 17
      },

    ]
  },

  {
    id: 17,
    text: "You are alone. You have only a light, but it seems to be raining. You have no light to guide you. It's going to get dark, and you have no oil for the journey back.",
    options:[
      {
        text: 'Use your match.',
        requiredState: (currentState) => currentState.match,
        setState: {match: false},
        nextText: 18
      },

      {
        text: "Use your light.",
        requiredState: (currentState) => currentState.light,
        setState: {light: false},
        nextText: 18
      },

      {
        text: "Wonder.",
        nextText: 19
      }

    ]
  },
  
  {
    id: 18,
    text: "Due to the rain, your light seems to going out faster than usual.",
    options:[
      {
        text: "Next.",
        setState: {light: false},
        nextText: 19
      }

    ]
  },
  
  
  {
    id: 19,
    text: "As the darkness began settling in, you turned around and forgot which way was out and couldn’t possibly tell where you came from and couldn’t possibly return to a state of normalcy.\n\n So you didn’t.",
    options:[
      {
        text: "Next.",
        nextText: 20
      }

    ]
  },
  {
    id: 20,
    text: "You were met with dizzying anxiety and fear, gripping him like a vise. But eventually, you became used to the fog, numb to its grayness, it’s emptiness...",
    options:[
      {
        text: "Next.",
        nextText: 21
      }

    ]
  },
  {
    id: 21,
    text: "You see someone coming down, another familiar face. Someone you consider a close friend, 'Hey man... are you okay? You seem... lost.'",
    options:[
      {
        text: "I'm fine!",
        nextText: 22
      },

      {
        text: "...Don't worry about me!",
        nextText: 22
      }

    ]
  },
  {
    id: 22,
    text: "You can't let them know that you too were lost. The great explorer of the planes done in by the same place. No. No one would have to know. ",
    options:[
      {
        text: "Next.",
        nextText: 23
      }

    ]
  },
  {
    id: 23,
    text: "You politely wave them off. 'Go on, you got this, you can get out!' You smile, and they smile back with a tint of concern. You pretend not to notice. \n\n 'Alright then... Thank you. You do too.' \n\n They leave.",
    options:[
      {
        text: "Next.",
        nextText: 24
      }

    ]
  },
  {
    id: 23,
    text: "Not realizing your time here, you lay down in the darkness. What's the point right? What's the point of continuing if you don't know where you're going?",
    options:[
      {
        text: "Next.",
        nextText: 24
      }

    ]
  },
  {
    id: 24,
    text: "As you go deeper into your thoughts, you see flickering in the distance.",
    options:[
      {
        text: "Hello?",
        nextText: 25
      }

    ]
  },
  {
    id: 25,
    text: "'Hello!!! I told you!! I get to see you again!'",
    options:[
      {
        text: "What?",
        nextText: 26
      }

    ]
  },

  {
    id: 26,
    text: "The voice sounds familiar, and you go back to the time where you led the unknown girl outside of the fog, and your time together.",
    options:[ 
      {
        text: "...Is it you?",
        nextText: 27
      }

    ]
  },

  {
    id: 27,
    text: "'What do you mean it's me? I told you I would come back!' \n\n You look at the girl with her flickering light in confusion.",
    options:[ 
      {
        text: "Why would you come here with a flickering light?",
        nextText: 28
      },

      {
        text: "Are you lost?",
        nextText: 29
      }

    ]
  },

  {
    id: 28,
    text: "'I came with this light last time. It was working fine, but the rain prior left a mark on my light.'",
    options:[ 
      {
        text: "Are you lost?",
        nextText: 29
      },
 
      {
        text: "I'm sorry to hear that.",
        nextText: 30
      },
 
      {
        text: "How could you not notice?",
        nextText: 31
      }
 
    ]
  },
 
  {
    id: 29,
    text: "'No, I… Well I am, have been for awhile. But, now….’ She grabs onto your shoulder. ‘I’m lost with someone that I know!’",
    options:[ 
      {
        text: "...",
        nextText: 32
      }
    ]
  },
 
{
    id: 32,
    text: "You pause, you’ve never seen someone so excited to be lost. Is this girl stupid? Did she purposely get herself lost? Why? Does she just want someone to stay with her? Why didn’t she say so? \n\n … You have so many questions. \n\n She speaks in a soft voice, ‘What?’",
    options:[ 
      {
        text: "Let’s start walking.",
        nextText: 35
      }
    ]
  },
 
{
    id: 30,
    text: "’Oh.. There’s no need to be sorry.’ She starts to speak in a lower and softer voice, making sure her light is shining more on your face, but you push it away. She retracts in shock and concern, ‘Are you okay?’",
    options:[ 
      {
        text: "... I’m fine.",
        nextText: 33
      },
      {
        text: "Don't worry about me.",
        nextText: 33
      },
    ]
  },
  {
    id: 33,
    text: "'Are you sure?' You stand taken aback, as she continues to peer over your shoulder and see your dead matches and lanterns. You step over to block her view, ‘Your lantern...’ ",
    options:[ 
      {
        text: "... I’m fine.",
        setState: {love: true},
        nextText: 35
      },
      {
        text: "Don't worry about me.",
        setState: {love: true},
        nextText: 35
      },
    ]
  },
 
{
    id: 31,
    text: "’I was busy finding a clear path….’ You scoff. She gives you  weird look, ‘What?’",
    options:[ 
      {
        text: "So… you tried to find a clear path… in a fog?",
        nextText: 34
      },
    ]
  },
{
    id: 34,
    text: "’Y-yes! I was trying to- I was-’ She realizes her mistake. She blushes out of embarrassment, ‘You know what? Let’s just go!’",
    options:[ 
      {
        text: "You walk.",
        setState: {love: true},
        nextText: 35
      },
    ]
  },
  {
    id: 35,
    text: "You spend more time together and you start to feel… different for this girl. At the beginning of your journey together, you just felt like you were helping another person like you usually would out of this fog. \n \n After all, nothing was permanent here besides the grayness. But she remained.",
    options:[
      {
        text: 'Next.',
        nextText: 36
      },
 
    ]
  },
 
{
    id: 36,
    text: "You grew fond of your time together with the lost girl; getting to know her, wanting to help her leave. You two remained within arms reach at all times. She let you use her flickering light to distinguish each other from the emptiness. \n You taught her so many things. Like how to occupy her time with a fun game, and she did the same for you, you feel like you know more than before. ",
    options:[
      {
        text: 'Next.',
        nextText: 37
      },
 
    ]
  },
 
{
    id: 37,
    text: "But now, come to think of it, you wanted her to leave. Not because you didn’t enjoy her company, but you learned so much about her. You might say you now have a vast knowledge of her patterns, and stupids memes she has inside of her head. \n\n Regardless, you wanted to know her, not only for what you saw, but also who they were, and who they will become.",
    options:[
      {
        text: 'Next.',
        nextText: 38
      },
 
    ]
  },
{
    id: 38,
    text: "You grew fond of your time together with the lost girl; getting to know her, wanting to help her leave. You two remained within arms reach at all times. She let you use her flickering light to distinguish each other from the emptiness. \n You taught her so many things. Like how to occupy her time with a fun game, and she did the same for you, you feel like you know more than before. ",
    options:[
      {
        text: 'Next.',
        nextText: 39
      },
 
    ]
  },
 
{
    id: 39,
    text: "Deep down, you hope they feel the same.",
    options:[
      {
        text: 'Next.',
        nextText: 40
      },
 
    ]
  },
{
    id: 40,
    text: "As the time passed, you’ve also started to pick up on another pattern. \n\n Her lantern.",
    options:[
      {
        text: 'Next.',
        nextText: 41
      },
 
    ]
  },
 
{
    id: 41,
    text: "Her lantern was constantly flickering, and was nearing an end with more use. With this, you wanted to fix it completely. \n And you did over time.",
    options:[
      {
        text: 'Next.',
        nextText: 42
      },
 
    ]
  },
 
{
    id: 42,
    text: "So she can finally leave out of this fog and move on...",
    options:[
      {
        text: 'I hope we can meet again.',
        nextText: 43
      },
      {
        text: 'I’ll miss her.',
        nextText:  51
      },
 
 
    ]
  },
{
  id: 43,
    text: "Overtime, you notice her light getting brighter and brighter. It no longer flickers, and it shines brighter with each day she stays with you. \n\nHowever, what you don’t notice, along with one lantern gaining light; another lights up along with it, like it’s light is infectious.",
    options:[
      {
        text: 'How did you...?',
        setState: {latern: true},
        nextText: 44
      },
      {
        text: 'What.',
        setState: {latern: true},
        nextText: 45
      },
 
 
    ]
  },

  {
    id: 44,
    text: "She smiles, with a fixed lantern in hand. ’Did you think I was going to leave you here alone? I know I can be clueless, but I’m most certainly not as stupid as you think.’",
    options:[ 
      {
        text: "I don’t think you’re stupid most times, but-",
        nextText: 45
      }
    ]
  },
{
    id: 45,
    text: "She playfully looks offended, ‘Wow… the faith you have in me is so high! Love to see it.’ \n\n She laughs, as she hands you your newly fixed lantern.",
    options:[ 
      {
        text: "Thank you.",
        nextText: 46
      },
      {
        text: "You’re so...",
        nextText: 46
      },
 
    ]
  },
 
{
    id: 46,
    text: "You were amazed that anyone would put in the time to do it.\n\nThat anyone would notice. That she didn’t hate you for being here, lost, and alone.",
    options:[ 
      {
        text: "You love her.",
       requiredState: (currentState) => currentState.love,
        nextText: 47
      },
      {
       text: "Next.",
    nextText: 47
      }
 
    ]
  },
{
    id: 47,
    text: "You knew then and there, that feeling that she thinned the fog and grounded him, it was love. That she saw through you and sought to help you, regardless of anything.",
    options:[ 
      {
        text: "You love her.",
       requiredState: (currentState) => currentState.love,
        nextText: 48
      },
      {
       text: "Next.",
    nextText: 48
      }
 
    ]
  },
{
    id: 48,
    text: "Her walk, her smile, her eyes, her mind, everything about her. The realization struck you like a hit to the chest.",
    options:[ 
      {
        text: "You  l o v e  her.",
       requiredState: (currentState) => currentState.love,
        nextText: 49
      },
      {
       text: "Next.",
    nextText: 49
      }
 
    ]
  },
{
    id: 49,
    text: "With your weak light you can’t find your footing, but with hers as well, you slowly realize where you are, and with her in your arms attempt to escape the grayness.",
    options:[ 
      {
        text: "You both love each other.",
        nextText: 50
      }
 
    ]
  },
{
    id: 50,
    text: "ENDING 1/3 : ALWAYS TOGETHER. \n\n Thank you for playing this game baby. This was supposed to be done by the 5th but I’m :D but… I hoped you enjoyed this ending, and if you want to find another alternate ending I made, in addition to the story, you can click the button to start over. \n\n Because, with any road we take, we always find a way towards one another. ",
    options:[ 
      {
        text: "<3",
        nextText: 1
      }
 
    ]
  },
  {
    id: 51,
    text: "Overtime, you notice her light getting brighter and brighter. It no longer flickers, and it shines brighter with each day she stays with you. You hand her the now fixed lantern, and she stares back at it in delight, she then looks in confusion looking back at you. \n\n ’What about you?’",
    options:[ 
      {
        text: "What about me?",
        nextText: 52
      },
      {
       text: "Don’t worry about me.",
    nextText: 53
      }
 
    ]
  },
{
    id: 52,
    text: "She does a double take, ‘Your light. How are we both getting out of this place? We can’t use one light alone.’",
    options:[ 
      {
        text: "You are the only one getting out here.",
        nextText: 53
      },
      {
       text: "Are… Are you dumb?",
    nextText: 54
      }
 
    ]
  },
 
{
    id: 53,
    text: "It’s almost like you can feel waves of anger radiating off of her. \n\n‘No.’ She says sternly. ‘I’m not. You’re coming with me. We’re leaving together.’",
    options:[ 
      {
        text: "That doesn’t make any sense.",
        nextText: 55
      },
      {
       text: "Isn’t this a good thing?",
    nextText: 55
      }
 
    ]
  },
{
    id: 54,
    text: "The waves of anger only go faster and hotter. ‘Am I a fucking joke to you?’ All of a sudden, you feel as though this was not only the wrong time, but also the worst time to crack a joke with her.",
    options:[ 
      {
        text: "No.",
        nextText: 56
      },
      {
       text: "Isn’t this a good thing though?",
      nextText: 55
      }
 
    ]
  },
{
    id: 55,
    text: "’No. It isn’t. You can’t just stay here!’ She screams. She calms herself down, making sure not to say anything she’ll regret. ‘You can’t stay in this fog and act like you know where you’re going in the dark. One day, you can be able to leave and find your way again! That day can be today!’",
    options:[ 
      {
        text: "Next.",
        nextText: 57
      }
 
    ]
  },
{
    id: 56,
    text: "’Then it makes perfect sense. You’re not staying in this fog, you can’t stay lost forever.’ She says sternly. But you don’t know how to feel about that.",
    options:[ 
      {
        text: " You’re right.",
        nextText: 57
      }
    ]
  },
{
    id: 57,
    text: "You sigh, you’re not sighing because you’re tired of the conversation, but it seems like she’s not understanding. So you start to explain, ‘ Alright, but here’s the thing right… You deserve to not be in this fog. I have been here long enough that I’ve gotten used to the feeling and the darkness that this darkness carries. You deserve to leave and be-’ \n\n She cuts you off.",
    options:[ 
      {
        text: "...",
        nextText: 59
      }
 
    ]
  },
{
    id: 59,
    text: "’You deserve to leave here with me too! Do you think I hate you?’ You scream, there’s no way he thinks such a thing right? He shouldn’t. But what he says after surprises you, even after all this time of thinking otherwise… He whispers but it’s just enough so you can hear it. ‘Well, maybe you do.’",
    options:[ 
      {
        text: "...what?",
        nextText: 60
      },
      {
        text: "I don’t hate you.",
        nextText: 61
      }
 
 
    ]
  },
{
    id: 60,
    text: "’Maybe… Maybe we need a break to recollect ourselves,’ He redirects the conversation to try to calm down his anxieties, or what it seems like to you.",
    options:[ 
      {
        text: "Leave.",
        nextText: 61
      },
      {
        text: "Leave.",
        nextText: 71
      }
    ]
  },
 
{
    id: 61,
    text: "’Why don’t we go to sleep?’ You mention to him, and he looks around as your atmosphere is surrounded by darkness. He motions underneath a tree to avoid getting drenched in the rain, and he sets up to go to sleep. He notices you’re hesitant to sleep next to him. ‘Aren’t you going to sleep?’",
    options:[ 
      {
        text: "Lay down next to him.",
        nextText: 62
      },
      {
        text: "Leave.",
        nextText: 62
      }
    ]
  },
{
    id: 62,
    text: "You lay down and make sure he’s fast asleep before getting your pen and paper and continue to write things down… It goes as follows:",
    options:[ 
      {
        text: "Next.",
        nextText: 64
      }
    ]
  },
{
    id: 63,
    text: "You stay silent, but you motion him to go to sleep. You make sure he’s sleeping against the tree. As you notice, you grab his lantern and grab a pen and paper to write your small note. It goes as follows:",
    options:[ 
      {
        text: "Next.",
        nextText: 64
      }
    ]
  },
{
    id: 64,
    text: "’Dear… Friend? \n\n I don’t know what you would call us, but I’d like to think we’re a bit more than friends. \n\n But, after tonight, I want to make sure of a couple of things. I do not hate you. In the short time we’ve known each other, you have not given me a reason not to. Maybe thoughts coming into fruition, but just know that I don’t hate you. I don’t think I ever will. \n\n You have made these trying times so fun to be in, and you make me very happy with your personality, your jokes, your compliments, your smile, your wise words, your stories, you have made this fog a lot more bearable. And one day, we will get out of this fog. And when I say we, I mean it. Thank you for reading.’ The name is smudged.",
    options:[ 
      {
        text: "Next.",
        nextText: 65
      }
    ]
  },
{
    id: 65,
    text: "You felt bad, because this was the exact thing you were trying to avoid. However; you wanted to get him something he could never forget. But, it’s hard to think. You left the letter next to the working lantern, and hoped he read it in the morning. You turn back and try not to feel guilty for what you’re about to do. You leave a kiss on his forehead and you go as one thought repeats in your head. \n\nThe man was alone again.",
    options:[ 
      {
        text: "Next.",
        nextText: 66
      }
    ]
  },
{
    id: 66,
    text: "A brand new day comes in the fog, and you wake up feeling alone. You didn’t want to think the worst, but you’re faced with the reality. \n\nShe’s gone.",
    options:[ 
      {
        text: "Next.",
        nextText: 67
      }
    ]
  },
{
    id: 67,
    text: "But, for some reason, you were hopeful. You felt as if she would come back, especially with the letter she wrote to you. You read and you felt an emotion. She hopes that you felt cared for. (Developer’s note: :D)",
    options:[ 
      {
        text: "Next.",
        nextText: 68
      }
    ]
  },
{
    id: 68,
    text: "And after some time, you realized that she never goes back on her words as you see her with a bright lantern in hand waiting to see you.",
    options:[ 
      {
        text: "<3",
        nextText: 69
      }
    ]
  },
{
    id: 69,
    text: "ENDING 2/3: A FLIPPED PERSPECTIVE.",
    options:[ 
      {
        text: "Restart. <3",
        nextText: 1
      }
    ]
  },
{
    id: 71,
    text: "You take a deep breath before getting closer to him, making sure he has your full attention. ‘Give me your lantern.’ You say, making him fall back in surprise. He gives you a confused look, ‘What? No!’",
    options:[ 
      {
        text: "Trust me.",
        nextText: 72
      }
    ]
  },
{
    id: 72,
    text: "You take a deep breath before getting closer to him, making sure he has your full attention. ‘Give me your lantern.’ You say, making him fall back in surprise. He gives you a confused look, ‘What? No!’",
    options:[ 
      {
        text: "Trust me.",
        nextText: 73
      }
    ]
  },
{
    id: 73,
    text: "’I will come back.’ You say, before he hesitates to give you his old broken lantern. You thank him, ‘You see this same lantern, so bright and noticeable that no one will ever doubt its shine. You will see me again and we will get out of this together. You hear me?’ He gives you a sad look before slowly nodding his head.",
    options:[ 
      {
        text: "I know.",
        nextText: 74
      }
    ]
  },
{
    id: 74,
    text: "’It’s not fun being away but I want to make sure you’re out with me. I want to make sure your light can be as bright as the one you gave me.’ She leans in telepathy asking if she can give a kiss, do you?",
    options:[ 
      {
        text: "Kiss her.",
        setState: {love: true},
        nextText: 75
      },
      {
        text: "Wait.",
        nextText: 76
      }
    ]
  },
{
    id: 75,
    text: "You two finally kiss, and it feel like a firework has erupted in both of your bodies giving you feelings of joy. ‘I can’t wait to get you another one when you come back.’ He smiles as he hugs you tighter. You smile at sound of him saying when you will come back, instead of ‘if you will come back’ \n\n You slowly go out of his grasp, and leave with lantern in hand to find your supplies to fix his lantern.",
    options:[ 
      {
        text: "Next.",
        nextText: 77
      }
    ]
  },
{
    id: 76,
    text: "’When you come back’, he said. You smile at the sound of him saying when you will come back, instead of ‘if you will come back’. \n\n You slowly go out of his grasp, and leave with lantern in hand to find your supplies to fix his lantern.’",
    options:[ 
      {
        text: "Next.",
        nextText: 77
      }
    ]
  },
{
    id: 77,
    text: "And she leaves... but you’re hopeful. Days can pass by but you have no doubt that she would come back. \n\nShe promised.",
    options:[ 
      {
        text: "Next.",
        nextText: 78
      }
    ]
  },
{
    id: 78,
    text: "And as she finally comes with a bright, beautifully decorated lantern, you know she was one to never break her promises.",
    options:[ 
      {
        text: "Next.",
        nextText: 79
      }
    ]
  },
{
    id: 79,
    text: "ENDING 3/3: UNBROKEN PROMISES.",
    options:[ 
      {
        text: "author’s note.",
        nextText: 80
      }
    ]
  },
{
    id: 80,
    text: "Baby, I know I kinda sent you on a goose chase with these endings, but I want you to know that you are one of the most wonderful people that’s helped me with so many things. I am so happy that I can help you as well, and I’m forever glad that you are in my life. This game wouldn’t have been possible without you, and you can say that this has brought out my master hacker. (Because I know you get laughs out of this one). \n\nI remember you said this was a shitty story, but how does such a shitty story make me cry and tear up? That’s not a shitty story, that’s a beautiful one. You have a wonderful way of words and I have said that on the mf day. It’s like a reminder at this point. But, before I sound redundant and keep saying the good and wonderful things about you. \n\nTo make a long letter, very short: I love you. I am in love with you. These (nearly) seven months have been nothing but wonderful and of course, there have been some ups and downs, but we always find our ways back to each other. So, thank you. Thank you for merely existing and being in my life, because I am so grateful that you’re in it. \n\n Love, *smudged handwriting*",
    options:[ 
      {
        text: "fin.",
        nextText: 1
      }
    ]
  }



] 



startGame()
