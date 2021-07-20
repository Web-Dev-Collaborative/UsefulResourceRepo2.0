#!/bin/bash
for i in $(curl "https://api.github.com/orgs/microsoft/repos" | grep -oP '"clone_url":\s*"\K[^"]+'); do
  echo git clone "$i"
done




#!/bin/bash

#preset variables, exec redirects everything to outputfile
ROOT="./"
exec > "$ROOT/Menu-test.html"
MAXLEVEL="*/* */*/* */*/*/* */*/*/*/*"
LABEL="foldername.txt"
NAVLIST=1
LEVEL=2
LAST=1

#functions for indentation, definition and printing tags
LI="<LI><SPAN class=plus><P>-</P></SPAN><A class=''>"
Indent() { for (( i=1 ; i < LAST ; ++i )); do echo -n "        " ; done ;}
BUecho() { Indent ; echo "<UL class=navlist""$LEVEL"">"                 ;}
EUecho() { Indent ; echo "</UL>"                                        ;}
BLecho() { Indent ; echo -n "    " ; echo "$LI""$DIRNAME""</A>"         ;}
ELecho() { Indent ; echo -n "    " ; echo "</LI>"                       ;}

# Create first level items - these are static
cat<<EOH
<UL class=navlist1>
    <LI><SPAN class=plus><p>-</p></SPAN><A class=''>Level 1 products</A>
EOH

#go to root of tree, scan tree, drop folders without label,drop labels,sort
#and start reading the result line by line .... 
cd "$ROOT" ; for SCANDIRS in $MAXLEVEL; do echo "$SCANDIRS"; done |\
grep "$LABEL" |sed "s/$LABEL/\//g" |sort |\
while [ "$LAST" -gt "0" ]
do
    #read directory entry, count slashes as depth indicator, read label
    if read LINE
    then
        LEVEL=$( tr -dc '/' <<<"$LINE" | wc -m )
        read DIRNAME < "$LINE/$LABEL"
    else
        LINE="" ; LEVEL=0
    fi

    #code logic, assembling tags
    if    [ "$LEVEL" -gt "$LAST" ];   then (( ++LAST )); BUecho; BLecho
    elif  [ "$LEVEL" -eq "$LAST" ];   then  ELecho; BLecho
    else
        while [ "$LEVEL" -lt "$LAST" ]; do  ELecho; EUecho; (( --LAST ));
        done; [ "$LAST"  -gt "0"     ] && { ELecho; BLecho;}
    fi
done






#!/bin/bash

#preset variables, exec redirects everything to outputfile
ROOT="./"
LABEL="foldername.txt"
MAXDEPTH=5
DEPTH=0
HTTP="http://www.somewhere.com"
exec > "$ROOT/Menu-test.html"

#functions for indentation, definition and printing tags
LI="<LI><SPAN class=plus><P>+</P></SPAN>"
ULecho() { Dent ; echo "<UL class='navlist$DEPTH'>"                    ;}
LIecho() { echo -n "$LI<A href='$HTTP${1/$ROOT/}/'>$( cat $LABEL)</A>" ;}
Indent() { for (( i=1 ; i < DEPTH ; ++i )); do Dent; Dent; done ; Dent ;}
Dent()   { echo -n "    "                                              ;}
LIstrt() { Indent; LIecho "$( pwd )" ; echo "</LI>"                    ;}
ULstrt() { Indent; LIecho "$( pwd )" ; echo; Indent; ULecho            ;}
TAGend() { Indent ; Dent ; echo "</UL>"; Indent; echo "</LI>"          ;}
DEPchk() { [ "$DEPTH" -gt "0" ] && ${1} ;}

:> $ROOT/$LABEL

Dive()
{
    local DPATH="$1"


    if [ "$( echo */$LABEL )" = "*/$LABEL" ] || [ $DEPTH -gt $MAXDEPTH ]
    then
        DEPchk LIstrt
    else
        DEPchk ULstrt
        for DPATH in */$LABEL
        do
            cd ${DPATH%/*}
              (( ++DEPTH ))
            Dive "$DPATH"
              (( --DEPTH ))
            cd ..
        done
        DEPchk TAGend
    fi
}

cd $ROOT
Dive "$ROOT"
echo "</UL>"