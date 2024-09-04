from fastapi import FastAPI
from fastapi_pagination import add_pagination
from fastapi.middleware.cors import CORSMiddleware
from apis.apis.route import api_router
from apis.base.route import base_router
from apis.servers.route import server_router
from apis.services.route import services_router
from db.database import engine, Base

app = FastAPI()
add_pagination(app)

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

prefix = '/monitoring/api'

app.include_router(server_router, prefix=prefix)
app.include_router(services_router, prefix=prefix)
app.include_router(api_router, prefix=prefix)
app.include_router(base_router, prefix=prefix)
