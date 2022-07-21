import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { updatePassword } from "firebase/auth";
import { toast } from "react-toastify";

const Password = () => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPassword("");
        const user = await auth.currentUser;
        console.log("user", user);
        await updatePassword(user, password)
            .then(() => {
                setLoading(false);
                toast.success("Password updated");
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                toast.error(error.message);
            });
    };
    const passwordUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Your password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter new password"
                    disabled={loading}
                />
                <br />
                <button
                    disabled={!password || password.length < 6 || loading}
                    className="btn btn-primary"
                >
                    {loading ? "Loading..." : "Submit"}
                </button>
            </div>
        </form>
    );
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    <h4>Password Update</h4>
                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    );
};

export default Password;
