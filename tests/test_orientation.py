from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_orientation():
    orientation_data = {"name": "Test Orientation", "description": "A test orientation"}
    response = client.post("/api/v1/orientations/", json=orientation_data)
    assert response.status_code == 201
    assert response.json()["name"] == orientation_data["name"]

def test_get_orientation():
    response = client.get("/api/v1/orientations/1")
    assert response.status_code == 200
    assert "name" in response.json()

def test_update_orientation():
    orientation_update_data = {"name": "Updated Orientation"}
    response = client.put("/api/v1/orientations/1", json=orientation_update_data)
    assert response.status_code == 200
    assert response.json()["name"] == orientation_update_data["name"]

def test_delete_orientation():
    response = client.delete("/api/v1/orientations/1")
    assert response.status_code == 204
    response = client.get("/api/v1/orientations/1")
    assert response.status_code == 404

def test_get_all_orientations():
    response = client.get("/api/v1/orientations/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)