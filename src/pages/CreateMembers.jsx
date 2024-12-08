import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData, postData } from "../api/api";

const CreateMembers = () => {
    const [showModal, setShowModal] = useState(false);
    const [members, setMembers] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(e.name , e.value)
        // Ensure role updates properly
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await postData("user/create", formData)
        console.log("Submitted Data:", formData);
        
        toast.success("Member added successfully!");
        setShowModal(false);
        setFormData({ name: "", email: "", password: "", role: "" });
        fetchData()
    };
    const fetchData = async () => {

        const response = await getData("user/get-members")
        console.log(response.data)
        setMembers(response.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="bg-gray-950 min-h-screen text-white p-6">
            <ToastContainer />

            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Members</h1>
                <button
                    className="bg-yellow-500 px-4 py-2 rounded text-gray-950 font-semibold"
                    onClick={() => setShowModal(true)}
                >
                    Add Member
                </button>
            </div>

            {/* Members Table */}
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="p-4 border-b border-gray-700">Name</th>
                        <th className="p-4 border-b border-gray-700">Email</th>
                        <th className="p-4 border-b border-gray-700">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        members?.map((member) => (
                            <tr className="hover:bg-gray-800">
                                <td className="p-4 border-b border-gray-700">{member.name}</td>
                                <td className="p-4 border-b border-gray-700">{member.email}</td>
                                <td className="p-4 border-b border-gray-700">{member.role}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Add Member</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded bg-gray-700 focus:ring-2 focus:ring-yellow-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded bg-gray-700 focus:ring-2 focus:ring-yellow-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded bg-gray-700 focus:ring-2 focus:ring-yellow-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Role</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded bg-gray-700 focus:ring-2 focus:ring-yellow-500"
                                >
                                    <option value="not specified">Select</option>
                                    <option value="editor">Editor</option>
                                    <option value="admin">Admin</option>
                                    <option value="reader">Reader</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-yellow-500 text-gray-950 rounded hover:bg-yellow-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateMembers;
