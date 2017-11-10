---
theme: metropolis
title: "Travel Counsellor"
author: [Michael Allram, Tobias Folie, Alexander Klement, Etienne Bertin]
date: 2017-10-24
---

# Plan

- After the first presentation some issues had to be addressed
- We've divided the work into different issues and are working on it individually and as a group


# Basic view and functionality

![draft](../draft.png "draft")

- As of yet, fairly rough design
- Mobile support


# Basic Weather API interaction

- Got api-key from openweather.com
- Javascript function implemented
- Gets wheatherdescription (cloudy, sunny .. ) by geoposition

# Geting Geoposition by Street, City or Landmark

- Technology: OpenStreetMap API
- Users can enter the Street, a City or a Landmark and the function returns the geoposition (latitude, longitude)
- Jquery Plugin "TypeWatch": It waits until the user has finished typing and then the function is executed

# Getting Geoposition

[comment]: <> (Michael/Tobias TODO: describe progress in a few bullet points)

- Is fairly simple with modern browsers
- However, it is not very reliable for machines without GPS (eg. desktop PCs)

# Basic Google places API interaction

- We can request and receive details about an selected area
- We order the results in a particular to present the most desirable results at the top
