import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosResponseHeaders,
} from 'axios';

export function checkToken(code?: number): boolean {
  if (!localStorage.getItem('token') || code === 401) {
    alert('You have been logged out. Redirecting to login page');
    window.open('/login', '_self');
    return false;
  }
  return true;
}

export function getHeaders(config?: AxiosRequestConfig): AxiosRequestHeaders {
  const headers: AxiosRequestHeaders = {
    ...config?.headers,
    Authorization: `Bearer ${localStorage.getItem('token') as string}`,
  };
  console.log(headers);
  return headers;
}
export async function apiGetOrDelete<Y>(
  url: string,
  config?: AxiosRequestConfig,
  method?: 'get' | 'delete',
): Promise<[Y, number]> {
  try {
    const res: AxiosResponse<Y, null> = await axios[method || 'get'](url, {
      ...config,
      headers: getHeaders(),
    });
    return [res.data, res.status];
  } catch (err) {
    const error = err as AxiosError;
    if (error.isAxiosError && error.response) {
      if (error.response.status === 401) {
        alert('You have been logged out. Redirecting to login page');
        window.open('/login', '_self');
      }
      return [error.response.data, error.response.status];
    }
    throw err;
  }
}

export async function apiPostOrPatch<T, Y>(
  url: string,
  payload: T,
  config?: AxiosRequestConfig,
  method?: 'post' | 'patch',
): Promise<[Y, number]> {
  try {
    const res: AxiosResponse<Y, null> = await axios[method || 'post'](
      url,
      payload,
      {
        ...config,
        headers: getHeaders(config),
      },
    );
    return [res.data, res.status];
  } catch (err) {
    const error = err as AxiosError;
    console.log(error);
    if (error.isAxiosError && error.response) {
      if (error.response.status === 401) {
        alert('You have been logged out. Redirecting to login page');
        window.open('/login', '_self');
      }
      return [error.response.data, error.response.status];
    }
    throw err;
  }
}