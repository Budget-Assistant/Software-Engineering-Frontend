export const handleSubmit = async (e, formData, navigate) => {
  e.preventDefault();
  
  if (formData.password !== formData.password2) {
      alert('Passwords do not match');
      return;
  }

  try {
      const response = await fetch('http://localhost:3001/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              email: formData.email,
              username: formData.username,
              password: formData.password
          }),
      });

      const data = await response.json();

      if (response.ok) {
          alert('Registration successful');
          navigate('/');
      } else {
          if (data.message === 'User already exists') {
              alert('This email is already registered.');
          } else {
              alert('Registration failed: ' + data.message);
          }
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration');
  }
};