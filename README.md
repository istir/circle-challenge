# Circle Challenge

Problem taken from <https://www.youtube.com/watch?v=A0BmLYHLPZs>

## Problem

- Let user click on the screen and for each click show a circle on the screen.
- Allow user to undo placing a circle and redo it

## Solution

I made it so the circles are percentages on the screen. I made it extra fancy by setting `--circleX` and `--circleY` CSS variables. This can be skipped by setting `left` and `right` properties directly in `style`. However, while in React this is fine because it would be changed on rerender, I think it's generally more elegant to use CSS variables, since it lets user do much more things especially in classic HTML JS CSS combo.

Undoing a circle is as easy as appending the last one to another state variable and removing it from the circles on the screen.

Redoing a circle is doing the opposite.

Clicking a circle additionally clears array with redo circles.
