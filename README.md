# spm-doc

> A documentation generator.

-----

## Install

Install spm-doc with npm:

    $ npm install spm-doc -g

## Usage

Build the documentation:

    $ spm-doc build [options]

If you have installed [spm2](https://github.com/spmjs/spm2):

    $ spm doc build [options]

Start a server at 127.0.0.1:8000:

    $ spm doc server

Start a server at 127.0.0.1:8000, watching the source files change:

    $ spm doc watch

Publish documentation to spmjs.org:

    $ spm doc publish [options]

Clean the _site folder:

    $ spm doc clean

## Themes

The default theme path is `~/.spm/themes`.

Install a theme:

    git clone git://github.com/aralejs/template-arale.git ~/.spm/themes/arale

## Available themes

    - https://github.com/aralejs/template-arale
    - https://github.com/aralejs/template-alice

## Changelog

### 0.2.1

- Fix the sync execute problem.
- Fix the theme choosing logic.
