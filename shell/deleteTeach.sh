#!/bin/bash
curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST\
    -d @${1}  \
    http://180.42.27.182/relevance_evaluator/api/deleteTeacher
