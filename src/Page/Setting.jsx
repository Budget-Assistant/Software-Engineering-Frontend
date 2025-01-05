import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Setting.css';
import { handleEmailUpdate } from '../Settings/handleEmailUpdate';
import { handlePasswordUpdate } from '../Settings/handlePasswordUpdate';
import { fetchUserInfo } from '../Settings/fetchUserInfo';
import { handleUsernameUpdate } from '../Settings/handleUsernameUpdate';

const Setting = () => {
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [userInfo, setUserInfo] = useState({ username: '', email: '' });
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchUserInfo(token, setUserInfo, setNewUsername, setNewEmail);
    }, [token]);

    return (
<div className="container-fluid d-flex justify-content-center align-items-center vh-100 setting-container">
    <div className="card p-4 shadow col-5" style={{ backgroundColor: "#D5E8E1" }} >
        <h2 className="text-center mb-4">帳戶設定</h2>
        <div className="user-info mb-4">
            <p>
                目前用戶名稱：<strong>{userInfo.username}</strong>
                <button
                    className="btn btn-outline-primary btn-sm ms-3"
                    onClick={() => setIsEditingUsername(!isEditingUsername)}
                >
                    {isEditingUsername ? '取消' : '修改'}
                </button>
            </p>
            <p>
                目前 Email：<strong>{userInfo.email}</strong>
                <button
                    className="btn btn-outline-primary btn-sm ms-3"
                    onClick={() => setIsEditingEmail(!isEditingEmail)}
                >
                    {isEditingEmail ? '取消' : '修改'}
                </button>
            </p>
            <p>
                密碼設定
                <button
                    className="btn btn-outline-primary btn-sm ms-3"
                    onClick={() => setIsEditingPassword(!isEditingPassword)}
                >
                    {isEditingPassword ? '取消' : '修改'}
                </button>
            </p>
        </div>

        {isEditingUsername && (
            <form
                onSubmit={(e) => handleUsernameUpdate(e, newUsername, token, setNewUsername)}
                className="settings-form mb-4"
            >
                <div className="mb-3">
                    <label htmlFor="username" className="">新的用戶名稱：</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder="輸入新的用戶名稱"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">更新用戶名稱</button>
            </form>
        )}

        {isEditingEmail && (
            <form
                onSubmit={(e) => handleEmailUpdate(e, newEmail, token, setUserInfo, setIsEditingEmail)}
                className="settings-form mb-4"
            >
                <div className="mb-3">
                    <label htmlFor="email" className="">新的 Email：</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="輸入新的 Email"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">更新 Email</button>
            </form>
        )}

        {isEditingPassword && (
            <form
                onSubmit={(e) =>
                    handlePasswordUpdate(
                        e,
                        oldPassword,
                        newPassword,
                        token,
                        navigate,
                        setOldPassword,
                        setNewPassword,
                        setIsEditingPassword
                    )
                }
                className="settings-form mb-4"
            >
                <div className="mb-3">
                    <label htmlFor="oldPassword" className="">目前密碼：</label>
                    <input
                        type="password"
                        id="oldPassword"
                        className="form-control"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="輸入目前密碼"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="">新密碼：</label>
                    <input
                        type="password"
                        id="newPassword"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="輸入新密碼"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">更新密碼</button>
            </form>
        )}

        <div className="text-center">
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/add-transaction')}
            >
                返回
            </button>
        </div>
    </div>
</div>

    );
};

export default Setting;