# pulp
![logo](https://user-images.githubusercontent.com/17229643/55247565-50245180-528b-11e9-9947-aa3c54ea05bb.png)  

Pulp is a [Hugo](https://gohugo.io/) theme for getting a simple, easy-to-read blog site.

## Screenshots
![screenshot-top](https://user-images.githubusercontent.com/17229643/72672672-bd16fc80-3a01-11ea-9056-7439db39ed75.png)

![screenshot-list](https://user-images.githubusercontent.com/17229643/72672673-c607ce00-3a01-11ea-8356-d3cfc4ead65e.png)

![screenshot-page](https://user-images.githubusercontent.com/17229643/72672675-cacc8200-3a01-11ea-914e-c80876d03b16.png)
## Installation

If your site is also under version control using git, the easiest way to install this theme is to add it as a submodule. If you have not created a git repo for your project yet, you need to run `git init` beforehand. Inside the folder of your Hugo site, run the following command.

```
git submodule add https://github.com/koirand/pulp.git themes/pulp
```

Alternatively, you can clone the theme into your project.

```
git clone https://github.com/koirand/pulp.git themes/pulp
```

## Configuration

Configure your config.toml with reference to exampleSite.
Put your own avatar image in /static/img/avatar.jpg of your own site, and also favicon.ico. Hugo will automatically use that images instead of the standard one. It's not necessary to alter the theme.

## Update the theme
You can update the theme by issuing the following command inside your project folder.

```
git submodule update --remote --rebase
```

If you have cloned the theme, you can run `git pull` inside the theme folder.
