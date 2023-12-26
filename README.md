# eTask Frontend Starter

[![License](https://img.shields.io/badge/license-NETGRIF%20Community%20License-green)](https://netgrif.com/license)
[![Angular](https://img.shields.io/github/package-json/dependency-version/netgrif/etask-frontend-starter/@angular/core?color=red)](https://www.angular.io/)
[![NAE](https://img.shields.io/github/package-json/dependency-version/netgrif/etask-frontend-starter/@netgrif/components-core?color=blue)](https://www.angular.io/)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/netgrif/etask-frontend-starter?sort=semver&display_name=tag)](https://github.com/netgrif/etask-backend-starter/releases)

eTask is a process-based application build
with [Netgrif Application Engine (NAE)](https://github.com/netgrif/application-engine).
eTask project is a quick way to start working with NAE and [Petriflow](https://github.com/netgrif/petriflow) processes
without a need to set up project from scratch.

eTask frontend is implemented with Angular framework and it depends on default NAE components library.
You are free to use your own components that are based on [@netgrif/components](https://github.com/netgrif/components).

It helps if you are familiar with Angular Framework, Typescript, CSS and HTML, but it is not necessary as this starter
project already contains some predefined views and navigation items, which are suitable for interacting with your
processes.

## Requirements

Frontend application has some requirements for runtime environment. The following table is summary of requirements to
build and run the application for development.

| Name                              | Version  | Description                                               | Recommendation                                                  |
|-----------------------------------|----------|-----------------------------------------------------------|-----------------------------------------------------------------|
| [Angular CLI](https://angular.io) | 13.+     | TypeScript-based web application framework                | ```npm i -g @angular/cli@13.3.1"```                             |
| [NodeJs](https://nodejs.org/en/)  | 16+, 18+ | JavaScript runtime built on Chrome's V8 JavaScript engine | [NodeJs 18.19.0](https://nodejs.org/download/release/v18.19.0/) |
| [NPM](https://www.npmjs.com)      | 9+       | Node Package Manager                                      | Compatible version comes with NodeJs                            |

## Installation

eTask can be used as a starting project for your NAE application, or it can be run as is and deploy Petriflow
processes at runtime.

### Starter project

This project can be used as a base to your NAE application. Before you start coding please consider doing following
steps to personalize the project:

- In [package.json](package.json), change the value of ```name``` attribute to name of your application

As it is an Angular project, there is a file called ```package.json``` in root folder, which contains information about
project and application, script definitions, dependencies and their versions.

First step is to install the dependencies using the NPM package manager. Using terminal, navigate to the root folder (
where the ```package.json``` is saved) and run ```npm install --legacy-peer-deps``` command. This will scan the ```package.json``` file and
install the dependencies from NPM repositories.

The second step is to build the application using Angular CLI (Command Line Interface). This can be done using terminal
when you are in the root folder of the project running ```ng build``` command. This will create a ```dist``` folder,
that contains the build of application. This build then can be moved to a web server (e.g. Apache or Nginx).

To run the application locally you can use ```ng serve``` command, that runs an embedded server and serves the
application to localhost. Port of the application can be changed using ```--port``` option. The default port is 4200.

#### NAE.json

The frontend application consist of side menu and a views for the application. There are some predefined views for
processes, cases, tasks and user management. Side menu items are loaded from the [eTask application server](https://github.com/netgrif/etask-backend-starter).

To configure NAE application more easily the libraries use file ```nae.json``` that is placed in root of the project.
```nae.json``` defines global application configuration like urls to backend resources, services' configurations,
routing and views.

### Run in web server

eTask frontend application build is distributed with every release. You can download is as a [release artifact](https://github.com/netgrif/etask-frontend-starter/releases/latest),
extract it from the zip archive and run it in web server of your choice.
Content of the release artifact are only static files to be served be a web server and run in the client browser.
The project includes example of [nginx configuration](default.nginx.conf).

### Run as a container

eTask frontend application is also published as [Docker image](https://hub.docker.com/r/netgrif/etask-frontend) available via Docker hub.
Docker image is running nginx web server to serve eTask frontend application. You can run it directly with docker:

```shell
docker pull netgrif/etask-frontend:latest
docker run -p 80:80 netgrif/etask-frontend:latest
```

or with docker-compose file:

```yaml
version: "3.3"
services:
  etask:
    image: netgrif/etask-frontend:latest
    ports:
      - "80:80"
```

#### Configuration

The application can be configured using environment variables. Available variables are in table below:

| Variable         | Type    | Default | Description                                                                                                       |
|------------------|---------|---------|-------------------------------------------------------------------------------------------------------------------|
| AUTO_RESOLVE_URL | Boolean | true    | Enable/Disable auto-resolving URL of eTask application server based on domain that this app is run.               |
| LOG_LEVEL        | String  | DEBUG   | Log level of frontend logger. Default logger pushes to browser console.  Allowed values: DEBUG, INFO, WARN, ERROR |

