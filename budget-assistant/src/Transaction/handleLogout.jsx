export const handleLogout = (navigate) => {
    localStorage.removeItem('token');
    alert("Log out success");
    navigate('/login');
};