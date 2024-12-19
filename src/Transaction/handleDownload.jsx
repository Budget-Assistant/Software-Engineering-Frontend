import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const handleDownload = async (token) => {
    const userId = jwtDecode(token).userId;
    try {
        const response = await axios.get(`http://localhost:3001/export-excel/${userId}`, {
            responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `transaction.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error('Error downloading Excel:', error);
        alert('Failed to download the file. Please try again.');
    }
};