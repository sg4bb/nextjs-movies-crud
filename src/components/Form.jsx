import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Form = ({ formData, forNewMovie = true }) => {

    const router = useRouter();

    /**
     * variables onChange....
     */

    const [form, setForm] = useState({
        title: formData.title,
        plot: formData.plot
    });

    const handleChange = e => {
        const { value, name } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const [message, setMenssage] = useState([]);


    /**
     * Form functions
     * @param {*} e 
     */

    const handleSubmit = e => {
        e.preventDefault();
        if (forNewMovie) {
            postData(form);
        } else {
            putData(form);
        }
    };

    const putData = async (form) => {
        const { id } = router.query;
        setMenssage([]);

        try {

            const res = await fetch(`/api/movie/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            if (!data.success) {
                for (const key in data.error.errors) {
                    let error = data.error.errors[key];
                    setMenssage(oldmenssage => [
                        ...oldmenssage,
                        { message: error.message }
                    ]);
                }
            } else {
                setMenssage([]);
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const postData = async (form) => {
        try {

            const res = await fetch('/api/movie', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            if (!data.success) {
                for (const key in data.error.errors) {
                    let error = data.error.errors[key];
                    setMenssage(oldmenssage => [
                        ...oldmenssage,
                        { message: error.message }
                    ]);
                }
            } else {
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className="form-control my-3" placeholder="Title" name="title" autoComplete="off" value={form.title} onChange={handleChange} />
            <input type="text" className="form-control my-3" placeholder="Plot" name="plot" autoComplete="off" value={form.plot} onChange={handleChange} />
            <button className={forNewMovie ? 'btn btn-primary w-100' : 'btn btn-success w-100'} type="submit">
                {forNewMovie ? 'Add' : 'Edit'}
            </button>
            <Link href="/">
                <a className="btn btn-warning w-100 my-2">
                    Back to home
                </a>
            </Link>
            {
                message.map(({ message }) => (
                    <p key={message}>{message}</p>
                ))
            }
        </form>
    )
}

export default Form