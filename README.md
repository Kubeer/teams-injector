# Teams injector

Teams injector is an app designed to inject js code to Teams desktop app.

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
