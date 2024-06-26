# LMS Frontend

### Setup Instructions

1. Clone the project
```
    git clone https://github.com/Ayush1390/LMS-frontend.git
```

2. Move into the directory
```
    cd LMS-frontend
```

3. Install dependencies
```
    npm i
```

4. Run the server
```
    npm run dev
```



### Setup instructions for tailwind 

[Tail wind official instruction doc](https://tailwindcss.com/docs/installation)


1. Install tailwind css
```
    npm install -D tailwindcss
```

2. Create tailwind config file
```
    npx tailwindcss init
```

3. Add file extensions to tailwind config file in the contents property
```
    "./src/**/*.{html,js,jsx,ts,tsx}"
```

4. Add tailwind directives at the top of `index.css` file
```
    @tailwind base;
    @tailwind components;
    tailwind utilities;
```

### Adding plugins and dependencies
```
    npm install @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp
```
