from fastapi import APIRouter

api_router = APIRouter(
    prefix='/apis',
    tags=['Apis']
)

api_router.add_api_route('/', add_apis, methods=['POST'])
