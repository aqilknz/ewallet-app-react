import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Tambahkan ini

export const useChangeProfile = () => {
    // 1. Ambil data avatar dari Redux Store (karena Redux biasanya dipersist)
    const { currentUser } = useSelector((state) => state.auth);
    const defaultImage = "/icons/Profile/User.svg";
    
    // 2. Gunakan avatar dari Redux sebagai initial state agar tidak hilang saat refresh
    const [preview, setPreview] = useState(currentUser?.avatar || defaultImage);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState("");

    // 3. Tambahkan useEffect untuk mensinkronisasi preview jika currentUser berubah
    useEffect(() => {
        if (currentUser?.avatar) {
            setPreview(currentUser.avatar);
        }
    }, [currentUser?.avatar]);

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
        setPreview(defaultImage);
        setSelectedFile(null);
        setError("");
    };

    return { preview, selectedFile, error, handleFileChange, handleDelete, setPreview };
};