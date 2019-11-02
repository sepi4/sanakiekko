#!/bin/sh
awk -F '|' '{sum += $2} END {print sum}' ./aika.txt
