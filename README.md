# spm-doc

> A CMD module documentation generator.

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

    git clone git://github.com/spmjs/nico-cmd.git ~/.spm/themes/cmd

> The default theme [nico-cmd](https://github.com/spmjs/nico-cmd) would be installed when spm-doc is installed.

## Changelog

### 0.3.0

- use CMD theme as default theme

### 0.2.8

- remove spm-grunt
- nico 0.4.4

### 0.2.7

- nico 0.4.3

### 0.2.1

- Fix the sync execute problem.
- Fix the theme choosing logic.
