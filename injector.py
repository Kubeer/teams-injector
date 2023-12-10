import websockets
import requests
import asyncio
import json
import subprocess
import time

windows_endpoint = 'http://localhost:9222/json'
SCRIPT_PATH = 'script.js'
SCRIPT_CONTENT_PATH = 'script_content.js'

def getPayload(expression):
    return {
               'id': 1337,
               'method': 'Runtime.evaluate',
               'params': {'expression': expression}
           }

async def findMainWindow():
    for x in range(5):
        try:
            res = requests.get(windows_endpoint)
            if res.status_code != 200:
                return -1
        except Exception as e:
            print(e)
            pass
        windows = res.json()
        for window in windows:
            url = window['webSocketDebuggerUrl']
            try:
                async with websockets.connect(url) as ws:
                    await ws.send(json.dumps(getPayload('document.querySelectorAll(".app-header-bar").length')))
                    r = await ws.recv()
                    if (json.loads(r) and json.loads(r)['result'] and json.loads(r)['result']['result'] and json.loads(r)['result']['result']['value'] and json.loads(r)['result']['result']['value'] > 0):
                        return url
            except Exception as e:
                print(e)
                pass
        print("Did not find main window retrying... "+str(x+1)+"/5")
        
async def findContentWindow():
    for x in range(5):
        try:
            res = requests.get(windows_endpoint)
            if res.status_code != 200:
                return -1
        except Exception as e:
            print(e)
            pass
        windows = res.json()
        for window in windows:
            url = window['webSocketDebuggerUrl']
            try:
                async with websockets.connect(url) as ws:
                    await ws.send(json.dumps(getPayload('document.querySelector("#main-window-body")')))
                    r = await ws.recv()
                    if (json.loads(r) and json.loads(r)['result'] and json.loads(r)['result']['result'] and json.loads(r)['result']['result']['subtype'] and json.loads(r)['result']['result']['subtype'] == "node"):
                        return url
            except Exception as e:
                print(e)
                pass
        print("Did not find main window retrying... "+str(x+1)+"/5")
            
            
async def injectScript(windowUrl, scriptPath):
    try:
        with open(scriptPath, 'r') as f:
            payload = getPayload(f.read())
    except Exception as e:
        raise Exception('Error occurred while trying to open a file.')
    print('File read successfully.')
    try:
        async with websockets.connect(windowUrl) as ws:
            await ws.send(json.dumps(payload))
            res = await ws.recv()
            res = json.loads(res).get('result', {})
            if not res or res.get('exceptionDetails', None):
                error = res.get('exceptionDetails', {}).get('exception', {})
                print('Failed injecting script {} due to {}.'.format(scriptPath, error))
                return 0
            print('Injection successfull.')
    except Exception as e:
        print(e)
            
if __name__ == "__main__":
    try:
        subprocess.Popen(['Teams_o.exe', '--remote-debugging-port=9222'])
    except Exception as e:
        raise Exception(e)
    time.sleep(5)
    
    loop = asyncio.get_event_loop()
    print('Trying to find main window...')
    mainWindowUrl = loop.run_until_complete(findMainWindow())
    print(mainWindowUrl)
    print('Trying to find content window...')
    contentWindowUrl = loop.run_until_complete(findContentWindow())
    print(contentWindowUrl)
    if(mainWindowUrl == -1):
        raise Exception('Error occurred while trying to find main window of Teams.exe application, please check if you set the correct port.')
    if(contentWindowUrl == -1):
        raise Exception('Error occurred while trying to find content window of Teams.exe application, please check if you set the correct port.')
    print('Trying to inject script for main window...')
    loop.run_until_complete(injectScript(mainWindowUrl, SCRIPT_PATH))
    print('Trying to inject script for content window...')
    loop.run_until_complete(injectScript(contentWindowUrl, SCRIPT_CONTENT_PATH))