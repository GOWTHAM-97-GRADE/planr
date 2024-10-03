import React, { useState } from 'react';
import { PrimaryButton, EditPopup, SecondaryButton } from './Utility';
import axios from 'axios';

const Account = ({ close, setAuth, setForgotPass }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const closeAndLogout = () => {
        close(-1);
        setAuth(false);
    };

    const deleteAccount = async () => {
        try {
            const token = localStorage.getItem("e-comToken"); 
            if (!token) throw new Error("Token not found");

            await axios.delete("http://localhost:5000/delete", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAuth(false);  // Log out user after account deletion
        } catch (error) {
            console.error("Error deleting account:", error); 
        }
    };
    
    return (
        <EditPopup style={{ height: "460px" }}>
            <PrimaryButton onClick={() => close(-1)} style={{ width: "90px", padding: "12px 20px", background: "white", color: "black" }}>
                Close
            </PrimaryButton>
            <div>
                <p style={{ fontSize: "32px", fontWeight: "600" }}>John Wick</p>
                <p style={{ fontSize: "20px", fontWeight: "400" }}>johnwick@eg.com</p>
            </div>
            <PrimaryButton onClick={() => setForgotPass(true)} style={{ background: "transparent", color: "#1b1b1b" }}>
                Change Password
            </PrimaryButton>
            <PrimaryButton style={{ background: "transparent", borderColor: "#c94747", color: "#c94747" }} onClick={closeAndLogout}>
                Logout
            </PrimaryButton>
            <PrimaryButton style={{ background: "#c94747" }} onClick={() => setShowDeleteConfirm(true)}>
                Delete Account
            </PrimaryButton>

            {showDeleteConfirm && (
                <div style={{ marginTop: "20px", color: "#c94747" }}>
                    <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                    <SecondaryButton onClick={() => setShowDeleteConfirm(false)} style={{ marginRight: "10px" }}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton style={{ background: "#c94747" }} onClick={deleteAccount}>
                        Yes, Delete
                    </PrimaryButton>
                </div>
            )}
        </EditPopup>
    );
};

export default Account;
