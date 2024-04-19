import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup"
import useClient from '../hook/useClient'
import { NavLink, useNavigate } from 'react-router-dom'


const validationSchema = Yup.object({
    username: Yup.string()
        .required('Debe agregar su nombre de usuario'),
    password: Yup.string()
        .required('Debe agregar una contraseña'),
})


const Login = () => {
    const initialValues = {
        username: '',
        password: ''
    }
    const navigate = useNavigate()

    const handleSubmit = async (values) => {
        let client = new useClient();

        client.login(values.username, values.password)
            .then((response) => {
                sessionStorage.setItem("login", response.data.user.email);
                sessionStorage.setItem("rol", response.data.user.__t);
                navigate("/home")
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
                        <div className="card mb-3" style={{ maxWidth: "320px" }}>
                            <div className="col-md-12">
                                <div className="card-body">
                                    <h1 className="card-title text-center text-secondary mt-3">Login</h1>
                                    <div className="mb-3 mt-4">
                                        <label className="form-label">User</label>
                                        <Field type='text' name='username' className="form-control shadow-none" />
                                        <ErrorMessage name="username" component="div" className="text-danger" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Contraseña</label>
                                        <Field type='password' name='password' className="form-control shadow-none" />
                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                    </div>
                                    <div className="text-center">
                                        <NavLink to='/register' >Register</NavLink>
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
