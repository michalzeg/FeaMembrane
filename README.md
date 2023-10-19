
| Branch  | Build Status |
| ------------- | ------------- |
| main | [![Build Status](https://michalzeg.visualstudio.com/GitHub/_apis/build/status%2Fmichalzeg.FeaMembrane?branchName=main)](https://michalzeg.visualstudio.com/GitHub/_build/latest?definitionId=32&branchName=main)  |


<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
<!-- ABOUT THE PROJECT -->
## About The Project
![Przechwytywanie](https://github.com/michalzeg/StruCal/assets/16364170/0645e9cc-5688-4cd2-a2b2-f26d64e535a4)

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

![feamembrane](https://github.com/michalzeg/StruCal/assets/16364170/785cf72a-178c-4c4b-9061-7362b0ad33d1)

<!-- LICENSE -->
## License

Distributed under the MIT License.
