# Ask not what your Design System can do for you...

...ask what _you_ can do for your design system!

A presentation about how design systems have come about and how we can all get involved in them.

This is a web presentation that runs in the browser - built using the awesome [Reveal.js](http://lab.hakim.se/reveal-js/).

## Setup

1. Clone the repo
1. Run `npm install` to install all the dependencies


## Build

To generate a build that is suitable for sharing or hosting, simply run:

* `npm run build`

The build output will be written to `dist/`. To share/host, simply take the contents of the `dist/` folder.


## Development

To simplify development, you can run:

* `npm start`

This will do the following:

1. Do a clean build
1. Start a local webserver (using [Browsersync](https://www.browsersync.io/))
1. Start watching the source HTML & SASS files
    * Whenever those source files are changed, they will be rebuilt and reload in the browser
