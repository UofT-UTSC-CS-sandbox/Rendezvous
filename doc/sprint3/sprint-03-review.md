# Rendezvous/Forex4

(assuming iteration means which sprint we are on)
## Iteration 03 - Review & Retrospect

 * When: July 19th, 2024
 * Where: Online, on a Discord call

## Process - Reflection

We focused on our individual tasks and each of us informed the discord chat if they were experiencing a significant blocker. There was not much deviation from this process.

#### Decisions that turned out well

List process-related (i.e. team organization) decisions that, in retrospect, turned out to be successful.
1) Any group member who experienced a blocker immediately notified the rest of the group of their problem, and the issues were always resolved within the day. This made for a very straightforward development process because blockers never lasted for long.
2) We were a lot more comfortable working in a team after 3 sprints, which made communication a lot easier.

#### Decisions that did not turn out as well as we hoped

List process-related (i.e. team organization) decisions that, in retrospect, were not as successful as you thought they would be.
1) The node.js people updated node during the sprint causing our frontend to stop working since we were using the docker image of the latest node version, which was now bugged and faulty. We have now switched to the latest stable version instead. 
2) Two user stories that we assigned to 2 separate group members were associated with each other, and it was relatively difficult to develop those at the same time since one user story required the other to be done. We will not do that again.

#### Planned changes

List any process-related changes you are planning to make (if there are any)

N/A

## Product - Review

#### Goals and/or tasks that were met/completed:

- <REN-28> Friends list is now styled well, looks much better
- <REN-17> and <REN-38> User can now view all events they have hosted, whether it is the most recent 3 or all of them in a pop-up.
- <REN-43>, <REN-46>, <REN-48> A user may now send friend requests, accept friend requests and remove friends.

#### Goals and/or tasks that were planned but not met/completed:

- <REN-39> The 3 recent events a user has attended do not show up on their profile, nor can the user view all events they have attended. This was because of an oversight, the events page was not yet capable of letting the user sign up for events.
- <REN-8> We are not able to view friends’ events. Implementing such associations between users has proven to be a lot more difficult than expected, and may require more focus than the other components.

## Meeting Highlights

Going into the next iteration, our main insights are:
1) Try to divert more attention to components that we judge will take more time and effort to complete.
2) Continue to respond as fast as possible to crises. The node.js version issue was only solved as fast as it was because one of the group members noticed it the day it was changed by the node.js developers.


