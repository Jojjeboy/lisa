#!/bin/bash

VN=$(git describe --abbrev=7 HEAD 2>/dev/null)

DYNAMICREPONAME=$(basename -s .git $(git config --get remote.origin.url))
PUBLISH_URL="https://jojjeboy.github.io/$DYNAMICREPONAME/"
POSTINSTALL_AUTO_COMMIT_MESSAGE="Postinstall autocommit message"

echo "Dynamic reponame: "$DYNAMICREPONAME
echo "Publish url: "$PUBLISH_URL

upLevel="minor"
  if [ $# -eq 2 ]; then
    if [ "$2" = "patch" ]; then
      upLevel="patch"
    elif [ "$2" = "major" ]; then
      upLevel="major"
    fi
  fi

echo "Uplevel: "$upLevel

echo "********** Running script **************"


if [ $# -eq 0 ]; then
  echo "Du måste skicka med commit meddelande.\n*** Script stoppat ***"
  exit 1
fi


if [[ $(git diff --stat) != '' ]]; then

    npmversion="";
    npmversion= npm pkg get version



    git add .;
    git commit -m"$1";
    npm run prebuild:$upLevel;
#    npm run postinstall &&
    ng build --configuration=production --output-path docs --base-href "$PUBLISH_URL"
    git tag -a v$npmversion "v$npmversion"   
    git add . &&
    git commit --amend --no-edit && git pull && 
    git push && git push origin --tags
else
  ng build --configuration=production --output-path docs --base-href "$PUBLISH_URL"
  git add . &&
  git commit --amend --no-edit &&
  git push
fi