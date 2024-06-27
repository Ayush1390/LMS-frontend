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
    npm install -D tailwindcss postcss autoprefixer
```

2. Create tailwind config file
```
    npx tailwindcss init
```

3. Add file extensions to tailwind config file in the contents property
```
    "./index.html","./src/**/*.{html,js,jsx,ts,tsx}"
```

4. Add tailwind directives at the top of `index.css` file
```
    @tailwind base;
    @tailwind components;
    tailwind utilities;
```

5. Add the following details in the plugin property of tailwind config
```
    [require("daisyui"), require("@tailwindcssline-clamp")]
```

6. Add the following property in tailwind config
```
    daisyui: { themes: ["dark"] }
```

### Adding plugins and dependencies
```
    npm install @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp
```


### Configure auto import sort eslint

1. Install simple import sort
```
    npm i -D eslint-plugin-simple-import-sort    
```

2. Add rule in `.eslint.cjs`
```
    'simple-import-sort/imports': 'error'
```

3. Add simple-import sort pilugin in `.eslint.cjs`
```
    plugins: [..., 'simple-import-sort']
```

4. To enable auto import sort on fle save in vscode
    - Open `settings.json`
    - Add the following config
        ```
            "editor.codeActionsOnSave": {
                "source.fixAll.eslint": true
            }
        ```