#!/usr/bin/env python3

import os, subprocess

conkyScripts = ["conky_rss", "conky_weather", "conky_status", "conky_i3shortcuts"]

def getDimension():
    cmd = 'xdpyinfo| grep \"dimensions\" | awk \'{ print $2 }\''
    strResolution = subprocess.getoutput(cmd)
    arrResolution = strResolution.split('x')
    return arrResolution[0], arrResolution[1]

def runConky(prefix, name):
    os.popen("conky -c ~/.config/conky/"+prefix+name)

def run():
    arrResolution = getDimension()
    prefix = "768/"
    if int(arrResolution[1]) > 768:
        prefix = "1080/"
    for cs in conkyScripts:
        runConky(prefix, cs)

run()
