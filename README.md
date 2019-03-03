# uniqys-nuxt-sandbox

## start
```bash
$ yarn
$ yarn build
$ yarn uniqys start
```

## にゃーん
- postしてもread write modeにならない
- nuxt.config.tsで `export default` するとnuxt側が `{ default: {}}` となる
- ↑に関係してかpluginが読み込まれない
