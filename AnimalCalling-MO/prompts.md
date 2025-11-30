# Prompts & Development Process

## Development Strategy
The development was guided by a structured plan to create an arcade-style "Animal Calling" game using:
- **HTML5** for structure
- **Tailwind CSS** for styling
- **Vanilla JavaScript** for logic
- **Howler.js** for audio
- **Canvas Confetti** for visual rewards

## Prompts Used (Summary)

### 1. Initial Requirement Analysis
> "I want a game (named Animal Calling) that combine the sounds and images of animals. Each round starts when the player click a button to reproduce the sound. Then the game show a grid of 3 possible animals and the player must choose the riche animal clicking on it."

### 2. Technical Decisions (Clarification)
I asked the user to clarify specific technical details to ensure the best implementation:
- **Game Flow:** Arcade style (Score + Lives) was chosen over endless practice.
- **Assets:** Standard formats (.png, .mp3) were selected.
- **Libraries:** Recommended stack (Tailwind, Howler.js, Confetti) was approved.

### 3. Implementation Plan
A comprehensive plan was created and approved, outlining:
- Directory structure (`AnimalCalling-MO/`)
- File separation (`index.html`, `css/styles.css`, `js/game.js`)
- Game logic (Rounds, Randomization, Scoring)
- UI/UX design (Responsive grid, Feedback animations)

### 4. Asset Integration
> "I added some file to sounds folder... Replace the current list of animals... Search the web to retrieve images"

- **Dynamic List Update:** The game configuration was updated to match the provided sound files: Cat, Cow, Dog, Donkey, Goat, Pig, Pony, Rooster, Sheep.
- **Image Retrieval:** Corresponding PNG images were sourced from the Noto Emoji open-source project to ensure visual consistency and safe licensing.
  - Mapped animals to their Unicode emoji equivalents (e.g., Donkey -> 1facf).
  - Downloaded images directly to `assets/images/`.

### 5. Optimization & Security
- **SRI Hashes:** Calculated and added Subresource Integrity (SRI) hashes to all CDN scripts (Tailwind, Howler, Confetti) to prevent security vulnerabilities.
- **Audio Caching:** Optimized `game.js` to reuse `Howl` instances instead of creating new ones every round, preventing memory leaks.
- **Cleanup:** Implemented resource disposal logic (`Howler.unload`) when the page unloads.
- **DOM Manipulation:** Refactored `onerror` image handling to use `document.createElement` for better performance and security compared to `innerHTML`.

## Challenges & Solutions
- **Asset Management:** Since the actual assets are user-provided, the code includes error handling (`onerror` for images, `onloaderror` for sounds) to prevent the game from breaking if files are missing.
- **Browser Policies:** Modern browsers block auto-playing audio. The design solves this by requiring an explicit "Click to Listen" interaction to start the audio for each round.
- **State Management:** A simple state object tracks score, lives, and round status to ensure the game loop is robust and prevents double-clicking during animations.

## Full Prompt History

Below is the complete list of prompts used during the development process, exactly as written:

**Prompt 1:**
```text
You are an expert Web Game developer.

You have the instructions of the exercise in the @README.md .

 About the following points, consider:

1. Choose a game concept: I want a game (named Animal Calling) that combine the sounds and images of animals. Each round starts when the player click a button to reproduce the sound. Then the game show a grid of 3 possible animals and the player must choose the riche animal clicking on it.

2. Create the necessary files: 

- The folder name will be AnimalCalling-MO. 

- Sounds and images of animals will be provided by me. For now assume to create 2 folder of assets, one for images and other for sounds. Every image and sound of the same animal will have the same filename (except for the file extension).

3) Suggest JS and CSS libraries that can simplify the development



Do you need more info to complete the task?
```

**Prompt 2 (Plan Confirmation):**
```text
Implement the plan as specified, it is attached for your reference. Do NOT edit the plan file itself.

To-do's from the plan have already been created. Do not create them again. Mark them as in_progress as you work, starting with the first one. Don't stop until you have completed all the to-dos.
```

**Prompt 3:**
```text
I added some file to sounds folder.

- Replace the current list of animals with the animals inside the folder

- Search the web to retrieve images in png of each animal and put them in the images folder with the correct name to match the corresponding sound
```

**Prompt 4:**
```text
Edit the root file index.html adding Animal Calling to the games list.
```

**Prompt 5:**
```text
Test Animal Calling it in browser
```

**Prompt 6:**
```text
It works fine. Complete the @AnimalCalling-MO/prompts.md file adding a complete list of my prompts, exactly as I have wrote them, no summary, no trunk.

Put a brief description and the list of the prompts at the end of the file.
```

**Prompt 7:**
```text
To deliver the excercise, create a branch called "solved-videogame", commit and create a pull request as described at point 6 of the @README.md file
```

**Prompt 8:**
```text
Create the pull request as suggested
```

**Prompt 9:**
```text
External scripts from CDN endpoints lack SRI attributes, leaving the page vulnerable to CDN compromise or man-in-the-middle attacks. Add SRI hashes to the following resources:

https://cdn.tailwindcss.com (lines 9)

https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.4/howler.min.js (line 15)

https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js (line 16)

Generate SRI hashes for each resource and add them as the integrity attribute on each <script> or <link> tag.
```

**Prompt 10:**
```text
In AnimalCalling-MO/js/game.js around lines 141 to 164, each playTargetSound

call creates a new Howl instance causing potential memory/resource leaks; change

this to reuse cached Howl objects by adding a sound cache (e.g.,

state.soundCache or a module-level Map) keyed by the target soundPath, create a

Howl only if not cached, store it, and call play() on the cached instance; also

ensure errors call the in-game showFeedback function instead of alert and, on

any permanent unload scenario, call howl.unload() or Map.clear() to free

resources.
```

**Prompt 11:**
```text
test in browser if everything works fine after these changes
```

**Prompt 12:**
```text
update the @prompts.md file
```

**Prompt 13:**
```text
commit changes
```

**Prompt 14:**
```text
In AnimalCalling-MO/js/game.js around lines 131 to 135, the onerror handler

currently uses imgContainer.innerHTML += which re-parses and replaces the

container DOM (dropping the hidden img and possibly recreating the broken-image

element); change the handler to hide or remove the broken img and instead create

a fallback DIV via DOM APIs (document.createElement), set its className and

textContent to the animal name, and append it with imgContainer.appendChild;

also guard against adding duplicate fallback nodes (check for an existing

fallback selector) so the fallback is only added once.

Test in browser after changes
```

**Prompt 15:**
```text
update @AnimalCalling-MO/prompts.md and commit changes
```
