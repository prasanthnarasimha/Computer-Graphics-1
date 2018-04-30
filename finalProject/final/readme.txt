From previous submission to this final version, the following are the breif updates.
    1. Added the ability to change the speed of the cube and the range is set from 1 to 30.
    2. Now, the cube detects collision of trees. If there is a tree in the way of the cube, then cube stops moving. In previous submission, the cube just travels through the cube.
I keep track of bounds of the cube and when it starts moving, I check if it collides with the bounds of any tree at every point of time. If it collides, we just stop the movement using stopMovememtn() function.
As stated in my previous submission's readme, I made the floor look more like grass. This is definitely better than my previous sumbmission.