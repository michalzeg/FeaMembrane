# Fea Membrane
| Branch  | Build Status |
| ------------- | ------------- |
| main | [![Build Status](https://michalzeg.visualstudio.com/GitHub/_apis/build/status%2Fmichalzeg.FeaMembrane?branchName=main)](https://michalzeg.visualstudio.com/GitHub/_build/latest?definitionId=32&branchName=main)  |


<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
<!-- ABOUT THE PROJECT -->
## About The Project

![image](https://github.com/michalzeg/FeaMembrane/assets/16364170/10d9cb06-9b89-4c64-a5f8-34bc6d08598b)

Implementation of finite element analysis for two dimensional elements. You can see more on the subject [here](https://en.wikipedia.org/wiki/Finite_element_method)

### Built With

* .NET
* Angular
* Bootstrap
* PrimeNg
* three.js

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Before you start please make sure you have installed the following software
* Node.js
* .NET SDK

### Installation
Clone the repo
   ```sh
   git clone https://github.com/michalzeg/FeaMembrane.git
   ```
Run the project using provided PowerShell script
   ```sh
   .\run.ps1
   ```
Open in your browser http://localhost:4200

OR use the provided docker image
   ```sh
   docker-compose -f .\build\docker-compose.yml up
   ```
and open in your browser http://localhost:5000
<!-- USAGE EXAMPLES -->
## Usage

You can see usage on the follwing animation

![feamembrane](https://github.com/michalzeg/FeaMembrane/assets/16364170/334904b0-f9d6-4ae7-b28a-3e604d002a6b)

<!-- LICENSE -->
## License

Distributed under the MIT License.
