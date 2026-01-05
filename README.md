# Interactive 3D Portfolio

This project is an interactive personal website built with React, TypeScript, and Three.js using React Three Fiber. It features a real-time animated 3D avatar with responsive layout, cinematic camera composition, and smooth UI transitions.

The site is designed as an exploratory experience: users are introduced to the avatar in a main view and can interact with it to reveal deeper content and details.

## ✨ Features

- Real-time 3D avatar rendered with Three.js
- Character animations powered by Blender + Mixamo
- Responsive composition that adapts to viewport size
- Smooth transitions and spring-based motion using @react-spring/three
- Clean scene architecture with camera & interaction separation
- Built with Vite for fast development and hot module reloading

## 🧱 Tech Stack

- React + TypeScript
- Three.js
- React Three Fiber
- @react-three/drei
- @react-spring/three
- Vite

## 🧍 Avatar & Animation Pipeline

The avatar model was generated using Ready Player Me and animated using Mixamo, with processing and export handled in Blender.

Animation workflow reference:  
Robes Antoro — "Three.js + Blender + Mixamo"  
https://robesantoro.medium.com/three-js-blender-mixamo-52304823046

Full credits and attributions are listed in CREDITS.md.

## 🧪 Development

Install dependencies:
npm install

Start development server:
npm run dev

Build for production:
npm run build

## 📂 Project Structure

src/  
 components/ # UI + Three.js scene components  
 models/ # 3D scene & avatar logic  
 assets/ # 3D models and static files  
 pages/ # Page-level layout (Home, etc.)

## 📜 Attribution

3D avatar assets, animation workflow, and library attributions are listed in CREDITS.md.
