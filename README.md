[![Greenkeeper badge](https://badges.greenkeeper.io/AuspeXeu/oxford-rowing.svg)](https://greenkeeper.io/)
# Oxford Live Bumps

## Create or update an event before it has started using the following snippet, please note the example `.json` file as payload
```
curl -X POST -H "Content-Type: application/json" -H "Authorization: <TOKEN>" -d @./event_creation_example.json http://127.0.0.1:3019/event
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Run for production
```
npm run build
npm run server
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
