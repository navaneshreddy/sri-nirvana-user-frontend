const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function request(endpoint, options = {}) {
  let response;
  const { timeout = 8000, ...fetchOptions } = options;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeout);

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...(fetchOptions.headers || {})
      },
      signal: controller.signal
    });
  } catch {
    throw new Error('Unable to connect to the room service server. Please try again shortly.');
  } finally {
    window.clearTimeout(timeoutId);
  }

  let data = null;
  const text = await response.text();

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || 'Something went wrong. Please try again.');
  }

  return data;
}

export function createOrder(orderData) {
  return request('/api/orders', {
    method: 'POST',
    body: JSON.stringify(orderData)
  });
}

export function getOrderById(orderId) {
  return request(`/api/orders/${encodeURIComponent(orderId)}`);
}

export function getMenuItems() {
  return request('/api/menu-items', { timeout: 2500 });
}
