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
