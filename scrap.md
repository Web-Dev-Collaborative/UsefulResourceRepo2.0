#!/bin/bash
for i in $(curl "https://api.github.com/orgs/github/repos" | grep -oP '"clone_url":\s*"\K[^"]+'); do
  echo git clone "$i"
done

