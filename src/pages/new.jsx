import Form from "@/components/Form";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const New = () => {

    const formData = {
        title: "",
        plot: ""
    }

    return (
        <div className='container'>
            <h1 className='my-3'>
                Add movie Form
            </h1>
            <Form formData={formData} />
        </div>
    );
};

export default New;
