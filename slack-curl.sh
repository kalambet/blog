#!/bin/bash
# your script here

curl -X POST --data-urlencode 'payload={"channel": "#general", "username": "IBM DevOps Services", "text": "An update was pushed into <https://hub.jazz.net/project/kalambet/technogeek/|Technogeek Blog> repository.", "icon_url": "https://hub.jazz.net/api/v1/composition/graphics/header/bluemix-logo.png"}' https://hooks.slack.com/services/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