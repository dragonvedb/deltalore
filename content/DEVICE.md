**IN DELTARUNE**, the Device is a specualtive name for the medium through which <a onclick="loadFile('Red Soul.md')">the Player</a> is connected to the world of the game. It seems to be created and/or operated by <a onclick="loadFile('Doctor W. D. Gaster.md')">Dr. Gaster</a>.

In the game code, files related to the Device follow a special naming convention: they are written in all-caps, use underscore to separate words and have special prefixes depending on file type. Examples include DEVICE_CONTACT, <a onclick="loadFile('Goner Maker.md')">DEVICE\_GONERMAKER</a>, <a onclick="loadFile('Name Selector.md')">DEVICE\_NAMER</a>, <a onclick="loadFile('Depths.md')">IMAGE\_DEPTH</a>, <a onclick="loadFile('FRIEND.md')">IMAGE\_FRIEND</a>,  <a onclick="loadFile('Sound Test.md')">AUDIO\_ANOTHERHIM</a> and so on.

Saving and loading is managed via DEVICE_MENU. Before Ch1 is completed, this menu has a stark black-green interface and features all-caps messages that seems to be written by Dr. Gaster. For instance, "THE DIVISION IS COMPLETE." displays when the player copies a savefile to an empty slot; "IT IS BARREN AND CANNOT BE COPIED." when an empty slot is selected to be copied; "IT WAS AS IF IT WAS NEVER THERE AT ALL." when a save file is erased.
- _There are several unusual hidden messages:_
    - _Whenever the player chooses a save file for deletion and then cancels, a hidden 'threat' variable increases by 1. Increasing it to 10 yeilds "VERY INTERESTING."_
    - _Copying a save file into two other slots, so that all three are identical, yields "PREPARATIONS ARE COMPLETE."_
        - _Continuing to copy files afterwards yields "WHAT AN INTERESTING BEHAVIOUR."_

The game over screen is named DEVICE_FAILURE.

In Ch1, it says "IT APPEARS YOU HAVE REACHED AN END. WILL YOU TRY AGAIN?" or "WILL YOU PERSIST?". Selecting 'YES' yields "THEN, THE FUTURE IS IN YOUR HANDS.". 

Selecting 'NO' yields "THEN THE WORLD WAS COVERED IN DARKNESS."

In Ch2, the initial question is replaced with either <a onclick="loadFile('Ralsei.md')">Ralsei's</a> or <a onclick="loadFile('Susie.md')">Susie's</a> pleading for <a onclick="loadFile('Kris.md')">Kris</a> to not give up. Choosing to give up still show the message about the world being covered by darkness.
- _It seems that the message appearing when Kris gives up refers to <a onclick="loadFile('The Roaring.md')">the Roaring</a>._
