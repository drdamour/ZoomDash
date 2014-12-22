ZoomDash
========

A zooming dashboard in your browser to show all your applications built in dashboards at once

Why?
========
We have big TVs in our office that show a single webpage at a time.  It drove me crazy that i could not see all the very cool color coded dashboards of all the different apps we use for reporting internally simultaniously on our big fancy TVs.  Applications like Jira, Bamboo, CruiseControl, etc.  Sure i could write an app that collates all this information and displays it in some homogeonous way but why reinvent the wheel? 

Possible Options
=======
Droptiles (https://github.com/oazabir/Droptiles) looks like a great candidate...but i don't have time to do the programming to enacpsulate an API into a tile, and all our apps (Jira, Bamboo, Progressquest, etc) have their own dashboards that i want to reuse.  Most importantly, i wanted a completely client side solution wtih no server components, other than the resources that ZoomDash displays.

ZoomDash as the Answer
=======
The simplest thing possible was to embed our applications existing dashboard pages into a tiled-grid X by X layout and zoom into each tile with a confiurable time delay between transitions.

Future Enhancements
=======
Have you seen leap motion?  Once they you shoudl be able to wave your hand to navigate between the tiles of the dash to get to the info you care about all in 65" 1080p goodness (or whatever display you put ZoomDash on).
