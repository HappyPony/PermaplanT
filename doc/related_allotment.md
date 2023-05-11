# Database representation for mixed culture (allotment)
Summary of a summary of a discussion in the project https://debianforum.de/forum/viewtopic.php?p=1324012#p1324012
## Task
The question posed by the questioner was whether and how one could create or use an algorithm to compile different groups from a list of plants and their compatibility that do not show incompatibilities with each other.
## Data basis
The list of plants consisted of 11 species from pineapple to papaya.
Compatibilities were described in two *csv* files, *enemies.csv* and *friends.csv.* In the two files, the relationship of two plants was described. An entry in friends.csv meant that the plants got along well. Correspondingly, an entry in *enemies.csv* meant that the two plants did not get along. All plants in a mixed culture must be explicitly friends with the main plant, but may be neutrally related to each other. Any combination of plants from the list of 11 species will be found in either *friends.csv* or *enemies.csv*. This clearly defines the compatibility of all combinations.
## Workflow
XY's Python program checks the files for plausibility and stops processing if anything in the files is inconsistent.
A user XY created a Python program in the course of the discussions, which prepared a list of plants and a table of compatibilities, processed it with the *Python package 'networkx'* and finally outputted a number of groups of possible plants without incompatibilities.

Translated with https://www.deepl.com/

## Sources
[1] Datenbankdarstellung für Mischkultur (Kleingarten), 01.04.2023 - https://debianforum.de/forum/viewtopic.php?p=1324012#p1324012
[2] NetworkX. Network Anylysis in Python - https://networkx.org/documentation/stable/tutorial.html
