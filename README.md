# Buhler Project - E-commerce Product Catalog

A modern Vue 3 e-commerce application built with Vuetify, featuring product browsing, categorization, and shopping cart functionality.

## 🚀 Features

- **Product Catalog**: Browse products organized by categories
- **Product Details**: View detailed information for each product
- **Shopping Cart**: Add items to cart and manage selections
- **Responsive Design**: Mobile-friendly UI built with Vuetify
- **Category Filtering**: Products automatically grouped by categories
- **Clean Architecture**: Pinia for state management, Vue Router for navigation

## 🛠️ Tech Stack

- **Framework**: Vue 3 (Composition API)
- **UI Library**: Vuetify 3
- **State Management**: Pinia
- **Routing**: Vue Router
- **Build Tool**: Vite
- **Testing**: Vitest + Vue Test Utils
- **Styling**: SCSS + Vuetify Theme System
- **Icons**: Material Design Icons (@mdi/font)

## 🔧 Project Setup

### Install Dependencies
```sh
npm install
```

### Development Server

Run the app in development mode with hot-reload:
```sh
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Compile and minify for production:
```sh
npm run build
```

### Preview Production Build

Preview the production build locally:
```sh
npm run preview
```

## 🧪 Testing

### Run Unit Tests
```sh
npm run test:unit
```

### Run Tests in Watch Mode
```sh
npm run test:unit -- --watch
```

### Test Coverage
```sh
npm run test:unit -- --coverage
```

## 🎨 Code Quality

### Lint Code
```sh
npm run lint
```

### Format Code
```sh
npm run format
```

## 🧪 Testing Approach

- **Unit Tests**: All components and stores have comprehensive test coverage
- **Test Utilities**: Shared utilities in `src/tests/testUtils.js` for consistent test setup
- **Mocking**: Vuetify components and Pinia stores properly mocked for isolated testing

## 💻 Recommended IDE Setup

### VS Code
- [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue language features
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Linting
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Code formatting

**Note**: Disable Vetur if installed (conflicts with Vue Official extension)

### Browser DevTools

**Chrome/Edge/Brave:**
- [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Enable Custom Object Formatters](http://bit.ly/object-formatters)

**Firefox:**
- [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [Enable Custom Object Formatters](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test:unit` | Run unit tests |
| `npm run lint` | Lint and fix code |
| `npm run format` | Format code with Prettier |

## 🔗 Configuration

- **Vite Config**: `vite.config.js`
- **Vitest Config**: `vitest.config.js`
- **ESLint Config**: `eslint.config.js`
- **Router Config**: `src/router/index.js`

## 📚 Documentation

- [Vue 3 Documentation](https://vuejs.org/)
- [Vuetify Documentation](https://vuetifyjs.com/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vite Documentation](https://vite.dev/)
- [Vitest Documentation](https://vitest.dev/)

## 📄 License

This project is private and proprietary.

---
