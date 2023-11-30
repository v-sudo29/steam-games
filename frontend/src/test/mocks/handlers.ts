import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('', ({ request, params, cookies }) => {
    return HttpResponse.json('Test response')
  })
]