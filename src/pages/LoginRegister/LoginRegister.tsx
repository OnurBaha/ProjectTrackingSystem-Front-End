import { Formik, Form } from 'formik';
import { Button, Tab, Tabs } from 'react-bootstrap';
import TextInput from '../../utilities/customFormControls/textInput';
import "./LoginRegister.css";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../store/auth/authSlice';
import { userActions } from '../../store/user/userSlice';
import authService from '../../services/authService';
import { toast } from 'react-toastify';

export default function LoginRegister() {
    const loginInitialValues = { email: "", password: "" }
    const registerInitialValues = { email: "", password: "", firstName: "", lastName: "" }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className='login-register-page container' >
            <div className="login-register-tab">
                <div className="col-md-6">
                    <Tabs
                        defaultActiveKey="login"
                        id="justify-tab-example"
                        className="mt-4"
                        justify
                    >
                        <Tab eventKey="login" title="Sisteme Giriş Yap">
                            <Formik
                                initialValues={loginInitialValues}
                                onSubmit={(values) => {
                                    authService.login(values).then(response => {
                                        if (response.data !== undefined) {
                                            dispatch(authActions.addToken({ token: response.data.token }));
                                            dispatch(userActions.getUserInfo());
                                            navigate("/projeler");
                                            toast.success("Giriş yapıldı");
                                        }
                                    })
                                }}>
                                <Form className='login-form mt-5'>
                                    <span >Email</span>
                                    <TextInput name="email" placeholder="example@example.com" />
                                    <span className='login-form-password'>Şifre</span>

                                    <TextInput name="password" className="mb-4" type="password" placeholder="Şifre" />
                                    <Button className="mb-4" type="submit">Sisteme Giriş Yap</Button>

                                </Form>
                            </Formik>
                        </Tab>
                        <Tab eventKey="register" title=" Sisteme Üye Ol">
                            <Formik
                                initialValues={registerInitialValues}
                                onSubmit={(values) => {
                                    authService.register(values).then(response => {
                                        if (response.data !== undefined) {
                                            toast.success("Sisteme Kayıt Olundu");
                                        }
                                    })
                                }}
                            >
                                <Form className='register-form mt-5'>
                                    <span >İsim</span>
                                    <TextInput name="firstName" placeholder="İsim" />

                                    <span >Soyisim</span>
                                    <TextInput name="lastName" placeholder="Soyisim" />

                                    <span >Email</span>
                                    <TextInput name="email" placeholder="example@example.com" />

                                    <span >Şifre</span>
                                    <TextInput name="password" type="password" placeholder="Şifre" />

                                    <Button className="mb-4" type="submit">Sisteme Üye Ol</Button>
                                </Form>
                            </Formik>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}