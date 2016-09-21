# Slack Avatar Changer
Changes your Slack avatar over a period of time to random predefined images.

## Installation
#### Install the required package dependencies
```npm install```

## Usage
##### Dev Mode
```gulp start-dev```
##### Build and run
```gulp build``` and ```node avatarchanger.js```
##### Running forever
You can use the `forever` npm module to run this bot  
in the background forever using the command:  
`npm run forever`

## Config File
config.json should resemble:
```
{
  "slackAPIToken": "xxxxxxxxxxx",   // Slack API Token
  "interval": 60                    // Period in minutes to change avatar
}
```

## License
```
/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * Js41637 wrote this. You can do whatever you want with this stuff.
 * If we meet some day, and you think this stuff is worth it,
 * you can buy me an ICED COFFEE in return.
 * ----------------------------------------------------------------------------
 */
 ```
