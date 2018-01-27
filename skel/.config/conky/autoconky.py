#!/usr/bin/env python3
""" AOSC Auto Conky """

import os
import subprocess
import re
from string import Template

conkyScripts = [
    "conky_rss", "conky_status", "conky_i3shortcuts"
]


def get_dimension():
    cmd = 'xdpyinfo| grep \"dimensions\" | awk \'{ print $2 }\''
    strResolution = subprocess.getoutput(cmd)
    arrResolution = strResolution.split('x')
    return arrResolution[0], arrResolution[1]


def run_conky(name):
    os.popen("conky -c ~/.config/conky/autoconky/" + name)


def need_regenerate():
    if os.path.exists("autoconky/conky_rss"):
        return False
    return True


def brutal_replace(op, ed, orig, rplc):
    orig = orig[0:op] + rplc + orig[ed:]
    return orig


def mtply_occurance(Str, Ratio):
    p = re.compile("\{\{\d+\}\}")
    tri = []
    for m in p.finditer(Str):
        tri.append(m.start())
        tri.append(m.end())
        tri.append(m.group())

    i = len(tri) - 1
    while i > 0:
        print(tri[i], tri[i - 1], tri[i - 2])
        print(tri[i][2:-2])
        target = str(int(int(tri[i][2:-2]) * Ratio))
        Str = brutal_replace(tri[i - 2], tri[i - 1], Str, target)
        i = i - 3

    return Str


def generate(Ratio):
    print("Scaling fonts to " + str(Ratio) + " ...")
    for cs in conkyScripts:
        fr = open("template/" + cs + ".rel")
        s = fr.read()
        s = mtply_occurance(s, Ratio)
        if s == None:
            return
        fw = open("autoconky/" + cs, 'w+')
        fw.write(s)


def run():
    arrResolution = get_dimension()
    if need_regenerate():
        print("Regenerating pixel-scaling conky config for " + str(arrResolution[0]) + "x" + str(arrResolution[1]) + " ...")
        if int(arrResolution[1]) < 770:
            generate(0.9)
        elif int(arrResolution[1]) >= 1440:
            generate(1.3)
        else:
            generate(1.0)

    for cs in conkyScripts:
        run_conky(cs)


run()
