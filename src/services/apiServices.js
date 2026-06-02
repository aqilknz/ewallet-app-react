const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000/ewallet";

// API Autentikasi
export const loginAPI = async (credentials) => {
  const response = await fetch(`${API_URL}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || data.message || "Gagal login");
  return data.data;
};

export const createPinAPI = async (pin, token) => {
  const response = await fetch(`${API_URL}/auth/create-pin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ pin }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || data.message || "Gagal membuat PIN");
  return data.data;
};

export const logoutAPI = async (token) => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || data.message || "Gagal logout");
  return data;
};

// API User (Profil)
export const getProfileAPI = async (token) => {
  const response = await fetch(`${API_URL}/users/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || data.message || "Gagal mengambil data profil");
  return data.data;
};

export const updateProfileAPI = async (formData, token) => {
  const response = await fetch(`${API_URL}/users/profile`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,

    },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || data.message || "Gagal memperbarui profil");
  return data.data;
};

export const getDashboardAPI = async (token) => {
  const response = await fetch(`${API_URL}/users/dashboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || data.message || "Gagal mengambil data dashboard");
  return data.data;
};

export const getTransactionReportAPI = async (token, params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = `${API_URL}/users/transaction/report${query ? `?${query}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to fetch report");
  }
  return data.data;
};


export const processTopUpAPI = async (payload, token) => {
  const response = await fetch(`${API_URL}/users/transaction/topup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },

    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || data.message || "Gagal memproses Top Up");
  return data.data;
};

export const getTransactionHistoryAPI = async (token, params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = `${API_URL}/users/transaction/history${query ? `?${query}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to fetch history");
  }
  return data.data;
};

export const processTransferAPI = async (payload, token) => {
  const response = await fetch(`${API_URL}/users/transaction/transfer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || data.message || "Gagal memproses Transfer");
  return data.data;
};

export const searchUsersAPI = async (token, params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = `${API_URL}/users/receivers${query ? `?${query}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to fetch users");
  }
  return data.data;
};

export const updatePasswordAPI = async (payload, token) => {
  const response = await fetch(`${API_URL}/users/profile/password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || data.message || "Gagal mengubah password");
  return data;
};

export const updatePinAPI = async (payload, token) => {
  const response = await fetch(`${API_URL}/users/profile/pin`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || data.message || "Gagal mengubah PIN");
  return data;
};