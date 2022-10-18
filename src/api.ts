const API_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/';

function safeFetchToJson(url: string, customSettings?: RequestInit) {
  return fetch(API_URL + url, customSettings).then((response) => {
    if (!response.ok) {
      return Promise.reject(`${response.status} -- ${response.statusText}`);
    }

    if (!response.headers.get('content-type')?.includes('application/json')) {
      return Promise.reject('Not JSON');
    }

    return response.json();
  });
}

export function getUsers(page: string): Promise<Users> {
  return safeFetchToJson(`users?page=${page}&count=6`);
}

export function getPositions(): Promise<Positions> {
  return safeFetchToJson('positions');
}

export function getToken(): Promise<Token> {
  return safeFetchToJson('token');
}

export function addUser(formData: FormData, token: string) {
  return safeFetchToJson('users', {
    method: 'POST',
    body: formData,
    headers: { token },
  });
}
