import { useState, useEffect } from 'react';

export const useChangeProfile = (initialImage = "/icons/Profile/User.svg") => {
    const [preview, setPreview] = useState(initialImage);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState("");
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setError("");

        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setError("Ukuran file terlalu besar (Maks 2MB)");
                return;
            }

            if (!file.type.startsWith("image/")) {
                setError("File harus berupa gambar");
                return;
            }
            setSelectedFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = () => {
        setPreview(initialImage);
        setSelectedFile(null);
        setError("");
    };

    return { preview, selectedFile, error, handleFileChange, handleDelete };
};