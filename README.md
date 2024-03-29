# Visualize Earthquake Data using Leaflet

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

Index.html file

![image](https://github.com/albertdudek7/Visualize_Earthquake_Data_Using_Leaflet/assets/127783844/4d4691ff-f50b-43fc-80d5-c7447f201b85)

Logic.js file

![image](https://github.com/albertdudek7/Visualize_Earthquake_Data_Using_Leaflet/assets/127783844/a29706d8-f63e-4f6b-b4c5-b14b1e42b582)

![image](https://github.com/albertdudek7/Visualize_Earthquake_Data_Using_Leaflet/assets/127783844/7813c80b-5335-47b9-9feb-0a620210b1f3)



Part 1: Create the Earthquake Visualization

Your first task is to visualize an earthquake dataset. Complete the following steps:

Get your dataset. To do so, follow these steps:

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON FeedLinks to an external site. page and choose a dataset to visualize. The following image is an example screenshot of what appears when you visit this link:
3-Data

When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization. The following image is a sampling of earthquake data in JSON format:
4-JSON

Import and visualize the data by doing the following:

Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.

Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.

