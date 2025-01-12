---
title: Live Machinery Workshop
date: 2024-11-23
---

## Explanation

**I want to give people access to the depths of my mind** {{don't edit this line}}

As part of the [Live machinery workshop](https://www.lesswrong.com/s/aMz2JMvgXrLBkq4h3/p/9KamjXbTaQpPnNsxp), I'm making an app exploring live interfaces / autostructures in blogging. Authors can just dump in their messy working notes, with maybe some 'prayers' about how they're displayed. Users describe themselves to the AI which then on the frontend side regenerates each note as the user views them, fit for the eyes for that person.

### Architecture
- React App, self-hosted
- Initially no backend; Markdown files are kept in a folder and then get rendered dynamically
- Author / host covers API costs; Maybe add a limit for # of API calls in a day?
	- Final version should store generated pages - maybe in user's LocalStorage? - so they don't get regenerated every time

(old)
Stack: React, TypeScript, Tailwind, Vite. Anthropic API. React Context API. Demo version can be without server; Final version should def incoroporate backend.

### Hackathon plan
- [x] React app that turns a single Markdown file into a page (3 pomodoros)
- [x] Page gets re-generated for the user based on a prompt
- [x] Small usability things n. 1
	- [x] Store prompts in local storage
	- [x] UI redesign
	- [x] Toggle for showing the original version
- [x] Bidirectional linking between a folder of Markdown files
- [x] Author prayers
- [x] Small usability things n. 2
	- [x] Loading indicator for user description
	- [x] Loading indicator for modified note
	- [x] Make it more obvious that the note was AI-generated
- [ ] AI-generated quiz for better onboarding
- [ ] Server
- [ ] Support for deeper folder structure

### Notes
- 22:14. We have a single markdown file that gets re-generated based on a viewer-provided prompt. This is basically already a functional prototype! Anything else is just sugar on top. How do I prioritize the remaining tasks? What are the highest value things to still achieve?
	- Making the quiz doesn't really make sense until we have more than one note, because it'll be hard to generate the quiz based on just one note.
	- Author prayers would be nice, but I think having multiple notes would be better to have first.
	- Bidirectional linking isn't working... but also cannot work until I have more notes!
	- Small usability things like retaining the prompt in browser local storage and adding a toggle for showing the original would be nice to add now! 
	- Okay I think here's my current next priorities:
		1. Small usability things (Store prompt in local storage, toggle for showing original, bit of UI redesign)
		2. Multiple notes
		3. Bidirectional links functionality
		-  Then: Author prayers, quiz.
- 1:22. I finished bidirectional linking and multiple files. Couldn't do proper folder structure support on only client side, will leave that for later when I implement a server. Now going to sleep :) Tomorrow - I want to implement the author prayers, and the AI-generated quiz for better onboarding.
- **Day two**, 15:30
	- Today implemented author prayers. It was pretty trivial, but I am wondering if a 'wishlist' would be helpful here. I think at least I'd like to implement a 'wishlist' for viewers - to explain some part more, or summarize something, for example.
	- Also did a lot of small UI improvements, with the demo in mind, like loading indicators and visual changes for original vs personalized.

{{Rewrite all of this in a more succinct and better form I guess. Make it less personal}}