# pulp
![logo](https://rawcdn.githack.com/koirand/pulp/9e51db7a3090a8a52d6bdbe15bc8934d99997fb9/images/logo.png)  

Pulp is a [Hugo](https://gohugo.io/) theme for getting a simple, easy-to-read blog site.

## Screenshots
![screenshot-top](https://rawcdn.githack.com/koirand/pulp/5484f16d91e42c7796de8adc29b15c01eb782370/images/ss-top.png)

![screenshot-list](https://rawcdn.githack.com/koirand/pulp/5484f16d91e42c7796de8adc29b15c01eb782370/images/ss-list.png)

![screenshot-page](https://rawcdn.githack.com/koirand/pulp/5484f16d91e42c7796de8adc29b15c01eb782370/images/ss-page.png)

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
Put your own avatar image in /static/images/avatar.jpg of your own site, and also favicon.ico. Hugo will automatically use that imgaes instead of the standard one. It's not necessary to alter the theme.

## Update the theme
You can update the theme by issuing the following command inside your project folder.

```
git submodule update --remote --rebase
```

If you have cloned the theme, you can run `git pull` inside the theme folder.
