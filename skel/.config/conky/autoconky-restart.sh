#!/bin/bash
killall conky
rm -rf autoconky/*
python3 autoconky.py
