# Hookleton Examples gh-pages

## Export and Test local

```bash
git checkout gh-pages
cd example
npm i
npm run export:local
npm i -g serve
cd out
serve
```

## Export gh-pages and deploy

```bash
git checkout gh-pages
cd example
npm i
npm run deploy
cd ..
git commit -am 'update gh-pages'
git push origin gh-pages
```

## Contributing

* Documentation improvement
* Feel free to send any PR

## License

MIT
