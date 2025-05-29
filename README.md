aosc-default-settings
=====================

Default settings for the Plasma Desktop in AOSC OS.

Plasma
======

1. Use Breeze Dark for Plasma, and Breeze for everything else.
2. Set default wallpaper to the chosen one in our annual wallpaper contest.
3. Set default login screen/lock screen background in our annual wallpaper contest.

Maintainer Notes
================

Default theme for SDDM is now maintained at `sddm-theme-breeze-aosc` package in the [aosc-os-abbs](https://github.com/AOSC-Dev/aosc-os-abbs/).

This repository just sets the default SDDM theme to our forked Breeze theme. So please remember to update `autobuild/theme.conf` in the `sddm-breeze-aosc` package.
