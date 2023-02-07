# Auckland Museum Technical Assignment Submission

## By Max Pirotais-Wilton

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Introduction

This README will cover the following on this technical assignment for the Junior ReactJS Programmer position at the Auckland Memorial Museum: 

- Overview of the Brief
- Assumptions
- Design Decisions
- Shortcomings and Future Expansion

## Overview of the Brief

The deliverable, as outlined in the provided PDF document, is an interactive kiosk display system using ReactJS front-end JavaScript library and styled using SASS. The deliverable is specified to run on a 27" touchscreen.

The display system is meant to use configuration files, where it can then fetch relevant images, text information and other data to programaticall create a unique kiosk interactive display. 

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

The design for the different pages of the interactable system is one I'm quite proud of. Instead of clearly defining _Landing_ and _Hotspot_ pages as their seperate components, I decided to use recursion 