# Speed Typing Game

A feature-rich, dynamic speed typing test application built with Next.js, React, and Tailwind CSS. Practice your typing speed with varying difficulties, track your accuracy in real-time, and challenge yourself with different modes like numbers and emojis!

Developed by **Endrias Eshetu**.

🚀 **Play it Live:** [https://endrias-speedtyping.netlify.app/](https://endrias-speedtyping.netlify.app/)

## Features

- **Live Feedback:** Get real-time green/red highlights as you type to instantly see your mistakes and correct keystrokes.
- **Multiple Categories:** Choose between typing standard **Text**, **Numbers**, or even **Emojis** to test different keyboard skills.
- **Adjustable Difficulty:** Every category offers Easy, Medium, and Hard variations.
- **Single-Line Typing Mode:** Text is elegantly displayed in 10-word chunks. As you type, the window slides forward automatically, keeping your focus completely on the active line rather than overwhelming you with a wall of text.
- **Manual Start & Timer Control:** The test won't start until you're ready. Click "START" to begin the 60-second countdown timer. 
- **Advanced Scoring:**
  - **WPM (Words Per Minute):** Standard typing speed calculation.
  - **Accuracy:** Percentage of correctly typed characters.
  - **Weighted Score:** A custom scoring metric that rewards you more for correctly completing longer, more complex words.
- **Custom UI:** A polished dark-mode aesthetic with custom Navbars, Footers, and responsive layouts.

## Getting Started

1. Clone the repository.
2. Install the dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to play the game.

## Project Structure

- `app/` - Next.js App Router, global layout, and the main page logic (`page.tsx`)
- `components/` - Modular React UI components (`Navbar`, `Header`, `TypingArea`, `Stats`, `ResultCard`, `Footer`)
- `data/` - Static test data categorized by test type and difficulty (`paragraphs.ts`)
- `public/` - Static assets, including custom logos and favicons.

## License

&copy; Speed Typing Game. All rights reserved.
