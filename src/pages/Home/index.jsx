import React, { useState } from "react";
import { useEffect } from "react";
import { Card } from "../../components/Card";
import "./styles.css";

export function Home() {
    const [studantName, setStudantName] = useState("");
    const [studants, setStudants] = useState([]);
    const [user, setUser] = useState({ name: "", avatar: "" });

    function handleAddStudent() {
        const newStudent = {
            name: studantName,
            time: new Date().toLocaleTimeString("pt-br", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }),
        };
        setStudants((prevState) => [...prevState, newStudent]); //prevState = estado anterior
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                "https://api.github.com/users/kohls20"
            );
            const data = await response.json();

            setUser({
                name: data.name,
                avatar: data.avatar_url,
            });
        }
        fetchData();
    }, []);

    return (
        <div className="container">
            <header>
                <h1>Lista de presença</h1>
                <div>
                    <strong>{user.name}</strong>
                    <img src={user.avatar} alt="Foto de perfil" />
                </div>
            </header>

            <input
                type="text"
                placeholder="Digite o nome..."
                onChange={(e) => setStudantName(e.target.value)}
            />
            <button type="button" onClick={handleAddStudent}>
                Adicionar
            </button>

            {studants.map((student) => (
                <Card
                    key={student.time}
                    name={student.name}
                    time={student.time}
                />
            ))}
        </div>
    );
}
