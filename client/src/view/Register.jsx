import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup"
import { NavLink, useNavigate } from 'react-router-dom'
import useClient from '../hook/useClient'

const validationSchema = Yup.object({
    firstName: Yup.string()
        .min(5)
        .required(),
    lastName: Yup.string()
        .min(5)
        .required(),
    email: Yup.string()
        .email()
        .required(),
    password: Yup.string()
        .min(8)
        .required(),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'confirmpassword must be like password')
    .required(),
})


const Login = () => {
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        let client = new useClient();
        client.register(values)
            .then((response) => {
                navigate('/')
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.message)
                }
            })
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <div className="container">
                    <Form
                        className="row d-flex justify-content-center align-items-center"
                        style={{ height: "100vh" }}
                    >
                        <div className="card mb-3" style={{ maxWidth: "500px" }}>
                            <div className="col-md-12">
                                <div className="card-body">
                                    <h1 className="card-title text-center text-secondary mt-3">Registrate</h1>
                                    <div className="mb-3 mt-4 row">
                                        <div className='col'>
                                            <label className="form-label">Nombre</label>
                                            <Field type='text' name='firstName' className="form-control shadow-none" />
                                            <ErrorMessage name="firstName" component="div" className="text-danger" />
                                        </div>
                                        <div className='col'>
                                            <label className="form-label">Apellido</label>
                                            <Field type='text' name='lastName' className="form-control shadow-none" />
                                            <ErrorMessage name="lastName" component="div" className="text-danger" />
                                        </div>
                                    </div>
                                    <div className="mb-3 ">
                                        <label className="form-label">Gmail</label>
                                        <Field type='email' name='email' className="form-control shadow-none" />
                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Contraseña</label>
                                        <Field type='password' name='password' className="form-control shadow-none" />
                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Confirmar Contraseña</label>
                                        <Field type='password' name='confirmPassword' className="form-control shadow-none" />
                                        <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                    </div>
                                    <div className="text-center">
                                         <NavLink to='/' >Log in</NavLink>
                                    </div>
                                    <div className="text-center mt-4 ">
                                        <button
                                            className="btn btn-outline-primary text-center shadow-none mb-3"
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            Submit
                                        </button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </Form>
                </div>

            )
            }

        </Formik >
    )
}

export default Login
