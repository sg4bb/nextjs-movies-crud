import Form from '@/components/Form'
import { useRouter } from 'next/router';
import React from 'react'
import useSWR from 'swr';

/**
 * fetch const
 */
const fetcher = async url => {
    const res = await fetch(url);

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
        const error = new Error("An error occurred while fetching the data.");
        // Attach extra info to the error object.
        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    const { data } = await res.json();

    return data;
}

const EditMovie = () => {

    const router = useRouter();
    const { id } = router.query;

    //SWR request
    const { data: movie, error } = useSWR(id ? `/api/movie/${id}` : null, fetcher);

    if (error) {
        return <div>Error</div>
    }

    if (!movie) {
        return (
            <div className="container mt-5 text-center">
                <h1>Loading...🚀🚀</h1>
            </div>
        )
    }

    const formData = {
        title: movie.title,
        plot: movie.plot,
    };

    return (
        <div className="container">
            <h1>edit movie</h1>
            <Form forNewMovie={false} formData={formData} />
        </div>
    );
};

export default EditMovie;