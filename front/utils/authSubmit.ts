export const submitRegisterForm = async (formData: {
    username: string;
    email: string;
    password: string;
    [key: string]: any;
  }) => {
    const response = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Rejestracja nie powiodła się');
    }
    
    return data;
  };
  
  export const submitLoginForm = async (formData: {
    email: string;
    password: string;
    [key: string]: any;
  }) => {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      }),
    });
    
    const data = await response.json();
    
    if (response.status === 409) {
      const errorInfo = {
        status: 409,
        field: data.message.includes("email") ? "email" : "password",
        message: data.message
      };
      throw errorInfo;
    }
    
    if (!response.ok) {
      throw new Error(data.message || 'Logowanie nie powiodło się');
    }
    
    return data;
  };