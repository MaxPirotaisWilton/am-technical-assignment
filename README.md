# Auckland Museum Technical Assignment Submission

## By Max Pirotais-Wilton

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Introduction

This README will cover the following on this technical assignment for the Junior ReactJS Programmer position at the Auckland War Memorial Museum: 

- Overview of the Brief
- Assumptions
- Design Decisions
- Shortcomings

Here are the links to the 2 versions of the projects:

- [Octopus](https://octopus-am-tech-assignment.netlify.app/)
- [South Island](https://southisland-am-tech-assignment.netlify.app/)

## Overview of the Brief

The deliverable, as outlined in the provided PDF document, is an interactive kiosk display system using the ReactJS front-end JavaScript library with styling using SASS. The deliverable is specified to run on a 27" touchscreen.

The system is meant to use configuration files, where it can fetch relevant images, text information and other data to programatically populate the features of a unique interactive display. 

I won't recount all the specifications for this assignment, they are available on the supplied PDF document.

## Assumptions

Here are a list of assumptions I made during development of the system:

- The brief has specified that the system will be used on only one device/environment. This means we don't need to solve issues pertaining to other platforms/scenarios.

- The Touch Screen's resolution is 1920X1080 (or 1080X1920 when mounted vertically). This is based on very shallow research into touch screen monitors.

- The Touch Screen is a **monitor**, not a **mobile device**. Important as this can impact font-size on screen.

- Images provided for the assignment are provided as is and are not to be modified.

- No current plan to add more languages to the system (other than English or Te reo Māori).

## Design Decisions

When developing this assignment project, I made a few software design decisions that I felt were either important to highlight or that I thought could make the project stand out technically.

The first decision was to use the .json file type for the system's configuration files. It is a popular file type for data interchange and is both easy to read and modify using JavaScript, simplifying the process of creating an administrator service at a latter date.

The biggest design decision for this project relates to the different pages of the interactable system. Instead of clearly defining _Landing_ and _Hotspot_ pages as seperate components, I decided to use recursion: an interactable page component can make a child page component appear, where the child page's information is stored in an array inside the parent's "details" field. Ultimately, the most important impact of this system is that it can support nested details (or details within details)! While recursion can get very difficult and unintuitive to work with, I feel as though it has opened up the possibilities for future installations and I'm quite proud of how I pulled it off (minus one bug. I'll discuss it in the later section).

Another important design decision was to let the page automatically switch between a vertical or a horizontal layout. This is based on the difference between the width and the height of the browser window. While this dynamic feature isn't going to be seen by end users interacting with the pages, it will simplify the installation process for the interactable: only the screen (and the browser window) will have to be set to the desired orientation and the web page will follow suit.

## Shortcomings

One of my project's biggest shortcomings is it's styling. I prioritised the JavaScript components heavily during the time I was given to make sure the interactions and systems would be functional. As a result, I left the styling of the page up until the last minute and, alongside full-time work during the week, I didn't get it to look as sleek as I wanted to. 

Another shortcoming is that the system has a bug for configurations that have nested details: the user returns to the landing page when pressing the back button in a nested page instead of returning to the previous page. While this isn't an issue for the scenarios given for this brief, it hinders the user experience on multi-layered configurations enough that I don't feel confident shipping this feature. This also meant I canned the addition of an easter egg in the **South Island** configuration, which would showcase nested pages and using hosted images for pages instead of just locally stored image files (this feature is shippable, but all images provided are local so it is not used). 

The final limitation of the system currently is that the codebase needs to be modified to read a different .json configuration file. This is an issue that severly impacts the flexibility of the system. I have researched and attempted to implement a solution with no luck.