#!/bin/bash
curl -vX -H "Accept: application/json" -H "Content-type: application/json" -X POST \
    -d @${1}  \
    http://180.42.27.182/document_analyzer/api/document
