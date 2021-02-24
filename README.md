# Teams injector

Teams injector is an app designed to inject js code to Teams desktop app.

## Screenshots
![image](https://user-images.githubusercontent.com/47148920/109078904-6e588d80-76fe-11eb-8a72-e45011311792.png)

![image](https://user-images.githubusercontent.com/47148920/109079102-bb3c6400-76fe-11eb-82ac-1e4b2d6296e9.png)

![image](https://user-images.githubusercontent.com/47148920/109079403-3140cb00-76ff-11eb-9e08-e215159a3def.png)


## Requirements

To build the app you will need the following libraries:
* `websockets`
* `requests`

## Building

To build the app you will need pyinstaller which can be downloaded using `pip install pyinstaller`.

```bash
pyinstaller -F -w --hidden-import websockets injector.py
```

## Installation

To install Teams injector you need to go to your Teams installation folder (default for windows: `C:/Users/username/AppData/Local/Microsoft/Teams/current`), rename `Teams.exe` to `Teams_o.exe`, paste `injector.exe` with the script files and rename `injector.exe` to `Teams.exe`.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
