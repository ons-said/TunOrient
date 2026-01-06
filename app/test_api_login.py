import urllib.request
import json
import urllib.error

def test_api_login(email, password):
    url = "http://localhost:8000/api/v1/auth/login"
    payload = {
        "email": email,
        "password": password
    }
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'}, method='POST')
    
    print(f"Sending POST to {url} with payload: {payload}")
    try:
        with urllib.request.urlopen(req) as response:
            print(f"Status Code: {response.getcode()}")
            print(f"Response Body: {response.read().decode('utf-8')}")
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code}")
        print(f"Error Body: {e.read().decode('utf-8')}")
    except urllib.error.URLError as e:
        print(f"URL Error: {e.reason}")
        print("Is the server running on port 8000?")

if __name__ == "__main__":
    test_api_login("admin@tunorient.tn", "admin123")
